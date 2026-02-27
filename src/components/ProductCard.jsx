import Link from "next/link";
import Image from "next/image";
import { Laptop, Smartphone, Tablet, Headphones, Gamepad2, ArrowUpRight } from "lucide-react";

const getCategoryDetails = (category) => {
    switch (category) {
        case "laptop":
            return {
                icon: <Laptop size={14} strokeWidth={2.5} />,
                badge: "text-blue-700 dark:text-blue-400 bg-blue-100/80 dark:bg-blue-500/10 ring-blue-200/50 dark:ring-blue-500/20",
                glow: "group-hover:shadow-[0_8px_40px_-12px_rgba(59,130,246,0.3)] dark:group-hover:shadow-[0_8px_40px_-12px_rgba(96,165,250,0.15)]",
                border: "group-hover:border-blue-200/50 dark:group-hover:border-blue-500/30"
            };
        case "phone":
            return {
                icon: <Smartphone size={14} strokeWidth={2.5} />,
                badge: "text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-500/10 ring-emerald-200/50 dark:ring-emerald-500/20",
                glow: "group-hover:shadow-[0_8px_40px_-12px_rgba(16,185,129,0.3)] dark:group-hover:shadow-[0_8px_40px_-12px_rgba(52,211,153,0.15)]",
                border: "group-hover:border-emerald-200/50 dark:group-hover:border-emerald-500/30"
            };
        case "tablet":
            return {
                icon: <Tablet size={14} strokeWidth={2.5} />,
                badge: "text-purple-700 dark:text-purple-400 bg-purple-100/80 dark:bg-purple-500/10 ring-purple-200/50 dark:ring-purple-500/20",
                glow: "group-hover:shadow-[0_8px_40px_-12px_rgba(168,85,247,0.3)] dark:group-hover:shadow-[0_8px_40px_-12px_rgba(192,132,252,0.15)]",
                border: "group-hover:border-purple-200/50 dark:group-hover:border-purple-500/30"
            };
        case "audio":
            return {
                icon: <Headphones size={14} strokeWidth={2.5} />,
                badge: "text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-500/10 ring-amber-200/50 dark:ring-amber-500/20",
                glow: "group-hover:shadow-[0_8px_40px_-12px_rgba(245,158,11,0.3)] dark:group-hover:shadow-[0_8px_40px_-12px_rgba(251,191,36,0.15)]",
                border: "group-hover:border-amber-200/50 dark:group-hover:border-amber-500/30"
            };
        case "gaming":
            return {
                icon: <Gamepad2 size={14} strokeWidth={2.5} />,
                badge: "text-rose-700 dark:text-rose-400 bg-rose-100/80 dark:bg-rose-500/10 ring-rose-200/50 dark:ring-rose-500/20",
                glow: "group-hover:shadow-[0_8px_40px_-12px_rgba(244,63,94,0.3)] dark:group-hover:shadow-[0_8px_40px_-12px_rgba(251,113,133,0.15)]",
                border: "group-hover:border-rose-200/50 dark:group-hover:border-rose-500/30"
            };
        default:
            return {
                icon: null,
                badge: "text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-700/50 ring-slate-200/50 dark:ring-slate-600/50",
                glow: "group-hover:shadow-[0_8px_40px_-12px_rgba(148,163,184,0.3)] dark:group-hover:shadow-[0_8px_40px_-12px_rgba(148,163,184,0.1)]",
                border: "group-hover:border-slate-200/50 dark:group-hover:border-slate-600/50"
            };
    }
};

export default function ProductCard({ product }) {
    const { icon, badge, glow, border } = getCategoryDetails(product.category);

    return (
        <Link
            href={`/products/${product.id}`}
            className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-[1.5rem]"
        >
            <div className={`flex flex-col h-full bg-white/80 dark:bg-[#131B2B]/80 backdrop-blur-sm rounded-[1.5rem] p-5 sm:p-6 transition-all duration-500 ease-out hover:-translate-y-1.5 border border-slate-200/60 dark:border-slate-800/60 ${glow} ${border} relative overflow-hidden`}>

                {/* Subtle noise/texture overlay for premium feel */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] dark:opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

                {/* Top Header Row */}
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest ring-1 ring-inset ${badge}`}>
                        {icon}
                        {product.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 dark:group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300 transform group-hover:rotate-12">
                        <ArrowUpRight size={16} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Product Image */}
                {product.image && (
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-slate-100 dark:bg-slate-800/50">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </div>
                )}

                {/* Product Details */}
                <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-2 tracking-tight group-hover:text-slate-700 dark:group-hover:text-white transition-colors duration-200 line-clamp-1">
                        {product.name}
                    </h3>

                    <p className="text-[14px] sm:text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium line-clamp-2 flex-1">
                        {product.description}
                    </p>

                    {/* Footer: Price & Tags */}
                    <div className="mt-auto pt-4 border-t border-slate-100/80 dark:border-slate-800/80 flex items-end justify-between gap-2">
                        <div>
                            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">Price</p>
                            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tighter">
                                <span className="text-slate-400 dark:text-slate-500 font-medium text-lg mr-0.5">$</span>{product.price}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-end gap-1.5 opacity-90 max-w-[50%]">
                            {product.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="text-[11px] font-semibold text-slate-500 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md rounded-md px-2 py-1 border border-slate-200/50 dark:border-slate-700/50">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    );
}
