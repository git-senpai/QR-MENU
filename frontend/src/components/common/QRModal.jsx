import React from 'react';

const QRModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full m-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Scan QR Code to View Menu</h3>
          <img
            src="/menuQR.png"
            alt="Menu QR Code"
            className="mx-auto max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default QRModal; 