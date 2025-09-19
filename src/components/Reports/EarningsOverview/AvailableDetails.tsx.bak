"use client";

import { Button, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import GetFreelancerPaid from "./GetFreelancerPaid";

const AvailableDetails = ({ balance }) => {
  const [isPaidModal, setIsPaidModal] = useState(false);

  const paymentStatus = useSelector(
    (state) => state.profile.profile.payment_verified
  );
  const router = useRouter();

  return (
    <>
      <div className="mt-5 border border-[var(--bordersecondary)] p-8 rounded-lg bg-white grid gap-8">
        <div className="font-semibold text-lg">
          {paymentStatus === "verified" &&
            (balance >= 5 ? (
              <p>
                Your payment request is being processed and may take 3 to 5
                working days.
              </p>
            ) : (
              <p>Insufficient balance to process payment.</p>
            ))}

          {paymentStatus === "unverified" && (
            <p>
              Your payment details are currently unverified. Please verify your
              payment details.
            </p>
          )}
          {paymentStatus === "reviewing" && (
            <p>
              Your payment details are currently under review. Please allow up
              to 3 working days for processing.
            </p>
          )}
        </div>
        <hr />
        <div>
          {paymentStatus === "verified" && (
            <div className="flex flex-col md:flex-row gap-5">
              <Tooltip
                hasArrow
                label={
                  !balance && "You don't have sufficient balance to proceed."
                }
                bg="gray.500"
                placement="top"
              >
                <Button
                  colorScheme={balance ? "primary" : null}
                  isDisabled={!balance}
                  rounded="full"
                  onClick={() => setIsPaidModal(true)}
                >
                  Get Paid Now
                </Button>
              </Tooltip>{" "}
              <Button
                colorScheme="primary"
                variant="outline"
                rounded="full"
                onClick={() => router.push("/setting/billing-payments")}
              >
                View Payment Settings
              </Button>
            </div>
          )}
          {paymentStatus === "unverified" && (
            <Button
              colorScheme="primary"
              variant="outline"
              rounded="full"
              className="w-full md:w-fit"
              onClick={() => router.push("/setting/billing-payments")}
            >
              Verify Payment Methods
            </Button>
          )}
          {paymentStatus === "reviewing" && (
            <div className="flex flex-col md:flex-row gap-5">
              <Button rounded="full" isDisabled cursor={"not-allowed"}>
                Get Paid Now
              </Button>{" "}
              <Button
                colorScheme="primary"
                variant="outline"
                rounded="full"
                onClick={() => router.push("/setting/billing-payments")}
              >
                View Submitted Details
              </Button>
            </div>
          )}
        </div>
      </div>

      {isPaidModal && (
        <GetFreelancerPaid
          isModal={isPaidModal}
          setIsModal={setIsPaidModal}
          balance={balance}
        />
      )}
    </>
  );
};

export default AvailableDetails;
