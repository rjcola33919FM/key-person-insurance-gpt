import OpenAI from "openai";
import {
  AGENT_MANIFEST,
  buildEducationLensPrompt,
  buildRiskLensPrompt,
  buildConversionLensPrompt,
  buildFusionPrompt,
} from "@/app/lib/agent";

const MAX_MESSAGE_LENGTH = 3000;

type HistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json({ ok: false, error: "OPENAI_API_KEY is missing" }, { status: 500 });
    }

    const body = await req.json();
    const message: string = body?.message;
    const history: HistoryMessage[] = body?.history ?? [];

    if (!message || typeof message !== "string") {
      return Response.json({ ok: false, error: "A valid message is required" }, { status: 400 });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return Response.json({ ok: false, error: "Message too long" }, { status: 400 });
    }

    const client = new OpenAI({ apiKey });

    // Build conversation history for each lens
    const buildInput = (systemPrompt: string) => {
      const input: OpenAI.Responses.ResponseInputItem[] = [];
      for (const msg of history.slice(-8)) {
        input.push({ role: msg.role as "user" | "assistant", content: msg.content });
      }
      input.push({ role: "user", content: message });
      return { systemPrompt, input };
    };

    // ── Prompt Tournament: run 3 lenses in parallel ──────────────────────────
    const [educationResult, riskResult, conversionResult] = await Promise.all([
      client.responses.create({
        model: AGENT_MANIFEST.model,
        temperature: AGENT_MANIFEST.temperature,
        instructions: buildEducationLensPrompt(),
        input: buildInput(buildEducationLensPrompt()).input,
      }),
      client.responses.create({
        model: AGENT_MANIFEST.model,
        temperature: AGENT_MANIFEST.temperature,
        instructions: buildRiskLensPrompt(),
        input: buildInput(buildRiskLensPrompt()).input,
      }),
      client.responses.create({
        model: AGENT_MANIFEST.model,
        temperature: AGENT_MANIFEST.temperature,
        instructions: buildConversionLensPrompt(),
        input: buildInput(buildConversionLensPrompt()).input,
      }),
    ]);

    const educationDraft = educationResult.output_text ?? "";
    const riskDraft = riskResult.output_text ?? "";
    const conversionDraft = conversionResult.output_text ?? "";

    // ── Fusion: synthesize the 3 drafts into one final response ─────────────
    const fusionResult = await client.responses.create({
      model: AGENT_MANIFEST.model,
      temperature: 0.3, // tighter for synthesis accuracy
      input: [
        {
          role: "user",
          content: buildFusionPrompt(message, educationDraft, riskDraft, conversionDraft),
        },
      ],
    });

    const reply = fusionResult.output_text ?? "I wasn't able to generate a response. Please try again.";

    return Response.json({ ok: true, reply });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
