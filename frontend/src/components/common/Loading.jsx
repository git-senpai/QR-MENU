import React from 'react'

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    </div>
  )
}