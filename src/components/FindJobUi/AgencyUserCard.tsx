import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from 'react';

// Define Avatar component locally
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className,
  ...props
}) => {
  const sizeClasses = {
    'sm': 'w-8 h-8 text-sm',
    'md': 'w-12 h-12 text-base',
    'lg': 'w-16 h-16 text-lg',
    'xl': 'w-20 h-20 text-xl',
    '2xl': 'w-24 h-24 text-2xl'
  };

  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';

  return (
    <div 
      className={`relative inline-flex items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import UserCardSkeleton from "../Skeletons/UserCardSkeleton";
import { clearPagesState } from "../../redux/pagesSlice/pagesSlice";
import { clearMessageState } from "../../redux/messageSlice/messageSlice";
import { clearNotificationState } from "../../redux/notificationSlice/notificationSlice";

const AgencyUserCard = () => {
  const router = useRouter();
  const { hasAgency, activeAgency, userAgencyLoading } =
    useContext(CurrentUserContext);
  const [cookies, setCookie] = useCookies(["activeagency"]);
  const agency = useSelector((state: any) => state.profile.agency);
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
    <div className="rounded-2xl w-full xl:w-[350px] bg-white m-auto pb-2">
      {userAgencyLoading ? (
        <UserCardSkeleton />
      ) : (
        <div className="rounded-2xl w-full h-full m-auto">
          <div className="flex flex-col items-center gap-1 pt-6 pb-4">
            <Avatar
              src={agency_profileImage}
              name={agency_name}
              className="h-[90px!important] w-[90px!important] object-cover rounded-full mb-4"
            />

            <div className="text-2xl text-[#072C15] font-semibold capitalize">
              {agency_name == null ? "No Agency" : agency_name}
            </div>
            <div className="text-md text-[#072C15] text-center capitalize font-medium">
              {agency_tagline == null
                ? "No Services"
                : agency_tagline.length > 30
                ? `${agency_tagline.slice(0, 30)}...`
                : agency_tagline}
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

          <div className="p-4 flex">
            {agency && hasAgency ? (
              <button
                className="text-center w-[95%] text-white font-semibold py-2 rounded-md m-auto bg-[var(--primarycolor)]"
                onClick={() => handleSwitching()}
              >
                {activeAgency && hasAgency
                  ? "Visit Your Agency Profile"
                  : "Switch To Agency Profile"}
              </button>
            ) : (
              <button
                className="text-center text-xs xl:text-lg w-[95%] text-white font-semibold py-2 rounded-md m-auto bg-[var(--primarycolor)]"
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
