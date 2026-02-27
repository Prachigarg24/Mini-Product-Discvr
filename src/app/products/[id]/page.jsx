import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ArrowLeft, Tag, DollarSign, Box, Cpu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle"; // Import the toggle for the detail page too

export default async function ProductDetailPage({ params }) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) notFound();

    return (
        <main className="min-h-screen pb-20 pt-10 relative">
            <ThemeToggle />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-medium mb-10 transition-colors group"
                >
                    <div className="bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 p-2 rounded-full transition-colors">
                        <ArrowLeft size={18} />
                    </div>
                    Back to Discover
                </Link>

                {/* Main Content Card */}
                <div className="bg-white/90 dark:bg-[#131B2B]/90 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-[0_8px_40px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_40px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800/60 relative overflow-hidden">

                    {/* Subtle decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-50/80 dark:from-indigo-500/10 to-transparent rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    {/* New Image Banner at the top of the details page */}
                    {product.image && (
                        <div className="relative w-full aspect-[21/9] rounded-[1.5rem] overflow-hidden mb-10 bg-slate-100 dark:bg-slate-800/50 shadow-inner">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 800px"
                                className="object-cover"
                                priority // Load details image quickly
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none mix-blend-multiply opacity-50 dark:opacity-80"></div>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
                        {/* Category Badge */}
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/20 ring-1 ring-inset ring-indigo-100/50 dark:ring-indigo-500/30">
                            {product.category}
                        </span>

                        {/* Price Tag */}
                        <div className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-baseline">
                            <span className="text-xl text-slate-400 dark:text-slate-500 font-medium mr-1">$</span>
                            {product.price}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight text-balance">
                        {product.name}
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10 font-medium">
                        {product.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-12">
                        {product.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[13px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-lg px-3 py-1.5 flex items-center gap-1.5"
                            >
                                <Tag size={12} />
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Specifications Glassmorphic Grid */}
                    <div className="border-t border-slate-100 dark:border-slate-800/80 pt-10">
                        <h2 className="text-[15px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">
                            Technical Specifications
                        </h2>

                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-5 flex items-center gap-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm text-slate-400 border border-slate-100 dark:border-slate-700">
                                    <Box size={18} />
                                </div>
                                <div>
                                    <dt className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-0.5">Product ID</dt>
                                    <dd className="font-bold text-slate-900 dark:text-white tracking-tight">{product.id}</dd>
                                </div>
                            </div>

                            <div className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-5 flex items-center gap-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm text-slate-400 border border-slate-100 dark:border-slate-700">
                                    <Cpu size={18} />
                                </div>
                                <div>
                                    <dt className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-0.5">Category</dt>
                                    <dd className="font-bold text-slate-900 dark:text-white tracking-tight capitalize">{product.category}</dd>
                                </div>
                            </div>

                        </dl>
                    </div>

                </div>
            </div>
        </main>
    );
}
