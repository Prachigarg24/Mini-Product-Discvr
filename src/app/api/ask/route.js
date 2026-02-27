// POST /api/ask
import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (!query || query.trim() === "") {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    // 🔹 Build smaller catalog text (keep short for free tier)
    const catalogText = products
      .map(
        (p) =>
          `${p.id} | ${p.name} | ${p.category} | ${p.tags.join(", ")}`
      )
      .join("\n");

    const prompt = `
User search: "${query}"

Products:
${catalogText}

Return ONLY valid JSON:
{
  "productIds": [],
  "summary": ""
}
`;

    // 🔥 Direct Gemini REST API call (Free tier compatible)
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("Gemini API Error:", data);
      return NextResponse.json(
        { error: "Gemini API request failed" },
        { status: 500 }
      );
    }

    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (err) {
      console.error("Invalid JSON from Gemini:", rawText);
      return NextResponse.json(
        { error: "AI returned invalid format" },
        { status: 500 }
      );
    }

    const matchedProducts = (parsed.productIds || [])
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);

    return NextResponse.json({
      productIds: parsed.productIds || [],
      summary: parsed.summary || "",
      products: matchedProducts,
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json(
      { error: "AI service unavailable" },
      { status: 502 }
    );
  }
}