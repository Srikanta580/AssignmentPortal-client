import React from "react";
import { XCircle } from "lucide-react"; // For the close button icon

const UDModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-dark bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <XCircle className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <div className="size-44 text-8xl bg-accent text-white flex items-center justify-center rounded-full shadow-md">
            🚧
          </div>
          <h2 className="text-xl font-bold text-primary mt-4">
            Under Development
          </h2>
          <p className="text-gray-600 mt-2">
            This feature is currently being built. Stay tuned for updates!
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-[#00858E] transition-all duration-300"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default UDModal;
