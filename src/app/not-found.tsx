"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-xl w-full mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 whitespace-nowrap">
          Oops! Page not found.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10">
          We couldn&apos;t find the page you are looking for. It might have been
          moved or doesn&apos;t exist anymore.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium shadow hover:bg-blue-700 transition-colors"
          >
            Back to homepage
            <span className="ml-2 text-2xl">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
