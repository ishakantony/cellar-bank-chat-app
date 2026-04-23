import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const requestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.string(),
      content: z.string(),
    })
  ),
});

const SYSTEM_PROMPT = `You are a helpful banking assistant. Based on the conversation history, generate exactly 3 contextual follow-up questions that a user might want to ask next.

Return ONLY a JSON array of strings. Do not include markdown formatting, code blocks, or any other text.

Example: ["What is my balance?", "How do I transfer money?", "Show my recent transactions"]`;

function cleanJsonResponse(text: string): string {
  return text
    .replace(/```(?:json)?\n?/g, "")
    .replace(/```/g, "")
    .trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ suggestions: [] }, { status: 400 });
    }

    const { messages } = parsed.data;
    const modelName = process.env.SUGGESTION_MODEL ?? "gpt-4o-mini";

    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL,
      compatibility: "compatible",
    });

    const { text } = await generateText({
      model: openai(modelName),
      system: SYSTEM_PROMPT,
      messages,
    });

    const cleaned = cleanJsonResponse(text);

    let suggestions: string[] = [];
    try {
      const parsedJson = JSON.parse(cleaned);
      if (Array.isArray(parsedJson)) {
        suggestions = parsedJson
          .filter((item): item is string => typeof item === "string")
          .slice(0, 3);
      }
    } catch {
      // Invalid JSON from model — fall back to empty array
    }

    return Response.json({ suggestions });
  } catch {
    return Response.json({ suggestions: [] }, { status: 500 });
  }
}
