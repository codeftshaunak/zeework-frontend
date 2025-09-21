"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "../../contexts/FormContext";
import { FaRegCreditCard } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

function Complete({ setStep }) {
  const router = useRouter();
  const { clearFormState } = useFormState();
  const [isPaymentVerified, setIsPaymentVerified] = useState(
    useSelector((state: any) => state?.profile?.profile.payment_verified)
  );

  useEffect(() => {
    clearFormState();
  }, []);

  return (
    <>
      <div className="mt-16 max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-6 max-w-[640px] md:w-[640px] px-[30px] py-9 justify-center items-center mx-auto border border-outline-primary rounded-xl bg-white">
          <div className="w-[72px] h-[72px] flex items-center justify-center bg-green-50 rounded-full">
            {isPaymentVerified ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                fill="none"
              >
                <g id="20/Click">
                  <path
                    id="Path"
                    d="M15.6002 32.4004L11.2002 36.8004"
                    stroke="#22C35E"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Path_2"
                    d="M24 24L42 30L34 34L30 42L24 24"
                    stroke="#22C35E"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Path_3"
                    d="M6 24H12"
                    stroke="#22C35E"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Path_4"
                    d="M32.4004 15.6002L36.8004 11.2002"
                    stroke="#22C35E"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Path_5"
                    d="M15.6002 15.6002L11.2002 11.2002"
                    stroke="#22C35E"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Path_6"
                    d="M24 6V12"
                    stroke="#22C35E"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            ) : (
              <FaRegCreditCard className="text-4xl text-[#22C35E]" />
            )}
          </div>
          <div className="text-gray-700 text-2xl font-semibold font-['SF Pro Text'] leading-loose">
            Congratulations!
          </div>
          <div className="text-center text-gray-700 font-medium font-['SF Pro Text'] leading-tight">
            {isPaymentVerified
              ? "Job has been posted successfully, Top Notch Designers will submit proposal on your Job Post"
              : "Please add your payment method to get verified!"}
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="w-full h-9 flex-col justify-start items-start gap-2.5 inline-flex">
              <div
                className="self-stretch grow shrink basis-0 px-3 py-2 bg-gray-50 rounded-md shadow border border-gray-300 justify-center items-center gap-1 inline-flex cursor-pointer"
                onClick={() => router.push("/client-dashboard")}
              >
                <div className="text-center text-gray-700 text-sm font-medium font-['SF Pro Text'] leading-tight">
                  Back to Home
                </div>
              </div>
            </div>

            <div className="w-full h-9 flex-col justify-start items-start gap-2.5 inline-flex">
              <Button
                variant="gradient"
                className="self-stretch h-9"
                onClick={() => {
                  isPaymentVerified
                    ? setStep(1)
                    : router.push("/setting/billing-payments");
                }}
              >
                {isPaymentVerified
                  ? "Create New Job Post"
                  : "Yes, I want to add a payment method"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Complete;
