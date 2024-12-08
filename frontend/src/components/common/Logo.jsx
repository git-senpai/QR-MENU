import React from 'react';

export default function Logo({ className = "h-8 w-auto", color = "currentColor" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 512 512" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 384c-97.2 0-176-78.8-176-176S158.8 80 256 80s176 78.8 176 176-78.8 176-176 176z"
        fill={color}
      />
      <path
        d="M256 128c-70.7 0-128 57.3-128 128 0 70.7 57.3 128 128 128 70.7 0 128-57.3 128-128 0-70.7-57.3-128-128-128zm60 180c0 11-9 20-20 20h-80c-11 0-20-9-20-20v-20h120v20zm0-52H196v-20h120v20zm0-52H196v-20c0-11 9-20 20-20h80c11 0 20 9 20 20v20z"
        fill={color}
      />
    </svg>
  );
} 