"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadProducts() {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("https://fakestoreapi.com/products");

      if (!res.ok) {
        throw new Error("Failed to load products");
      }

      const data = await res.json();
      setProducts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  let cancelled = false;

  async function fetchInitialProducts() {
    try {
      const res = await fetch(
        "https://fakestoreapi.com/products",
      );

      if (!res.ok) {
        throw new Error("Failed to load products");
      }

      const data = await res.json();

      if (cancelled) return;

      setProducts(data);
      setError(false);
    } catch {
      if (cancelled) return;

      setError(true);
    } finally {
      if (cancelled) return;

      setLoading(false);
    }
  }

  fetchInitialProducts();

  return () => {
    cancelled = true;
  };
}, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-700 dark:text-white md:text-5xl">
            Our Products
          </h1>

          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            Discover our amazing collection of products. Quality guaranteed
            and prices unbeatable.
          </p>
        </div>

        {/* Products */}
        {loading ? (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Loading products...
            </p>
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <p className="mb-5 text-gray-600 dark:text-gray-400">
              We could not load the products right now.
            </p>

            <button
              type="button"
              onClick={loadProducts}
              className="rounded-full bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <p className="py-16 text-center text-gray-600 dark:text-gray-400">
            No products are available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Stats */}
        {!loading && !error && products.length > 0 && (
          <div className="mt-16 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800 dark:shadow-gray-900/50">
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
              <div>
                <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {products.length}
                </div>

                <div className="text-gray-600 dark:text-gray-400">
                  Products Available
                </div>
              </div>

              <div>
                <div className="mb-2 text-3xl font-bold text-green-600 dark:text-green-400">
                  {products.filter((p) => p.rating?.rate >= 4).length}
                </div>

                <div className="text-gray-600 dark:text-gray-400">
                  Highly Rated
                </div>
              </div>

              <div>
                <div className="mb-2 text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {new Set(products.map((p) => p.category)).size}
                </div>

                <div className="text-gray-600 dark:text-gray-400">
                  Categories
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back Home */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}