import { NextResponse } from "next/server";

const MODELS = ["gemini-3-flash", "gemini-3-pro-preview", "gemini-2.5-flash"];
const TIMEOUT = 8000;

export async function POST(req: Request) {
  try {
    const { problemTitle, userCode, error } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ hint: "AI service unavailable" }, { status: 500 });
    }

    const trimmedCode = (userCode || "").slice(0, 3000);

    // 🔴 MUCH stricter prompt
    const prompt = `
Problem: ${problemTitle}

User Code:
${trimmedCode}

Error:
${error}

Return ONE complete hint sentence ending with a period.
`;

    for (const model of MODELS) {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), TIMEOUT);

      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
              systemInstruction: {
                parts: [
                  {
                    text:
                      "You are a strict DSA tutor. Reply with exactly one short, complete hint sentence. No fragments. No explanation."
                  }
                ],
              },
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 180,
              },
            }),
          }
        );

        clearTimeout(id);

        const data = await res.json();
        let hint = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        // 🔴 Extra guard: ensure it ends with a period
        if (res.ok && hint) {
          if (!hint.endsWith(".")) hint += ".";
          return NextResponse.json({ hint });
        }
      } catch {
        // try next model
      }
    }

    return NextResponse.json({
      hint: "Check your edge cases and ensure the function returns the expected value."
    });

  } catch {
    return NextResponse.json({
      hint: "Review your logic and boundary conditions."
    });
  }
}



