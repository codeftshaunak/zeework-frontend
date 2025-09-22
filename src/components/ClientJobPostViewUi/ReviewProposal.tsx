
"use client";
import { Avatar } from "@chakra-ui/react";
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

export 
  const [paymentModal, setPaymentModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  
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
    if (profile?.profile?.payment_verified) setHireProfile(item), setOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row w-full">
        <div className="overflow-hidden border rounded-lg basis-full bg-white">
          <Tabs.Root onChange={(index) => setTabIndex(index)} variant="unstyled">
            <Tabs.List className="px-6 pt-4 border-b">
              <Tabs.Trigger className="px-0 text-black">All Proposals</Tabs.Trigger>
              {/* <Tab>Messaged</Tabs.Trigger> */}
            </Tabs.List>
            <Tabs.Indicator
              className="bg-fg-brand"
            />
            <Tabs.Content className="w-full">
              <Tabs.Content p={0} className="w-full">
                {isProposalsLoading ? (
                  <div>
                    <ReviewProposalSkeleton />
                  </div>
                ) : proposals?.length ? (
                  <div className="flex flex-col divider={<div className="flexDivider borderColor="gray.200" />}
                    spacing={4}
                    
                    padding={{ base: 5, sm: 8 }}
                  >
                    {proposals?.map((item, index) => {
                      const details = item.user_details;

                      return (
                        <div className="flex flex-col key={index} h-auto w-full shadow-md p-4 sm:p-6 rounded-md justify-start bg-#ffff"
                        >
                          <div className="flex flex-col}> <div className= justify-between w-full items-start"flex flex-row items-center
                             
                            >
                              <div className="w-full sm:w-auto">
                                <Avatar
                                  size="lg"
                                  name={
                                    details?.agency_name
                                      ? details.agency_name
                                      : details?.firstName +
                                        " " +
                                        details?.lastName
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
                                  <AvatarBadge`}
                                    boxSize="0.7em"
                                    left={-2}
                                    top={0}
                                  />
                                </Avatar>

                                <div className="w-full space-y-3">
                                  <div>
                                    <span
                                      onClick={() = className="font-semibold text-primary w-fit border-b border-transparent border-spacing-0 hover:border-primary cursor-pointer">
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
                                    <div}
                                    >
                                      <div className="flex flex-row items-center spacing={10}> <span className="font-bold text-[#101010] flex items-center">
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
                                    <div className="flex flex-row items-center spacing={4}"}
                                    >
                                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                        onClick={() => {
                                          setMsgIsOpen(true),
                                            setHireProfile(item);
                                        }}
                                        paddingX={5}
                                        className="w-full sm:w-auto"
                                      >
                                        Invite For Interview
                                      </button>
                                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                        paddingX={5}
                                        onClick={() => handleHireReq(item)}
                                        className="w-full sm:w-auto"
                                      >
                                        Hire
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="justify-flex-end items-flex-end flex-column"}
                              >
                                {item?.applied_by === "agency_member" && (
                                  <span className="text-white bg-gray-200 border border-green-100 px-3 rounded-full mb-2">
                                    AGENCY
                                  </span>
                                )}
                                <div className="flex flex-row items-center spacing={10}> <span className="text-lg font-bold text-[#101010] flex items-center">
                                    <FaDollarSign /> {item?.desired_price}
                                  </span>
                                  {/* <span className="text-sm font-medium text-[#6B7280]">
                                    $3M+ earned
                                  </span> */}
                                  {/* <span className="text-sm font-medium text-[#6B7280] border-b-2 block border-fg-brand">
                                    100% job success
                                  </span> */}
                                </div>
                                <div>
                                  <span className="text-md font-medium text-[#2a2a2a] flex items-center">
                                    <FaLocationDot className="text-gray-600" />{" "}
                                    {details?.location
                                      ? details?.location
                                      : details?.agency_officeLocation
                                          ?.country || "Not Found"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col className="justify-start w-full items-start"
                            >
                              <div>
                                <span className="text-[15px] font-bold mb-2 border-b">
                                  Cover Letter
                                </span>
                                <span
                                  className="mt-1 text-sm font-normal mb-4"
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: item?.cover_letter,
                                    }}
                                  />
                                </span>
                              </div>
                              <div className="flex"
                                direction="row"
                                
                                flexWrap="wrap"
                              >
                                {details?.skills?.map((skill) => (
                                  <div
                                    key={skill}}
                                    className="bg-gray.200 rounded"
                                    textColor="gray.600"
                                    paddingX={2}
                                    paddingY={{ sm: 1 }}
                                  >
                                    {skill}
                                  </div>
                                ))}
                              </div>
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
          <div >
            <div className="my-5">
              <textarea
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your message..."
                rows="4"

};
