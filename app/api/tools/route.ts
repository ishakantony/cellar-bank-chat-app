import { NextResponse } from "next/server";
import { executeTool } from "@/lib/ai/tool-executor";

export async function POST(request: Request) {
  try {
    const { toolName, input } = await request.json();

    const result = executeTool(toolName, input);

    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || "The requested banking action could not be completed.",
      },
      { status: error.message?.includes("Unsupported tool") ? 400 : 500 },
    );
  }
}
