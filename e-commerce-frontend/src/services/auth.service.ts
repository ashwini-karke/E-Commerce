// src/services/auth.service.ts
import axios from "../interceptors/auth.interceptor";  // Import the Axios instance

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post("/api/users/login", { email, password });
    const { token, user } = response.data;

    // Store the token and user info in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;  // Optionally handle the error (e.g., show a notification)
  }
};

export const registerUser = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post("/api/users/register", { name, email, password });
      return response.data; // Returns the response (e.g., success message or user object)
    } catch (error) {
      console.error("Error registering:", error);
      throw error;  // Optionally handle the error (e.g., show a notification)
    }
  };