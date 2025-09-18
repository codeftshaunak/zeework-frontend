import { BsArrowUpRightCircleFill, BsArrowUpRightCircle } from "react-icons/bs";

export const MainButton = ({ children, onClick }) => {
  return (
    <button
      className="text-center font-medium text-white text-[18px]  py-[10px] px-5 rounded-md m-auto bg-gradient-to-br hover:bg-none from-[#12C824] to-[#12C824]/[46%] border hover:border-[#22C55E] transition duration-700 hover:text-[#22C55E] w-full md:w-auto"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const MainButtonTranparent = ({ children, onClick }) => {
  return (
    <button
      className="text-center font-medium text-[18px] py-[10px] px-5 rounded-md m-auto border transition duration-700 border-[#22C55E] hover:border-transparent text-[#22C55E] hover:bg-gradient-to-br hover:from-[#12C824] hover:to-[#12C824]/[46%] hover:text-white w-full md:w-auto"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const CommonButtonTranparent = ({ children, onClick }) => {
  return (
    <button
      className="text-white text-[18px] py-[10px] px-5 rounded-md  bg-[#ffffff38] transition duration-700  w-full md:w-auto flex items-center gap-2"
      onClick={onClick}
    >
      {children} <BsArrowUpRightCircleFill />
    </button>
  );
};

export const CommonButton = ({ children, onClick }) => {
  return (
    <button
      className="text-black text-center text-[1.4rem] py-[10px] px-5 rounded-md  bg-white transition duration-700  w-full md:w-auto flex justify-center items-center gap-2"
      onClick={onClick}
    >
      {children} <BsArrowUpRightCircleFill className="text-[1.3rem]" />
    </button>
  );
};

export const GreenButton = ({ children, onClick }) => {
  return (
    <button
      className="text-white text-[19px] py-[10px] px-4 rounded-[8px]  bg-[#22C55E] flex items-center gap-2 font-cabinet-bold"
      onClick={onClick}
    >
      {children} <BsArrowUpRightCircle className="text-lg" />
    </button>
  );
};
