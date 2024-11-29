import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import Toast from "react-native-toast-message";
import { useAuth } from "../auth-context";

import { router } from "expo-router";
import { use2FAMutation } from "@/api/AuthAPI";

const VerifyAccount = () => {
  const { email } = useAuth();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<(TextInput | null)[]>([]); // Store references to the inputs

  const OTPConfirmation = use2FAMutation();

  const handleInputChange = (value: string, index: number) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus the next input
      if (index < otp.length - 1 && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      const newOtp = [...otp];

      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0 && !otp[index]) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    if (otp.join("").length !== 6 || otp.includes("")) {
      Toast.show({
        text1: "Warning",
        text2: "Please enter a valid 6-digit OTP.",
        type: "warning",
        position: "top",
      });
      return;
    }

    OTPConfirmation.mutateAsync(
      { code: otp.join("").toString(), email: email! },
      {
        onSuccess: () => {
          Toast.show({ type: "success", text1: "Logged in successfully!" });

        
        },
      }
    );
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logoSmall}
            resizeMode="contain"
            className="w-[80px] h-[80px]"
          />
          <Text className="text-2xl text-black text-semibold mt-6 font-psemibold">
            Two-Factor Authentication
          </Text>

          <Text className="text-sm text-black-100 mt-6 font-pregular">
            Enter the 6-digit verification code that was sent to {""}
            <Text className="text-secondary-300">{email}</Text>
          </Text>

          <View className="flex-row justify-center gap-2 mt-6">
            {otp.map((text, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-[50px] h-[65px] rounded-xl border-2 border-gray-300 text-center text-[18px] text-black focus:border-secondary"
                keyboardType="numeric"
                maxLength={1}
                value={text}
                onChangeText={(value) => handleInputChange(value, index)}
                onKeyPress={(e) => handleKeyDown(e, index)}
              />
            ))}
          </View>

          <CustomButton
            title="Submit"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={OTPConfirmation.isPending}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyAccount;
