"use client";

import {
  Home,
  Menu,
  Moon,
  Package,
  ShoppingCart,
  Sun,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { cart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-blue-600 to-purple-700 text-white shadow-lg transition-colors duration-300 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition-colors duration-300 dark:bg-gray-700">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                M
              </span>
            </div>

            <h1 className="bg-linear-to-r from-yellow-300 to-pink-300 bg-clip-text text-2xl font-bold text-transparent dark:from-yellow-400 dark:to-pink-400">
              Mini Store
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/"
              className="flex items-center gap-2 font-medium transition-colors duration-200 hover:text-yellow-300 dark:hover:text-yellow-400"
            >
              <Home size={18} aria-hidden="true" />
              Home
            </Link>

            <Link
              href="/products"
              className="flex items-center gap-2 font-medium transition-colors duration-200 hover:text-yellow-300 dark:hover:text-yellow-400"
            >
              <Package size={18} aria-hidden="true" />
              Products
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center gap-2 font-medium transition-colors duration-200 hover:text-yellow-300 dark:hover:text-yellow-400"
            >
              <ShoppingCart size={18} aria-hidden="true" />
              Cart

              {cart.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white transition-colors duration-300 dark:bg-red-600">
                  {cart.length}
                </span>
              )}
            </Link>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="transform rounded-lg bg-white/20 p-2 transition-all duration-300 hover:scale-110 hover:bg-white/30 dark:bg-gray-700 dark:hover:bg-gray-600"
                aria-label="تبديل الثيم"
                title={`تبديل إلى الثيم ${
                  theme === "light" ? "الداكن" : "الفاتح"
                }`}
              >
                {theme === "light" ? (
                  <Moon size={18} aria-hidden="true" />
                ) : (
                  <Sun size={18} aria-hidden="true" />
                )}
              </button>

              <span className="text-sm font-medium text-white/90 dark:text-gray-200">
                {theme === "light" ? "Light mode" : "Dark mode"}
              </span>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg bg-white/20 p-2 transition-all duration-300 hover:bg-white/30"
              aria-label="تبديل الثيم"
              title={`تبديل إلى الثيم ${
                theme === "light" ? "الداكن" : "الفاتح"
              }`}
            >
              {theme === "light" ? (
                <Moon size={18} aria-hidden="true" />
              ) : (
                <Sun size={18} aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 focus:outline-none"
              aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mt-4 border-t border-white/20 pt-4 md:hidden">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors hover:bg-white/10"
              >
                <Home size={19} aria-hidden="true" />
                Home
              </Link>

              <Link
                href="/products"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors hover:bg-white/10"
              >
                <Package size={19} aria-hidden="true" />
                Products
              </Link>

              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-lg px-4 py-3 font-medium transition-colors hover:bg-white/10"
              >
                <span className="flex items-center gap-3">
                  <ShoppingCart size={19} aria-hidden="true" />
                  Cart
                </span>

                {cart.length > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white dark:bg-red-600">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}