import React from "react";
import {
  View,
  Text,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../auth-context";
import { users } from "@/constants/ClientProjectInfo";
import { IClientProjectInfo } from "../../constants/ClientProjectInfo";
import { getProjectsByUserId } from "../../constants/ClientProjectInfo";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { selectProjectId } from "@/redux/projectIdSlice";
import {
  getClientProjectInfo,
  getProjectProgress,
} from "@/api/facilitator/AssignedProject";
import { getPaymentProgress } from "@/api/client/PaymentAPI";

interface InfoRowProps {
  label: string;
  value: string | number | undefined;
  textColor: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, textColor }) => (
  <Text className={`text-sm ${textColor}`}>
    {label}:{" "}
    <Text className={`font-semibold ${textColor}`}>
      {value !== undefined ? value : "N/A"}
    </Text>
  </Text>
);

interface InstallerCardProps {
  name: string;
  position: string;
}

const InstallerCard: React.FC<InstallerCardProps> = ({ name, position }) => (
  <View className="bg-white p-3 rounded-lg mb-3 shadow-md">
    <Text className="text-lg font-semibold">{name}</Text>
    <Text className="text-sm">{position}</Text>
  </View>
);

const ClientHome: React.FC = () => {
  const { email } = useAuth();

  const projectId = useSelector(selectProjectId);

  const { data: infos, isLoading: isLoadingCPI } =
    getClientProjectInfo(projectId);

  const scheme = useColorScheme();
  const styles = {
    background: scheme === "dark" ? "bg-[#161622]" : "bg-[#F9F9F9]",
    textPrimary: scheme === "dark" ? "text-white" : "text-gray-800",
    textSecondary: scheme === "dark" ? "text-gray-400" : "text-gray-600",
    cardBackground: scheme === "dark" ? "bg-[#232533]" : "bg-white",
    installerbg: scheme === "dark" ? "bg-[#213555]" : "bg-[#E5D9F2]",
  };

  const user = users.find((user) => user.email === email);

  // Check if user exists
  if (projectId === "" || infos === null) {
    return (
      <SafeAreaView className={`p-5 ${styles.background}`}>
        <Text className={`text-2xl font-black ${styles.textPrimary}`}>
          No project yet
        </Text>
      </SafeAreaView>
    );
  }

  if (isLoadingCPI) {
    return <ActivityIndicator size="large" color="#FF9C01" />;
  }

  return (
    <SafeAreaView className={`p-5 ${styles.background}`}>
      <Text className={`text-2xl font-black ${styles.textPrimary}`}>
        Hello, {infos?.clientFName}!
      </Text>
      <ScrollView
        className={`p-5 rounded-xl shadow-lg mb-5 mt-3 ${styles.cardBackground}`}
      >
        <View>
          <Text className={`text-lg font-semibold mb-2 ${styles.textPrimary}`}>
            {infos?.projDescript || "Project Description Unavailable"}
          </Text>
          <InfoRow
            label="Address"
            value={infos?.clientAddress}
            textColor={styles.textSecondary}
          />
          <InfoRow
            label="System Type"
            value={infos?.systemType}
            textColor={styles.textSecondary}
          />
          <InfoRow
            label="kW Capacity"
            value={`${infos?.kWCapacity || 0} kW`}
            textColor={styles.textSecondary}
          />
        </View>

        <View className="flex-row justify-between px-5 mt-5">
          <TouchableOpacity
            className="items-center"
            // onPress={() => router.push({ pathname: "/(client)/bill-payment" })}
          >
            <CircularProgress
              value={infos?.paymentProgress ?? 0}
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
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            // onPress={() => router.push("/customer-tabs/reports")}
          >
            <CircularProgress
              value={infos?.projectProgress ?? 0}
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
          </TouchableOpacity>
        </View>

        {infos?.installers != null && infos?.installers?.length > 0 && (
          <View className={`mt-7 rounded-xl p-5 ${styles.installerbg}`}>
            <Text
              className={`text-xl font-semibold mb-3 ${styles.textPrimary}`}
            >
              Installer / Personnel
            </Text>
            {infos?.installers.map((info, index) => (
              <InstallerCard
                key={index}
                name={info.name}
                position={info.position}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClientHome;
