
import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const MotionContent = motion.div;

interface UniversalModalProps {
  isModal: boolean;
  setIsModal: (open: boolean) => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  size?: "2xl" | "xl" | "lg" | "md" | "3xl" | "4xl";
  isCloseBtn?: boolean;
}

const UniversalModal: React.FC<UniversalModalProps> = ({
  isModal,
  setIsModal,
  title,
  children,
  size = "2xl",
  isCloseBtn = true,
}) => {
  const handleClose = () => {
    setIsModal(false);
  };

  if (!isModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <MotionContent
        className={`relative bg-white rounded-lg shadow-xl ${
          size === "3xl"
            ? "max-w-3xl"
            : size === "2xl"
            ? "max-w-2xl"
            : size === "xl"
            ? "max-w-xl"
            : size === "lg"
            ? "max-w-lg"
            : "max-w-md"
        } w-full max-h-[90vh] min-h-[300px] overflow-hidden`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {title && (
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 capitalize">{title}</h2>
          </div>
        )}

        {isCloseBtn && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {children}
        </div>
      </MotionContent>
    </div>
  );
};

export default UniversalModal;
