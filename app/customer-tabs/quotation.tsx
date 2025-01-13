import { icons } from "@/constants";
import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { ProjectInfo } from "@/constants/QuotationSampleData";
import { MaterialIcons } from "@expo/vector-icons";

const ClientProjectForm = () => {
  const formRef = useRef(null);

  const colorScheme = useColorScheme();

  const handleDownloadPdf = async () => {
    alert("PDF generation is not yet implemented.");
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <TouchableOpacity
        className="absolute top-6 right-6 items-center"
        onPress={handleDownloadPdf}
      >
        <Image source={icons.download} className="w-10 h-10" />
        <Text className="text-xs font-medium text-gray-700">Download</Text>
      </TouchableOpacity>

      <ScrollView
        ref={formRef}
        className="flex-1 mt-10 border border-gray-300 rounded-lg bg-gray-50"
        contentContainerStyle={{ padding: 16 }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mb-5">
          <Image
            source={images.sunvoltage}
            style={{ width: 100, height: 90 }}
          />

          <View className="items-end">
            <Text className="text-xl font-extrabold text-blue-600 tracking-wider">
              Solar Quotation
            </Text>
            <View className="mt-2">
              <Text className="text-sm font-bold text-gray-600">
                Date:{" "}
                <Text className="font-normal">
                  {new Date(
                    ProjectInfo.projectDateCreation
                  ).toLocaleDateString()}
                </Text>
              </Text>
              <Text className="text-sm font-bold text-gray-600">
                Valid Until:{" "}
                <Text className="font-normal">
                  {new Date(
                    ProjectInfo.projectDateValidity
                  ).toLocaleDateString()}
                </Text>
              </Text>
              {/* <Text className="text-sm font-bold text-gray-600">
                Quotation #:{" "}
                <Text className="font-normal">{ProjectInfo.projectId}</Text>
              </Text>
              <Text className="text-sm font-bold text-gray-600">
                Customer ID:{" "}
                <Text className="font-normal">{ProjectInfo.customerId}</Text>
              </Text> */}
            </View>
          </View>
        </View>

        {/* Customer Details */}
        <View className="mb-6 borderrounded-lg bg-white shadow-md">
          <Text className="text-md font-semibold text-white bg-blue-500 p-2">
            Customer
          </Text>
          {/* Customer Information */}
          <Text className="text-lg font-bold text-gray-700 mt-2 ml-2">
            {ProjectInfo.customerName}
          </Text>
          <Text className="text-sm font-bold text-gray-600 ml-2">
            ID: <Text className="font-normal">{ProjectInfo.customerId}</Text>
          </Text>
          <Text className="text-base text-gray-700 ml-2">
            {ProjectInfo.customerAddress}
          </Text>
          <Text className="text-base text-gray-700 ml-2 mb-2">
            {ProjectInfo.customerEmail}
          </Text>
        </View>

        {/* Project Details */}
        <View className="mb-6 borderrounded-lg bg-white shadow-md">
          <Text className="text-md font-semibold text-white bg-blue-500 p-2">
            Project
          </Text>
          <Text className="text-base text-gray-700 p-2">
            {ProjectInfo.projectDescription}
          </Text>
          <Text className="text-sm font-bold text-gray-600 p-2">
            Quotation #:{" "}
            <Text className="font-normal">{ProjectInfo.projectId}</Text>
          </Text>
        </View>

        {/* Payment Details */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Payment Details
          </Text>
          <Text className="text-base text-gray-700">
            <Text className="font-bold">Discount: </Text>10%
          </Text>
          <Text className="text-base text-gray-700">
            <Text className="font-bold">VAT Rate: </Text>12%
          </Text>
          <Text className="text-base text-gray-700">
            <Text className="font-bold">Payment Progress: </Text>50%
          </Text>
        </View>

        {/* Project Progress */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Project Progress
          </Text>
          <Text className="text-base text-gray-700">
            <Text className="font-bold">Progress: </Text>75%
          </Text>
          <Text className="text-base text-gray-700">
            <Text className="font-bold">Facilitator: </Text>
            Richard Roe (richard@example.com)
          </Text>
        </View>

        {/* Signature Section */}
        <View className="items-center mt-10">
          <Text className="text-gray-600 text-lg">______________________</Text>
          <Text className="text-sm text-gray-600 mt-2">Client Signature</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClientProjectForm;
