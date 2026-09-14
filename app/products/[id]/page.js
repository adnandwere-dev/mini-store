"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, Star } from "lucide-react";

import ProductCard from "../../components/ProductCard";
import AddToCartButton from "../../components/AddToCartButton";

export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchProduct() {
      try {
        const { id } = await params;

        const productResponse = await fetch(
          `https://fakestoreapi.com/products/${id}`,
        );

        if (!productResponse.ok) {
          throw new Error("Unable to load product");
        }

        const productData = await productResponse.json();

        if (cancelled) return;

        setProduct(productData);

        try {
          const relatedResponse = await fetch(
            `https://fakestoreapi.com/products/category/${encodeURIComponent(
              productData.category,
            )}`,
          );

          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();

            if (!cancelled) {
              setRelatedProducts(relatedData);
            }
          }
        } catch {
          if (!cancelled) {
            setRelatedProducts([]);
          }
        }

        setError(false);
      } catch {
        if (cancelled) return;

        setError(true);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
            Unable to load product
          </h1>

          <p className="mb-6 text-gray-600 dark:text-gray-400">
            We could not load this product right now.
          </p>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Back Button */}
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Products
        </Link>

        {/* Product Details */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl transition-colors duration-300 dark:bg-gray-800 dark:shadow-gray-900/50">
          <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2">
            {/* Product Image */}
            <div className="flex justify-center">
              <div className="relative h-96 w-full max-w-md overflow-hidden rounded-xl bg-gray-100 shadow-lg dark:bg-gray-700 dark:shadow-gray-900/50">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white lg:text-4xl">
                  {product.title}
                </h1>

                <div className="mb-4 flex items-center gap-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {product.category}
                  </span>

                  <div className="flex items-center">
                    <Star
                      size={18}
                      fill="currentColor"
                      className="text-yellow-400"
                      aria-hidden="true"
                    />

                    <span className="ml-1 text-gray-600 dark:text-gray-400">
                      {product.rating?.rate || "4.5"} (
                      {product.rating?.count || "100"} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                {product.description}
              </p>

              <div className="text-4xl font-bold text-green-600 dark:text-green-500">
                ${product.price}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.filter((p) => p.id !== product.id).length > 0 && (
          <div className="mt-16">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-600 dark:text-white">
              Related Products
            </h2>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts
                .filter((p) => p.id !== product.id)
                .slice(0, 3)
                .map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}