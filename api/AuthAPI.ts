import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { clearUser, setUser } from "@/redux/authSlice";
import { router } from "expo-router";
import { useAuth } from "@/app/auth-context";

const apiURL = process.env.EXPO_PUBLIC_SERVER_API_URL;

export const api = axios.create({
  baseURL: apiURL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface ILoginResponse {
  message: string;
  flag: boolean;
  isDefaultAdmin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export const useLoginMutation = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      const response = await api.post<ILoginResponse>(
        "auth/Auth/Login",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure it matches the server requirements
          },
          params: { isMobile: true },
        }
      );

      return response.data;
    },
    onSuccess: async (res) => {

      
      const { accessToken, refreshToken } = res;
      if (accessToken && refreshToken) {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);

        // Decode the access token to extract user information
        const decodedToken: any = jwtDecode(accessToken);
        const user = {
          userId:
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ],
          email:
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],
          userName:
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ],
          userRole:
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
        };

        // Dispatch the user information to the Redux store
        dispatch(setUser(user));

        if (user.userRole == "Facilitator") {
          router.push({
            pathname: "/(facilitator)/facilitator-home",
          });
        }
        if (user.userRole == "Client") {
          router.push({
            pathname: "/(client)/client-home",
          });
        }
      }

      // Show success message
      Toast.show({ type: "success", text1: res.message });
    },
    onError: (err: any) => {
      Toast.show({ type: "error", text1: err.response.data });
    },
  });
};

export const use2FAMutation = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (data: { email: string; code: string }) => {
      const response = await api.post("auth/Auth/Login-2FA", data);
      return response.data;
    },
    onSuccess: async (res) => {
      const { accessToken, refreshToken } = res;
      if (accessToken && refreshToken) {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);

        // Decode the access token to extract user information
        const decodedToken: any = jwtDecode(accessToken);
        const user = {
          userId:
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ],
          email:
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],
          userName:
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ],
          userRole:
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
        };

        // Dispatch the user information to the Redux store
        dispatch(setUser(user));

        if (user.userRole == "Facilitator") {
          router.push({
            pathname: "/(facilitator)/facilitator-home",
          });
        }
        if (user.userRole == "Client") {
          router.push({
            pathname: "/(client)/client-home",
          });
        }
      }
    },
    onError: (err: any) => {
      Toast.show({ type: "error", text1: err?.response.data?.message });
    },
  });
};

export const useLogOut = () => {
  const dispatch = useDispatch();
  const { setEmail } = useAuth();
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await api.post(`auth/Auth/LogOut?email=${email}`, {
        headers: {
          "Content-Type": "application/json", // Ensure it matches the server requirements
        },
      });
      return response.data;
    },
    onSuccess: async (data) => {
      dispatch(clearUser());
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      setEmail(null);
      
      Toast.show({ type: "success", text1: data });
      router.push("/(auth)/log-in");
    },
    onError: (err: any) => {
      Toast.show({ type: "error", text1: err.data.message });

      console.log(err);
    },
  });
};

export const useResend2FA = () => {
  return useMutation({
    mutationFn: async (data: string) => {
      const response = await api.post("auth/Account/ResendOTP", data, {
        headers: {
          "Content-Type": "application/json", // Ensure it matches the server requirements
        },
      });
      return response.data;
    },
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: string) => {
      const response = await api.post("auth/Auth/ForgotPassword", data, {
        headers: {
          "Content-Type": "application/json", // Ensure it matches the server requirements
        },
      });
      return response.data;
    },
  });
};

export const fetchResetPasswordToken = () => {
  return useMutation<
    { message: string },
    unknown,
    { token: string; email: string }
  >({
    mutationFn: async ({ token, email }) => {
      const response = await api.get<{ message: string }>(
        "auth/Auth/Reset-Password",
        {
          params: { token, email },
        }
      );
      return response.data;
    },
  });
};

export const useNewPasswordMutation = () => {
  return useMutation({
    mutationFn: async (formData: {
      email: string;
      password: string;
      token: string;
    }) => {
      const response = await api.post("auth/Auth/New-Password", formData, {
        headers: {
          "Content-Type": "application/json", // Ensure it matches the server requirements
        },
      });
      return response.data;
    },
  });
};
