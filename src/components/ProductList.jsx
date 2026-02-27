import ProductCard from "./ProductCard";
import { PackageOpen } from "lucide-react";

export default function ProductList({ products }) {
    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-6">
                    <PackageOpen size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No products found</h3>
                <p className="text-slate-500 max-w-sm text-[15px]">
                    We couldn't find anything matching your search. Try adjusting your query or browsing all products.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
