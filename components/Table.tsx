// Table in the Quotation holding the calculations for the project expense
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { selectProjectId } from "@/redux/projectIdSlice";
import { getProjectExpense, getProjectSupply } from "@/api/ProjectAPI";

const Table = () => {
  const projectId = useSelector(selectProjectId);

  const {
    data: materialSupplies,
    isLoading: supplyLoading,
    refetch: refetchSupply,
  } = getProjectSupply(projectId);

  const {
    data: projExpense,
    refetch: refetchExpense,
    isLoading: expenseLoading,
  } = getProjectExpense(projectId);

  const formatMoney = (value: string) => {
    const numberValue = parseFloat(value); // Convert string to number
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numberValue);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="">
        {/* Table Header */}
        <View className="flex-row justify-between bg-blue-500 p-2 rounded-t-md mb-2">
          <Text className="text-white text-md font-semibold">Description</Text>
          <Text className="text-white text-md font-semibold">Line Total</Text>
        </View>

        {/* Project Supplies Data */}
        {materialSupplies?.map((item, index) => (
          <View
            key={index}
            className={`flex-row justify-between px-2 ${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            }`}
          >
            <Text className="text-gray-800">{item.description}</Text>
            <Text className="text-gray-800">₱ {item.lineTotal}</Text>
          </View>
        ))}

        {/* Project Expenses (Total Materials and Total Labor) */}
        <View className="flex-row justify-between bg-gray-200 p-2 mt-4">
          <Text className="text-gray-800 font-semibold">
            {projExpense?.totalMaterialCost.description}
          </Text>
          <Text className="text-gray-800">
            ₱ {projExpense?.totalMaterialCost.lineTotal}
          </Text>
        </View>
        <View className="flex-row justify-between bg-gray-200 px-2">
          <Text className="text-gray-800 font-semibold">
            {projExpense?.totalLaborCost.description}
          </Text>
          <Text className="text-gray-800">
            ₱ {projExpense?.totalLaborCost.lineTotal}
          </Text>
        </View>

        {/* Warranties */}
        <View className="flex-row justify-between bg-gray-200 px-2 pt-3">
          <Text className="text-black font-bold">Warranties:</Text>
        </View>
        <View className="flex-row justify-between bg-gray-200 px-2">
          <Text className="text-black font-bold">
            2 years workmanship warranty
          </Text>
        </View>
        <View className="flex-row justify-between bg-gray-200 px-2">
          <Text className="text-black font-bold">
            5 years inverter warranty
          </Text>
        </View>
        <View className="flex-row justify-between bg-gray-200 px-2 pb-3">
          <Text className="text-black font-bold">
            12 years warranty for solar panels
          </Text>
        </View>

        {/* Grand Total */}
        <View className="flex-row justify-between px-2 mt-5 rounded-b-lg">
          <Text className="text-md font-semibold">Subtotal</Text>
          <Text className="text-md font-semibold">
            ₱ {projExpense?.subTotal}
          </Text>
        </View>
        <View className="flex-row justify-between px-2 rounded-b-lg">
          <Text className="text-md font-semibold">Discount</Text>
          <Text className="text-md font-semibold">
            ₱ {projExpense?.discount}
          </Text>
        </View>
        <View className="flex-row justify-between px-2 rounded-b-lg">
          <Text className="text-md font-semibold">
            VAT ({projExpense?.vatRate}%)
          </Text>
          <Text className="text-md font-semibold">₱ {projExpense?.vat}</Text>
        </View>
        <View className="flex-row justify-between px-2 pt-1">
          <Text className="text-md font-bold">Total</Text>
          <Text className="text-md font-bold">₱ {projExpense?.total}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Table;
