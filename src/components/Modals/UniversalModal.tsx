
import React from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const MotionContent = motion.div;

interface UniversalModalProps {
  isModal: boolean;
  setIsModal: (open: boolean) => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  size?: "2xl" | "xl" | "lg" | "md";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <MotionContent
        className={`relative bg-white rounded-lg shadow-xl py-4 px-6 mx-4 ${
          size === "2xl"
            ? "max-w-[672px]"
            : size === "xl"
            ? "max-w-[576px]"
            : size === "lg"
            ? "max-w-[512px]"
            : "max-w-[448px]"
        } w-full max-h-[90vh] overflow-y-auto`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {title && (
          <div className="pt-0 mb-4 capitalize">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        )}

        {isCloseBtn && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded"
          >
            <IoMdClose className="w-5 h-5" />
          </button>
        )}

        <div>{children}</div>
      </MotionContent>
    </div>
  );
};

export default UniversalModal;
