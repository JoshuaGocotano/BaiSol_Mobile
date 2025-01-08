import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { paymentsData } from "../../constants/PaymentSampleData";

// Define the type for payment data
type Payment = {
  referenceNumber: string;
  checkoutUrl: string;
  amount: string;
  description: string;
  status: string;
  sourceType: string;
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  paymentFee: string;
  isAcknowledged: boolean;
  acknowledgedBy: string;
  acknowledgedAt: string | null;
};

const BillPayment = () => {
  const { projectId } = useLocalSearchParams();

  const renderPayment = ({ item, index }: { item: Payment; index: number }) => {
    const {
      referenceNumber,
      amount,
      description,
      status,
      sourceType,
      paidAt,
      checkoutUrl,
      isAcknowledged,
    } = item;
  
    // Check if the previous payment is unpaid
    const isDisabled =
      index > 0 && paymentsData[index - 1].status !== "paid";
  
    return (
      <View className="bg-white p-4 rounded-lg mb-4 shadow-md">
        <Text className="text-lg font-bold text-gray-700">{description}</Text>
        <Text className="text-base text-gray-600">₱{parseFloat(amount).toFixed(2)}</Text>
        <Text className="text-sm text-gray-500">
          Status:{" "}
          <Text
            className={`font-semibold ${
              status === "paid" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.toUpperCase()}
          </Text>
        </Text>
        {status === "paid" && (
          <>
            <Text className="text-sm text-gray-500">Paid via: {sourceType}</Text>
            <Text className="text-sm text-gray-500">Paid At: {paidAt}</Text>
          </>
        )}
        {status === "unpaid" && (
          <TouchableOpacity
            className={`py-2 px-4 rounded-lg mt-4 ${
              isDisabled ? "bg-gray-400" : "bg-orange-600"
            }`}
            disabled={isDisabled}
            onPress={() => {
              if (!isDisabled) {
                alert("Redirecting to payment...");
                // Linking.openURL(checkoutUrl); // Uncomment for real navigation
              } else {
                alert("You must pay the previous payment first.");
              }
            }}
          >
            <Text
              className={`text-center font-bold ${
                isDisabled ? "text-gray-600" : "text-white"
              }`}
            >
              {isDisabled ? "Payment Locked" : "Pay Now"}
            </Text>
          </TouchableOpacity>
        )}
        {isAcknowledged && (
          <Text className="mt-4 text-green-600 text-sm font-bold">
            Payment Acknowledged
          </Text>
        )}
      </View>
    );
  };  

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-xl font-bold text-center text-gray-800 mb-4">
        Payment Details for Project ID: {projectId}
      </Text>
      <FlatList
        data={paymentsData as Payment[]}
        keyExtractor={(item) => item.referenceNumber}
        renderItem={(props) => renderPayment(props)}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-8">
            No payment records found.
          </Text>
        }
      />
    </View>
  );
};

export default BillPayment;
