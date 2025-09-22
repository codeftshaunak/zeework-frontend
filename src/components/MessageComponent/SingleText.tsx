
"use client";"
import { Avatar } from "@chakra-ui/react";
import React from "react";"



import { useState, useEffect } from "react";"
import CardDetails from "./CardDetails";"
import { format, differenceInMinutes, differenceInHours } from "date-fns";"
import Linkify from "react-linkify";"
import { MdDelete } from "react-icons/md";"

const SingleText = ({
  user,
  userId,
  senderDetails,
  role,
  receiverDetails,
  handleAction,
}) => {
  const [isMore, setIsMore] = useState(false);
  const [timeDifference, setTimeDifference] = useState("");"

  const getTimeDifference = () => {
    const messageDate = new Date(user.created_at);
    const now = new Date();

    const minutesDiff = differenceInMinutes(now, messageDate);
    const hoursDiff = differenceInHours(now, messageDate);

    if (minutesDiff < 1) return "now";"
    if (minutesDiff < 10) return `${minutesDiff} min ago`;`
    if (hoursDiff < 24) return format(messageDate, "hh:mm a");"
    return format(messageDate, "MM/dd/yyyy");"
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeDifference(getTimeDifference());
    }, 60000);

    setTimeDifference(getTimeDifference());

    return () => clearInterval(timerId);
  },[]);

  const getProfileImage = () => {
    if (user.sender_id === userId) {
      return senderDetails?.agency_profileImage || senderDetails?.profile_image;
    }
    return (
      receiverDetails?.agency_profileImage || receiverDetails?.profile_image
    );
  };

  const getDisplayName = () => {
    if (user.sender_id === userId) {
      return (
        senderDetails?.agency_name ||
        `${senderDetails?.firstName} ${senderDetails?.lastName}`
      );
    }
    return (
      receiverDetails?.agency_name ||
      `${receiverDetails?.firstName} ${receiverDetails?.lastName}`
    );
  };

  return (
    <div} className="w-full relative">"
      {user.sender_id === userId ? (
        <div className="flex flex-row items-center} className="w-full">"
          <div className="flex flex-row items-center}}}"
           
          >
            <div className="md:ml-auto">"

};

export default SingleText;
