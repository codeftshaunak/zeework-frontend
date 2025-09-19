
"use client";
import React from "react";


import { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import HorizontalCardSkeleton from "../../Skeletons/HorizontalCardSkeleton";
import AvailableDetails from "./AvailableDetails";
import InProgress from "./InProgress";
import InReview from "./InReview";

const EarningsOverview = ({ balance, isLoading }) => {
  const [availableBalanceDetails, setAvailableBalanceDetails] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [inReview, setInReview] = useState(false);

  const onClick = ({ theme }) => {
    if (theme === "in-progress") {
      setInProgress(!inProgress);
      setAvailableBalanceDetails(false);
      setInReview(false);
    }
    if (theme === "in-review") {
      setInProgress(false);
      setAvailableBalanceDetails(false);
      setInReview(!inReview);
    }
    if (theme === "available") {
      setInProgress(false);
      setAvailableBalanceDetails(!availableBalanceDetails);
      setInReview(false);
    }
  };

  const [cookies] = useCookies(["activeagency"]);
  const activeagency = cookies.activeagency;
  const availableBalance =
    useSelector((state: any) => state.profile.profile?.available_balance) || 0;

  const truncateToTwoDecimals = (number) => {
    if (!number) return "0.00";
    return (Math.floor(number * 100) / 100).toFixed(2);
  };

  return (
    <div>
      <h2 className="mt-8 mb-8 text-[25px] font-semibold">
        {"Earnings Overview"}
      </h2>

      {isLoading ? (
        <HorizontalCardSkeleton />
      ) : (
        <div className="flex flex-row items-center className="max-md:!flex-col justify-between">
          <divw-[400px] h-[10rem]"
            backgroundColor="#ffff"
            className="border rounded items-center justify-center"
           
            _hover={{
              border: "1px solid var(--primarycolor)",
              transition: "0.3s ease-in-out",
            }}
            className="max-md:!w-full"
            onClick={() = className="flex flex-col className= cursor-pointer"> onClick({ theme: "in-progress" })}
          >
            <p className="font-semibold text-4xl">
              ${balance?.progress?.toFixed(2) || "0.00"}
            </p>
            <p className="text-lg capitalize">Work In Progress</p>
          </div>

          <divw-[400px] h-[10rem]"
            backgroundColor="#ffff"
            className="border rounded items-center justify-center"
           
            _hover={{
              border: "1px solid var(--primarycolor)",
              transition: "0.3s ease-in-out",
            }}
            className="max-md:!w-full"
            onClick={() = className="flex flex-col className= cursor-pointer"> onClick({ theme: "in-review" })}
          >
            <p className="font-semibold text-4xl">
              ${balance?.review?.toFixed(2) || "0.00"}
            </p>
            <p className="text-xl capitalize">Work In review</p>
          </div>

          <divw-[400px] h-[10rem]"
            backgroundColor="#ffff"
            className="border rounded items-center justify-center"
           
            _hover={{
              border: "1px solid var(--primarycolor)",
              transition: "0.3s ease-in-out",
            }}
            className="max-md:!w-full"
            onClick={() = className="flex flex-col className= cursor-pointer"> onClick({ theme: "in-progress" })}
          >
            <p className="font-semibold text-4xl">
              ${balance?.pending?.toFixed(2) || "0.00"}
            </p>
            <p className="text-lg capitalize">Processing</p>
          </div>

          <divw-[400px] h-[10rem]"
            backgroundColor="#ffff" className="rounded items-center justify-center"
           
            _hover={{
              border: "1px solid var(--primarycolor)",
              transition: "0.3s ease-in-out",
            }}
            className="max-md:!w-full"
            onClick={() = className="flex flex-col className= cursor-pointer"> onClick({ theme: "available" })}
          >
            <p className="font-semibold text-4xl">
              ${truncateToTwoDecimals(activeagency ? balance?.available : availableBalance)}
            </p>
            <p className="text-lg">Available Funds</p>
          </div>
        </div>
      )}
      {availableBalanceDetails && (
        <AvailableDetails
          balance={
            (activeagency
              ? Number(balance?.available?.toFixed(2))
              : Number(availableBalance?.toFixed(2))) || 0.0
          }
        />
      )}
      {inReview && <InReview />}
      {inProgress && <InProgress />}
    </div>
  );
};

export default EarningsOverview;
