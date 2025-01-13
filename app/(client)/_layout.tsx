import {
  View,
  Text,
  Image,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, Tabs } from "expo-router";
import { useDispatch } from "react-redux";
import { validateToken } from "@/api/TokenValidation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { setUser } from "@/redux/authSlice";
import { icons } from "@/constants";
import { getClientProjId } from "@/api/client/ClientAPI";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => (
  <View
    className="items-center justify-center gap-2"
    style={{ width: 100, paddingTop: 32 }}
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

const ClientLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const validateAndSetUser = async () => {
      const isValidToken = await validateToken();
      if (isValidToken) {
        const accessToken = await AsyncStorage.getItem("accessToken");

        if (!accessToken) return;

        const decoded: any = jwtDecode(accessToken);
        const user = {
          userId:
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ],
          email:
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],
          userName:
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ],
          userRole:
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
        };
        dispatch(setUser(user));
      } else {
        router.push("/log-in");
      }
    };
    validateAndSetUser();
  }, [dispatch, router]);

  const colorScheme = useColorScheme();
  const isLightMode = colorScheme === "light";

  const tabs = [
    { name: "client-home", title: "Home", icon: icons.home },
    { name: "quotation", title: "Quotation", icon: icons.quotation },
    { name: "bill-payment", title: "Billing", icon: icons.bill },
    { name: "reports", title: "Project", icon: icons.reports },
    { name: "profile", title: "Profile", icon: icons.profile },
    { name: "projectIds", title: "Projects", icon: icons.profile },
  ];

  return (
    <>
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
    </>
  );
};

export default ClientLayout;
