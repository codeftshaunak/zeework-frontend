import React from "react";
import UniversalModal from "./UniversalModal";
import { MdPayment } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const AddPaymentNotifyModal = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  return (
    <UniversalModal isModal={isOpen} setIsModal={setIsOpen}>
      <div className="text-center w-full">
        <MdPayment className="text-6xl bg-green-100 text-green-500 p-2 rounded-full mx-auto" />
        <p className="text-xl sm:text-2xl font-semibold ">
          Add Payment Details Before Hiring
        </p>
      </div>

      <div className="flex gap-5 sm:gap-10 mt-8 sm:mt-20">
        <Button
          colorScheme="primary"
          variant={"outline"}
          width={"full"}
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button
          colorScheme="primary"
          width={"full"}
          onClick={() => router.push("/setting/billing-payments")}
        >
          Verify Now
        </Button>
      </div>
    </UniversalModal>
  );
};

export default AddPaymentNotifyModal;
