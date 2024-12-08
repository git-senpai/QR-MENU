import React from 'react'
import { Link } from 'react-router-dom'

export default function Error({ message = 'Something went wrong', showHome = true }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        {showHome && (
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Return to Home
          </Link>
        )}
      </div>
    </div>
  )
} 