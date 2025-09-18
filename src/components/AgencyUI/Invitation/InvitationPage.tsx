"use client";

import React, { useContext, useEffect, useState } from "react";
import { toaster } from "@/lib/providers";
import {
  acceptAgencyInvitation,
  acceptInvitation,
  invitationDetails,
} from "../../../helpers/APIs/freelancerApis";
import { useRouter } from "next/navigation";
import { SocketContext } from "../../../contexts/SocketContext";
import { ClientDetailsSection } from "../../Invitation/ClientDetailsSection";
import Modal from "../../Invitation/Modal";
import { JobDetailsSection } from "../../Invitation/JobDetails";
import AgencyDetails from "../../Invitation/AgencyDetails";

const InterviewPage = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [jobDetails, setJobDetails] = useState();

  const { socket } = useContext(SocketContext);

  // const getInvitationDetails = async () => {
  //     try {
  //         const response = await invitationDetails(invite_id);
  //         setJobDetails(response[0]);
  //     } catch (error) {
  //         console.error(error);
  //     }
  // };

  // useEffect(() => {
  //     getInvitationDetails();
  // }, [invite_id]);

  // const performAction = async ({ statusValue }) => {
  //     try {
  //         const response = await acceptAgencyInvitation({
  //             "invite_id": invite_id,
  //             "status": statusValue,
  //         });
  //         if (response.code === 200) {
  //             const message = statusValue === "1" ? "Invitation Accepted Successfully!!!" : "You've Rejected Interview!!!";
  //             toaster.create({ title: message, duration: '3000', colorScheme: statusValue === "1" ? 'green' : 'warning', position: 'top-right' });
  //             router.push("/message");
  //         }
  //     } catch (error) {
  //         toaster.create({ title: "Error performing action", duration: '3000', position: 'top-right', status: 'warning', isClosable: true });
  //     }
  // };

  // const sendMessage = (message) => {
  //     console.log(message);
  //     if (socket) {
  //         socket.emit("chat_message", {
  //             sender_id: jobDetails?.receiver_id,
  //             receiver_id: jobDetails.sender_id,
  //             message: message,
  //             message_type: 1,
  //         });
  //     }
  // };

  // useEffect(() => {
  //     if (socket) {
  //         console.log('Socket connected');
  //         socket.emit("connect_user", { user_id: jobDetails?.receiver_id });

  //         // Example: Listening for a custom event
  //         socket.on("chat_message", (data) => {
  //             console.log("Received message:", data);
  //         });

  //         // Cleanup function
  //         return () => {
  //             console.log('Socket disconnected');
  //             socket.off("chat_message");
  //         };
  //     }
  // }, [socket, jobDetails]);

  return (
    <Box width="90%" padding="1rem 0">
      <Text fontWeight="500" fontSize="3xl" textAlign="left">
        Agency Invitation
      </Text>
      <HStack
        justifyContent="space-between"
        padding="2rem 0"
        alignItems="start"
      >
        <AgencyDetails />
      </HStack>
    </Box>
  );
};

export default InterviewPage;
