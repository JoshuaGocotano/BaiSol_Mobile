import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { api } from "./AuthAPI";
import moment from "moment";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { clearUser } from "@/redux/authSlice";
import { useAuth } from "@/app/auth-context";

// Validate user Token
export async function validateToken() {
  const dispatch = useDispatch();

  const { setEmail } = useAuth();

  // Get the access token from cookies and refresh token from localStorage
  const accessToken = await AsyncStorage.getItem("accessToken");
  const refreshToken = await AsyncStorage.getItem("refreshToken");

  // If either token is missing, return false indicating invalid tokens
  if (!refreshToken) {
    return false;
  }
  if (!accessToken) {
    return false;
  }

  let accessTokenExpireTime;

  try {
    // Extracting the token's expiry time using jwt_decode
    accessTokenExpireTime = jwt_decode(accessToken).exp;
  } catch (error) {
    // If there's an error decoding the token, return false
    console.error("Error decoding access token:", error);
    return false;
  }

  // Check if the access token is about to expire or has expired
  if (
    accessTokenExpireTime === undefined ||
    moment.unix(accessTokenExpireTime).diff(moment(), "minute") < 2
  ) {
    // If the access token is expired or about to expire, refresh it
    let refreshTokenExpireTime;

    try {
      // Extracting the refresh token's expiry time using jwt_decode
      refreshTokenExpireTime = jwt_decode(refreshToken).exp;
    } catch (error) {
      // If there's an error decoding the refresh token, return false
      console.error("Error decoding refresh token:", error);
      return false;
    }

    // Check if the refresh token is still valid
    if (
      refreshTokenExpireTime === undefined ||
      moment.unix(refreshTokenExpireTime).diff(moment(), "minute") > 1
    ) {
      try {
        // Make an API call to refresh the access token
        const response = await api.post("auth/Auth/Refresh-Token", {
          accessToken: accessToken,
          refreshToken: refreshToken,
        });

        // Extract the new access token from the response
        const newAccessToken = response.data.accessToken;

        // Set the new access token in cookies
        await AsyncStorage.setItem("accessToken", newAccessToken);
        return true;
      } catch (error) {
        // If there's an error during the token refresh, handle it and return false
        console.error("Error refreshing token", error);
        await AsyncStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(clearUser());
        setEmail(null);
        router.push("/log-in");
        return false;
      }
    } else {
      // If the refresh token is expired, remove tokens and log out
      await AsyncStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.log("logged out");
      console.log("Token expired");
      Toast.show({
        type: "error",
        text1: "Token expired!",
        text2: "Logged out!",
      });
      dispatch(clearUser());

      setEmail(null);
      router.push("/log-in");

      return false;
    }
  } // If the access token is still valid, return true

  return true;
}
