import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export interface chatRecord {
  role: string;
  message: string;
}

export interface sectionRecord {
  header: string;
  content: string[];
  collection: sectionRecord[];
}

export interface resumeRecord {
  sections: sectionRecord[];
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

export const getResume = async () => {
  try {
    const response = await api.get("/resume");
    return response.data as resumeRecord;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};
