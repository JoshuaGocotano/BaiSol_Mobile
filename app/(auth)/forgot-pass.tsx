import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";
import { useAuth } from "../auth-context";
import { useForgotPasswordMutation } from "@/api/AuthAPI";

const ForgotPass = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const forgotPass = useForgotPasswordMutation();
  const { setEmail } = useAuth();

  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
  };

  const submit = () => {
    if (!validateEmail(form.email)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");

      setEmail(form.email);
      forgotPass.mutateAsync(form.email, {
        onSuccess: (data) => {
          Toast.show({
            text1: "Check your email",
            text2: data,
            type: "success",
            position: "top",
          });
          router.push({
            pathname: "/log-in",
          });
        },
        onError: () => {
          Toast.show({
            text1: "Invalid email!",
            text2: "Couldn't send link to email, please try again.",
            type: "error",
            position: "top",
          });
        },
      });
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[90vh] px-4 my-6">
          <Image
            source={images.logoSmall}
            resizeMode="contain"
            className="w-[80px] h-[80px]"
          />
          <Text className="text-2xl text-black text-semibold mt-6 font-psemibold">
            Forgot<Text className="text-secondary-200"> Password</Text>
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            isError={!!emailError}
            errorMessage={emailError}
          />

          <CustomButton
            title="Confirm"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={forgotPass.isPending}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPass;
