"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { addDays, format } from "date-fns";
import { toast } from "@/lib/toast";
import StarRatings from "react-star-ratings";
import { RiCloseCircleFill, RiVerifiedBadgeFill } from "react-icons/ri";
import {
  MdCheckCircleOutline,
  MdLocationOn,
  MdOutlineCancel,
} from "react-icons/md";
import InvitationSkeleton from "../Skeletons/InvitationSkeleton";
import { getPurchasesGigInfo } from "../../helpers/APIs/freelancerApis";
import DataNotAvailable from "../DataNotAvailable/DataNotAvailable";
import { updateGigPurchasesRequest } from "../../helpers/APIs/gigApis";
import BtnSpinner from "../Skeletons/BtnSpinner";
import UniversalModal from "../Modals/UniversalModal";

const PurchasedGigDetails = () => {
  const [gigInfo, setGigInfo] = useState({});
  const { gig_id } = useParams();
  const [isModal, setIsModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [resLoading, setResLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { title, pricing, images } = gigInfo?.gig_details || {};
  const {
    firstName,
    lastName,
    location: clientLocation,
    profile_image,

    avg_review,
    total_amount_spend,
  } = gigInfo?.client_details || {};
  const router = useRouter();

  const gigDetails = async () => {
    setIsLoading(true);
    try {
      const { code, body } = await getPurchasesGigInfo(gig_id);
      if (code === 200) setGigInfo(body[0]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const dataAvailable = gigInfo?.gig_details && gigInfo?.client_details;

  const handleGigPurchasesRequest = async (status) => {
    setResLoading(true);
    try {
      const res = await updateGigPurchasesRequest({
        gig_id: gigInfo.gig_id,
        status: status,
      });
      toast.default(res?.msg ||
          res.response.data.msg ||
          res.response.data.message ||
          "Something went wrong!");

      if (res.code === 200) router.push("/");
    } catch (error) {
      toast.warning(error?.response?.data?.msg || "Something went wrong!");
      console.error(error);
    }
    setResLoading(false);
    setIsModal(false);
    setModalType("");
  };

  useEffect(() => {
    gigDetails();
  }, [gig_id]);

  return (
    <>
      {isLoading ? (
        <InvitationSkeleton />
      ) : dataAvailable ? (
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 w-full h-fit flex gap-10 bg-white p-8 rounded-xl border border-[var(--bordersecondary)]">
            <div>
              <img
                src={images?.[0]}
                alt="gig"
                className="w-80 h-56 object-cover rounded"
              />
            </div>
            <div className="text-lg">
              <p className="text-3xl font-semibold tracking-wide">{title}</p>
              <p className="mt-2">
                Service price:{" "}
                <span className="font-semibold">${pricing?.service_price}</span>
              </p>
              <p>
                Delivery time:{" "}
                <span className="font-semibold">{pricing?.delivery_days}</span>
              </p>
              <p>
                Number of revision:{" "}
                <span className="font-semibold">{pricing?.revisions}</span>
              </p>
              <div className="mt-5 flex items-start gap-2">
                <FaRegClock className="text-lg mt-1" />
                <div>
                  <p className="font-semibold capitalize">
                    {pricing?.delivery_days
                      ? `${pricing.delivery_days} days delivery - ${format(
                          addDays(new Date(), pricing.delivery_days),
                          "MMM dd, yyyy"
                        )}`
                      : null}
                  </p>
                  <p className="text-gray-300 text-sm">
                    You may complete the task by this date.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white p-8 rounded-xl border border-[var(--bordersecondary)]">
              <p className="text-sm text-gray-700">
                To increase your earnings accept the purchase offer
              </p>
              <div className="grid gap-5 mt-5">
                <button
                  disabled={
                    gigInfo?.status === "reject" ||
                    gigInfo?.status === "accept" ||
                    resLoading
                  }
                  onClick={() => {
                    setModalType("accept"), setIsModal(true);
                  }}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                >
                  {gigInfo?.status === "accept"
                    ? "Offer Accepted"
                    : "Accept Offer"}
                </button>
                <button
                  disabled={gigInfo?.status === "reject" || resLoading}
                  onClick={() => {
                    setModalType("reject"), setIsModal(true);
                  }}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
                >
                  {gigInfo?.status === "reject"
                    ? "Offer Declined"
                    : "Decline Offer"}
                </button>
              </div>
              <div>
                <p className="text-xl font-semibold mt-10 text-center mb-1">
                  About the client
                </p>
                <hr />
                <div className="flex gap-3 mt-3">
                  <Avatar
                    src={profile_image}
                    name={firstName + " " + lastName}
                    size="lg"
                  />{" "}
                  <div>
                    <p className="text-2xl font-semibold">
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
                <div className="flex gap-5 flex-wrap text-lg font-semibold text-gray-600">
                  <p className="flex items-center">
                    {total_amount_spend ? (
                      <RiVerifiedBadgeFill />
                    ) : (
                      <RiCloseCircleFill />
                    )}{" "}
                    Payment {total_amount_spend ? "Verified" : "Unverified"}
                  </p>{" "}
                  <p>${total_amount_spend} Spend</p>{" "}
                  <p className="flex items-center">
                    <MdLocationOn /> {clientLocation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DataNotAvailable onRefresh={gigDetails} />
      )}

      <UniversalModal isModal={isModal} setIsModal={setIsModal}>
        <div
          className={`w-[72px] h-[72px] flex items-center justify-center rounded-full mx-auto ${
            modalType === "accept" ? "bg-green-50" : "bg-red-50"
          }`}
        >
          {modalType === "accept" ? (
            <MdCheckCircleOutline className="text-4xl text-primary" />
          ) : (
            <MdOutlineCancel className="text-4xl text-red-500" />
          )}
        </div>
        <p className="text-xl font-semibold text-center">
          Are you sure you want to {modalType}?
        </p>
        <div className="flex gap-5 sm:gap-10 mt-4 sm:mt-10">
          <button
            onClick={() => {
              setIsModal(false), setModalType("");
            }}
            disabled={resLoading}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition disabled:opacity-50"
          >
            No, I don&apos;t want
          </button>
          <button
            disabled={resLoading}
            onClick={() => handleGigPurchasesRequest(modalType)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {resLoading ? (
              <>
                <BtnSpinner />
                <span className="ml-2">Yes, I want to {modalType}</span>
              </>
            ) : (
              `Yes, I want to ${modalType}`
            )}
          </button>
        </div>
      </UniversalModal>
    </>
  );
};

export default PurchasedGigDetails;
