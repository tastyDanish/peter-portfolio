import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

// const openai = new OpenAI();

export interface sectionRecord {
  header: string;
  content: string[];
  collection: sectionRecord[];
}

export interface resumeRecord {
  sections: sectionRecord[];
}

export const chat = async (messages: ChatCompletionMessageParam[]) => {
  try {
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4o",
    //   messages,
    // });
    // return response.choices[0].message;
    return {}
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const getResume = async () => {
  try {
    // const response = await api.get("/resume");
    // return response.data as resumeRecord;
    return {};
  } catch (error) {
    // Handle error
    throw error;
  }
};
