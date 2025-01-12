import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useQuery } from "@tanstack/react-query";
import {
  getTaskToUpdateProgress,
  useUpdateTaskProgress,
} from "@/api/facilitator/ReportAPI";
import { getAssignedProject } from "@/api/facilitator/FacilitatorAPI";

const Reports = () => {
  const [image1, setImage1] = useState<string | null>(null);
  interface Report {
    id: number;
    taskName: string;
    plannedStartDate: string;
    plannedEndDate: string;
    isEnable: boolean;
    isFinished: boolean;
  }

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    const { data: projId, isLoading: isLoadingId } = getAssignedProject();
  
  
  // Fetch tasks using react-query
  const { data: task, isLoading, isError } = getTaskToUpdateProgress(projId!);

  const updateTaskProgress = useUpdateTaskProgress();

  const pickImage = async (
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "You need to grant permission to access the photo library."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled) {
        console.log("User canceled image picker");
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const source = result.assets[0].uri;
        setImage(source);
        console.log("Image selected: ", source);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
      Alert.alert("Error", "Something went wrong while picking the image.");
    }
  };

  const handleSubmit = async () => {
    if (selectedReport && image1) {
      try {
        const response = await fetch(image1);
        const blob = await response.blob();
        const proofImage = new File([blob], "proof.jpg", {
          type: "image/jpeg",
        });

        await updateTaskProgress.mutateAsync({
          id: selectedReport.id,
          Progress: 100, // Example progress update
          ProofImage: proofImage,
        });

        Alert.alert("Success", "Task has been submitted!");
        setSelectedReport(null);
        setImage1(null);
      } catch (error) {
        console.error("Error submitting task:", error);
      }
    } else {
      Alert.alert("Error", "Please select a report and an image.");
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 py-7 px-2">
        <Text className="text-center text-gray-600">Loading tasks...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 py-7 px-2">
        <Text className="text-center text-red-600">Error loading tasks.</Text>
      </SafeAreaView>
    );
  }

  if (selectedReport) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100">
        <ScrollView className="px-3 py-6">
          <TouchableOpacity
            onPress={() => setSelectedReport(null)}
            className="mb-4"
          >
            <Text className="text-blue-500 text-lg font-medium">
              {"< Back"}
            </Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {selectedReport.taskName}
          </Text>
          <Text className="text-lg text-gray-600 mb-2">
            Start: {new Date(selectedReport.plannedStartDate).toDateString()}
          </Text>
          <Text className="text-lg text-gray-600 mb-4">
            End: {new Date(selectedReport.plannedEndDate).toDateString()}
          </Text>
          <Text className="text-lg text-gray-600 mb-4">
            Status:{" "}
            {selectedReport.isFinished
              ? "Completed"
              : selectedReport.isEnable
              ? "In Progress"
              : "Not Started"}
          </Text>

          {!selectedReport.isFinished && (
            <View className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
              <Text className="text-lg font-semibold mb-2">Upload Image</Text>
              <View className="border border-gray-300 rounded-lg h-40 justify-center items-center mb-4">
                {image1 ? (
                  <Image
                    source={{ uri: image1 }}
                    className="w-full h-full rounded-lg"
                  />
                ) : (
                  <Text className="text-gray-400">No image selected</Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => pickImage(setImage1)}
                className="bg-green-500 py-3 rounded-lg items-center"
              >
                <Text className="text-white font-medium">Choose Image</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={selectedReport.isFinished}
            className={`py-3 rounded-lg items-center ${
              selectedReport.isFinished ? "bg-gray-400" : "bg-orange-500"
            }`}
          >
            <Text className="text-white font-semibold text-lg">
              {selectedReport.isFinished ? "Already Submitted" : "Submit"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const renderReport = ({
    item,
  }: {
    item: {
      id: number;
      taskName: string;
      plannedStartDate: string;
      plannedEndDate: string;
      isEnable: boolean;
      isFinished: boolean;
    };
  }) => (
    <TouchableOpacity
      onPress={() => !item.isFinished && setSelectedReport(item)}
      disabled={item.isFinished}
      className={`p-4 rounded-lg shadow-sm my-2 flex-row justify-between items-center ${
        item.isFinished ? "bg-gray-200" : "bg-white"
      }`}
    >
      <View>
        <Text
          className={`text-lg font-semibold ${
            item.isFinished ? "text-gray-500" : "text-gray-800"
          }`}
        >
          {item.taskName}
        </Text>
        <Text className="text-sm text-gray-500">
          {new Date(item.plannedStartDate).toDateString()} -{" "}
          {new Date(item.plannedEndDate).toDateString()}
        </Text>
        <Text className="text-sm text-gray-600">
          Status:{" "}
          {item.isFinished
            ? "Completed"
            : item.isEnable
            ? "In Progress"
            : "Not Started"}
        </Text>
      </View>
      {!item.isFinished && (
        <View className="bg-blue-500 rounded-full px-3 py-1">
          <Text className="text-white text-sm font-medium">View</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 py-7 px-2">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Reports</Text>
      <FlatList
        data={task}
        renderItem={renderReport}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Reports;
