import apiClient from "@/utils/apiClient";

// Fetch user profile
export const fetchUserProfile = async () => {
    // const endpoint = userId ? `/profile/${userId}` : "/profile";
    const response = await apiClient.get("http://localhost:5000/api/user/profile");
    return response.data;
  };