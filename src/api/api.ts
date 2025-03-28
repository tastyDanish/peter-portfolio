import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { initialSystemMessage, parseResume, resume, system } from "./strings";

export interface SectionRecord {
  header: string;
  content: string[];
}

export interface ResumeRecord {
  sections: SectionRecord[];
}

const getNetlifyFunctionUrl = (functionName: string): string => {
  const domain = import.meta.env.VITE_DOMAIN || "http://localhost:8888";

  return `${domain}/.netlify/functions/${functionName}`;
};

export const chat = async (userMessages: ChatCompletionMessageParam[]) => {
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: initialSystemMessage },
    ...userMessages,
    { role: "system", content: system + parseResume() },
  ];

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
  return resume;
};
