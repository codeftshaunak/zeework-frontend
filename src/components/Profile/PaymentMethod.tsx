import Image from "next/image";
import { GoPlus } from "react-icons/go";

const PaymentMethod = () => {
  return (
    <div className="flex flex-col gap-[16px] py-[20px] px-[24px]">
      {/* <p className="text-[#374151] text-[16px] font-[600]">Payment Methods</p> */}
      {/* <PaymentCard />
      <PaymentCard />
      <PaymentCard /> */}
      {/* <button className="text-[14px] w-[250px] items-center gap-[8px] flex bg-[#22C35E] text-[#fff] font-[500]  py-[4px] px-[20px] rounded-md ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M7.99984 3.33301V12.6663"
            stroke="white"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.3335 8.00033H12.6668"
            stroke="white"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>Add new payment method</p>
      </button> */}
    </div>
  );
};

export default PaymentMethod;

export const PaymentCard = ({
  title,
  icon,
  modalType,
  setModalType,
  setIsModal,
}) => {
  return (
    <div className="flex w-full items-center justify-between p-[12px] border-[1px] border-[var(--bordersecondary)] rounded-[12px] bg-white">
      <div className="flex items-center gap-[8px] ">
        <div className="flex items-center justify-center w-[42px]  h-[42px] rounded-[10px] bg-[#F0FDF4] text-2xl">
          {!icon && (
            <img src="/images/freelancer_dashboard/payoneer.ico" alt="" />
          )}
          {icon}
        </div>
        <div className="flex-col gap-[4px]">
          <p className="text-[#374151] text-[16px] font-[600]">{title}</p>
        </div>
      </div>
      <div className="flex gap-[8px] items-center">
        <div
          className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
          onClick={() => {
            setIsModal(true), setModalType(modalType);
          }}
        >
          <GoPlus />
        </div>
      </div>
    </div>
  );
};
