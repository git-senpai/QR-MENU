import React from "react";
import { Link } from "react-router-dom";

export default function Error({
  message = "Something went wrong",
  showHome = true,
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">Oops!</h1>
        <p className="text-lg text-gray-700 mb-6">{message}</p>
        {showHome && (
          <Link
            to="/"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-200"
          >
            Go to Home
          </Link>
        )}
      </div>
    </div>
  );
}
