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
