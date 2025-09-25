"use client";
import React from "react";

import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Stack,
  Tabs,
  Avatar,
  StackDivider,
  AvatarBadge,
} from "@/components/ui/migration-helpers";
import { toast } from "@/lib/toast";
import { useRouter, usePathname } from "next/navigation";
import { useContext, useState } from "react";
import UniversalModal from "../Modals/UniversalModal";
import { getAgencyById } from "../../helpers/APIs/agencyApis";
import ReviewProposalSkeleton from "../Skeletons/ReviewProposalSkeleton";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { MdPayment } from "react-icons/md";
import { getFreelancerById } from "../../helpers/APIs/freelancerApis";
import { FaLocationDot } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { SocketContext } from "../../contexts/SocketContext";
import { sendJobInvitation } from "../../helpers/APIs/clientApis";
import { clearMessageState } from "../../redux/messageSlice/messageSlice";
import { useDispatch } from "react-redux";
import ErrorMsg from "../utils/Error/ErrorMsg";
import AddPaymentNotifyModal from "../Modals/AddPaymentNotifyModal";

export const ReviewProposal = ({ proposals, isProposalsLoading }) => {
  const { profile } = useContext(CurrentUserContext);
  const [paymentModal, setPaymentModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const pathname = usePathname();
  const jobDetails = location.state && location.state.jobDetails;
  const [open, setOpen] = useState(false);
  const [msgIsOpen, setMsgIsOpen] = useState(null);
  const [hireProfile, setHireProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSend = async () => {
    const { user_id, applied_by } = hireProfile;
    setIsLoading(true);
    try {
      const { body, code } =
        applied_by === "freelancer"
          ? await getFreelancerById(user_id)
          : await getAgencyById(user_id);

      if (code === 200) {
        const {
          firstName,
          lastName,
          professional_role,
          profile_image,
          hourly_rate,
          agency_name,
          agency_profileImage,
          agency_hourlyRate,
          user_id,
          _id,
        } = body;

        router.push(
          `/client/hire?job=${jobDetails._id}&${
            applied_by === "freelancer"
              ? `freelancer=${user_id}`
              : `agency=${_id}`
          }`
        );
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    setOpen(false);
    setHireProfile(null);
  };

  // send interview request
  const handleInterviewRequest = async (data) => {
    setIsLoading(true);
    try {
      const res = await sendJobInvitation({
        receiver_id: hireProfile.user_id,
        message: data.message,
        job_id: hireProfile.job_id,
        offer_to: hireProfile.applied_by,
      });

      if (res.code == 200) {
        if (socket && profile.profile.user_id) {
          socket.emit(
            "card_message",
            {
              sender_id: profile.profile.user_id,
              receiver_id: hireProfile.user_id,
              message: data.message,
              message_type: "invitation",
              contract_ref: res.body?.job_invite_id,
            },
            {
              title: jobDetails.title,
              type: "job_invitation",
              job_type: jobDetails.job_type,
              amount: jobDetails.amount,
              url: {
                freelancer: `/message/invitation?job_id=${jobDetails._id}&invite_id=${res.body?.job_invite_id}`,
                client: `/client-jobDetails/${jobDetails._id}`,
              },
            }
          );
        }
        dispatch(clearMessageState());
      }

      toast.default(res.msg || res.response.data.msg);
    } catch (error) {
      console.log(error);
      toast.warning(error.response.data.msg);
    }
    setMsgIsOpen(false);
    reset();
    setIsLoading(false);
    setHireProfile({});
  };

  const handleHireReq = (item) => {
    // check client payment status
    setPaymentModal(!profile?.profile?.payment_verified);
    if (profile?.profile?.payment_verified)
      (setHireProfile(item), setOpen(true));
  };

  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row w-full">
        <div className="overflow-hidden border rounded-lg basis-full bg-white">
          <Tabs.Root
            onChange={(index) => setTabIndex(index)}
            variant="unstyled"
          >
            <Tabs.List className="px-6 pt-4 border-b">
              <Tabs.Trigger className="px-0 text-black">
                All Proposals
              </Tabs.Trigger>
              {/* <Tab>Messaged</Tabs.Trigger> */}
            </Tabs.List>
            <Tabs.Indicator className="bg-fg-brand" />
            <Tabs.Content className="w-full">
              {isProposalsLoading ? (
                <div>
                  <ReviewProposalSkeleton />
                </div>
              ) : proposals?.length ? (
                <div
                  className="flex flex-col"
                  style={{
                    gap: "16px",
                    padding: "20px 32px",
                  }}
                >
                  {proposals?.map((item, index) => {
                    const details = item.user_details;

                    return (
                      <div
                        key={index}
                        className="flex flex-col h-auto w-full shadow-md p-4 sm:p-6 rounded-md justify-start bg-white"
                      >
                        <div className="flex flex-row items-center justify-between w-full">
                          <div className="w-full sm:w-auto">
                            <Avatar
                              size="lg"
                              name={
                                details?.agency_name
                                  ? details.agency_name
                                  : details?.firstName + " " + details?.lastName
                              }
                              src={
                                details?.profile_image
                                  ? details?.profile_image
                                  : details?.agency_profileImage
                              }
                              onClick={() =>
                                router.push(
                                  item.applied_by === "agency_member"
                                    ? `/profile/a/${item?.user_id}`
                                    : `/profile/f/${item?.user_id}`
                                )
                              }
                            >
                              <AvatarBadge boxSize="0.7em" left={-2} top={0} />
                            </Avatar>

                            <div className="w-full space-y-3">
                              <div>
                                <span
                                  className="font-semibold text-primary w-fit border-b border-transparent border-spacing-0 hover:border-primary cursor-pointer"
                                  onClick={() =>
                                    router.push(
                                      item.applied_by === "agency_member"
                                        ? `/profile/a/${item?.user_id}`
                                        : `/profile/f/${item?.user_id}`
                                    )
                                  }
                                >
                                  {details?.agency_name
                                    ? details.agency_name
                                    : details?.firstName +
                                      " " +
                                      details?.lastName}
                                </span>
                                <div>
                                  <div className="flex flex-row items-center space-x-10">
                                    <span className="font-bold text-[#101010] flex items-center">
                                      <FaDollarSign /> {item?.desired_price}
                                    </span>
                                    <span className="font-medium text-[#2a2a2a] flex items-center">
                                      <FaLocationDot className="text-gray-600" />{" "}
                                      {details?.location
                                        ? details?.location
                                        : details?.agency_officeLocation
                                            ?.country || "Not Found"}
                                    </span>
                                  </div>
                                  {item?.applied_by === "agency_member" && (
                                    <span className="text-white bg-gray-200 border border-green-100 px-2 rounded-full mb-2 text-sm w-fit">
                                      AGENCY
                                    </span>
                                  )}
                                </div>
                                <span className="text-sm font-medium text-[#6B7280]">
                                  {details?.agency_name
                                    ? details?.agency_tagline
                                    : details?.professional_role}
                                </span>
                              </div>
                              <div>
                                <div className="flex flex-row items-center gap-4">
                                  <button
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full sm:w-auto px-5"
                                    onClick={() => {
                                      (setMsgIsOpen(true),
                                        setHireProfile(item));
                                    }}
                                  >
                                    Invite For Interview
                                  </button>
                                  <button
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full sm:w-auto px-5"
                                    onClick={() => handleHireReq(item)}
                                  >
                                    Hire
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="justify-end items-end flex-col">
                            {item?.applied_by === "agency_member" && (
                              <span className="text-white bg-gray-200 border border-green-100 px-3 rounded-full mb-2">
                                AGENCY
                              </span>
                            )}
                            <div className="flex flex-row items-center gap-10">
                              <span className="text-lg font-bold text-[#101010] flex items-center">
                                <FaDollarSign /> {item?.desired_price}
                              </span>
                            </div>
                            <div>
                              <span className="text-md font-medium text-[#2a2a2a] flex items-center">
                                <FaLocationDot className="text-gray-600" />{" "}
                                {details?.location
                                  ? details?.location
                                  : details?.agency_officeLocation?.country ||
                                    "Not Found"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-start w-full items-start">
                          <div>
                            <span className="text-[15px] font-bold mb-2 border-b">
                              Cover Letter
                            </span>
                            <span className="mt-1 text-sm font-normal mb-4">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item?.cover_letter,
                                }}
                              />
                            </span>
                          </div>
                          <div className="flex flex-row flex-wrap">
                            {details?.skills?.map((skill) => (
                              <div
                                key={skill}
                                className="bg-gray-200 rounded text-gray-600 px-2 py-1"
                              >
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <span>There are no proposals for this job!</span>
                </div>
              )}
            </Tabs.Content>
            <Tabs.Content>
              <span>Messaged!</span>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>

      {/* Send Interview Request */}
      <UniversalModal
        isModal={msgIsOpen}
        setIsModal={setMsgIsOpen}
        title="Enter your message"
      >
        <form onSubmit={handleSubmit(handleInterviewRequest)}>
          <div>
            <div className="my-5">
              <textarea
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your message..."
                rows="4"
                {...register("message", {
                  required: "Interview message is required",
                })}
              />
              {errors.message && <ErrorMsg msg={errors.message.message} />}
            </div>
            <div className="flex justify-end mt-5">
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground mr-5"
                onClick={() => setMsgIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                type="submit"
                disabled={isLoading}
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </UniversalModal>

      {/* Send Job Offer Request */}
      <UniversalModal isModal={open} setIsModal={setOpen} title="Are you sure?">
        <div className="flex justify-end mt-5">
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground mr-5"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={() => handleSend()}
            disabled={isLoading}
          >
            Sure
          </button>
        </div>
      </UniversalModal>

      {/* Notify Payment Status Before Hiring a Freelancer */}
      <AddPaymentNotifyModal
        isOpen={paymentModal}
        setIsOpen={setPaymentModal}
      />
    </>
  );
};
