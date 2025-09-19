import React from "react";


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
        <span>Accept Job Offer For Start Your Contract!</span>
      ) : (
        <span>Interested in discussing this job</span>
      )}

      <div className="flex flex-col md:flex-row lg:flex-col gap-5 mt-5">
        {offer ? (
          <>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full"
             
              onClick={() => setOpenModal(true)}
              isDisabled={status !== "pending" || isLoading}
              isLoading={statusValue == 1 && isLoading}
            >
              Accept Offer
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full"
              onClick={() => rejectInvite()}
              isDisabled={status !== "pending" || isLoading}
              isLoading={statusValue == 2 && isLoading}
              spinner={<BtnSpinner />}
            >
              Decline Offer
            </button>
          </>
        ) : (
          <>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full"
             
              onClick={() => setOpenModal(true)}
              isDisabled={status == 1 || status == 2 || isLoading}
              isLoading={statusValue == 1 && isLoading}
            >
              Accept Interview
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full"
              onClick={() => rejectInvite()}
              isDisabled={status == 1 || status == 2 || isLoading}
              isLoading={statusValue == 2 && isLoading}
              spinner={<BtnSpinner />}
            >
              Decline Interview
            </button>
          </>
        )}
      </div>

      <div>
        <p className="text-lg lg:text-xl font-semibold mt-10 text-center mb-1">
          About the client
        </p>
        <hr />
        <div className="flex gap-3 mt-3">
          <Avatar size="lg" name={firstName + " " + lastName} />{" "}
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
      {/* <div className="flex flex-col> <span>About the client</span> <div className="flex flex-row items-center>
                    <div className="flex flex-row items-center>
                        {[1, 2, 3, 4, 5].map((index) => <span key={index}> <IoMdStar /></span>)}
                    </div>
                    <span>(5.00) {clientDetails?.reviews?.length !== 0 ? clientDetails?.reviews?.length : ""} Reviews</span>
                </div>
                <div className="flex flex-col>
                    <span>Location</span>
                    <span>{clientDetails?.location}</span>
                </div>
            </div> */}
    </div>
  );
};
