"use client";

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
  const [jobDetails, setJobDetails] = useState<Record<string, any>>({});
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const sendMessage = (message, statusValue) => {
    if (socket) {
      socket.emit(
        "card_message",
        {
          sender_id: jobDetails?.freelancer_id,
          receiver_id: jobDetails?.client_id,
          message: message,
          // message_type: "offer",
          contract_ref: jobDetails?._id,
        },
        {
          title: jobDetails?.job_title,
          type: `${statusValue}_job_offer`,
          job_type: jobDetails?.job_type,
          amount: jobDetails?.hourly_rate || jobDetails?.budget,
          url: {
            client: `/contract/${jobDetails?._id}`,
            freelancer: `/active-job/submit/${jobDetails?._id}`,
          },
        }
      );
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
    <div className="w-full">
      <br />
      <br />
      <h2 className="my-3 text-2xl font-bold text-[1.6rem] text-[#374151]">
        Job Offer Details
      </h2>
      {loading ? (
        <InvitationSkeleton />
      ) : (jobDetails as any)?.client_details ? (
        <div className="grid grid-cols-3 gap-5 mt-5">
          {/* <JobDetailsSection jobDetails={jobDetails} /> */}
          <OfferDetails jobDetails={jobDetails} />
          <ClientDetailsSection
            clientDetails={(jobDetails as any)?.client_details?.[0]}
            status={(jobDetails as any)?.status}
            setOpenModal={setOpenModal}
            rejectInvite={rejectInvite}
            offer={true}
            isLoading={false}
          />
          {openModal && (
            <Modal
              setOpenModal={setOpenModal}
              openModal={openModal}
              acceptInvite={acceptInvite}
              offer={true}
              isLoading={false}
              
            />
          )}
          {reject && (
            <ConfirmModalCommon
              setOpenModal={setReject}
              openModal={reject}
              title="Reject The Offer"
              handleSubmit={handleRejectOffer}
              
            />
          )}
        </div>
      ) : (
        <DataNotAvailable onRefresh={getInvitationDetails} />
      )}
    </div>
  );
};

export default Offer;
