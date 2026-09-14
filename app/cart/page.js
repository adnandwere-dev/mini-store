"use client";

import { useCart } from "../context/CartContext";
import {
  LockKeyhole,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import CheckoutModal from "../components/CheckoutModal";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <ShoppingCart
            size={58}
            className="mx-auto mb-4 text-blue-500"
            aria-hidden="true"
          />

          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Your cart is empty
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Add some products to get started!
          </p>

          <Link
            href="/products"
            className="inline-block bg-linear-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ShoppingBag size={18} className="mr-2 inline" aria-hidden="true" />
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Your Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-gray-900/50 transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-700 dark:text-white mb-2 line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-green-600 dark:text-green-500 font-bold text-xl mb-4">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white  font-bold text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        <Minus size={16} aria-hidden="true" />
                      </button>

                      <span className="min-w-8 text-center font-bold text-gray-700 dark:text-white">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        <Plus size={16} aria-hidden="true" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
                    >
                      <Trash2
                        size={16}
                        className="mr-1 inline"
                        aria-hidden="true"
                      />
                      Remove
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="sm:text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Item Total
                    </p>

                    <p className="text-xl font-bold text-gray-700 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-gray-900/50 h-fit transition-colors duration-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-white">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal ({totalItems} items)
                </span>

                <span className="font-semibold text-gray-700 dark:text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Shipping
                </span>

                <span className="font-semibold text-green-600 dark:text-green-500">
                  Free
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>

                <span className="font-semibold text-gray-700 dark:text-white">
                  ${tax.toFixed(2)}
                </span>
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              <div className="flex justify-between text-xl font-bold">
                <span className="text-gray-700 dark:text-white">Total</span>

                <span className="text-green-600 dark:text-green-500">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout */}
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="block w-full bg-linear-to-r from-green-500 to-blue-600 dark:from-green-600 dark:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-center hover:from-green-600 hover:to-blue-700 dark:hover:from-green-700 dark:hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <LockKeyhole
                size={18}
                className="mr-2 inline"
                aria-hidden="true"
              />
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            <Link
              href="/products"
              className="block w-full mt-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        key={isCheckoutOpen ? "open" : "closed"}
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);

          if (orderCompleted) {
            clearCart();
            setOrderCompleted(false);
          }
        }}
        onSubmit={() => setOrderCompleted(true)}
        totalItems={totalItems}
        subtotal={subtotal}
        tax={tax}
        total={total}
      />
    </div>
  );
}
