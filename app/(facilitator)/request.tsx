import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";
import { getAssignedProject } from "@/api/facilitator/AssignedProject";
import {
  getRequestMaterialSupplies,
  getRequestsByProj,
  IRequestDetail,
  IRequestSupply,
  useAcknowledgeRequest,
  useDeleteRequest,
  useRequestSupply,
} from "@/api/facilitator/RequestSupplyAPI";

// The styles object (you can replace this with your actual styles)
const styles = {
  textPrimary: "text-gray-900", // Primary text color
  textSecondary: "text-gray-600", // Secondary text color
  cardBackground: "bg-gray-100", // Background for card
  headerBackground: "bg-gray-200", // Header background color
};

export interface IAllRequest {
  reqId: number;
  submittedAt: string;
  reviewedAt: string;
  status: string;
  quantityRequested: number;
  requestSupply: string;
  projectName: string;
  supplyCategory: string;
  submittedBy: string;
  reviewedBy: string;
}

const allRequests: IAllRequest[] = [
  {
    reqId: 1,
    submittedAt: "2025-01-10T09:15:00Z",
    reviewedAt: "2025-01-11T14:30:00Z",
    status: "OnReview",
    quantityRequested: 100,
    requestSupply: "Steel Beams",
    projectName: "Bridge Construction Project",
    supplyCategory: "Construction Materials",
    submittedBy: "John Doe",
    reviewedBy: "Jane Smith",
  },
  {
    reqId: 2,
    submittedAt: "2025-01-08T16:45:00Z",
    reviewedAt: "2025-01-09T10:20:00Z",
    status: "OnReview",
    quantityRequested: 50,
    requestSupply: "Wiring Cables",
    projectName: "Office Renovation",
    supplyCategory: "Electrical Supplies",
    submittedBy: "Alice Johnson",
    reviewedBy: "Mark Taylor",
  },
  {
    reqId: 3,
    submittedAt: "2025-01-12T11:00:00Z",
    reviewedAt: "2025-01-13T09:00:00Z",
    status: "OnReview",
    quantityRequested: 0,
    requestSupply: "Cement Bags",
    projectName: "Road Expansion Project",
    supplyCategory: "Construction Materials",
    submittedBy: "Michael Green",
    reviewedBy: "Sarah Brown",
  },
  {
    reqId: 4,
    submittedAt: "2025-01-12T11:00:00Z",
    reviewedAt: "2025-01-13T09:00:00Z",
    status: "Approved",
    quantityRequested: 60,
    requestSupply: "Cement Bags",
    projectName: "Road Expansion Project",
    supplyCategory: "Construction Materials",
    submittedBy: "Michael Green",
    reviewedBy: "Sarah Brown",
  },
];

const RequestSupply = ({
  isVisible,
  onClose,
  refetch,
}: {
  isVisible: boolean;
  onClose: () => void;
  refetch: () => void;
}) => {
  const [form, setForm] = useState({ supplyName: "", quantity: "" });

  const {
    data: supplies,
    isLoading,
    refetch: refetchSupplies,
  } = getRequestMaterialSupplies();
  const sendRequest = useRequestSupply();

  const handleSubmit = () => {
    if (form.supplyName && form.quantity) {
      const requestDetails: IRequestDetail[] = [
        {
          quantityRequested: parseInt(form.quantity, 10),
          suppId: parseInt(form.supplyName, 10), // supplyName holds the suppId
        },
      ];

      const requestData: IRequestSupply = {
        requestDetails,
      };

      sendRequest.mutateAsync(requestData, {
        onSuccess: (data) => {
          Toast.show({
            text1: "Requested Successfully",
            text2: data,
            type: "success",
            position: "top",
          });
          onClose();
          refetch();
          refetchSupplies();
          setForm({ supplyName: "", quantity: "" });
        },
      });
    } else {
      alert("Please fill in both fields!");
    }
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      transparent={true}
      animationType="slide"
    >
      <SafeAreaView className="flex-1 justify-center items-center">
        <View className="bg-white p-5 rounded-lg w-4/5 max-w-md">
          <Text className="text-xl font-bold mb-4 text-center">
            Request a Supply
          </Text>

          <Text className="text-sm font-semibold mb-2">Supply Name</Text>
          <Picker
            selectedValue={form.supplyName}
            onValueChange={(itemValue) =>
              setForm({ ...form, supplyName: itemValue })
            }
            style={{ height: 50, width: "100%" }}
          >
            {supplies?.map((supply) => (
              <Picker.Item label={supply.supplyName} value={supply.suppId} />
            ))}
            {/* Add your equipment options here */}
          </Picker>

          <Text className="text-sm font-semibold mb-2 mt-4">Quantity</Text>
          <TextInput
            value={form.quantity}
            onChangeText={(text) => setForm({ ...form, quantity: text })}
            placeholder="How many?"
            keyboardType="numeric"
            className="border border-gray-300 p-2 rounded-lg mb-6"
          />

          <View className="flex-row justify-end">
            <View className="mr-2">
              <Button title="Submit" onPress={handleSubmit} />
            </View>
            <View>
              <Button title="Cancel" onPress={onClose} color="red" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const Request = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [requests, setRequests] = useState<IAllRequest[]>(allRequests);
  const { data: requestsData, isLoading, refetch } = getRequestsByProj();

  const deleteRequest = useDeleteRequest();
  const acknowledgeRequest = useAcknowledgeRequest();

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleEllipsisPress = (reqId: number) => {
    Alert.alert("Choose an action", "", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          deleteRequest.mutateAsync(
            { reqId: reqId },
            {
              onSuccess: (data) => {
                Toast.show({
                  text1: "Request Deleted",
                  text2: data,
                  type: "info",
                  position: "top",
                });
                refetch();
              },
              onError: (error) => {
                Toast.show({
                  text1: "Error",
                  text2: error.message || "Something went wrong",
                  type: "error",
                  position: "top",
                });
              },
            }
          );
        },
        style: "destructive",
      },
      {
        text: "Acknowledge",
        style: "default",
        onPress: () => {
          acknowledgeRequest.mutateAsync(
            { reqId: [reqId] }, // Assuming the API expects an array
            {
              onSuccess: (data: any) => {
                Toast.show({
                  text1: "Request Acknowledged",
                  text2: data,
                  type: "success",
                  position: "top",
                });
                refetch();
              },
              onError: (error) => {
                Toast.show({
                  text1: "Error",
                  text2: error.message || "Something went wrong",
                  type: "error",
                  position: "top",
                });
              },
            }
          );
        },
      },
    ]);
  };

  const renderRequestItem = ({ item }: { item: IAllRequest }) => (
    <View
      className={`flex-row items-center justify-between p-4 ${styles.cardBackground} mb-2 rounded-lg shadow-sm`}
    >
      <Text className={`text-base ${styles.textPrimary} flex-1`}>
        {item.requestSupply}
      </Text>
      <Text className={`text-base ${styles.textPrimary} flex-1`}>
        {item.projectName}
      </Text>
      <Text className={`text-sm ${styles.textSecondary} flex-1 text-center`}>
        {item.status}
      </Text>
      <Text className={`text-sm ${styles.textSecondary} flex-1 text-center`}>
        {item.quantityRequested}
      </Text>

      <TouchableOpacity
        onPress={() => handleEllipsisPress(item.reqId)}
        className="ml-2 p-2 bg-gray-200 rounded-full"
      >
        <Ionicons name="ellipsis-vertical" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className={`p-4 ${styles.headerBackground}`}>
        <Text className={`text-3xl font-extrabold ${styles.textPrimary}`}>
          Equipment Requests
        </Text>
      </View>

      <FlatList
        data={requestsData}
        keyExtractor={(item) => item.reqId.toString()}
        renderItem={renderRequestItem}
        ListHeaderComponent={() => (
          <View className="flex-row justify-between p-4 bg-gray-200 mb-2">
            <Text
              className={`text-base ${styles.textPrimary} text-center flex-1`}
            >
              Supply
            </Text>
            <Text
              className={`text-base ${styles.textPrimary} text-center flex-1`}
            >
              Project
            </Text>
            <Text
              className={`text-base ${styles.textPrimary} text-center flex-1`}
            >
              Status
            </Text>
            <Text
              className={`text-base ${styles.textPrimary} text-center flex-1`}
            >
              Quantity
            </Text>
            <Text
              className={`text-base ${styles.textPrimary} text-center flex-1`}
            >
              Action
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={openModal}
        className="flex-row items-center justify-between px-4 py-3 rounded-md bg-black"
      >
        <Text className="text-md font-semibold text-white">
          Request a supply?
        </Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>

      <RequestSupply
        refetch={refetch}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
};

export default Request;
