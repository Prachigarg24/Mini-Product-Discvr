// POST /api/ask
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { products } from "@/data/products";

export async function POST(request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || query.trim() === "") {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    // Check API Key properly
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing!");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    // Initialize Gemini INSIDE function (important for Vercel)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    //  Use stable & fast model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // Build catalog text
    const catalogText = products
      .map(
        (p) =>
          `${p.id} | ${p.name} | ${p.category} | $${p.price} | tags: ${p.tags.join(", ")}`
      )
      .join("\n");

    const prompt = `You are a product discovery assistant for an online store.
A user has typed a natural language search query. Your job is to find the most relevant products.

User query: "${query}"

Product catalog:
${catalogText}

Instructions:
- Identify which products best match the user's query
- Return ONLY a valid JSON object
- JSON format:
{
  "productIds": ["p1"],
  "summary": "Short explanation"
}

If no products match:
{
  "productIds": [],
  "summary": "No products matched your search."
}`;

    // Call Gemini
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    // Clean markdown if Gemini adds it
    const cleanedText = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```\s*$/i, "")
      .trim();

    // Safe JSON parse
    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (err) {
      console.error("Invalid JSON from Gemini:", cleanedText);
      return NextResponse.json(
        { error: "AI returned invalid format." },
        { status: 500 }
      );
    }

    // Map IDs to real products
    const matchedProducts = (parsed.productIds || [])
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);

    return NextResponse.json({
      productIds: parsed.productIds || [],
      summary: parsed.summary || "",
      products: matchedProducts,
    });

  } catch (error) {
    console.error("[/api/ask] Full Error:", error);

    return NextResponse.json(
      { error: "AI service is currently unavailable. Please try again." },
      { status: 502 }
    );
  }
}