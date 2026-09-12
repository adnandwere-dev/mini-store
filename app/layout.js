import { Geist, Geist_Mono } from "next/font/google";
import { Heart } from "lucide-react";
import "./globals.css";
import Link from "next/link";
import Navbar from "./components/NavBar";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Mini Store - Your Ultimate Shopping Destination",
  description:
    "Discover amazing products at unbeatable prices. Fast, secure, and easy shopping experience built with Next.js.",
  keywords: "shopping, store, products, online shopping, ecommerce",
  authors: [{ name: "Mini Store Team" }],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="bg-gray-900 dark:bg-black text-white py-12 px-6 mt-auto transition-colors duration-300">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Mini Store</h3>
                    <p className="text-gray-400 dark:text-gray-500">
                      Your trusted online shopping destination for quality
                      products at great prices.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                      <li>
                        <Link
                          href="/"
                          className="hover:text-white transition-colors"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products"
                          className="hover:text-white transition-colors"
                        >
                          Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/cart"
                          className="hover:text-white transition-colors"
                        >
                          Cart
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
                  <p>
                    &copy; 2024 Mini Store. Built with{" "}
                    <Heart
                      size={14}
                      className="inline text-red-400"
                      fill="currentColor"
                      aria-hidden="true"
                    />{" "}
                    using Next.js
                  </p>
                </div>
              </div>
            </footer>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
