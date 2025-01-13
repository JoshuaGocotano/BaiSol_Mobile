import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";

// Define the IEquipmentDetails interface
interface IEquipmentDetails {
  suppId: number;
  eqptCode: string;
  eqptDescript: string;
  quantity: number;
  eqptUnit: string;
}

// Define the IAssignedEquipment interface
export interface IAssignedEquipment {
  eqptCategory: string;
  details?: IEquipmentDetails[];
}

const scheme = useColorScheme();
const styles = {
  background: scheme === "dark" ? "bg-[#161622]" : "bg-white",
  textPrimary: scheme === "dark" ? "text-white" : "text-gray-900",
  textSecondary: scheme === "dark" ? "text-[#B0B0B0]" : "text-gray-600",
  cardBackground: scheme === "dark" ? "bg-[#232533]" : "bg-gray-100",
  headerBackground: scheme === "dark" ? "bg-[#333333]" : "bg-gray-200",
  buttonBackground: scheme === "dark" ? "bg-secondary-100" : "bg-black",
  buttonText: scheme === "dark" ? "text-white" : "text-white",
  iconColor: "white",
};

const sampleAssignedEquipment: IAssignedEquipment[] = [
  {
    eqptCategory: "Hand Tools",
    details: [
      {
        suppId: 1,
        eqptCode: "EQ-001",
        eqptDescript: "Hammer",
        quantity: 3,
        eqptUnit: "Units",
      },
    ],
  },
  {
    eqptCategory: "Electronic Tools",
    details: [
      {
        suppId: 3,
        eqptCode: "EQ-003",
        eqptDescript: "Multimeter",
        quantity: 5,
        eqptUnit: "Units",
      },
    ],
  },
];

const RequestSupply: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (equipment: IEquipmentDetails, quantity: string) => void;
}> = ({ isVisible, onClose, onSubmit }) => {
  const [form, setForm] = useState({ supplyName: "", quantity: "" });

  // Combine equipment details to populate the supply options in the dropdown
  const equipmentOptions = sampleAssignedEquipment.flatMap(
    (category) =>
      category.details?.map((item) => ({
        label: `${item.eqptDescript} (${item.eqptCode})`,
        value: item.eqptCode,
      })) || []
  );

  const handleSubmit = () => {
    if (form.supplyName && form.quantity) {
      // Find the selected equipment
      const selectedEquipment = sampleAssignedEquipment
        .flatMap((category) => category.details || [])
        .find((item) => item.eqptCode === form.supplyName);

      if (selectedEquipment) {
        // Call the onSubmit handler and pass the selected equipment and quantity
        onSubmit(selectedEquipment, form.quantity);

        Toast.show({
          text1: "Request Submitted Successfully",
          text2: `You requested ${form.quantity} of ${form.supplyName}`,
          type: "success",
          position: "top",
        });

        setForm({ supplyName: "", quantity: "" });
        onClose();
      }
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
      <SafeAreaView className="flex-1 justify-center items-center bg-black/50">
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
            <Picker.Item label="Select Equipment" value="" />
            {equipmentOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
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
  const [requestedEquipment, setRequestedEquipment] = useState<
    {
      eqptCode: string;
      eqptDescript: string;
      quantity: string;
      status: string;
    }[]
  >([]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSubmitRequest = (
    equipment: IEquipmentDetails,
    quantity: string
  ) => {
    // Add the new request with "Pending" status
    setRequestedEquipment((prevState) => [
      ...prevState,
      {
        eqptCode: equipment.eqptCode,
        eqptDescript: equipment.eqptDescript,
        quantity,
        status: "Pending", // Set initial status to "Pending"
      },
    ]);
  };

  // const handleApproveRequest = (eqptCode: string) => {
  //   setRequestedEquipment((prevState) =>
  //     prevState.map((item) =>
  //       item.eqptCode === eqptCode ? { ...item, status: "Approved" } : item
  //     )
  //   );

  //   Toast.show({
  //     text1: "Request Approved",
  //     text2: `The request for ${eqptCode} has been approved.`,
  //     type: "success",
  //     position: "top",
  //   });
  // };

  const renderRequestedEquipment = () => {
    if (requestedEquipment.length === 0) return null;

    return (
      <View className="mt-4">
        <Text className="text-xl font-semibold text-gray-900">
          Your Requested Equipment:
        </Text>
        <FlatList
          data={requestedEquipment}
          keyExtractor={(item) => item.eqptCode}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between p-4 mb-2 rounded-lg shadow-sm bg-gray-100 border-b">
              <Text className="text-base text-gray-900 flex-1">
                {item.eqptCode}
              </Text>
              <Text className="text-base text-gray-900 flex-1">
                {item.eqptDescript}
              </Text>
              <Text className="text-sm text-gray-600 flex-1 text-center">
                {item.quantity}
              </Text>
              <Text
                className={`text-sm flex-1 text-center ${
                  item.status === "Approved"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {item.status}
              </Text>
              {/* <TouchableOpacity
                onPress={() => handleApproveRequest(item.eqptCode)}
                disabled={item.status === "Approved"}
                className="p-2 bg-green-500 rounded text-white"
              >
                <Text className="text-white">Approve</Text>
              </TouchableOpacity> */}
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-3xl font-extrabold mb-5 text-gray-900">
        Equipment Requests
      </Text>

      {sampleAssignedEquipment.map((category) => (
        <View key={category.eqptCategory} className="mb-4">
          <View className="bg-gray-200 p-4 rounded-lg mb-4 shadow-sm">
            <Text className="text-xl font-semibold text-gray-900">
              {category.eqptCategory}
            </Text>
          </View>
          <FlatList
            data={category.details}
            keyExtractor={(item) => item.eqptCode}
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-between p-4 mb-2 rounded-lg shadow-sm bg-gray-100 border-b">
                <Text className="text-base text-gray-900 flex-1">
                  {item.eqptCode}
                </Text>
                <Text className="text-base text-gray-900 flex-1">
                  {item.eqptDescript}
                </Text>
                <Text className="text-sm text-gray-600 flex-1 text-center">
                  {item.eqptUnit}
                </Text>
                <Text className="text-sm text-gray-600 flex-1 text-center">
                  {item.quantity}
                </Text>
              </View>
            )}
            className="mb-4"
          />
        </View>
      ))}

      <TouchableOpacity
        onPress={openModal}
        className={`flex-row items-center justify-between px-4 py-3 rounded-md ${styles.buttonBackground}`}
      >
        <Text className={`text-md font-semibold ${styles.buttonText}`}>
          Request a supply?
        </Text>
        <Ionicons name="arrow-forward" size={20} color={styles.iconColor} />
      </TouchableOpacity>

      <RequestSupply
        isVisible={isModalVisible}
        onClose={closeModal}
        onSubmit={handleSubmitRequest}
      />

      {renderRequestedEquipment()}
    </SafeAreaView>
  );
};

export default Request;
