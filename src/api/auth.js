const BASE_URL = "https://mapman-production.up.railway.app/shop/auth";

export const sendEmailOtp = async (phoneNumber) => {
  try {
    const response = await fetch(`${BASE_URL}/sendOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send OTP");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const verifyEmailOtp = async (phoneNumber, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/verifyOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, otp }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to verify OTP");
    }

    return await response.json();
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export const sendEmailRecoveryOtp = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/sendEmailOtp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send email OTP");
    }
    return await response.json();
  } catch (error) {
    console.error("Error sending email OTP:", error);
    throw error;
  }
};

export const verifyEmailRecoveryOtp = async (email, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/verifyEmailOtp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to verify email OTP");
    }
    return await response.json();
  } catch (error) {
    console.error("Error verifying email OTP:", error);
    throw error;
  }
};

export const updatePhoneSendOtp = async (email, phone) => {
  try {
    const response = await fetch(`${BASE_URL}/updateSendOtp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send update OTP");
    }
    return await response.json();
  } catch (error) {
    console.error("Error sending update OTP:", error);
    throw error;
  }
};

export const updatePhoneVerifyOtp = async (email, phone, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/updateVerifyOtp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, otp }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to verify update OTP");
    }
    return await response.json();
  } catch (error) {
    console.error("Error verifying update OTP:", error);
    throw error;
  }
};
