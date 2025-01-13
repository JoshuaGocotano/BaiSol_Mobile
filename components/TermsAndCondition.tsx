import { useApproveProjectQuotation } from "@/api/client/ClientAPI";
import { selectProjectId } from "@/redux/projectIdSlice";
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

const TermsAndConditionsModal: React.FC<{
  isVisible: boolean;
  onClose: () => void;
}> = ({ isVisible, onClose }) => {
  const projectId = useSelector(selectProjectId);

  const approveQuotation = useApproveProjectQuotation();

  const [isLoading, setIsLoading] = useState(false);

  const handleApproveQuotation = async () => {
    Alert.alert(
      "Confirmation",
      "Click OK to approve your solar installation quotation.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            approveQuotation.mutateAsync(
              { projId: projectId! },
              {
                onSuccess: (data) => {
                  Toast.show({ type: "success", text1: data });
                  onClose();
                },
              }
            );
          },
        },
      ]
    );
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-11/12 bg-white rounded-lg p-5 max-h-[80%]">
          <Text className="text-lg font-bold mb-4 text-center">
            Terms and Conditions
          </Text>
          <ScrollView className="mb-5">
            <Text className="text-sm text-gray-700 mb-4">
              By approving this quotation, you agree to the terms and conditions
              outlined below for the solar installation project. Please review
              them carefully:
            </Text>
            <View className="space-y-3">
              <Text className="text-sm text-gray-700">
                <Text className="font-bold">Payment Terms:</Text> The payment
                structure includes:
                {"\n"}- 60% downpayment upon approval of the quotation.
                {"\n"}- 30% progress billing when the project reaches certain
                milestones. {"\n"}- 10% payment after the installation is
                completed.
              </Text>
              <Text className="text-sm text-gray-700">
                <Text className="font-bold">Project Start:</Text> The project
                will commence 2 business days after the downpayment is received,
                provided the payment is made on a weekday.
              </Text>
              <Text className="text-sm text-gray-700">
                <Text className="font-bold">Progress Billing Requirement:</Text>
                The project will not proceed if the progress billing payment is
                not settled once the project reaches 60% or more completion.
              </Text>
              <Text className="text-sm text-gray-700">
                <Text className="font-bold">Agreement to Expenses:</Text> By
                approving the quotation, the client agrees to all costs
                associated with the project, including any additional expenses
                that may arise.
              </Text>
              <Text className="text-sm text-gray-700">
                <Text className="font-bold">Warranties:</Text> The solar
                installation comes with the following warranties:
                {"\n"}- 2-year workmanship warranty. {"\n"}- 5-year inverter
                warranty. {"\n"}- 12-year product warranty for solar panels.
                {"\n"}- 25-year lifespan for solar panels.
              </Text>
              <Text className="text-sm text-gray-700">
                <Text className="font-bold">Site Preparation:</Text> The client
                is responsible for ensuring the site is accessible and safe for
                the installation team.
              </Text>
              <Text className="text-sm text-gray-700">
                <Text className="font-bold">Force Majeure:</Text> Delays caused
                by natural disasters, acts of government, or other unforeseen
                circumstances will be communicated promptly and may adjust the
                installation timeline.
              </Text>
            </View>
            <Text className="text-sm text-gray-700 mt-4">
              Please contact our support team for any clarifications before
              approving the quotation.
            </Text>
          </ScrollView>
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="flex-1 bg-orange-500 py-3 rounded-lg items-center mr-2"
              onPress={handleApproveQuotation}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold">Approve</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-gray-300 py-3 rounded-lg items-center ml-2"
              onPress={onClose}
            >
              <Text className="text-gray-800 font-bold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TermsAndConditionsModal;
