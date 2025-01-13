import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { paymentsData } from "../../constants/PaymentSampleData";
import { Payment } from "@/constants/PaymentSampleData copy";
import { getClientPayments } from "@/api/client/PaymentAPI";
import { getClientProjId } from "@/api/client/ClientAPI";
import { useSelector } from "react-redux";
import { selectProjectId } from "@/redux/projectIdSlice";

const BillPayment = () => {
  const projectId = useSelector(selectProjectId);

  const {
    data: payment,
    error,
    isLoading,
    refetch,
  } = getClientPayments(projectId);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }
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

    const isDisabled = index > 0 && paymentsData[index - 1].status !== "paid";

    return (
      <View className="bg-white p-4 rounded-lg mb-4 shadow-md">
        <Text className="text-lg font-bold text-gray-700">{description}</Text>
        <Text className="text-base text-gray-600">
          ₱{parseFloat(amount).toFixed(2)}
        </Text>
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
            <Text className="text-sm text-gray-500">
              Paid via: {sourceType}
            </Text>
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
                Linking.openURL(checkoutUrl);
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
    <View className="flex-1 bg-gray-100 px-4 py-12">
      <Text className="text-xl font-bold text-center text-gray-800 mb-4">
        Bill Payment
      </Text>
      <FlatList
        data={payment as Payment[]}
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
