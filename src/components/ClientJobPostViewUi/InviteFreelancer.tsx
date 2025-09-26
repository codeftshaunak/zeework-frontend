
"use client";
import React from "react";

import {
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  Stack,
  StackDivider,
  
  
  
  
  
  Tabs,
  Tooltip,
  VStack,
} from "@/components/ui/migration-helpers";
import { toast } from "@/lib/toast";
import { useContext, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { SocketContext } from "../../contexts/SocketContext";
import { sendJobInvitation } from "../../helpers/APIs/clientApis";
import { getFreelancers } from "../../helpers/APIs/freelancerApis";
import { getInvitedFreelancer } from "../../helpers/APIs/jobApis";
import useUserActivityListener from "../../hooks/useUserActivityListener";
import { clearMessageState } from "../../redux/messageSlice/messageSlice";
import AddPaymentNotifyModal from "../Modals/AddPaymentNotifyModal";
import UniversalModal from "../Modals/UniversalModal";
import BtnSpinner from "../Skeletons/BtnSpinner";
import ReviewProposalSkeleton from "../Skeletons/ReviewProposalSkeleton";
import SmoothMotion from "../utils/Animation/SmoothMotion";
import Pagination from "../utils/Pagination/Pagination";
import InvitedFreelancerCard from "./InvitedFreelancerCard";

const InviteFreelancer = ({ appliedUsers }) => {
  const { profile } = useContext(CurrentUserContext);
  const [paymentVerifiedModal, setPaymentVerifiedModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [invitedFreelancers, setInvitedFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingInvite, setIsLoadingInvite] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isHire, setIsHire] = useState(false);
  const [isUserId, setIsUserId] = useState("");
  const [freelancerInfo, setFreelancerInfo] = useState<Record<string, any>>({});
  const [searchText, setSearchText] = useState("");
  const [active, setActiveTab] = useState(0);
  const { socket } = useContext(SocketContext);
  const router = useRouter();
  const pathname = usePathname();
  const jobDetails = location.state && location?.state?.jobDetails;
  const dispatch = useDispatch();

  // pagination details
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(searchResults?.totalLength / 20);

  const params = useParams();
  const { id } = params;

  // update user activity status
  useUserActivityListener((data) => {
    if (data) {
      setSearchResults((prev) => ({
        ...prev,
        data: prev.data.map((user) =>
          user.user_id === data.user.user_id
            ? { ...user, activity: data.status }
            : user
        ),
      }));
    }
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const { body, code } = await getFreelancers(page, null, searchText);
      if (code === 200) {
        setSearchResults(body);
      } else {
        console.error("API Response body is undefined");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const invitedFreelancer = async () => {
    try {
      setLoading(true);
      const response = await getInvitedFreelancer();

      if (response?.length) {
        setInvitedFreelancers(response);
      } else {
        console.error("API Response body is undefined");
      }
    } catch (error) {
      console.error("Error fetching invited results:", error);
    } finally {
      setLoading(false);
    }
  };

  const HandleOpenModal = (item, freelancer) => {
    setIsUserId(freelancer?.user_id);

    if (item === "hire") {
      setIsHire(true);
      setFreelancerInfo(freelancer);
    } else {
      setIsHire(false);
    }
    setOpen((prev) => !prev);
  };

  const closeModal = () => {
    setMessage("");
    setOpen(false);
  };

  const HandleTextValue = (e) => {
    if (e.target.value.trim()?.length === 0) {
      setErrorMessage("Please enter a message.");
    } else {
      setErrorMessage("");
    }
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    setIsLoadingInvite(true);
    if (isHire) {
      const {
        firstName,
        lastName,
        professional_role,
        profile_image,
        hourly_rate,
        user_id,
      } = freelancerInfo;

      router.push(`/client/hire?job=${id}&freelancer=${user_id}`);
      // const formData = {
      //   freelencer_id: isUserId,
      //   job_id: id,
      //   budget: amount
      // }
      // try {
      //   let result = await dispatch(hireFreelancerService(formData));
      //   if (result?.code == 200) {
      //     setOpen(false);
      //     setMessage("");
      //     toaster.create({
      //       title: result?.msg,
      //       type: "success",
      //       duration: 2000,
      //     });
      //   }
      // } catch (error) {
      //   setOpen(false);
      //   setMessage("");
      //   const message = error?.response?.data?.msg;
      //   toaster.create({
      //     title: message,
      //     type: "error",
      //     duration: 3000,
      //   });
      // }
    } else {
      if (message.trim()?.length === 0) {
        setErrorMessage("Please enter a message.");
      } else {
        try {
          const res = await sendJobInvitation({
            receiver_id: isUserId,
            message: message,
            job_id: id,
            offer_to: "freelancer",
          });

          if (res.code == 200) {
            if (socket && profile.profile.user_id && isUserId) {
              socket.emit(
                "card_message",
                {
                  sender_id: profile.profile.user_id,
                  receiver_id: isUserId,
                  message: message,
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
            fetchData();
            setOpen(false);
            closeModal();
            setMessage("");
          }
          toast.default(res.msg || res.response.data.msg);
        } catch (error) {
          setOpen(false);
          setMessage("");
          const message = error?.response?.data?.msg;
          toast.error(message);
        }
      }
    }
    setIsLoadingInvite(false);
  };
  const paymentStatus = useSelector((state: any) => state.toast.visible);
  console.log("Come from the job post method", paymentStatus);
  // check client payment status send freelancer hire request
  const handleHireFreelancer = (searchResult) => {
    // setPaymentVerifiedModal(!profile?.profile?.payment_verified);
    setPaymentVerifiedModal(!paymentStatus)
    if (profile?.profile?.payment_verified)
      HandleOpenModal("hire", searchResult);
  };

  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="overflow-hidden border rounded-lg basis-full bg-white">
          <Tabs.Root variant="unstyled" onChange={(index) => setActiveTab(index)}>
            <Tabs.List className="pt-4 border-b">
              <Tabs.Trigger className="px-0 text-black">Search</Tabs.Trigger>
              <Tabs.Trigger
                className="px-0 text-black"
                onClick={() => invitedFreelancer()}
              >
                Invited freelancer
              </Tabs.Trigger>
              {/* <Tabs.Trigger className="px-0 text-black">My bg-green-100</Tabs.Trigger> */}
            </Tabs.List>
            <SmoothMotion key={active}>
              <Tabs.Content>
                <Tabs.Content p={0}>
                  <div className="h-auto pt-5 pb-4">
                    <div className="flex flex-row items-center w-full justify-space-evenly mx-[auto] mb-[0.9rem]"
                      style={{paddingLeft: '20px', paddingRight: '20px'}}
                    >
                      <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        name="searchText"
                        placeholder="Search for open positions..."
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") fetchData();
                        }}
                        isDisabled={loading}
                        focusBorderColor="green.100"
                      />

                      <button
                        type="submit"
                        disabled={loading}
                        onClick={fetchData}
                      >
                        <div
                          backgroundColor={"var(--primarycolor)"}
                          className="text-white font-800 text-1.5rem border p-[5px 40px] rounded cursor-pointer"
                          transition="0.3s ease-in-out"
                          _hover={{
                            backgroundColor: "#fff",
                            color: "#000",
                          }}
                        >
                          <BiSearchAlt />
                        </div>
                      </button>
                    </div>
                    {loading ? (
                      <ReviewProposalSkeleton />
                    ) : searchResults?.data?.length ? (
                      <div className="flex flex-col spacing={5}"
                        
                        paddingX={5}
                      >
                        {searchResults?.data?.map((searchResult) => {
                          const alreadyApplied = appliedUsers?.includes(
                            searchResult.user_id
                          );

                          return (
                            <div key={searchResult?._id}>
                              <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-center border p-5 sm:p-8 rounded-2xl">
                                <Avatar
                                  src={searchResult?.profile_image}
                                  name={
                                    searchResult?.firstName +
                                    searchResult?.lastName
                                  } className="rounded"
                                  objectFit="cover"
                                />

                                <div className="w-full">
                                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 justify-between items-center">
                                    <div className="flex gap-3">
                                      <div>
                                        <div className="flex flex-row items-center">
                                          <h2 className="text-lg font-semibold text-[var(--primarycolor)]">
                                            {searchResult?.firstName}{" "}
                                            {searchResult?.lastName}
                                          </h2>
                                          {searchResult?.activity ===
                                            "online" && (
                                              <div className="sm:ml-5 px-2 rounded text-xs font-medium border border-primary text-primary text-center">
                                                Available Now
                                              </div>
                                            )}
                                        </div>

                                        <p className="text-md">
                                          {searchResult?.professional_role}
                                        </p>

                                        <p className="text-md">
                                          ${searchResult?.hourly_rate}/hr
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex"
                                        direction="row"
                                        spacing={4}
                                        
                                      >
                                        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                          onClick={() =>
                                            handleHireFreelancer(searchResult)
                                          }
                                        >
                                          Hire
                                        </button>
                                        <Tooltip
                                          hasArrow
                                          // label={
                                          //   "Freelancer already applied for this job"
                                          // }
                                          placement="top"
                                          isDisabled={!alreadyApplied}
                                        >
                                          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                            isDisabled={alreadyApplied}
                                            onClick={() =>
                                              HandleOpenModal(
                                                "inviteToJob",
                                                searchResult
                                              )
                                            }
                                          >
                                            {searchResult?.invitation_status ===
                                              0
                                              ? "Invited"
                                              : "Invite to Job"}
                                          </button>
                                        </Tooltip>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div className="flex spacing={4}"
                                      direction="row"
                                      
                                    >
                                      {searchResult?.length > 0 &&
                                        searchResult?.skills.map(
                                          (skill, idx) => (
                                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                              key={idx}
                                            >
                                              {skill}
                                            </button>
                                          )
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {/* Pagination */}
                        <Pagination
                          totalPages={totalPages}
                          currentPage={page}
                          onPageChange={setPage}
                        />
                      </div>
                    ) : (
                      <div className="p-5 text-center">
                        Haven&apos;t match any profile!
                      </div>
                    )}
                  </div>
                </Tabs.Content>
                <Tabs.Content p={0}>
                  {/* Invited freelancer */}
                  <Tabs.Content p={0}>
                    <div className="h-auto p-3 bg-white">
                      {loading ? (
                        <ReviewProposalSkeleton />
                      ) : invitedFreelancers?.filter(
                        (profile) => profile?.job_id === id
                      )?.length ? (
                        <div className="flex flex-col space-y-4 p-5"
                        >
                          {invitedFreelancers
                            ?.filter((profile) => profile?.job_id === id)
                            ?.map((profile) => (
                              <InvitedFreelancerCard
                                key={profile._id}
                                profile={profile}
                              />
                            ))}
                        </div>
                      ) : (
                        <>You haven&apos;t invited freelancer!</>
                      )}
                    </div>
                  </Tabs.Content>
                </Tabs.Content>
                {/* <Tabs.Content>
          <p>My Hire!</p>
        </Tabs.Content> */}
              </Tabs.Content>
            </SmoothMotion>
          </Tabs.Root>
        </div>
        <UniversalModal
          isModal={open}
          setIsModal={setOpen}
          title={
            isHire
              ? "Are you hire this freelancer?"
              : "Enter your message for invite"
          }
        >
          <div>
            {!isHire && (
              <div>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your message..."
                  rows={4}
                  value={message}
                  onChange={HandleTextValue}
                />
                <p className="text-red-500 text-sm">{errorMessage}</p>
              </div>
            )}
            <div className="flex justify-end mt-5">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={closeModal}
                marginRight={5}
              >
                Cancel
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                isLoading={isLoadingInvite}
                loadingText={isHire ? "Sure" : "Send"}
                type="submit"
                spinner={<BtnSpinner />}
                onClick={() => handleSend()}
              >
                {isHire ? "Sure" : "Send"}
              </button>
            </div>
          </div>
        </UniversalModal>
      </div>

      {/* Notify Payment Status Before Hiring a Freelancer */}
      <AddPaymentNotifyModal
        isOpen={paymentVerifiedModal}
        setIsOpen={setPaymentVerifiedModal}
      />
    </>
  );
};

export default InviteFreelancer;
