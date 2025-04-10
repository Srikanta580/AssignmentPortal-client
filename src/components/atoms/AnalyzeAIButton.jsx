// import { useState } from "react";
import { Code, FileText, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export default function AnalyzeAISection() {
  // const [showOptions, setShowOptions] = useState(false);

  return (
    <Link className="relative mt-auto" to="/codeanalyzer" target="_blank">
      {/* Animated Options */}
      {/* {showOptions && (
        <div className="absolute bottom-16 left-[90%] right-0 flex justify-center gap-4">
          <button
            className="flex items-center justify-center p-3 bg-white border border-secondary text-secondary rounded-full hover:bg-secondary/10 transition transform animate-fade-slide-up shadow-lg"
            style={{ animationDelay: "0ms" }}
          >
            <Upload className="w-5 h-5" />
          </button>
          <button
            className="flex items-center justify-center p-3 bg-white border border-secondary text-secondary rounded-full hover:bg-secondary/10 transition transform animate-fade-slide-up shadow-lg"
            style={{ animationDelay: "150ms" }}
          >
            <FileText className="w-5 h-5" />
          </button>
        </div>
      )} */}

      {/* Main Analyze Button */}
      <button
        className="w-full flex items-center justify-center gap-2 p-3
          bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500
          text-white font-semibold rounded-lg shadow-lg
          hover:scale-105 hover:shadow-pink-500/50 transition-transform duration-300
          animate-pulse hover:animate-none"
      >
        <Code className="w-5 h-5" />
        Analyze with AI ✨
      </button>

      {/* <style jsx>{`
        @keyframes fade-slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-slide-up {
          animation: fade-slide-up 0.3s ease-out forwards;
        }
      `}</style> */}
    </Link>
  );
}
