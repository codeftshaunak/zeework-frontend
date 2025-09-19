import { Text } from "@chakra-ui/react";
import { Button, Avatar } from "@chakra-ui/react";
import StarRatings from "react-star-ratings";
import { RiCloseCircleFill, RiVerifiedBadgeFill } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import BtnSpinner from "../Skeletons/BtnSpinner";

export const ClientDetailsSection = ({
  clientDetails,
  status,
  rejectInvite,
  setOpenModal,
  offer,
  isLoading: loaders,
}) => {
  const {
    firstName,
    lastName,
    location,
    avg_review,
    total_spend,
    payment_verified,
  } = clientDetails || {};
  const { isLoading, statusValue } = loaders || {};

  return (
    <div className="bg-white p-8 rounded-xl border border-[var(--bordersecondary)] h-fit">
      {offer ? (
        <Text fontSize="sm">Accept Job Offer For Start Your Contract!</Text>
      ) : (
        <Text fontSize="sm">Interested in discussing this job</Text>
      )}

      <div className="flex flex-col md:flex-row lg:flex-col gap-5 mt-5">
        {offer ? (
          <>
            <Button
              colorScheme="primary"
              width={"full"}
              onClick={() => setOpenModal(true)}
              isDisabled={status !== "pending" || isLoading}
              isLoading={statusValue == 1 && isLoading}
            >
              Accept Offer
            </Button>
            <Button
              colorScheme="primary"
              width={"full"}
              variant={"outline"}
              onClick={() => rejectInvite()}
              isDisabled={status !== "pending" || isLoading}
              isLoading={statusValue == 2 && isLoading}
              spinner={<BtnSpinner />}
            >
              Decline Offer
            </Button>
          </>
        ) : (
          <>
            <Button
              colorScheme="primary"
              width={"full"}
              onClick={() => setOpenModal(true)}
              isDisabled={status == 1 || status == 2 || isLoading}
              isLoading={statusValue == 1 && isLoading}
            >
              Accept Interview
            </Button>
            <Button
              colorScheme="primary"
              width={"full"}
              variant={"outline"}
              onClick={() => rejectInvite()}
              isDisabled={status == 1 || status == 2 || isLoading}
              isLoading={statusValue == 2 && isLoading}
              spinner={<BtnSpinner />}
            >
              Decline Interview
            </Button>
          </>
        )}
      </div>

      <div>
        <p className="text-lg lg:text-xl font-semibold mt-10 text-center mb-1">
          About the client
        </p>
        <hr />
        <div className="flex gap-3 mt-3">
          <Avatar size={"lg"} name={firstName + " " + lastName} />{" "}
          <div>
            <p className="text-xl lg:text-2xl font-semibold">
              {firstName + " " + lastName}
            </p>{" "}
            <div className="flex items-center mb-4">
              <StarRatings
                rating={avg_review}
                starDimension="18px"
                starSpacing="1px"
                starRatedColor="#22C35E"
                starEmptyColor="#8ab89b"
              />{" "}
              ({avg_review}) Reviews
            </div>
          </div>
        </div>
        <div className="flex gap-x-5 flex-wrap lg:text-lg sm:font-semibold text-gray-600">
          <p className="flex items-center">
            {payment_verified ? <RiVerifiedBadgeFill /> : <RiCloseCircleFill />}
            Payment {payment_verified ? "Verified" : "Unverified"}
          </p>{" "}
          <p>${total_spend?.toFixed()} Spend</p>{" "}
          <p className="flex items-center">
            <MdLocationOn /> {location}
          </p>
        </div>
      </div>
      {/* <VStack width="100%" marginTop="0.8rem">
                <Text textAlign="left" width="full" fontWeight="600" mb={"0"}>About the client</Text>
                <HStack justifyContent="left" width="100%" gap={"0"}>
                    <HStack gap={"0"}>
                        {[1, 2, 3, 4, 5].map((index) => <Text key={index}> <IoMdStar fontSize="20px" /></Text>)}
                    </HStack>
                    <Text>(5.00) {clientDetails?.reviews?.length !== 0 ? clientDetails?.reviews?.length : ""} Reviews</Text>
                </HStack>
                <VStack justifyContent="left" width="full" alignItems="start" gap="0">
                    <Text fontWeight="bold" textAlign="left">Location</Text>
                    <Text textAlign="left" marginBottom="0">{clientDetails?.location}</Text>
                </VStack>
            </VStack> */}
    </div>
  );
};
