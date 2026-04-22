import { streamAIResponse } from "@/lib/ai/ai-client";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const result = await streamAIResponse({ messages });

    return result.toDataStreamResponse();
  } catch {
    return new Response(
      JSON.stringify({
        error: "I couldn't complete that safely right now. Please try again.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
