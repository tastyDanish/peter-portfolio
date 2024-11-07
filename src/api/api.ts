import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

// const openai = new OpenAI();

export interface SectionRecord {
  header: string;
  content: string[];
  collection: SectionRecord[];
}

export interface ResumeRecord {
  sections: SectionRecord[];
}

export const chat = async (messages: ChatCompletionMessageParam[]) => {
  try {
    console.log("doing messages: ", messages);
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4o",
    //   messages,
    // });
    // return response.choices[0].message;
    return { content: "This confounding box doesn't work" };
  } catch (error) {
    // Handle error
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
