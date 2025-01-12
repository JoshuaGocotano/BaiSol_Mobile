import React from "react";
import { View, Text, useColorScheme, ScrollView } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../auth-context";
import { useUserEmail } from "@/api/Hooks/userHook";
import { getProjectsByUserId, users } from "@/constants/ClientProjectInfo";
import { getAssignedProject } from "@/api/facilitator/FacilitatorAPI";
import {
  getClientProjectInfo,
  getPaymentProgress,
  getProjectProgress,
} from "@/api/facilitator/AssignedProject";

interface InfoRowProps {
  label: string;
  value: string | number;
  textColor: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, textColor }) => (
  <Text className={`text-sm ${textColor}`}>
    {label}: <Text className={`font-semibold ${textColor}`}>{value}</Text>
  </Text>
);

interface InstallerCardProps {
  name: string;
  position: string;
  textColor: string;
}

const InstallerCard: React.FC<InstallerCardProps> = ({
  name,
  position,
  textColor,
}) => (
  <View className={`bg-white p-3 rounded-lg mb-3 shadow-md`}>
    <Text className={`text-lg font-semibold ${textColor}`}>{name}</Text>
    <Text className={`text-sm ${textColor}`}>{position}</Text>
  </View>
);

const Home = () => {
  const { email } = useAuth();
  const scheme = useColorScheme();
  const userEmail = useUserEmail();

  const { data: projId, isLoading: isLoadingId } = getAssignedProject();

  const { data: infos, isLoading: isLoadingCPI } = getClientProjectInfo(
    projId!
  );

  const { data: payProg, isLoading: isLoadingPay } = getPaymentProgress(
    projId!
  );
  const { data: projProg, isLoading: isLoadingproj } = getProjectProgress(
    projId!
  );

  // Handling loading and error states
  if (isLoadingId || isLoadingCPI || isLoadingproj || isLoadingPay) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-600">Loading...</Text>
      </SafeAreaView>
    );
  }

  // if (isError || !clientProjects?.length) {
  //   return (
  //     <SafeAreaView className="flex-1 justify-center items-center">
  //       <Text className="text-lg text-red-600">Failed to fetch data.</Text>
  //     </SafeAreaView>
  //   );
  // }

  // Extract data for the first project (you can modify to handle multiple projects)
  // const project = clientProjects[0];

  const user = users.find(
    (user: { email: string | null }) => user.email === email
  );
  const userProjects = getProjectsByUserId(user?.id || "");

  // const {
  //   clientFName,
  //   clientLName,
  //   clientEmail,
  //   clientContactNum,
  //   clientAddress,
  //   projDescript,
  //   systemType,
  //   kWCapacity,
  //   paymentProgress,
  //   projectProgress,
  //   installers,
  // } = project;

  // Styles for Light and Dark Modes
  const styles = {
    background: scheme === "dark" ? "bg-[#161622]" : "bg-[#F9F9F9]",
    textPrimary: scheme === "dark" ? "text-white" : "text-gray-800",
    textSecondary: scheme === "dark" ? "text-gray-400" : "text-gray-600",
    cardBackground: scheme === "dark" ? "bg-[#232533]" : "bg-white",
    installerbg: scheme === "dark" ? "bg-[#213555]" : "bg-[#E5D9F2]",
  };

  return (
    <SafeAreaView className={`flex-1 ${styles.background}`}>
      <ScrollView className="p-5">
        <View
          className={`${styles.cardBackground} p-5 rounded-xl shadow-lg mb-5`}
        >
          {/* Profile and Project Details */}
          <Text className="text-2xl font-semibold text-gray-800">
            {`${infos?.clientFName} ${infos?.clientLName}`}
          </Text>
          <InfoRow
            label="Email"
            value={infos?.clientEmail!}
            textColor={styles.textSecondary}
          />
          <InfoRow
            label="Contact Number"
            value={infos?.clientContactNum!}
            textColor={styles.textSecondary}
          />

          {/* Project Details */}
          <View className="mt-5">
            <Text
              className={`text-lg font-semibold mb-2 ${styles.textPrimary}`}
            >
              {infos?.projDescript}
            </Text>
            <InfoRow
              label="Address"
              value={infos?.clientAddress!}
              textColor={styles.textSecondary}
            />
            <InfoRow
              label="System Type"
              value={infos?.systemType!}
              textColor={styles.textSecondary}
            />
            <InfoRow
              label="kW Capacity"
              value={`${infos?.kWCapacity} kW`}
              textColor={styles.textSecondary}
            />
          </View>

          {/* Progress Indicators */}
          <View className="flex-row justify-between px-5 mt-5">
            {/* Payment Progress */}
            {payProg !== undefined && (
              <View className="items-center">
                <CircularProgress
                  value={payProg}
                  radius={40}
                  activeStrokeColor="#4caf50"
                  inActiveStrokeColor="#e0e0e0"
                  valueSuffix="%"
                  title="Payment"
                  titleColor={scheme === "dark" ? "#FFF" : "#333"}
                  titleStyle={{ fontSize: 12, fontWeight: "600" }}
                  activeStrokeWidth={6}
                  inActiveStrokeWidth={6}
                />
                <Text className={`text-sm mt-2 ${styles.textSecondary}`}>
                  Payment Progress
                </Text>
              </View>
            )}

            {/* Project Progress */}
            <View className="items-center">
              <CircularProgress
                value={projProg?.progress!}
                radius={40}
                activeStrokeColor="#ff9800"
                inActiveStrokeColor="#e0e0e0"
                valueSuffix="%"
                title="Project"
                titleColor={scheme === "dark" ? "#FFF" : "#333"}
                titleStyle={{ fontSize: 12, fontWeight: "600" }}
                activeStrokeWidth={6}
                inActiveStrokeWidth={6}
              />
              <Text className={`text-sm mt-2 ${styles.textSecondary}`}>
                Project Progress
              </Text>
            </View>
          </View>

          {/* Installer Information */}
          <View className={`mt-7 rounded-xl p-5 ${styles.installerbg}`}>
            <Text
              className={`text-xl font-semibold mb-3 ${styles.textPrimary}`}
            >
              {" "}
              Personnel
            </Text>
            {infos?.installers?.map((info, index) => (
              <InstallerCard
                key={index}
                name={info.name}
                position={info.position}
                textColor={styles.textSecondary}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
