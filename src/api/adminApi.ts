import apiClient from "../utils/apiClient"; // Ensure this points to your API setup

// Fetch all users
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get("http://localhost:5000/api/admin/users");
    // eslint-disable-next-line no-console
    console.log(response)
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching users", error);
    throw new Error("Failed to fetch users. Please try again.");
  }
};
