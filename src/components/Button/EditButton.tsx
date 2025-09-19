import React from "react";

interface EditButtonProps {
  onClick?: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <div
      className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] hover:bg-slate-100 cursor-pointer rounded-[6px] border-[1px] border-[var(--bordersecondary)] "
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
          stroke="#6B7280"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 4.33301L11.6667 6.99967"
          stroke="#6B7280"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default EditButton;
