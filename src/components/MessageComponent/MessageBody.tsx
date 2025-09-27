/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { toast } from "@/lib/toast";
import React, { useContext, useEffect, useState } from "react";
import { TbMessageCancel } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useParams } from "next/navigation";
import { SocketContext } from "../../contexts/SocketContext";
import { deleteSingleMessage } from "../../helpers/APIs/messageApis";
import { setMessageUsers } from "../../redux/messageSlice/messageSlice";
import UniversalModal from "../Modals/UniversalModal";
import BtnSpinner from "../Skeletons/BtnSpinner";
import MessageHeader from "./MessageHeader";
import MessageInput from "./MessageInput";
import SingleText from "./SingleText";
import { Box, Button, VStack } from "../ui/migration-helpers";

const MessageBody = ({ data, selectedUser, userDetails, isAgencyId }) => {
  const users = useSelector((state: any) => state.message.users);
  const [messageData, setMessageData] = useState(data?.messages || []);
  const [isModal, setIsModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedMsgId, setSelectedMsgId] = useState("");
  const [actionIsLoading, setActionIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const receiverDetails = data?.reciever_details;
  const { contract_details } = userDetails || {};
  const searchParams = useSearchParams();
  const contract_ref = searchParams.get("contract_ref");
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const { socket } = useContext(SocketContext);
  const profile = useSelector((state: any) => state.profile);
  const senderDetails = isAgencyId ? profile.agency : profile.profile;
  const role = useSelector((state: any) => state.auth.role);
  const userId = isAgencyId ? isAgencyId : senderDetails.user_id;
  const socketUser = senderDetails.user_id;
  const dispatch = useDispatch();

  // Scroll to the bottom when the component is first rendered or when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messageData, message]);

  // Mark messages as read when they are displayed
  useEffect(() => {
    if (messageData?.length && socket) {
      messageData?.forEach((msg) => {
        if (!msg.is_read && msg.receiver_id === userId) {
          socket.emit("message_read", {
            message_id: msg._id,
            user_id: userId,
          });
        }
      });
    }
  }, [messageData, userId, socket]);

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  // Update message data when new data is received
  useEffect(() => {
    setMessageData(data?.messages);
  }, []);

  // Handle sending a new message
  const handleSendMessage = () => {
    sendMessage(message);
    setMessage("");
  };

  // Send a new message to the server
  const sendMessage = (message) => {
    setIsLoading(true);
    socket.emit("connect_user", { user_id: socketUser });
    socket.emit(
      "chat_message",
      {
        sender_id: userId,
        receiver_id: selectedUser,
        message: removeTrailingEmptyTags(message),
        contract_ref: contract_details?.contract_ref,
      },
      (response) => {
        if (response?.status === "success") {
          setIsLoading(false);
          // setMessageData((prev) => [...prev, { ...response.data }]);

          updateCommunicatedUser();
        }
      }
    );
  };

  // Update the latest communicated user in the state
  const updateCommunicatedUser = () => {
    const updatedUsers = users.map((user) => {
      const receiverId = user.user_details?.agency_name
        ? user.user_details._id
        : user.user_details.user_id;
      if (
        user.contract_details.contract_ref === contract_details.contract_ref &&
        receiverId === selectedUser
      ) {
        return {
          ...user,
          contract_details: {
            ...user.contract_details,
            activity: new Date().toISOString(),
          },
        };
      }
      return user;
    });
    if (updatedUsers?.length) dispatch(setMessageUsers(updatedUsers));
  };

  // Handle receiving new messages from the socket
  useEffect(() => {
    socket?.emit("connect_user", { user_id: socketUser });
    socket?.on("receive_message", (data, cardDetails, newUser) => {
      data.created_at = new Date();
      setMessageData((prevMessageData) => {
        const isRepeated =
          prevMessageData.length > 0 &&
          prevMessageData[prevMessageData.length - 1].sender_id ===
            data.sender_id;

        if (
          data.contract_ref === contract_ref &&
          (data.receiver_id === id || data.sender_id === id)
        ) {
          return [...prevMessageData, { ...data, cardDetails, isRepeated }];
        } else {
          if (newUser) {
            dispatch(setMessageUsers([...users, newUser]));
          } else if (data.contract_ref !== contract_ref) {
            const updateUsers = users.map((item) => {
              if (
                item.contract_details.contract_ref === data.contract_ref &&
                (item.contract_details.receiver_id === data.sender_id ||
                  item.contract_details.sender_id === data.sender_id)
              ) {
                return {
                  ...item,
                  isRead: false,
                  contract_details: {
                    ...item.contract_details,
                    activity: new Date().toISOString(),
                  },
                };
              }
              return item;
            });
            dispatch(setMessageUsers(updateUsers));
          }
          return prevMessageData;
        }
      });
    });

    return () => {
      socket?.off("receive_message");
    };
     
  }, [socket, contract_ref, id, socketUser, users, dispatch]);

  const handleDelete = async (id) => {
    setActionIsLoading(true);
    try {
      const { code, msg } = await deleteSingleMessage({
        _id: id,
        profile: isAgencyId ? "agency" : "user",
      });

      if (code === 200) {
        toast.default(msg);
        setMessageData((prev) =>
          prev.filter((item) => item?._id !== selectedMsgId)
        );
      }
    } catch (error) {
      toast.error(error?.message || error.response.data.msg || "Something gonna wrong!");
      console.error("Error deleting message:", error);
    }
    setActionIsLoading(false);
    setIsModal(false);
    setSelectedMsgId("");
    setModalType("");
  };

  const handleAction = (id, type) => {
    setSelectedMsgId(id);
    setModalType(type);
    setIsModal(true);
  };

  const removeTrailingEmptyTags = (html) => {
    return html.replace(
      /(<p(?: class="ql-align-justify")?\s*>\s*<br\s*\/?>\s*<\/p>\s*)+$/,
      ""
    );
  };

  return (
    <>
      <Box
        px="20px"
        py="1rem"
        // mt="1.5rem"
       className="border shadow-sm bg-white pb-5 overflow-hidden w-full relative">
        {/* Message Header */}
        <MessageHeader
          receiverDetails={receiverDetails}
          contractDetails={contract_details}
        />

        {/* Message Body */}
        <VStack
          paddingBottom={{ md: "20px" }}
          className="w-full h-full relative">
          <Box
            overflowY="auto"
            overflowX="hidden"
            flexDir="column"
            marginBottom="1.5rem"
            id="chat-container"
            css={{
              "&::WebkitScrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            }}
           className="flex items-start w-full">
            {/* Messages */}
            {messageData?.length
              ? messageData.map((user, index) => (
                  <SingleText
                    key={user._id}
                    user={user}
                    userId={userId}
                    senderDetails={senderDetails}
                    receiverDetails={receiverDetails}
                    role={role}
                    handleAction={handleAction}
                  />
                ))
              : null}
          </Box>

          {/* Message Input */}
          <MessageInput
            message={message}
            setMessage={setMessage}
            isLoading={false}
            handleSendMessage={handleSendMessage}
          />
        </VStack>
      </Box>

      {/* Manage actions of message */}
      <UniversalModal isModal={isModal} setIsModal={setIsModal}>
        {/* delete selected message */}
        {modalType === "delete" && (
          <>
            <div className="w-[72px] h-[72px] flex items-center justify-center bg-red-50 rounded-full mx-auto">
              <TbMessageCancel className="text-4xl text-red-500" />
            </div>
            <p className="text-2xl font-semibold text-center">
              Are you want to delete this message?
            </p>
            <p className="text-center text-gray-600 mt-1">
              <span className="text-red-500">*</span> This action will
              permanently remove the message for both parties.
            </p>
            <div className="flex gap-5 sm:gap-10 mt-4 sm:mt-10">
              <Button
                className="w-full"
                onClick={() => setIsModal(false)}
              >
                No, cancel
              </Button>
              <Button
                isLoading={actionIsLoading}
                loadingText="Deleting..."
                spinner={<BtnSpinner />}
                onClick={() => handleDelete(selectedMsgId)}
              >
                Yes, delete it
              </Button>
            </div>
          </>
        )}
      </UniversalModal>
    </>
  );
};

export default React.memo(MessageBody);
