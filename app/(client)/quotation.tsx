import { icons } from "@/constants";
import React, { useRef, useState } from "react";
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
import Table from "@/components/Table";
import TermsAndConditionsModal from "@/components/TermsAndCondition";
import { useSelector } from "react-redux";
import { selectProjectId } from "@/redux/projectIdSlice";
import { getClientProjectInfo } from "@/api/client/ClientAPI";
import { getProjectInfo } from "@/api/ProjectAPI";

const ClientProjectForm = () => {
  const formRef = useRef(null);
  const colorScheme = useColorScheme();

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);

  const closeModal = () => setModalVisible(false);

  const handleDownloadPdf = async () => {
    alert("PDF generation is not yet implemented.");
  };

  const projectId = useSelector(selectProjectId);

  const { data: projInfo } = getProjectInfo(projectId);

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      {/* Approve and Download Buttons */}
      <View className="absolute top-6 right-6 flex-row items-center space-x-4">
        {/* Approve Button */}
        <TouchableOpacity
          className="items-center bg-orange-500 px-3 py-2 rounded-lg"
          onPress={openModal}
        >
          <Text className="text-xs font-medium text-white">Approve</Text>
        </TouchableOpacity>

        {/* Download Button
        <TouchableOpacity className="items-center" onPress={handleDownloadPdf}>
          <Image source={icons.download} className="w-10 h-10" />
          <Text className="text-xs font-medium text-gray-700">Download</Text>
        </TouchableOpacity> */}
      </View>

      <ScrollView
        ref={formRef}
        className="flex-1 mt-10 border border-gray-300 rounded-lg bg-gray-50 p-3"
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
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
                <Text className="font-normal text-left">
                  {projInfo?.projectDateCreation}
                </Text>
              </Text>
              <Text className="text-sm font-bold text-gray-600">
                Valid Until:{" "}
                <Text className="font-normal text-left">
                  {projInfo?.projectDateValidity}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Customer Details */}
        <View className="mb-5 bg-white shadow-md rounded-lg">
          <Text className="text-md font-semibold text-white bg-blue-500 p-2">
            Customer
          </Text>
          <Text className="text-lg font-bold text-gray-700 mt-2 ml-2">
            {projInfo?.customerName}
          </Text>
          <Text className="text-sm font-bold text-gray-600 ml-2">
            ID: <Text className="font-normal">{projInfo?.customerId}</Text>
          </Text>
          <Text className="text-base text-gray-700 ml-2">
            {projInfo?.customerAddress}
          </Text>
          <Text className="text-base text-gray-700 ml-2 mb-2">
            {projInfo?.customerEmail}
          </Text>
        </View>

        {/* Project Details */}
        <View className="mb-5 bg-white shadow-md rounded-lg">
          <Text className="text-md font-semibold text-white bg-blue-500 p-2">
            Project
          </Text>
          <Text className="text-base text-gray-700 p-2">
            {projInfo?.projectDescription}
          </Text>
          <Text className="text-sm font-bold text-gray-600 p-2">
            Quotation #:{" "}
            <Text className="font-normal">{projInfo?.projectId}</Text>
          </Text>
        </View>

        {/* Project Expense Table */}
        <View>
          <Table />
        </View>

        {/* Notes and Instructions */}
        <View className="mb-5 bg-white shadow-sm rounded-lg mt-4">
          <Text className="text-md font-bold text-white bg-blue-500 p-2">
            Special Notes and Instructions
          </Text>
          <Text className="text-sm p-2">
            Once signed, please Fax, mail or email it to the provided address.
          </Text>
          <Text className="text-sm px-2">
            Payment Terms:{" "}
            <Text className="text-sm font-bold px-2">
              60% downpayment, 30% progress billing, and 10% after installation.
            </Text>
          </Text>
          <Text className="text-sm font-bold px-2 pb-3">
            Note: Installation period is around 7 days.
          </Text>
        </View>

        <Text className="text-sm text-center p-2">
          Above information is not an invoice and only an estimate of
          services/goods described above. Payment will be collected in prior to
          provision of services/goods described in this quote.
        </Text>

        <Text className="text-sm text-center p-2">
          Please confirm your acceptance of this quote by signing this document
        </Text>

        {/* Signature and Date Section */}
        <View className="flex-row justify-between mt-6 mb-5">
          {/* Signature Section */}
          <View className="flex-1 items-center">
            <Text className="text-gray-600 text-lg">_________________</Text>
            <Text className="text-sm text-gray-600">Signature</Text>
          </View>

          {/* Date Section */}
          <View className="flex-1 items-center">
            <Text className="text-gray-600 text-lg">_________________</Text>
            <Text className="text-sm text-gray-600">Date</Text>
          </View>
        </View>

        {/* Thank you message */}
        <View className="mt-5 mb-8">
          <Text className="text-lg font-bold text-center">
            Thank you for your business!
          </Text>
          <Text className="text-sm text-center">
            Should you have any enquiries concerning this quote, please contact
            Richard R. Lonzaga on 0967-145-5851
          </Text>
          <Text className="text-sm text-center">
            Sitio Cacao Kamagong St., La Paloma Subd., Cebu City, Cebu, 6000
          </Text>
        </View>
      </ScrollView>
      <TermsAndConditionsModal
        isVisible={isModalVisible}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
};

export default ClientProjectForm;
