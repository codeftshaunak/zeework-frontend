"use client";

import React, { useContext, useEffect, useState } from "react";
import { Box, Text } from "@/components/ui/migration-helpers";
import { toast } from "@/lib/toast";
import queryString from "query-string";
import {
  acceptInvitation,
  invitationDetails,
} from "../../helpers/APIs/freelancerApis";
import { useRouter } from "next/navigation";
import { JobDetailsSection } from "./JobDetails";
import { SocketContext } from "../../contexts/SocketContext";
import Modal from "./Modal";
import { ClientDetailsSection } from "./ClientDetailsSection";
import InvitationSkeleton from "../Skeletons/InvitationSkeleton";
import DataNotAvailable from "../DataNotAvailable/DataNotAvailable";
import { clearMessageState } from "../../redux/messageSlice/messageSlice";
import { useDispatch } from "react-redux";

const Interview = () => {
  const router = useRouter();
  const currentUrl = window.location.href;
  const { job_id, invite_id } = queryString.parseUrl(currentUrl).query;
  const [openModal, setOpenModal] = useState(false);
  const [jobDetails, setJobDetails] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState({
    isLoading: false,
    statusValue: null,
  });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { socket } = useContext(SocketContext); // Use socket from context
  const getInvitationDetails = async () => {
    setLoading(true);
    try {
      const { body, code } = await invitationDetails(invite_id);
      if (code === 200) setJobDetails(body[0]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getInvitationDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invite_id]);

  const performAction = async ({ messages, statusValue }) => {
    setIsLoading({ isLoading: true, statusValue: statusValue });
    try {
      const { code, msg } = await acceptInvitation({
        job_id: job_id,
        invite_id: invite_id,
        status: statusValue,
      });

      if (code === 200 && statusValue == 1) {
        sendMessage(messages);
      }

      if (code === 200) {
        toast.default(statusValue == 1
              ? "You’ve accept the interview request"
              : "You’ve reject the interview request");
        router.push("/");
      } else {
        toast.default(msg);
      }
    } catch (error) {
      toast.default(error?.response?.data?.msg || "Error performing action");
    }
    setIsLoading({ isLoading: false, statusValue: null });
  };

  const sendMessage = (message) => {
    if (socket) {
      socket.emit(
        "card_message",
        {
          sender_id: (jobDetails as any)?.receiver_id,
          receiver_id: (jobDetails as any)?.sender_id,
          message: message,
          // message_type: "invitation",
          contract_ref: (jobDetails as any)?._id,
        },
        {
          title: (jobDetails as any)?.job_details?.[0]?.title,
          type: "accepted_job_interview",
          job_type: (jobDetails as any)?.job_details?.[0]?.job_type,
          amount: (jobDetails as any)?.job_details?.[0]?.amount,
        }
      );
    }
    dispatch(clearMessageState());
  };

  useEffect(() => {
    if (socket) {
      socket.emit("connect_user", { user_id: (jobDetails as any)?.receiver_id });

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
    performAction({ messages, statusValue: "1" });

  const rejectInvite = () => performAction({ messages: "", statusValue: "2" });

  return (
    <Box className="w-full">
      <Text
        marginTop={{ base: 3, sm: 5, lg: 10 }}
        className="font-medium">
        Invitation to Interview
      </Text>
      {loading ? (
        <InvitationSkeleton />
      ) : jobDetails?.job_details ? (
        <div className="grid lg:grid-cols-3 sm:gap-5 mt-3 sm:mt-5 lg:mt-10">
          <JobDetailsSection jobDetails={jobDetails} />
          <ClientDetailsSection
            clientDetails={jobDetails?.client_details?.[0]}
            status={jobDetails?.status}
            setOpenModal={setOpenModal}
            rejectInvite={rejectInvite}
            offer={false}
            isLoading={false}
            
          />

          {openModal && (
            <Modal
              openModal={openModal}
              setOpenModal={setOpenModal}
              acceptInvite={acceptInvite}
              offer={false}
              isLoading={false}
            />
          )}
        </div>
      ) : (
        <DataNotAvailable onRefresh={getInvitationDetails} />
      )}
    </Box>
  );
};

export default Interview;
