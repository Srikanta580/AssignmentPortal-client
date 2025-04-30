import React, { useState } from "react";
import { Copy, Mail, Share2, X, Smartphone, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const ShareModal = ({ open, onClose, shareUrl }) => {
  const [copied, setCopied] = useState(false);
  if (!open) return null;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;
  const mailLink = `mailto:?subject=Check this out&body=${encodeURIComponent(
    shareUrl
  )}`;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Share2 className="w-5 h-5" /> Share this form
          </h2>
          <button
            onClick={() => onClose(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={copyToClipboard}
            className={`w-full border rounded-lg px-4 py-2 flex items-center gap-3 transition duration-300 cursor-pointer ${
              copied
                ? "bg-accent border-secondary text-primary"
                : "hover:bg-gray-100"
            }`}
            disabled={copied}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                <span className="font-medium">Copied to clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 text-gray-600" />
                Copy Link
              </>
            )}
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block border rounded-lg px-4 py-2 flex items-center gap-3 hover:bg-gray-100 transition"
          >
            <Smartphone className="w-5 h-5 text-green-500" />
            WhatsApp
          </a>

          <a
            href={mailLink}
            className="w-full block border rounded-lg px-4 py-2 flex items-center gap-3 hover:bg-gray-100 transition"
          >
            <Mail className="w-5 h-5 text-blue-600" />
            Email
          </a>

          <div className="flex flex-col items-center mt-4">
            <span className="text-sm text-gray-500 mb-2">Scan QR</span>
            <QRCodeSVG value={shareUrl} size={128} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
