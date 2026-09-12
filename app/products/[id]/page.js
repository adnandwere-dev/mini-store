import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import AddToCartButton from "../../components/AddToCartButton";
import Image from "next/image";

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) throw new Error("Unable to load product");

  return res.json();
}

async function getRelatedProducts(category) {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}?limit=4`,
  );
  return res.ok ? res.json() : [];
}

export default async function ProductDetails({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  const relatedProducts = await getRelatedProducts(product.category);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Products
        </Link>

        {/* Product Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 overflow-hidden transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-96 rounded-xl overflow-hidden shadow-lg dark:shadow-gray-900/50 bg-gray-100 dark:bg-gray-700">
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
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                  {product.title}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                  <div className="flex items-center">
                    <Star
                      size={18}
                      fill="currentColor"
                      className="text-yellow-400"
                      aria-hidden="true"
                    />
                    <span className="text-gray-600 dark:text-gray-400 ml-1">
                      {product.rating?.rate || "4.5"} (
                      {product.rating?.count || "100"} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="text-4xl font-bold text-green-600 dark:text-green-500">
                ${product.price}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 1 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-600 dark:text-white">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
