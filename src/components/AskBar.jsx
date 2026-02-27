"use client";
import { useState } from "react";
import { Search, Sparkles, ArrowRight } from "lucide-react";

export default function AskBar({ onSearch, isLoading }) {
    const [inputValue, setInputValue] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;
        onSearch(inputValue.trim());
    }

    return (
        <div className="w-full max-w-2xl mx-auto relative group">
            {/* Subtle glowing backdrop for premium feel */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

            <form
                onSubmit={handleSubmit}
                className="relative flex items-center bg-white/90 backdrop-blur-md rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200/60 p-2 overflow-hidden transition-all duration-300 focus-within:shadow-[0_8px_30px_rgb(99,102,241,0.12)] focus-within:border-indigo-300"
            >
                <div className="pl-4 pr-3 text-slate-400">
                    <Search size={22} strokeWidth={2} />
                </div>

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isLoading}
                    placeholder="What are you looking for today?"
                    className="flex-1 text-slate-800 text-[17px] placeholder-slate-400 bg-transparent outline-none py-3 disabled:opacity-50"
                    aria-label="AI search query"
                />

                <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-medium text-[15px] px-6 py-3 rounded-full transition-colors duration-300 ml-2"
                >
                    {isLoading ? (
                        <>
                            <Sparkles className="animate-pulse" size={18} />
                            <span>Thinking</span>
                        </>
                    ) : (
                        <>
                            <span>Discover</span>
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
