import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface LogOutModalProps {
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  logout: () => void;
}

const LogOutModal: React.FC<LogOutModalProps> = ({
  isModalVisible,
  setModalVisible,
  logout,
}) => {
  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-4/5 p-6 rounded-lg bg-white shadow-lg">
          <Text className="text-lg font-bold mb-4 text-black">
            Confirm Logout
          </Text>
          <Text className="text-base mb-6 text-gray-700">
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
  );
};

export default LogOutModal;
