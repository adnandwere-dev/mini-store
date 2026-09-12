import ProductCard from "../components/ProductCard";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Unable to load products");

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-600 dark:text-white mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our amazing collection of products. Quality guaranteed and
            prices unbeatable.
          </p>
        </div>

        {products.length === 0 ? (
          <p className="py-12 text-center text-gray-600 dark:text-gray-400">
            No products are available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {products.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Products Available
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {products.filter((p) => p.rating?.rate >= 4).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Highly Rated
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {new Set(products.map((p) => p.category)).size}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
