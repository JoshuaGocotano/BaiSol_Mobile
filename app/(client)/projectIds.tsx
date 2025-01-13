import { getClientProjId } from "@/api/client/ClientAPI";
import { setProjectId } from "@/redux/projectIdSlice";
import { router } from "expo-router";
import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

const projectIds = () => {
  const { data: clientProjId, isLoading } = getClientProjId();

  // Dispatch function to dispatch actions
  const dispatch = useDispatch();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FF9C01" />;
  }

  // Function to handle setting the project ID
  const handleSetProjectId = (id: string) => {
    dispatch(setProjectId(id)); // Dispatch the action to set the projectId
    router.push({
      pathname: "/(client)/client-home",
    });
  };

  return (
    <View className="flex-1 justify-center items-center">
      {/* Display project buttons */}
      <View className="flex-col flex-wrap justify-center">
        {clientProjId != null &&
          clientProjId.map((id, index) => (
            <TouchableOpacity
              key={id.projId}
              style={{ padding: 10, borderRadius: 5, margin: 5 }}
              onPress={() => handleSetProjectId(id.projId)}
              className="w-28 font-semibold md:w-36 lg:w-48 text-white text-lg bg-orange-400"
            >
              <Text className="text-white text-sm">Project {index + 1}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default projectIds;
