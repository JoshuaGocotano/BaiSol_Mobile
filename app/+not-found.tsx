import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const PageNotFound = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text>This Screen doesn't exists</Text>
      </View>
    </>
  );
};

export default PageNotFound;
