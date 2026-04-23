import { generateSuggestions } from "@/lib/ai/ai-client";
import { z } from "zod";

const requestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system", "tool"]),
      content: z.string(),
    })
  ),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ suggestions: [] }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ suggestions: [] }, { status: 400 });
  }

  try {
    const suggestions = await generateSuggestions(parsed.data.messages);
    return Response.json({ suggestions });
  } catch {
    return Response.json({ suggestions: [] }, { status: 500 });
  }
}
