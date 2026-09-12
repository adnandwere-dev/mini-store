"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Heart,
  LockKeyhole,
  Mail,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Truck,
  User,
  X,
} from "lucide-react";

export default function CheckoutModal({
  isOpen,
  onClose,
  onSubmit,
  totalItems,
  subtotal,
  tax,
  total,
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitted(true);
    onSubmit();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-md"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <main
        className="relative my-4 w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-800 shadow-2xl shadow-slate-900/20 dark:border-white/20 dark:bg-slate-800/95 dark:text-slate-100 dark:shadow-black/50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {isSubmitted ? (
          <div className="flex min-h-[520px] flex-col items-center justify-center px-6 py-12 text-center">
            {/* Success Icon */}
            <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 shadow-lg shadow-emerald-500/10 backdrop-blur-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-400">
                <Check size={38} strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>

            {/* Title */}
            <h2 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Order placed successfully!
            </h2>

            {/* Message */}
            <p className="mb-2 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              Thank you for your order. Your purchase has been confirmed.
            </p>

            <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
              We&apos;ll send a confirmation to your email shortly.
            </p>

            {/* Success Badge */}
            <div className="mb-8 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
              <Check
                size={16}
                className="text-emerald-400"
                aria-hidden="true"
              />
              <span>Order confirmed</span>
            </div>

            {/* Continue Shopping */}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-900/30 transition hover:brightness-110 active:scale-[.98]"
            >
              Continue shopping
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="grid min-h-[560px] grid-cols-1 md:grid-cols-12">
            <section className="flex flex-col justify-between border-b border-slate-200 bg-slate-50 p-7 md:col-span-5 md:border-b-0 md:border-r sm:p-9 dark:border-white/10 dark:bg-white/[0.08]">
              <div>
                <div className="mb-5 flex justify-center">
                  <ShoppingBag size={58} strokeWidth={1.4} aria-hidden="true" />
                </div>
                <div className="mb-9 text-center">
                  <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                    Complete your order
                  </h2>
                  <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-300/80">
                    Just a few details and you&apos;re all set. Your items will
                    be on their way soon!
                  </p>
                </div>

                <div className="space-y-5">
                  <Perk
                    icon={Truck}
                    title="Fast delivery"
                    text="Get your products quickly"
                  />
                  <Perk
                    icon={ShieldCheck}
                    title="Secure checkout"
                    text="Your information is safe"
                  />
                  <Perk
                    icon={Heart}
                    title="Thank you!"
                    text="We appreciate your support"
                  />
                </div>
              </div>
              <div className="pt-8 text-center">
                <p className="mb-3 text-xs italic text-slate-500 dark:text-slate-300/80">
                  &ldquo;Good things are on the way!&rdquo;
                </p>
                <div className="mx-auto h-1 w-8 rounded-full bg-slate-300 dark:bg-white/40" />
              </div>
            </section>

            <section className="p-7 sm:p-9 md:col-span-7">
              <div className="mb-6">
                <h1
                  id="checkout-title"
                  className="mb-1 text-2xl font-bold text-slate-900 dark:text-white"
                >
                  Checkout
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300/80">
                  Fill in your information to place your order
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <CheckoutField
                  id="fullName"
                  label="Full name"
                  type="text"
                  icon={User}
                />
                <CheckoutField
                  id="emailAddress"
                  label="Email address"
                  type="email"
                  icon={Mail}
                />
                <CheckoutField
                  id="shippingAddress"
                  label="Shipping address"
                  type="text"
                  icon={MapPin}
                />

                <div className="pt-2">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                    <ShoppingBag size={16} aria-hidden="true" />
                    <span>Order summary</span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <SummaryRow
                      label={`Items (${totalItems})`}
                      value={`$${subtotal.toFixed(2)}`}
                    />
                    <SummaryRow
                      label="Shipping"
                      value="Free"
                      valueClassName="text-emerald-400"
                    />
                    <SummaryRow label="Tax (8%)" value={`$${tax.toFixed(2)}`} />
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-white/10">
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-emerald-400">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 transition hover:brightness-110 active:scale-[.99]"
                >
                  <LockKeyhole size={16} aria-hidden="true" />
                  Place order
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  This is a demo order flow. No payment is processed.
                </p>
              </form>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

function Perk({ icon: Icon, title, text }) {
  return (
    <div className="flex items-center gap-3.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-white/15 dark:bg-white/[0.08]">
        <Icon size={19} aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-sm font-semibold leading-tight text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-300/70">{text}</p>
      </div>
    </div>
  );
}

function CheckoutField({ id, label, type, icon: Icon }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200"
      >
        {label} <span className="font-semibold text-rose-400">*</span>
      </label>
      <div className="relative">
        <Icon
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
          aria-hidden="true"
        />
        <input
          id={id}
          name={id}
          type={type}
          required
          className="block w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 dark:border-white/15 dark:bg-slate-950/45 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  valueClassName = "text-slate-900 dark:text-white",
}) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className={`font-medium ${valueClassName}`}>{value}</span>
    </div>
  );
}
