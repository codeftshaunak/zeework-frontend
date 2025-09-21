"use client";
import React from "react";

import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import { useRouter } from "next/navigation";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import UserCardSkeleton from "../Skeletons/UserCardSkeleton";
import { clearPagesState } from "../../redux/pagesSlice/pagesSlice";
import { clearMessageState } from "../../redux/messageSlice/messageSlice";
import { clearNotificationState } from "../../redux/notificationSlice/notificationSlice";
import { calculateProfileCompletion } from "../utils/constants";
import StarRatings from "react-star-ratings";
import { Avatar } from "../ui/migration-helpers";

const UserProfileCard = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["activeagency"]);
  const { hasAgency, activeAgency, userAgencyLoading } =
    useContext(CurrentUserContext);
  const profile = useSelector((state: any) => state.profile.profile);
  const {
    profile_image,
    firstName,
    lastName,
    professional_role,
    user_id,
    avg_review,
  } = profile || [];
  const dispatch = useDispatch();

  const completionData = calculateProfileCompletion(profile);

  const handleSwitching = () => {
    if (activeAgency) {
      setCookie("activeagency", false);
      dispatch(clearPagesState());
      dispatch(clearMessageState());
      dispatch(clearNotificationState());
    } else {
      router.push(`/profile`);
    }
  };
  return (
    <div className="border border-transparent bg-gradient-to-br from-[#EAF4ED] to-[#D7F4E1] rounded-2xl w-full xl:w-[350px] m-auto flex flex-col justify-evenly items-center">
      {userAgencyLoading ? (
        <div className="w-full h-full pt-6">
          <UserCardSkeleton />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center gap-1 pt-6 pb-4">
            <div className="w-[96px] h-[96px] rounded-full flex justify-center items-center border-2 bg-gradient-to-br from-[#A3ECBE] to-[#0EDD5A] overflow-hidden">
              <Avatar
                src={profile_image}
                name={firstName + " " + lastName}
                className={`!w-[90px] !h-[90px] border-2 border-white object-cover rounded-full overflow-hidden ${!activeAgency && "cursor-pointer"
                  }`}
                onClick={() =>
                  !activeAgency && router.push(`/profile/f/${user_id}`)
                }
              />
            </div>
            <div

              className={`text-2xl text-[#072C15] font-medium capitalize ${
                !activeAgency && "cursor-pointer"
              }`}
              onClick={() =>
                !activeAgency && router.push(`/profile/f/${user_id}`)
              }

            >
              {firstName + " " + lastName?.slice(0, 1) + "."}
            </div>
            <div className="text-sm text-[#072C15] text-center capitalize">
              {professional_role?.length > 40
                ? `${professional_role?.slice(0, 40)}...`
                : professional_role}
            </div>

            <StarRatings
              rating={avg_review}
              starDimension="16px"
              starSpacing="1px"
              starRatedColor="#22C35E"
              starEmptyColor="#799986"
            />
          </div>
          <div
            className={`relative w-[80%] xl:w-[300px] border border-transparent rounded-lg flex justify-center items-center bg-white/60 ${hasAgency && activeAgency ? "mb-0" : "mb-4"
              }`}
          >
            <div className="w-full p-4">
              <div className="text-xs xl:text-sm text-[#15181E]">
                Complete your Profile
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="w-[80%] h-[5px] bg-gradient-to-r from-[#a3ecbe00] to-[#1EAE53] rounded-2xl"></div>
                <div className="text-xs text-[#16833E] font-semibold">
                  {completionData.percentage}%
                </div>
              </div>
            </div>
          </div>
          {hasAgency && activeAgency && (
            <div className="py-4 flex w-full xl:w-[300px]">
              <button
                className="text-center w-full text-white font-semibold py-2 rounded-md m-auto bg-[var(--primarycolor)]"
                onClick={() => handleSwitching()}
              >
                {"Switch To Freelancer Profile"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfileCard;
