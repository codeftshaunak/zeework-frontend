"use client";

import { Box } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { toast } from "@/lib/toast";
import queryString from "query-string";
import {
  updateOfferRequest,
  offerDetails,
} from "../../helpers/APIs/freelancerApis";
import { useRouter } from "next/navigation";
import { SocketContext } from "../../contexts/SocketContext";
import Modal from "./Modal";
import { ClientDetailsSection } from "./ClientDetailsSection";
import ConfirmModalCommon from "../ConfirmationModal/ConfirmationModalCommon";
import InvitationSkeleton from "../Skeletons/InvitationSkeleton";
import { OfferDetails } from "./OfferDetails";
import { useDispatch } from "react-redux";
import { setMyJobsData } from "../../redux/pagesSlice/pagesSlice";
import DataNotAvailable from "../DataNotAvailable/DataNotAvailable";
import { clearMessageState } from "../../redux/messageSlice/messageSlice";

const Offer = () => {
  const router = useRouter();
  const currentUrl = window.location.href;
  const { offer_id } = queryString.parseUrl(currentUrl).query;
  const [openModal, setOpenModal] = useState(false);
  const [jobDetails, setJobDetails] = useState();
  const [reject, setReject] = useState(false);
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext); // Use socket from context
  const [isLoading, setIsLoading] = useState({
    isLoading: false,
    statusValue: null,
  });
  const [loading, setLoading] = useState(false);

  const getInvitationDetails = async () => {
    setLoading(true);
    try {
      const { body, code } = await offerDetails(offer_id);
      if (code === 200) setJobDetails(body[0]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getInvitationDetails();
  }, [offer_id]);

  const performAction = async ({ messages, statusValue }) => {
    setIsLoading({
      isLoading: true,
      statusValue: null,
    });
    try {
      const { code, msg, message } = await updateOfferRequest({
        offer_id: offer_id,
        status: statusValue,
      });

      if (code === 200) {
        toast.default(msg);
        sendMessage(messages, statusValue);
        router.push("/my-jobs");
        dispatch(setMyJobsData({ userJobs: {} }));
      } else {
        toast.default(message);
      }
    } catch (error) {
      toast.default(error?.response?.data?.msg || "Error performing action");
    }
    setIsLoading({
      isLoading: false,
      statusValue: null,
    });
  };

  const handleRejectOffer = async () => {
    setIsLoading({
      isLoading: true,
      statusValue: null,
    });
    try {
      const res = await updateOfferRequest({
        offer_id: offer_id,
        status: "rejected",
      });

      if (res.code === 200) {
        // sendMessage("", "rejected");
        toast.default(res.msg);
        router.push("/my-jobs");
      } else {
        toast.default(res.msg || res.message);
      }
    } catch (error) {
      toast.default(error?.response?.data?.msg || "Error performing action");
    }
    setIsLoading({
      isLoading: false,
      statusValue: null,
    });
  };

      }
    dispatch(clearMessageState());
  };

  useEffect(() => {
    if (socket) {
      socket.emit("connect_user", { user_id: jobDetails?.freelencer_id });

      // Example: Listening for a custom event
      socket.on("chat_message", (data) => {
        // console.log("Received message:", data);
      });

      // Cleanup function
      return () => {
        // console.log("Socket disconnected");
        socket.off("chat_message");
      };
    }
  }, [socket, jobDetails]);

  const acceptInvite = (messages) =>
    performAction({ messages, statusValue: "accepted" });
  const rejectInvite = () => setReject(true);

  return (
    <Box className="w-full">
      <br />
      <br />
      <h2 className="my-3 text-2xl font-bold text-[1.6rem] text-[#374151]">
        Job Offer Details
      </h2>
      {loading ? (
        <InvitationSkeleton />
      ) : jobDetails?.client_details ? (
        <div className="grid grid-cols-3 gap-5 mt-5">
          {/* <JobDetailsSection jobDetails={jobDetails} /> */}
          <OfferDetails jobDetails={jobDetails} />
          <ClientDetailsSection
            clientDetails={jobDetails?.client_details[0]}
            status={jobDetails?.status}
            setOpenModal={setOpenModal}
            rejectInvite={rejectInvite}
            offer={true}

};

export default Offer;
