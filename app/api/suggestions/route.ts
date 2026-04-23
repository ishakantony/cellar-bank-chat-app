import { generateSuggestions } from "@/lib/ai/ai-client";
import { TOOL_SUGGESTIONS, UNIVERSAL_SUGGESTIONS } from "@/lib/ai/suggestion-pool";
import { z } from "zod";

const requestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().nullable().optional().transform((v) => v ?? ""),
      toolInvocations: z
        .array(
          z.object({
            toolName: z.string(),
            state: z.enum(["call", "result"]),
          })
        )
        .optional(),
    })
  ),
});

function extractToolNames(
  messages: Array<{
    role: string;
    content: string;
    toolInvocations?: Array<{ toolName: string; state: "call" | "result" }>;
  }>
): string[] {
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  if (!lastAssistant || !lastAssistant.toolInvocations) return [];

  const names = lastAssistant.toolInvocations
    .filter((inv) => inv.state === "result")
    .map((inv) => inv.toolName);

  return [...new Set(names)];
}

function buildCandidatePool(toolNames: string[]): string[] {
  const pool = new Set<string>();

  for (const name of toolNames) {
    const suggestions = TOOL_SUGGESTIONS[name];
    if (suggestions) {
      for (const s of suggestions) {
        pool.add(s);
      }
    }
  }

  for (const s of UNIVERSAL_SUGGESTIONS) {
    pool.add(s);
  }

  return [...pool];
}

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
    const toolNames = extractToolNames(parsed.data.messages);
    const candidatePool = buildCandidatePool(toolNames);

    // Strip toolInvocations before passing to generateSuggestions — the ai SDK
    // validates them strictly (e.g. requires `result` when state is "result"),
    // but the suggestion picker only needs the text conversation.
    const cleanMessages = parsed.data.messages.map(({ role, content }) => ({
      role,
      content,
    }));

    const suggestions = generateSuggestions(cleanMessages, candidatePool);
    return Response.json({ suggestions });
  } catch {
    return Response.json({ suggestions: [] }, { status: 500 });
  }
}
