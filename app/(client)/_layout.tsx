import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { useDispatch } from "react-redux";
import { validateToken } from "@/api/TokenValidation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { setUser } from "@/redux/authSlice";

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
        router.push("/log-in")
      }
    };
    validateAndSetUser();
  }, [dispatch, router]);
  return (
    <>
      <Stack>
        <Stack.Screen name="client-home" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default ClientLayout;
