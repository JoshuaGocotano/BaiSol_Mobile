import { ITask, useUpdateTaskProgress } from "@/api/facilitator/ReportAPI";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import Collapsible from "react-native-collapsible";
import { SafeAreaProvider } from "react-native-safe-area-context";

const TasksToUpdateProgress: React.FC<{
  isFacilitator?: boolean;
  taskToDo: ITask[];
  refetch?: () => void;
  refetchDateInfo?: () => void;
}> = ({ isFacilitator = false, taskToDo, refetch, refetchDateInfo }) => {
  const updateTaskProgress = useUpdateTaskProgress();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [link, setLink] = useState<string>("");
  const [selectedParentKey, setSelectedParentKey] = useState<number>();
  const [selectedChildKey, setSelectedChildKey] = useState<number>();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState<number>();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file); // Set the selected image in the state
      // const imageUrl = URL.createObjectURL(file); // Create the object URL for the preview
    } else {
      setUploadedImage(null); // Reset state if no file is selected
    }
  };

  const handleChangeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Restrict input to numbers and a maximum of 9 digits
    if (/^\d{0,9}$/.test(value)) {
      setProgress(Number(value));
    }
  };

  const handleUpdateTask = () => {
    if (uploadedImage && refetch && refetchDateInfo) {
      // Show confirmation dialog
      const confirmSubmission = window.confirm(
        "Click OK to update task progress."
      );

      if (confirmSubmission) {
        updateTaskProgress.mutateAsync(
          {
            ProofImage: uploadedImage,
            id: id!,
            Progress: progress,
            EstimationStart: "0062bcfa-e894-4d4b-9789-a6d3db3d0fea.png",
          },
          {
            onSuccess: (data) => {
              Toast.show({ type: "success", text1: data });
              setUploadedImage(null);
              setProgress(0);
              refetch();
              refetchDateInfo();
              setModalVisible(!modalVisible);
            },
          }
        );
      }
    }
  };

  const handleViewImage = (link: string) => {
    setLink(link);
  };

  if (taskToDo === null) return <div>No tasks assigned yet!</div>;

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      {taskToDo.map((taskParent) => (
        <View key={taskParent.id} className=" mb-4">
          <TouchableOpacity onPress={() => setSelectedParentKey(taskParent.id)}>
            <View className="flex-row justify-between p-2">
              <Text
                className={`font-semibold ${
                  taskParent.isFinished
                    ? "text-green-400"
                    : taskParent.isStarting
                    ? "text-orange-400"
                    : taskParent.daysLate > 0
                    ? "text-red-600"
                    : taskParent.isEnable
                    ? "text-blue-400"
                    : "text-gray-400"
                }`}
              >
                {taskParent.taskName}
              </Text>
              {taskParent.daysLate > 0 && (
                <Text className="text-red-600 text-xs">{`Days Late: ${taskParent.daysLate}`}</Text>
              )}
            </View>
          </TouchableOpacity>

          <Collapsible collapsed={selectedParentKey !== taskParent.id}>
            <View className="pl-4">
              {taskParent.taskList.map((taskChild) => (
                <View key={taskChild.id} className="mb-2">
                  <TouchableOpacity
                    onPress={() => setSelectedChildKey(taskChild.id)}
                  >
                    <View className="flex-col justify-between py-2">
                      <Text className="text-gray-400 text-xs">
                        Planned Date: {taskChild.estimationStart}
                      </Text>
                      <Text className="text-gray-400 text-xs">
                        Project Updated At: {taskChild.actualStart}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <Collapsible collapsed={selectedChildKey !== taskChild.id}>
                    <View className="pl-4">
                      <View className="flex-col items-center justify-between">
                        <View className="flex-row">
                          <Text>Progress:</Text>
                          <Text className="text-green-500">
                            {taskChild.taskProgress}
                          </Text>
                        </View>
                      </View>

                      {taskChild.isEnable && isFacilitator && (
                        <Pressable
                          className="flex ml-auto items-center justify-center p-2 text-white rounded-lg bg-orange-400 hover:bg-gray-200 hover:text-orange-500 transition-all duration-300 ease-in"
                          onPress={() => {
                            setModalVisible(true);
                            setId(taskChild.id);
                          }}
                        >
                          <Text>Update Task</Text>
                        </Pressable>
                      )}
                      {/* 
                      {!isFacilitator && taskChild.isFinish && (
                        <TouchableOpacity
                          onPress={() => handleViewImage(taskChild?.proofImage)}
                        >
                          <Text className="text-orange-400 text-xs underline">
                            View Proof
                          </Text>
                        </TouchableOpacity>
                      )} */}
                    </View>
                  </Collapsible>
                </View>
              ))}
            </View>
          </Collapsible>
        </View>
      ))}
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 justify-center items-center">
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
              <Text className="text-lg font-semibold mb-2">
                Update Progress
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 8,
                  padding: 10,
                  fontSize: 16,
                }}
                placeholder="Enter progress percentage (0-100)"
                keyboardType="numeric"
                // value={progressInput}
                // onChangeText={handleProgressChange}
              />

              {/* Submit button */}
              <TouchableOpacity
                onPress={() => handleUpdateTask()}
                disabled={uploadedImage === null || progress < 1}
                className="flex ml-auto items-center justify-center p-2 text-white rounded-lg bg-orange-400 hover:bg-gray-200 hover:text-orange-500 transition-all duration-300 ease-in"
              >
                <Text className="text-white font-semibold text-lg">
                  {updateTaskProgress.isPending ? "Submitting..." : "Submit"}{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                className="flex ml-auto items-center justify-center p-2 text-white rounded-lg bg-gray-400 hover:bg-gray-200 hover:text-gray-500 transition-all duration-300 ease-in"
              >
                <Text className="text-white font-semibold text-lg">close </Text>
              </TouchableOpacity>
            </View>
          </Modal>{" "}
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
};

export default TasksToUpdateProgress;
