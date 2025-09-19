"use client";

import { HStack, VStack } from "@chakra-ui/react";
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
      <h2 className="mt-8 mb-8  text-[25px] font-semibold">
        {"Earnings Overview"}
      </h2>

      {isLoading ? (
        <HorizontalCardSkeleton />
      ) : (
        <HStack className="max-md:!flex-col" justifyContent={"space-between"}>
          <VStack
            width={"400px"}
            height={"10rem"}
            backgroundColor={"#ffff"}
            border={"1px solid #D1D5DA"}
            borderRadius={"10px"}
            cursor={"pointer"}
            alignItems={"center"}
            justifyContent={"center"}
            _hover={{
              border: "1px solid var(--primarycolor)",
              transition: "0.3s ease-in-out",
            }}
            className="max-md:!w-full"
            onClick={() => onClick({ theme: "in-progress" })}
          >
            <p className="font-semibold text-4xl">
              ${balance?.progress?.toFixed(2) || "0.00"}
            </p>
            <p className="text-lg capitalize">Work In Progress</p>
          </VStack>

          <VStack
            width={"400px"}
            height={"10rem"}
            backgroundColor={"#ffff"}
            border={"1px solid #D1D5DA"}
            borderRadius={"10px"}
            cursor={"pointer"}
            alignItems={"center"}
            justifyContent={"center"}
            _hover={{
              border: "1px solid var(--primarycolor)",
              transition: "0.3s ease-in-out",
            }}
            className="max-md:!w-full"
            onClick={() => onClick({ theme: "in-review" })}
          >
            <p className="font-semibold text-4xl">
              ${balance?.review?.toFixed(2) || "0.00"}
            </p>
            <p className="text-xl capitalize">Work In review</p>
          </VStack>

          <VStack
            width={"400px"}
            height={"10rem"}
            backgroundColor={"#ffff"}
            border={"1px solid #D1D5DA"}
            borderRadius={"10px"}
            cursor={"pointer"}
            alignItems={"center"}
            justifyContent={"center"}
            _hover={{
              border: "1px solid var(--primarycolor)",
              transition: "0.3s ease-in-out",
            }}
            className="max-md:!w-full"
            onClick={() => onClick({ theme: "in-progress" })}
          >
            <p className="font-semibold text-4xl">
              ${balance?.pending?.toFixed(2) || "0.00"}
            </p>
            <p className="text-lg capitalize">Processing</p>
          </VStack>

          <VStack
            width={"400px"}
            height={"10rem"}
            backgroundColor={"#ffff"}
            border={
              availableBalanceDetails
                ? "1px solid var(--primarycolor)"
                : "1px solid #D1D5DA"
            }
            borderRadius={"10px"}
            cursor={"pointer"}
            alignItems={"center"}
            justifyContent={"center"}
            _hover={{
              border: "1px solid var(--primarycolor)",
              transition: "0.3s ease-in-out",
            }}
            className="max-md:!w-full"
            onClick={() => onClick({ theme: "available" })}
          >
            <p className="font-semibold text-4xl">
              ${truncateToTwoDecimals(activeagency ? balance?.available : availableBalance)}
            </p>
            <p className="text-lg">Available Funds</p>
          </VStack>
        </HStack>
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
