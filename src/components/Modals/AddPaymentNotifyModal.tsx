import React from "react";
import UniversalModal from "./UniversalModal";
import { MdPayment } from "react-icons/md";

import { useRouter } from "next/navigation";

const AddPaymentNotifyModal = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  return (
    <UniversalModal isModal={isOpen} setIsModal={setIsOpen}>
      <div className="text-center w-full">
        <MdPayment className="text-6xl bg-green-100 text-green-500 p-2 rounded-full mx-auto" />
        <p className="text-xl sm:text-2xl font-semibold">
          Add Payment Details Before Hiring
        </p>
      </div>

      <div className="flex gap-5 sm:gap-10 mt-8 sm:mt-20">
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full"
         
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full"
         
          onClick={() => router.push("/setting/billing-payments")}
        >
          Verify Now
        </button>
      </div>
    </UniversalModal>
  );
};

export default AddPaymentNotifyModal;
