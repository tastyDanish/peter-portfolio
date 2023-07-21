import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const chat = async (text: string) => {
  try {
    const response = await api.post("/chat", { message: text });
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};
