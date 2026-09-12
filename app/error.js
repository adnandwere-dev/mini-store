"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({ reset }) {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-4 p-6 text-center">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white">
        <AlertCircle size={20} aria-hidden="true" />
        We could not load the store
      </h2>
      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        <RefreshCw size={16} aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}
