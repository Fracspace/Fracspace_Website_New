import axios from "axios";

// OTP API Endpoints
export const SEND_OTP_URL = "https://apitest.fracspace.com/api/users/sendOTPForMobileVerification";
export const VERIFY_OTP_URL = "https://apitest.fracspace.com/api/users/verifyOTPForMobileVerification";

// API to send OTP
export const sendOtpApi = async (phone) => {
  try {
    const raw = String(phone || "").trim();
    const cleanDigits = raw.replace(/\D/g, "");
    // Ensure properly formatted phone with country code prefix
    const phoneNumber = raw.startsWith("+")
      ? raw
      : (cleanDigits.length === 10 ? `+91${cleanDigits}` : `+${cleanDigits}`);

    const payload = {
      phoneNumber: phoneNumber,
      smsCountry: true
    };
    console.log("Sending OTP with payload:", payload);
    const response = await axios.post(
      SEND_OTP_URL,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "Fracspace@2024"
        },
        timeout: 10000
      }
    );
    console.log("otp response is", response.data);
    if (response.data && response.data.success === false) {
      throw new Error(response.data.message || "Failed to send OTP. Please check the phone number.");
    }
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    console.error("Server error details:", error.response?.data);
    const errorMsg =
      error.response?.data?.message || error.message || "Failed to send OTP. Please try again.";
    throw new Error(errorMsg);
  }
};

// API to verify OTP
export const verifyOtpApi = async (phone, otpCode) => {
  try {
    const raw = String(phone || "").trim();
    const cleanDigits = raw.replace(/\D/g, "");
    const phoneNumber = raw.startsWith("+")
      ? raw
      : (cleanDigits.length === 10 ? `+91${cleanDigits}` : `+${cleanDigits}`);

    const payload = {
      phoneNumber: phoneNumber,
      otp: otpCode ? String(otpCode).trim() : "",
      smsCountry: true
    };
    console.log("Verifying OTP with payload:", payload);
    const response = await axios.post(
      VERIFY_OTP_URL,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "Fracspace@2024"
        },
        timeout: 10000
      }
    );
    console.log("otp verification resp is", response.data);
    if (response.data && response.data.success === false) {
      throw new Error(response.data.message || "Invalid OTP. Please try again.");
    }
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    console.error("Server error details:", error.response?.data);
    const errorMsg =
      error.response?.data?.message || error.message || "Invalid OTP. Please try again.";
    throw new Error(errorMsg);
  }
};
