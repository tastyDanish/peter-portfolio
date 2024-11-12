import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export interface SectionRecord {
  header: string;
  content: string[];
  collection: SectionRecord[];
}

export interface ResumeRecord {
  sections: SectionRecord[];
}

const getNetlifyFunctionUrl = (functionName: string): string => {
  const domain = import.meta.env.VITE_DOMAIN || "http://localhost:8888";

  return `${domain}/.netlify/functions/${functionName}`;
};

export const chat = async (messages: ChatCompletionMessageParam[]) => {
  try {
    const url = getNetlifyFunctionUrl("chat");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const content = await response.text();

    return { content };
  } catch (error) {
    console.log("here is the error: ", error);
    throw error;
  }
};

export const getResume = async () => {
  try {
    // const response = await api.get("/resume");
    // return response.data as resumeRecord;

    const testResponse: ResumeRecord = {
      sections: [],
    };
    return testResponse;
  } catch (error) {
    // Handle error
    throw error;
  }
};
