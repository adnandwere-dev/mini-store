import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import ProductCard from "./components/ProductCard";

async function getFeaturedProducts() {
  const res = await fetch("https://fakestoreapi.com/products?limit=6", {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Unable to load featured products");

  return res.json();
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-blue-600 to-purple-700 dark:from-gray-800 dark:to-gray-900 text-white py-20 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-yellow-300 to-pink-300 dark:from-yellow-400 dark:to-pink-400 bg-clip-text text-transparent">
            Mini Store
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 dark:opacity-80">
            Discover amazing products at unbeatable prices
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-blue-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100 dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600"
            >
              <ShoppingBag size={18} aria-hidden="true" />
              Shop Now
            </Link>
            <Link
              href="/cart"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-blue-600 dark:hover:bg-gray-700 dark:hover:text-blue-400"
            >
              <ShoppingCart size={18} aria-hidden="true" />
              View Cart
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 dark:bg-gray-700/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 dark:bg-gray-700/20 rounded-full blur-xl"></div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-700 dark:text-white transition-colors duration-300">
            Featured Products
          </h2>
          {products.length === 0 ? (
            <p className="py-12 text-center text-gray-600 dark:text-gray-400">
              No featured products are available right now.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-blue-500 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800"
            >
              View All Products
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer-like section */}
      <section className="bg-gray-900 dark:bg-black text-white py-12 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg opacity-80 dark:opacity-70">
            © 2024 Mini Store. Built with{" "}
            <Heart
              size={16}
              className="inline text-red-400"
              fill="currentColor"
              aria-hidden="true"
            />{" "}
            using Next.js
          </p>
        </div>
      </section>
    </div>
  );
}
