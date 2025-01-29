import apiClient from "../utils/apiClient";

// Login
export const loginUser = async (staffId: string, password: string) => {
  const response = await apiClient.post("http://localhost:5000/api/auth/login", { staffId, password });
  return response.data;
};

// Register
export const registerUser = async (data: string) => {
  const response = await apiClient.post("http://localhost:5000/api/auth/register", data);
  return response.data;
};

// Reset Password
export const resetPassword = async (staffNumber: string, newPassword: string) => {
  const response = await apiClient.put(`/auth/reset-password`, { staffNumber, newPassword });
  return response.data;
};

// Change Password
export const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
        const response = await apiClient.put("http://localhost:5000/api/auth/change-password", { oldPassword, newPassword });
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error changing password:", error);
        throw new Error("Failed to change password. Please try again.");
    }
};
