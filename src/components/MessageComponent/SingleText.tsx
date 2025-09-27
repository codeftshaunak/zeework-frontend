
"use client";
import React from "react";



import { useState, useEffect } from "react";
import CardDetails from "./CardDetails";
import { format, differenceInMinutes, differenceInHours } from "date-fns";
import Linkify from "react-linkify";
import { MdDelete } from "react-icons/md";
import { Avatar, AvatarBadge } from "../ui/migration-helpers";

const SingleText = ({
  user,
  userId,
  senderDetails,
  role,
  receiverDetails,
  handleAction,
}) => {
  const [isMore, setIsMore] = useState(false);
  const [timeDifference, setTimeDifference] = useState("");

  const getTimeDifference = () => {
    const messageDate = new Date(user.created_at);
    const now = new Date();

    const minutesDiff = differenceInMinutes(now, messageDate);
    const hoursDiff = differenceInHours(now, messageDate);

    if (minutesDiff < 1) return "now";
    if (minutesDiff < 10) return `${minutesDiff} min ago`;
    if (hoursDiff < 24) return format(messageDate, "hh:mm a");
    return format(messageDate, "MM/dd/yyyy");
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeDifference(getTimeDifference());
    }, 60000);

    setTimeDifference(getTimeDifference());

    return () => clearInterval(timerId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className="w-full relative">
      {user.sender_id === userId ? (
        <div className="flex flex-row items-center w-full">
          <div className="flex flex-row items-center"
          >
            <div className="md:ml-auto">
              {!user.isRepeated && (
                <span className="font-semibold text-right">
                  You
                </span>
              )}
              <div
                className="w-full text-right flex-col content-end bg-[#dcf7e3] relative py-2 px-4 flex rounded-md"
                onMouseEnter={() => setIsMore(true)}
                onMouseLeave={() => setIsMore(false)}
              >
                <>
                  <Linkify>
                    <div
                      className="text-1rem"
                     
                      dangerouslySetInnerHTML={{ __html: user.message }}
                    />
                  </Linkify>

                  {user?.card_details?.title && (
                    <CardDetails message={user} user_id={userId} role={role} />
                  )}
                </>
                <p className="text-[12px] text-right mt-1 -mb-1 text-gray-300">
                  {timeDifference}
                </p>
                {isMore && (
                  <div className="absolute -bottom-2 left-0 z-10">
                    <div className="relative">
                      <div
                        className="cursor-pointer bg-white hover:bg-gray-200/30 p-1 rounded-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_10px] border border-[#dcf7e3]"
                        onClick={() => handleAction(user._id, "delete")}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div ml={{ base: "auto", md: "0" }} className="w-[32px]">
              {!user.isRepeated && (
                <Avatar
                  size="sm"
                  round="20px"
                  mt={{ base: 5, md: 0 }}
                  src={getProfileImage()}
                  name={getDisplayName()}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center">
          <div className="w-full flex flex-row items-center"
          >
            <div className="w-[32px]">
              {!user.isRepeated && (
                <Avatar
                  size="sm"
                  round="20px"
                  mt={{ base: 5, md: 0 }}
                  src={getProfileImage()}
                  name={getDisplayName()}
                >
                  <AvatarBadge
                    boxSize="0.8em"
                    left={-1.5}
                    top={0}
                  />
                </Avatar>
              )}
            </div>
            <div>
              {!user.isRepeated && (
                <span className="font-semibold">{getDisplayName()}</span>
              )}
              <div
                flexDir="column"
                className="bg-gray.100 relative flex rounded-md"
                paddingY={2}
                paddingX={4}
                onMouseEnter={() => setIsMore(true)}
                onMouseLeave={() => setIsMore(false)}
              >
                <>
                  <Linkify>
                    <div
                     
                     
                      dangerouslySetInnerHTML={{ __html: user.message }}
                    />
                  </Linkify>

                  {user?.card_details?.title && (
                    <CardDetails message={user} user_id={userId} role={role} />
                  )}
                </>
                <p className="text-[12px] text-left mt-1 -mb-1 text-gray-300">
                  {timeDifference}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleText;
