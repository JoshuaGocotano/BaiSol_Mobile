import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/authSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const FacilitatorHome = () => {
  const user = useSelector(selectUser);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-primary p-3">
      <Text>Wazzup {user.email}</Text>
    </SafeAreaView>
  );
};

export default FacilitatorHome;
