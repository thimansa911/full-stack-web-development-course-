// components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full p-4">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
