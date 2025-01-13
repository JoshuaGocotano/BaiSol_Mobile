import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { router, Tabs } from "expo-router";
import { icons } from "../../constants";
import { useColorScheme } from "react-native";
import { useAuth } from "../auth-context";
import LogOutModal from "@/components/LogOutModal";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => (
  <View
    className="items-center justify-center gap-2"
    style={{ width: 100, paddingTop: 30 }}
  >
    <Image
      source={icon}
      resizeMode="contain"
      style={{ tintColor: color }}
      className="w-6 h-6"
    />
    <Text
      style={{
        fontFamily: focused ? "Poppins-SemiBold" : "Poppins-Regular",
        color: color,
      }}
      className="text-xs"
    >
      {name}
    </Text>
  </View>
);

const TabsLayout: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false); // Modal state

  const { email, setEmail } = useAuth();

  const logout = () => {
    setEmail(null);
    setModalVisible(false); // Close modal
    setTimeout(() => {
      router.replace("/log-in");
    }, 500);
  };

  const colorScheme = useColorScheme();
  const isLightMode = colorScheme === "light";
  const scheme = useColorScheme(); // Detect current theme

  // Theme-specific styles
  const styles = {
    background: scheme === "dark" ? "bg-[#161622]" : "bg-[#F9F9F9]",
    textPrimary: scheme === "dark" ? "text-white" : "text-[#555555]",
    textSecondary: scheme === "dark" ? "text-[#B0B0B0]" : "text-[#555555]",
    cardBackground: scheme === "dark" ? "bg-[#232533]" : "bg-white",
    statusActive: "bg-green-500",
    statusOnWork: "bg-orange-400",
    statusInactive: "bg-red-500",
  };

  const tabs = [
    { name: "facilitator-home", title: "Home", icon: icons.home },
    { name: "reports", title: "Reports", icon: icons.reports },
    { name: "supply", title: "Supply", icon: icons.supply },
  ];

  const handleApproveQuotation = async () => {
    Alert.alert("Log out", "Click OK to Log out.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          router.replace("/log-in");
          setEmail(null);
        },
      },
    ]);
  };

  return (
    <View className="flex-1">
      <TouchableOpacity
        className="absolute top-6 right-2 p-4 z-10"
        onPress={() => handleApproveQuotation()} // Show modal on press
      >
        <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
      </TouchableOpacity>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FF9C01",
          tabBarInactiveTintColor: isLightMode ? "#666666" : "#CDCDE0",
          tabBarStyle: {
            backgroundColor: isLightMode ? "#FFFFFF" : "#161622",
            borderTopWidth: 1,
            borderTopColor: isLightMode ? "#E0E0E0" : "#232533",
            height: 84,
            justifyContent: "center",
          },
        }}
      >
        {tabs.map(({ name, title, icon }) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              title,
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icon}
                  color={color}
                  name={title}
                  focused={focused}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </View>
  );
};

export default TabsLayout;
