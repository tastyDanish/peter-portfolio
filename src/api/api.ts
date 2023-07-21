import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export interface chatRecord {
  role: string;
  message: string;
}

export const chat = async (messages: chatRecord[]) => {
  try {
    const response = await api.post("/chat", { messages });
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};
