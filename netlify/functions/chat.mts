import type { Config, Context } from "@netlify/functions";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

export default async (req: Request, context: Context) => {
  const requestKey = req.headers.get("X-API-Key");
  const apiKey = Netlify.env.get("MY_API_KEY");

  if (requestKey != apiKey)
    return new Response("Sorry, no access for you.", { status: 401 });

  const openAiApiKey = Netlify.env.get("OPENAI_API_KEY");
  const client = new OpenAI({
    apiKey: openAiApiKey,
  });

  const body = await req.json();

  const messages: ChatCompletionMessageParam[] =
    body as ChatCompletionMessageParam[];

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages,
  });
  return response.choices[0].message;
};

export const config: Config = {
  path: "/chat",
};
