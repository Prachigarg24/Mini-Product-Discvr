"use client";
import { useState, useEffect } from "react";
import AskBar from "@/components/AskBar";
import ProductList from "@/components/ProductList";
import AISummary from "@/components/AISummary";
import { ThemeToggle } from "@/components/ThemeToggle";
import { X, AlertCircle } from "lucide-react";

export default function Home() {
    const [allProducts, setAllProducts] = useState([]);
    const [aiResults, setAiResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setAllProducts(data.products))
            .catch(() => setError("Failed to load products."));
    }, []);

    async function handleAsk(query) {
        setIsLoading(true);
        setError(null);
        setAiResults(null);

        try {
            const res = await fetch("/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });
            const data = await res.json();

            if (res.ok) {
                setAiResults(data);
            } else {
                setError(data.error || "Something went wrong.");
            }
        } catch {
            setError("Network error. Check your connection.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="min-h-screen pb-20 relative">
            <ThemeToggle />

            {/* Immersive minimalist header area */}
            <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
                {/* Subtle background glow behind the title */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 text-balance mx-auto">
                    Discover products, perfectly tailored to you.
                </h1>
                <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium mb-10 max-w-2xl mx-auto">
                    Just describe what you need in natural language. Powered by Gemini AI.
                </p>

                <AskBar onSearch={handleAsk} isLoading={isLoading} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Error State */}
                {error && (
                    <div className="mt-4 max-w-2xl mx-auto p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl flex items-center gap-3 text-red-700 dark:text-red-400 animate-in fade-in slide-in-from-top-4 duration-500">
                        <AlertCircle size={20} className="flex-shrink-0" />
                        <p className="text-[15px] font-medium">{error}</p>
                    </div>
                )}

                {/* AI Insight Panel */}
                {aiResults && (
                    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                        <AISummary summary={aiResults.summary} />
                    </div>
                )}

                {/* Dynamic Section Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-12 mb-8 gap-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {aiResults
                            ? `Curated Results (${aiResults.products.length})`
                            : "Featured Collection"}
                    </h2>

                    {aiResults && (
                        <button
                            onClick={() => {
                                setAiResults(null);
                                setError(null);
                            }}
                            className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                            <X size={16} strokeWidth={2.5} />
                            Clear Results
                        </button>
                    )}
                </div>

                {/* Render Grid */}
                <div className={isLoading ? "opacity-50 pointer-events-none transition-opacity duration-300" : "transition-opacity duration-500 animate-in fade-in"}>
                    <ProductList products={aiResults ? aiResults.products : allProducts} />
                </div>

            </div>
        </main>
    );
}
