
"use client";
import { Tooltip } from "@chakra-ui/react";
import React from "react";


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

};

export default AvailableDetails;
