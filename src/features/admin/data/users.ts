/* eslint-disable no-console */
import { getAllUsers } from "../../../api/adminApi";
import { userListSchema, User } from "./schema";

export let users: User[] = [];

export const fetchUsers = async () => {
  try {
    const fetchedUsers = await getAllUsers();

// Ensure API returns an array, otherwise handle the error
if (!Array.isArray(fetchedUsers)) {
  console.error("API response is not an array:", fetchedUsers);
  users = [];
  return;
}
const filteredUsers = fetchedUsers.filter(
  (user) => user.firstName && user.lastName && typeof user.staffId === "number"
);

if (filteredUsers.length !== fetchedUsers.length) {
  console.warn("Some users were missing required fields and were filtered out.");
}

users = userListSchema.parse(filteredUsers);


    // Log the fetched data to debug and inspect its structure
    // eslint-disable-next-line no-console
    console.log("Fetched users:", fetchedUsers);

    // Parse and validate the fetched data using Zod schema
    users = userListSchema.parse(fetchedUsers); // Validate and assign users
  } catch (error) {
    // Catch any errors during fetch or parsing
    // eslint-disable-next-line no-console
    console.error("Failed to fetch users:", error);

    // Handle missing or invalid data gracefully
    if (error instanceof Error) {
      // If it's a Zod error, handle it as such
      if (error.name === "ZodError") {
        // eslint-disable-next-line no-console
        console.error("Validation error:", error);
      }
    }

    // Set users to an empty array if an error occurs
    users = [];
  }
};

// Fetch users when the module is imported
fetchUsers();
