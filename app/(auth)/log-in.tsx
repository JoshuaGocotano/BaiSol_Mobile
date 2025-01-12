import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { useAuth } from "../auth-context";
import { useLoginMutation } from "@/api/AuthAPI";
import Toast from "react-native-toast-message";

const LogIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { setEmail } = useAuth();

  const loginUser = useLoginMutation();

  const validateEmail = (email: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
  };

  const submit = () => {
    let hasError = false;

    if (!validateEmail(form.email)) {
      setEmailError("Please enter a valid email.");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!form.password) {
      setPasswordError("Password cannot be empty.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    loginUser.mutateAsync(
      { email: form.email, password: form.password },
      {
        onSuccess: (data) => {
          // router.push({ pathname: "/verify2fa" });
          setEmail(form.email);
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
          <Text className="text-2xl text-black font-semibold mt-6">
            Login to <Text className="text-secondary-200">BaiSol</Text>
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

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
            isError={!!passwordError}
            errorMessage={passwordError}
          />

          <CustomButton
            title="Login"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={loginUser.isPending}
          />

          <View className="justify-center pt-5 flex-row gap-1">
            <TouchableOpacity onPress={() => router.push("/forgot-pass")}>
              <Text className="text-sm font-semibold text-secondary-300">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogIn;
