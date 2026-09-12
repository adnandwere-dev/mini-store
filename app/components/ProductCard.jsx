"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-800/50 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <div className="relative h-48 w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <h2 className="font-bold text-lg mb-2 line-clamp-2 text-gray-500 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {product.title}
      </h2>

      <div className="flex items-center justify-between mb-4">
        <p className="text-2xl font-bold text-green-600 dark:text-green-500">
          ${product.price}
        </p>
        <div className="flex items-center">
          <Star
            size={18}
            fill="currentColor"
            className="text-yellow-400"
            aria-hidden="true"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
            {product.rating?.rate || "4.5"}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/products/${product.id}`}
          className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-center font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          View Details
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          <ShoppingCart size={16} aria-hidden="true" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
