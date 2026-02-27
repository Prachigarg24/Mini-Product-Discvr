// GET /api/products
// Returns all products, optionally filtered by ?category=laptop etc.
import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // If a category query param is provided, filter; otherwise return all
    const result = category
        ? products.filter((p) => p.category === category)
        : products;

    return NextResponse.json({ products: result });
}
