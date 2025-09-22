import React from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";


import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import UserCardSkeleton from "../Skeletons/UserCardSkeleton";
import { clearPagesState } from "../../redux/pagesSlice/pagesSlice";
import { clearMessageState } from "../../redux/messageSlice/messageSlice";
import { clearNotificationState } from "../../redux/notificationSlice/notificationSlice";
import { Avatar } from "../ui/migration-helpers";

const AgencyUserCard = () => {
  const router = useRouter();
  const { hasAgency, activeAgency, userAgencyLoading } =
    useContext(CurrentUserContext);
  const [cookies, setCookie] = useCookies(["activeagency"]);
  const agency = useSelector((state: unknown) => state.profile.agency);
  const { agency_name, agency_tagline, agency_profileImage, _id } =
    agency || [];
  const dispatch = useDispatch();

  const handleSwitching = () => {
    if (!activeAgency) {
      setCookie("activeagency", true);
      dispatch(clearPagesState());
      dispatch(clearMessageState());
      dispatch(clearNotificationState());
    } else {
      router.push(`/profile/a/${_id}`);
    }
  };

  return (
    <div className="border border-gray-200/60 rounded-2xl w-full xl:w-[350px] bg-white shadow-sm m-auto pb-2">
      {userAgencyLoading ? (
        <UserCardSkeleton />
      ) : (
        <div className="w-full h-full m-auto rounded-2xl">
          <div className="flex flex-col items-center gap-3 pt-6 pb-4">
            <div className="w-[96px] h-[96px] rounded-full flex justify-center items-center border-2 bg-gradient-to-br from-[#A3ECBE] to-[#0EDD5A]">
              <Avatar
                src={agency_profileImage}
                name={agency_name || "Agency"}
                className="!w-[90px] !h-[90px] border-2 border-white object-cover rounded-full"
              />
            </div>

            <div className="text-2xl text-[#072C15] font-semibold capitalize">
              {agency_name || "Build Your Agency"}
            </div>
            <div className="text-sm text-[#072C15] text-center font-medium px-4">
              {agency_tagline || "Create your agency profile to showcase your services and grow your business"}
            </div>
            {/* <div className="flex items-center">
              <div
                className="star-filled"
                style={{ color: "var(--primarycolor)" }}
              >
                ★
              </div>
              <div
                className="star-filled"
                style={{ color: "var(--primarycolor)" }}
              >
                ★
              </div>
              <div
                className="star-filled"
                style={{ color: "var(--primarycolor)" }}
              >
                ★
              </div>
              <div
                className="star-filled"
                style={{ color: "var(--primarycolor)" }}
              >
                ★
              </div>
              <div
                className="star-filled"
                style={{ color: "var(--primarycolor)" }}
              >
                ★
              </div>
              <div className="text-sm text-[#072C15] font-medium pl-1">
                5.0 of 4 Reviews
              </div>
            </div> */}
          </div>

          <div className="flex p-4">
            {agency && hasAgency ? (
              <button
                className="text-center w-full text-white font-semibold py-3 px-4 rounded-lg bg-gradient-to-r from-[#1EAE53] to-[#22C35E] hover:from-[#16833E] hover:to-[#1EAE53] transition-all duration-200 shadow-sm"
                onClick={() => handleSwitching()}
              >
                {activeAgency && hasAgency
                  ? "Visit Your Agency Profile"
                  : "Switch To Agency Profile"}
              </button>
            ) : (
              <button
                className="text-center w-full text-white font-semibold py-3 px-4 rounded-lg bg-gradient-to-r from-[#1EAE53] to-[#22C35E] hover:from-[#16833E] hover:to-[#1EAE53] transition-all duration-200 shadow-sm"
                onClick={() => router.push("/agency-build")}
              >
                Create Your Agency Profile
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyUserCard;
