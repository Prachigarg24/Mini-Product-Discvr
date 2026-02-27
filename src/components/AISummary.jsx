import { Sparkles } from "lucide-react";

export default function AISummary({ summary }) {
    if (!summary) return null;

    return (
        <div className="mt-10 mb-6 p-6 md:p-8 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 backdrop-blur-3xl border border-indigo-100/60 rounded-[2rem] shadow-[0_8px_30px_rgb(99,102,241,0.06)] relative overflow-hidden group">

            {/* Decorative gradient orb */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl group-hover:bg-purple-400/30 transition-colors duration-700"></div>

            <div className="flex flex-col md:flex-row gap-5 items-start relative z-10">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white shadow-sm border border-indigo-50 flex items-center justify-center text-indigo-600">
                    <Sparkles size={24} strokeWidth={1.5} />
                </div>

                <div className="flex-1">
                    <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-widest mb-2 opacity-80">
                        AI Assistant Insight
                    </h3>
                    <p className="text-slate-700 text-[17px] leading-relaxed font-medium text-balance">
                        {summary}
                    </p>
                </div>
            </div>
        </div>
    );
}
