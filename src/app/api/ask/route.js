// POST /api/ask
// Receives a natural language query, sends it to Gemini with the product catalog,
// returns matched product IDs, a friendly summary, and full product objects.
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { products } from "@/data/products";

// Initialize Gemini client using the server-side env variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
    try {
        const body = await request.json();
        const { query } = body;

        // Validate that a non-empty query was provided
        if (!query || query.trim() === "") {
            return NextResponse.json(
                { error: "Query is required" },
                { status: 400 }
            );
        }

        // Build a compact catalog summary to inject into the prompt
        const catalogText = products
            .map(
                (p) =>
                    `${p.id} | ${p.name} | ${p.category} | $${p.price} | tags: ${p.tags.join(", ")}`
            )
            .join("\n");

        // Prompt template — instructs Gemini to return structured JSON only
        const prompt = `You are a product discovery assistant for an online store.
A user has typed a natural language search query. Your job is to find the most relevant products.

User query: "${query}"

Product catalog:
${catalogText}

Instructions:
- Identify which products best match the user's query based on name, category, price, and tags
- Return ONLY a valid JSON object, no explanation, no markdown, no code blocks
- The JSON must have exactly these two fields:
  1. "productIds": an array of matching product id strings (e.g. ["p1", "p3"])
  2. "summary": a 1-2 sentence friendly explanation of what you found and why it matches

If no products match, return: { "productIds": [], "summary": "No products matched your search." }`;

        // Call Gemini using gemini-2.5-flash model
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const rawText = result.response.text();

        // Strip any accidental markdown code fences (```json ... ```)
        const cleanedText = rawText
            .replace(/^```(?:json)?\s*/i, "")
            .replace(/\s*```\s*$/i, "")
            .trim();

        // Parse the JSON and map product IDs to full product objects
        const parsed = JSON.parse(cleanedText);
        const matchedProducts = (parsed.productIds || [])
            .map((id) => products.find((p) => p.id === id))
            .filter(Boolean); // Remove any unrecognized IDs

        return NextResponse.json({
            productIds: parsed.productIds,
            summary: parsed.summary,
            products: matchedProducts,
        });
    } catch (error) {
        // Log the real error server-side for debugging
        console.error("[/api/ask] Error:", error);
        return NextResponse.json(
            { error: "AI service is currently unavailable. Please try again." },
            { status: 502 }
        )
    }
}
