import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import {
  getRequestsByProj,
  useAcknowledgeRequest,
  useDeleteRequest,
} from "@/api/facilitator/RequestSupplyAPI";
import RequestSupply from "@/components/RequestSupply";
import { getAssignedMaterialsByFacilitator } from "@/api/facilitator/AssignedSupplyAPI"; // Import the materials API
import { getAssignedEquipmentByFacilitator } from "@/api/facilitator/AssignedSupplyAPI"; // Import the equipment API

const Supply = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  // Fetch data from the requests, materials, and equipment APIs
  const {
    data: requests,
    isLoading: requestsLoading,
    error: requestsError,
  } = getRequestsByProj();
  
  const {
    data: materials,
    isLoading: materialsLoading,
    error: materialsError,
  } = getAssignedMaterialsByFacilitator();
  const {
    data: equipment,
    isLoading: equipmentLoading,
    error: equipmentError,
  } = getAssignedEquipmentByFacilitator();

  const acknowledgeRequest = useAcknowledgeRequest();
  const deleteRequest = useDeleteRequest();

  const scheme = useColorScheme();

  const styles = {
    background: scheme === "dark" ? "bg-[#161622]" : "bg-white",
    textPrimary: scheme === "dark" ? "text-white" : "text-gray-900",
    textSecondary: scheme === "dark" ? "text-[#B0B0B0]" : "text-gray-600",
    cardBackground: scheme === "dark" ? "bg-[#232533]" : "bg-gray-100",
    headerBackground: scheme === "dark" ? "bg-[#333333]" : "bg-gray-200",
    buttonBackground: scheme === "dark" ? "bg-secondary-100" : "bg-black",
    buttonText: scheme === "dark" ? "text-white" : "text-white",
    iconColor: "white",
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleAcknowledge = (reqId: number) => {
    acknowledgeRequest.mutate(
      { reqId: [reqId] },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Request acknowledged successfully!",
          });
        },
      }
    );
  };

  const handleDelete = (reqId: number) => {
    deleteRequest.mutate(
      { reqId },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Request deleted successfully!",
          });
        },
      }
    );
  };

  const renderSupplyItem = ({
    item,
  }: {
    item: {
      reqId: number;
      requestSupply: string;
      quantityRequested: number;
      status: string;
    };
  }) => (
    <View
      className={`flex-row items-center justify-between p-4 ${styles.cardBackground} mb-2 rounded-lg shadow-sm`}
    >
      <Text className={`text-base ${styles.textPrimary} flex-1`}>
        {item.requestSupply}
      </Text>
      <Text className={`text-sm ${styles.textSecondary} flex-1 text-center`}>
        {item.quantityRequested}
      </Text>
      <Text className={`text-sm ${styles.textSecondary} flex-1 text-center`}>
        {item.status}
      </Text>
      <View className="flex-row space-x-2">
        <TouchableOpacity
          onPress={() => handleAcknowledge(item.reqId)}
          className="px-3 py-2 bg-green-500 rounded"
        >
          <Text className="text-white">Acknowledge</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.reqId)}
          className="px-3 py-2 bg-red-500 rounded"
        >
          <Text className="text-white">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View
      className={`flex-row ${styles.headerBackground} p-4 rounded-lg mb-2 shadow-sm`}
    >
      <Text className={`text-base ${styles.textPrimary} flex-1 font-semibold`}>
        Name
      </Text>
      <Text
        className={`text-base ${styles.textPrimary} flex-1 text-center font-semibold`}
      >
        Quantity
      </Text>
      <Text
        className={`text-base ${styles.textPrimary} flex-1 text-center font-semibold`}
      >
        Status
      </Text>
      <Text
        className={`text-base ${styles.textPrimary} flex-1 text-center font-semibold`}
      >
        Actions
      </Text>
    </View>
  );

  if (requestsLoading || materialsLoading || equipmentLoading) {
    return (
      <SafeAreaView
        className={`flex-1 ${styles.background} p-4 justify-center items-center`}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (requestsError || materialsError || equipmentError) {
    return (
      <SafeAreaView
        className={`flex-1 ${styles.background} p-4 justify-center items-center`}
      >
        <Text className={`text-xl ${styles.textPrimary}`}>
          Failed to load data
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${styles.background} p-4`}>
      <Text className={`text-3xl font-extrabold mb-5 ${styles.textPrimary}`}>
        Supplies
      </Text>

      {/* <FlatList
        data={requests}
        keyExtractor={(item) => `request-${item.reqId}`}
        renderItem={renderSupplyItem}
        ListHeaderComponent={renderHeader}
        className="mb-6"
      /> */}

      {/* Displaying Assigned Materials */}
      <Text className={`text-2xl font-bold text-primary mb-4`}>
        Assigned Materials
      </Text>
      <FlatList
        data={materials}
        keyExtractor={(item) => `material-${item.mtlCategory}`}
        renderItem={({ item }) => (
          <View className="mb-4">
            <Text className="text-lg font-semibold">{item.mtlCategory}</Text>
            {item.details?.map((detail) => (
              <View key={detail.mtlId} className="pl-4">
                <Text>{detail.mtlDescription}</Text>
                <Text>
                  {detail.mtlQuantity ?? "N/A"} {detail.mtlUnit}
                </Text>
              </View>
            ))}
          </View>
        )}
      />

      {/* Displaying Assigned Equipment */}
      <Text className={`text-2xl font-bold text-primary mb-4`}>
        Assigned Equipment
      </Text>
      <FlatList
        data={equipment}
        keyExtractor={(item) => `equipment-${item.eqptCategory}`}
        renderItem={({ item }) => (
          <View className="mb-4">
            <Text className="text-lg font-semibold">{item.eqptCategory}</Text>
            {item.details?.map((detail) => (
              <View key={detail.suppId} className="pl-4">
                <Text>{detail.eqptDescript}</Text>
                <Text>
                  {detail.quantity} {detail.eqptUnit}
                </Text>
              </View>
            ))}
          </View>
        )}
      />

      {/* <TouchableOpacity
        onPress={openModal}
        className={`flex-row items-center justify-between px-4 py-3 rounded-md ${styles.buttonBackground}`}
      >
        <Text className={`text-md font-semibold ${styles.buttonText}`}>
          Request a supply?
        </Text>
        <Ionicons name="arrow-forward" size={20} color={styles.iconColor} />
      </TouchableOpacity> */}

      {/* <RequestSupply isVisible={isModalVisible} onClose={closeModal} /> */}
    </SafeAreaView>
  );
};

export default Supply;
