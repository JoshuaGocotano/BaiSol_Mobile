import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { users } from "../../constants/SampleData";
import { useAuth } from "../auth-context";
import { images, icons } from "@/constants";
import { router } from "expo-router";
import { ClientProjectInfo } from "@/constants/QuotationSampleData";

const Profile = () => {
  const { email, setEmail } = useAuth();
  const user = users.find((user) => user.email === email);

  const scheme = useColorScheme(); // Detect current theme
  const [isModalVisible, setModalVisible] = useState(false); // Modal state

  // Theme-specific styles
  const styles = {
    background: scheme === "dark" ? "bg-[#161622]" : "bg-[#F9F9F9]",
    textPrimary: scheme === "dark" ? "text-white" : "text-[#555555]",
    textSecondary: scheme === "dark" ? "text-[#B0B0B0]" : "text-[#555555]",
    cardBackground: scheme === "dark" ? "bg-[#232533]" : "bg-white",
    statusOnGoing: "bg-green-500",
    statusOnWork: "bg-orange-400",
    statusOnProcess: "bg-red-500",
    statusFinished: "bg-blue-500",
  };

  const logout = () => {
    setModalVisible(false); // Close modal
    setTimeout(() => {
      router.replace("/log-in");
    }, 500);
    setEmail(null);
  };

  if (!user) {
    return (
      <View
        className={`flex-1 justify-center items-center p-4 ${styles.background}`}
      >
        <Text className={`text-2xl font-bold ${styles.textPrimary}`}>
          User not found
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${styles.background}`}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <TouchableOpacity
          className="w-full items-end"
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>

        <View className="w-full justify-center items-center mt-6 mb-7 px-4">
          <TouchableOpacity className="flex items-center">
            <View className="w-32 h-32 border-2 border-secondary rounded-full mb-4 justify-center items-center">
              <Image
                source={images.profile}
                className="w-[90%] h-[90%] rounded-full"
                resizeMode="cover"
              />
            </View>

            <Text className={`text-2xl font-bold ${styles.textPrimary}`}>
              {ClientProjectInfo.clientFName} {ClientProjectInfo.clientLName}
            </Text>

            <View className="flex-row items-center">
              <Text
                className={`text-base tracking-widest ${styles.textSecondary}`}
              >
                {user.role.toUpperCase()}
              </Text>
              <View
                className={`ml-2 w-3 h-3 rounded-full ${
                  {
                    OnGoing: styles.statusOnGoing,
                    Finished: styles.statusFinished,
                    OnWork: styles.statusOnWork,
                    OnProcess: styles.statusOnProcess,
                  }[ClientProjectInfo.status] || ""
                }`}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Profile Info Card */}
        <TouchableOpacity
          className={`rounded-xl p-6 my-4 ${styles.cardBackground} shadow-lg`}
        >
          <Text className={`text-lg font-semibold mb-4 ${styles.textPrimary}`}>
            Personal Information
          </Text>

          {[
            { label: "Gender", value: ClientProjectInfo.sex },
            { label: "Address", value: ClientProjectInfo.clientAddress },
            { label: "Phone", value: ClientProjectInfo.clientContactNum },
            { label: "Project Status", value: ClientProjectInfo.status },
            { label: "System Type", value: ClientProjectInfo.systemType },
          ].map((item, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center mb-2"
            >
              <Text
                className={`text-base font-semibold ${styles.textSecondary}`}
              >
                {item.label}:
              </Text>
              <Text className={`text-base ${styles.textSecondary}`}>
                {item.value}
              </Text>
            </View>
          ))}
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Confirmation Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View
            className={`w-[80%] p-6 rounded-lg ${styles.cardBackground} shadow-lg`}
          >
            <Text className={`text-lg font-bold mb-4 ${styles.textPrimary}`}>
              Confirm Logout
            </Text>
            <Text className={`text-base mb-6 ${styles.textSecondary}`}>
              Are you sure you want to log out?
            </Text>
            <View className="flex-row justify-end">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 mr-3"
              >
                <Text className="text-gray-800 font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={logout}
                className="px-4 py-2 rounded-lg bg-red-600"
              >
                <Text className="text-white font-medium">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
