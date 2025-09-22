"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { differenceInHours, differenceInMinutes, format } from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Icons
import { RiSearchLine } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";
import { BiExit, BiHelpCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiBell, FiChevronLeft } from "react-icons/fi";
import { HiMenu, HiOutlineX, HiOutlineXCircle } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { GoArrowSwitch } from "react-icons/go";

// Redux
import { clearAuthData } from "../../redux/authSlice/authSlice";
import { clearProfileData } from "../../redux/authSlice/profileSlice";
import { clearPagesState } from "../../redux/pagesSlice/pagesSlice";
import {
  clearMessageState,
  setMessageUsers,
} from "../../redux/messageSlice/messageSlice";
import {
  clearNotificationState,
  setNotification,
} from "../../redux/notificationSlice/notificationSlice";

// APIs
import {
  getNotifications,
  readAsNotification,
} from "../../helpers/APIs/userApis";
import { getMessageUsers } from "../../helpers/APIs/messageApis";

// Hooks
import useNotificationListener from "../../hooks/useNotificationListener";
import useUserActivityListener from "../../hooks/useUserActivityListener";
import { Avatar } from "../ui/migration-helpers";

const Header = () => {
  const router = useRouter();

  const navigation = [
    { title: "Find Talent", href: "/marketplace" },
    { title: "Find Work", href: "/find-job" },
    { title: "Why ZeeWork", href: "#about" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/98 backdrop-blur-lg w-full border-b border-gray-100 shadow-sm">
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => router.push("/")}
            >
              <img
                src="/images/zeework_logo.png"
                alt="ZeeWork"
                className="h-6 w-auto transition-transform group-hover:scale-105"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden min-[840px]:flex items-center space-x-8">
            {navigation.map((item, i) => (
              <button
                key={i}
                onClick={() => router.push(item.href)}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group py-1"
              >
                {item.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Button (placeholder for future search functionality) */}
            <button
              onClick={() => {
                // TODO: Implement search functionality
                console.log("Search clicked");
              }}
              className="hidden min-[840px]:block text-gray-700 hover:text-green-600 p-2 rounded-lg transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Desktop Auth Buttons */}
            <div className="hidden min-[840px]:flex items-center space-x-3">
              <button
                onClick={() => router.push("/login")}
                className="text-gray-700 hover:text-green-600 font-medium px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Log In
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="min-[840px]:hidden text-gray-700 hover:text-green-600 p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="min-[840px]:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                {navigation.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      router.push(item.href);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-6 space-y-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    router.push("/login");
                    setIsOpen(false);
                  }}
                  className="block w-full text-center py-3 text-lg font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    router.push("/signup");
                    setIsOpen(false);
                  }}
                  className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-medium transition-colors duration-200"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export const AuthHeader = ({ role }: { role: string }) => {
  const messageUsers = useSelector((state: any) => state.message.users);
  const notifications = useSelector(
    (state: any) => state.notification.notification
  );
  const [openInfo, setOpenInfo] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState(false);
  const [cookie, setCookie] = useCookies(["activeagency"]);
  const [isSelectModal, setIsSelectModal] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const pathname = usePathname();
  const isMessagePage = pathname.startsWith("/message");
  const activeAgency = cookie?.activeagency;
  const selectModalRef = useRef(null);
  const profile = useSelector((state: any) => state.profile);
  const {
    profile_image,
    firstName,
    lastName,
    user_id,
    professional_role,
    businessName,
    agency_profile,
  } = profile.profile || {};
  const { agency_name, agency_tagline, agency_profileImage } =
    profile.agency || {};
  const userId = activeAgency ? profile.agency._id : user_id;

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const [isMenuRef, setIsMenuRef] = useState(false);

  // Create a Set to store unique receiver_id values
  const unReadMsg = messageUsers?.filter((user: any) => {
    const hasContractRef = user.contract_details?.contract_ref;
    const isUnread = !user.isRead;
    return hasContractRef && isUnread;
  });

  const sortedNotifications = [...(notifications || [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  let hasUnreadNotifications = notifications?.some(
    (notification: any) => !notification.isRead
  );

  const handleProfileButton = (event: React.MouseEvent) => {
    setOpenInfo(!openInfo);
    event.stopPropagation();
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearMessageState());
    setCookie("activeagency", false);
    dispatch(clearAuthData());
    dispatch(clearProfileData());
    dispatch(clearPagesState());
    dispatch(clearMessageState());
    dispatch(clearNotificationState());
    router.push("/login");
  };

  const handleUserProfile = () => {
    router.push(
      `/profile/${Number(role) == 2 ? "c" : activeAgency ? "a" : "f"}/${
        activeAgency ? agency_profile : user_id
      }`
    );
  };

  const getInitialSelectedRole = () => {
    if (pathname === "/marketplace") {
      return "marketplace";
    } else if (pathname === "/search-freelancers") {
      return "talent";
    } else if (pathname === "/search-job") {
      return "job";
    } else {
      return Number(role) == 2 ? "talent" : "job";
    }
  };

  const [selectedRole, setSelectedRole] = useState(getInitialSelectedRole);
  const [searchTerm, setSearchTerm] = useState("");

  const handelSelectedValue = (value: string) => {
    setSelectedRole(value);
    setIsSelectModal(false);
  };

  const handelSearch = () => {
    const searchTermEncoded = encodeURIComponent(searchTerm);

    if (selectedRole === "job") {
      router.push(
        `/search-job${searchTermEncoded && `?searchTerm=${searchTermEncoded}`}`
      );
    } else if (selectedRole === "talent") {
      router.push(
        `/search-freelancers${searchTermEncoded && `?squery=${searchTermEncoded}`}`
      );
    } else if (selectedRole === "marketplace") {
      router.push(
        `/marketplace${searchTermEncoded && `?squery=${searchTermEncoded}`}`
      );
    }
  };

  // handle close select option when click on outside
  const handleClickOutside = (event: any) => {
    if (
      selectModalRef.current &&
      !(selectModalRef.current as any).contains(event.target)
    ) {
      setOpenInfo(false);
      setIsSelectModal(false);
      setIsOpenNotification(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isSelectModal, openInfo, isOpenNotification]);

  // listen socket notifications response
  useNotificationListener(
    [
      {
        event: "receive_message",
        handler: (data: any, cardDetails: any, newUser: any) => {
          if (userId == data.receiver_id) {
            if (newUser) dispatch(setMessageUsers([...messageUsers, newUser]));
            if (!newUser)
              dispatch(
                setMessageUsers(
                  messageUsers.map((item: any) => {
                    if (
                      item.contract_details.contract_ref ===
                        data.contract_ref &&
                      (item.contract_details.receiver_id === data.sender_id ||
                        item.contract_details.sender_id === data.sender_id)
                    ) {
                      return {
                        ...item,
                        isRead: data.is_read,
                        contract_details: {
                          ...item.contract_details,
                          activity: new Date().toISOString(),
                        },
                      };
                    }
                    return item;
                  })
                )
              );
          }
        },
      },
      {
        event: "saved_notification",
        handler: (data: any) => {
          if (userId == data.user_id) {
            dispatch(setNotification(data.notifications));
            hasUnreadNotifications = notifications?.some(
              (notification: any) => !notification.isRead
            );
          }
        },
      },
    ],
    [isMessagePage],
    !isMessagePage
  );

  // update user activity of messages
  useUserActivityListener((data: any) => {
    if (data && messageUsers?.length) {
      const isUser = messageUsers?.find(
        (i: any) =>
          i.user_details.user_id === data.user.user_id ||
          i.user_details._id === data.user?.agency_id
      );

      if (isUser) {
        dispatch(
          setMessageUsers(
            messageUsers.map((i: any) =>
              i.user_details.user_id === data.user.user_id ||
              i.user_details._id === data.user?.agency_id
                ? {
                    ...i,
                    user_details: {
                      ...i.user_details,
                      activity: data.status,
                    },
                  }
                : i
            )
          )
        );
      }
    }
  });

  const fetchNotifications = async () => {
    try {
      const { body, code } = await getNotifications(
        activeAgency ? "agency" : "user"
      );
      if (code === 200) dispatch(setNotification(body.notifications || []));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsersOfMessage = async () => {
    try {
      const { body, code } = activeAgency
        ? await getMessageUsers("agency")
        : await getMessageUsers();
      if (code === 200) {
        dispatch(setMessageUsers(body));
      }
    } catch (error) {
      console.error("Error fetching message user:", error);
    }
  };

  const readNotification = async ({
    markType = "single",
    status = true,
    notificationId = "",
  }: {
    markType?: string;
    status?: boolean;
    notificationId?: string;
  }) => {
    try {
      const { code, body } = await readAsNotification({
        userId: activeAgency ? profile.agency._id : user_id,
        markType,
        status,
        notificationId,
      });
      if (code === 200) dispatch(setNotification(body));
    } catch (error) {
      console.error(error);
    }
  };

  const getTimeDifference = (date: string | Date) => {
    if (!date) return "Invalid date";

    const parsedDate = typeof date === "string" ? new Date(date) : date;
    if (isNaN(parsedDate.getTime())) return "Invalid date";

    const now = new Date();

    const minutesDiff = differenceInMinutes(now, parsedDate);
    const hoursDiff = differenceInHours(now, parsedDate);

    if (minutesDiff < 1) return "now";
    if (minutesDiff < 60) return `${minutesDiff} min ago`;
    if (hoursDiff < 5)
      return `${hoursDiff} hour${hoursDiff === 1 ? "" : "s"} ago`;
    if (hoursDiff < 24) return format(parsedDate, "hh:mm a");
    return format(parsedDate, "MM/dd/yyyy");
  };

  // slice any type of string
  const truncateString = (str: string, num: number) => {
    if (!str || !num) return "";

    if (str?.length <= num) {
      return str;
    }
    return str?.slice(0, num) + "...";
  };

  useEffect(() => {
    if (!notifications?.length) fetchNotifications();
    if (!messageUsers?.length) fetchUsersOfMessage();
  }, [activeAgency]);

  return (
    <nav className="bg-white w-full shadow-slate-700 border-b-[1px] items-center">
      <div className="w-[90%] mx-auto sm:py-1 justify-between max-w-[1200px]">
        <div className=" flex m-auto items-center md:justify-between justify-between h-16">
          <div className="inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            {isOpen && isMenuRef ? (
              <button
                onClick={() => {
                  (setIsMenuRef(false), onClose());
                }}
              >
                <HiOutlineX className="text-3xl text-gray-600" />
              </button>
            ) : (
              <button
                onClick={() => {
                  (setIsMenuRef(true), onOpen());
                }}
              >
                <HiMenu className="text-3xl text-gray-600" />
              </button>
            )}
          </div>
          <div className="flex items-center flex-1 max-sm:justify-center">
            <div className="flex md:w-[130px] items-center">
              <p
                className="text-[22px] font-bold text-green-500 cursor-pointer text-right mb-0 pb-0"
                onClick={() => router.push("/")}
              >
                <img
                  src="/images/zeework_logo.png"
                  style={{
                    width: "100px",
                    marginTop: "3px",
                    margin: "auto",
                  }}
                />
              </p>
            </div>
            <div className="hidden sm:flex sm:ml-2 md:ml-6 flex-1 max-lg:justify-center">
              <div className="flex gap-3 min-[920px]:gap-9">
                <NavItem
                  title={Number(role) == 1 ? "Find Work" : "Dashboard"}
                  url={Number(role) == 1 ? "/find-job" : "/client-dashboard"}
                  additionalActiveRoutes={
                    Number(role) == 1 ? ["/search-job"] : []
                  }
                />

                {Number(role) == 1 && (
                  <NavItem title={"My Jobs"} url={"/my-jobs"} />
                )}
                <NavItem title={"My Stats"} url="/my-stats" />
                <NavItem
                  title={"Messages"}
                  url="/message"
                  isNotification={unReadMsg?.length}
                />
              </div>
            </div>
          </div>
          <div className="right-0 flex sm:block items-center sm:static sm:inset-auto md:ml-6 sm:pr-0">
            <div className="hidden sm:hidden lg:flex whitespace-no-wrap items-center justify-center my-2 pl-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md  focus:outline-none focus:shadow-outline-indigo transition ease-in-out duration-150">
              <div className="flex w-[320px] xl:w-[400px] mr-3">
                {/* ========== search ======= */}
                <div
                  className={`flex w-[400px] items-center rounded-full border-[var(--bordersecondary)] border-[1px] justify-between mr-3 bg-[#F0F2F5]
                  `}
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                >
                  <div
                    className={`w-full rounded-full flex items-center gap-2 py-2 pl-4 ${
                      isHover || isActiveInput
                        ? "bg-white border-r border-[var(--bordersecondary)]"
                        : "bg-[#F0F2F5]"
                    }`}
                  >
                    <BsSearch />
                    <input
                      placeholder="Search"
                      type="text"
                      className={`border-none outline-none text-[15px] bg-transparent`}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setIsActiveInput(true)}
                      onBlur={() => setIsActiveInput(false)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handelSearch();
                        }
                      }}
                      value={searchTerm || ""}
                    />
                  </div>

                  <div className="relative">
                    <p
                      className="px-3 capitalize cursor-pointer flex items-center gap-2"
                      onClick={(event) => {
                        (setIsSelectModal(!isSelectModal),
                          event.stopPropagation());
                      }}
                    >
                      {selectedRole}
                      {isSelectModal ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </p>{" "}
                    {isSelectModal && (
                      <>
                        <ul
                          className="absolute top-[42px] right-2 bg-white border-slate-200 border transition-all rounded-md overflow-hidden w-48 z-50"
                          ref={selectModalRef}
                        >
                          <li
                            className="px-3 py-1 hover:bg-slate-100 cursor-pointer"
                            onClick={() => {
                              handelSelectedValue("job");
                            }}
                          >
                            <div className="flex gap-2">
                              <IoBagCheck className="text-xl mt-1" />{" "}
                              <div>
                                <p>Jobs</p>{" "}
                                <p className="text-[12px] -mt-1">
                                  Apply to job posted
                                </p>
                              </div>
                            </div>
                          </li>
                          <li
                            className="px-3 py-1 hover:bg-slate-100 cursor-pointer"
                            onClick={() => handelSelectedValue("talent")}
                          >
                            <div className="flex gap-2">
                              <FaUsers className="text-xl mt-1" />{" "}
                              <div>
                                <p>Talent</p>{" "}
                                <p className="text-[12px] -mt-1">
                                  Hire professionals
                                </p>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <div className="h-5 w-5 bg-slate-200 shadow-sm rotate-45 absolute top-[38px] right-10"></div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 relative">
                <div
                  className={`relative p-2 rounded-full ${
                    isOpenNotification && "bg-slate-100"
                  }`}
                >
                  <FiBell
                    className={`text-2xl text-gray-400 cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpenNotification(!isOpenNotification);
                    }}
                  />
                  {hasUnreadNotifications && (
                    <div className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-2.5"></div>
                  )}
                  {isOpenNotification && (
                    <>
                      <div
                        ref={selectModalRef}
                        className="absolute top-12 right-0 z-50 bg-white w-72 max-h-80 overflow-hidden border-slate-200 border transition-all rounded-md flex flex-col"
                      >
                        {hasUnreadNotifications && (
                          <div className="bg-primary w-full text-white px-4 flex justify-end">
                            <p
                              className="text-[15px] cursor-pointer border-b border-primary hover:border-white w-fit transition"
                              onClick={() =>
                                readNotification({ markType: "all" })
                              }
                            >
                              Read All
                            </p>
                          </div>
                        )}
                        <div className="w-full overflow-y-auto text-sm flex flex-col">
                          {sortedNotifications?.length ? (
                            sortedNotifications?.map((item: any) => (
                              <div
                                key={item._id}
                                className={`${
                                  !item.isRead && "bg-[#e2f5e6]"
                                } px-4 py-2 cursor-pointer`}
                                onClick={() => {
                                  if (item?.url) router.push(item.url);
                                  if (!item.isRead)
                                    readNotification({
                                      notificationId: item._id,
                                    });
                                  setIsOpenNotification(false);
                                }}
                              >
                                <p className="font-semibold">{item.title}</p>
                                <p
                                  className="font-light"
                                  style={{ lineHeight: "14px" }}
                                >
                                  {item.description}
                                </p>
                                <p className="font-light text-right -mb-1">
                                  {getTimeDifference(item.createdAt)}
                                </p>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-center">
                              You haven&apos;t any notification!
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="h-5 w-5 bg-slate-200 shadow-sm rotate-45 absolute top-11 right-2.5"></div>
                    </>
                  )}
                </div>
                <div
                  className="flex items-center justify-center rounded-full w-[36px] h-[36px] cursor-pointer"
                  onClick={(e) => handleProfileButton(e)}
                >
                  {firstName || profile?.agency?.agency_name ? (
                    <Avatar
                      src={
                        Number(role) == 1
                          ? activeAgency
                            ? profile?.agency?.agency_profileImage
                            : profile_image
                          : profile_image
                      }
                      name={
                        activeAgency
                          ? profile?.agency?.agency_name
                          : firstName + " " + lastName
                      }
                      boxSize="40px"
                    />
                  ) : (
                    <Avatar boxSize="40px" />
                  )}
                </div>
                {openInfo && (
                  <>
                    <div
                      className="absolute bg-white p-2 rounded-lg right-12 top-2 w-[120px] gap-5 border-slate-200 border transition-all z-50"
                      ref={selectModalRef}
                    >
                      <div
                        className="flex  items-center w-full cursor-pointer mt-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                        onClick={handleUserProfile}
                      >
                        <CgProfile />
                        <p className="text-sm ml-2">Profile</p>
                      </div>
                      <div
                        className="flex items-center w-full cursor-pointer mt-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                        onClick={() => {
                          (router.push("/setting"), setOpenInfo(false));
                        }}
                      >
                        <LuSettings />
                        <p className="text-sm ml-2">Settings</p>
                      </div>

                      <div
                        className="flex items-center w-full cursor-pointer my-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                        onClick={() => {
                          (router.push("/help"), setOpenInfo(false));
                        }}
                      >
                        <BiHelpCircle />
                        <p className="text-sm ml-2">Help</p>
                      </div>

                      <div
                        className="flex  items-center w-full cursor-pointer my-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                        onClick={() => handleLogout()}
                      >
                        <BiExit />
                        <p className="text-sm ml-2">Logout</p>
                      </div>
                    </div>
                    <div className="h-5 w-5 bg-slate-200 shadow-sm rotate-45 absolute top-3 right-11"></div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile searching button */}
          {(!isOpen || !isMenuRef) && (
            <button
              className="lg:hidden mr-4"
              onClick={() => {
                (setIsMenuRef(false), onOpen());
              }}
            >
              <RiSearchLine className="text-2xl text-gray-600" />
            </button>
          )}

          <div className="hidden sm:flex lg:hidden gap-3 relative ">
            <div
              className="flex items-center justify-center rounded-full w-[36px] h-[36px] cursor-pointer"
              onClick={(e) => handleProfileButton(e)}
            >
              <Avatar
                src={profile_image}
                name={firstName && firstName + " " + lastName}
                boxSize="40px"
              />
            </div>
            {openInfo && (
              <>
                <div
                  className="absolute bg-white p-2 rounded-lg right-12 top-2 w-[120px] gap-5 border-slate-200 border transition-all z-50"
                  ref={selectModalRef}
                >
                  <div
                    className="flex justify-start gap-4 items-center w-full cursor-pointer mt-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                    onClick={handleUserProfile}
                  >
                    <CgProfile />
                    <p className="text-sm">Profile</p>
                  </div>
                  <div
                    className="flex justify-start gap-4 items-center w-full cursor-pointer mt-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                    onClick={() => {
                      (router.push("/setting"), setOpenInfo(false));
                    }}
                  >
                    <LuSettings />
                    <p className="text-sm">Setting</p>
                  </div>
                  <div
                    className="flex justify-start gap-4 items-center w-full cursor-pointer my-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                    onClick={() => {
                      (router.push("/help"), setOpenInfo(false));
                    }}
                  >
                    <BiHelpCircle />
                    <p className="text-sm ml-2">Help</p>
                  </div>

                  <div
                    className="flex justify-start gap-4 items-center w-full cursor-pointer my-1 hover:bg-gray-200/20 py-1 px-2 rounded"
                    onClick={() => handleLogout()}
                  >
                    <BiExit />
                    <p className="text-sm">Logout</p>
                  </div>
                </div>
                <div className="h-5 w-5 bg-slate-200 shadow-sm rotate-45 absolute top-3 right-11"></div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav links and searching */}
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 z-50 bg-white",
            isMenuRef ? "" : "mt-16"
          )}
        >
          <div className="p-4">
            {isMenuRef ? (
              <div>
                <div className="grid gap-3 tracking-wide">
                  <NavItem
                    title={Number(role) == 1 ? "Find Work" : "Dashboard"}
                    url={Number(role) == 1 ? "/find-job" : "/client-dashboard"}
                  />

                  {Number(role) == 1 && (
                    <NavItem title={"My Jobs"} url={"/my-jobs"} />
                  )}

                  <NavItem title={"My Stats"} url="/my-stats" />

                  <NavItem
                    title={"Messages"}
                    url="/message"
                    isNotification={unReadMsg?.length}
                  />

                  {/* profile card */}
                  <div className="p-2 rounded bg-slate-100 transition duration-300">
                    <div className="flex justify-between items-center gap-3">
                      <div className="flex items-center gap-2">
                        {Number(role) == 1 ? (
                          <>
                            {!activeAgency ? (
                              <>
                                <Avatar
                                  src={profile_image}
                                  name={firstName + " " + lastName}
                                  boxSize="40px"
                                  onClick={(e) => handleProfileButton(e)}
                                />
                                <div>
                                  <p className="font-medium text-lg">
                                    {firstName + " " + lastName}
                                  </p>
                                  <p>{truncateString(professional_role, 20)}</p>
                                </div>
                              </>
                            ) : agency_profile ? (
                              <>
                                <Avatar
                                  src={agency_profileImage}
                                  name={agency_name}
                                  boxSize="40px"
                                  onClick={(e) => handleProfileButton(e)}
                                />
                                <div>
                                  <p className="font-medium text-lg">
                                    {agency_name}
                                  </p>
                                  <p>{truncateString(agency_tagline, 20)}</p>
                                </div>
                              </>
                            ) : (
                              <button
                                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
                                onClick={() => router.push("/agency-build")}
                              >
                                Create Agency
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            <Avatar
                              src={profile_image}
                              name={firstName + " " + lastName}
                              boxSize="40px"
                              onClick={(e) => handleProfileButton(e)}
                            />
                            <div>
                              <p className="font-medium text-lg">
                                {firstName + " " + lastName}
                              </p>
                              <p>{truncateString(businessName, 20)}</p>
                            </div>
                          </>
                        )}
                      </div>
                      {Number(role) == 1 && (
                        <div
                          className="w-fit"
                          onClick={() =>
                            setCookie("activeagency", !activeAgency)
                          }
                        >
                          <GoArrowSwitch className="text-primary mx-auto text-3xl bg-white rounded-full p-1 cursor-pointer active:animate-ping" />
                        </div>
                      )}
                    </div>
                    <div
                      className={
                        openInfo &&
                        "bg-white p-2 rounded-lg w-full transition-all mt-2"
                      }
                    >
                      <motion.div
                        initial={false}
                        animate={{ height: openInfo ? "auto" : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        {openInfo && (
                          <div ref={selectModalRef} className="grid gap-1">
                            <NavItem
                              title={"Profile"}
                              url={`/profile/${
                                Number(role) == 2
                                  ? "c"
                                  : activeAgency
                                    ? "a"
                                    : "f"
                              }/${activeAgency ? agency_profile : user_id}`}
                            />

                            <NavItem title={"Setting"} url={"/setting"} />

                            <NavItem title={"Help"} url={"/help"} />

                            <div
                              className="flex gap-1 items-center cursor-pointer font-semibold"
                              onClick={() => handleLogout()}
                            >
                              Logout
                              <TbLogout />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-1 mt-5">
                  <button onClick={onClose}>
                    <FiChevronLeft className="text-3xl text-gray-600" />
                  </button>
                  <div className="border-b font-semibold">
                    <button
                      className="px-0 text-black mr-4 pb-2 border-b-2 border-transparent hover:border-black transition"
                      onClick={() => handelSelectedValue("talent")}
                    >
                      Talent
                    </button>
                    <button
                      className="px-0 text-black pb-2 border-b-2 border-transparent hover:border-black transition"
                      onClick={() => handelSelectedValue("job")}
                    >
                      Jobs
                    </button>
                  </div>
                </div>
                <div className="flex items-center border-[var(--bordersecondary)] border-[1px] py-2 pl-4 rounded-full justify-between w-full mt-4">
                  <div className="flex items-center gap-4">
                    <input
                      placeholder="Search"
                      type="text"
                      className="border-none outline-none text-[13px] w-full"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handelSearch();
                        }
                      }}
                      value={searchTerm || ""}
                    />
                  </div>
                  <p
                    className="px-3 capitalize cursor-pointer flex items-center gap-2"
                    onClick={() => {
                      setSearchTerm("");
                    }}
                  >
                    {searchTerm && <HiOutlineXCircle />}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({
  title,
  url,
  onClick,
  isNotification,
  additionalActiveRoutes = [],
}: {
  title: string;
  url: string;
  onClick?: () => void;
  isNotification?: number;
  additionalActiveRoutes?: string[];
}) => {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    const currentPath = pathname;

    // Check if current path matches the main URL or any additional active routes
    const routesToConsiderActive = [url, ...additionalActiveRoutes];
    const isSpecificActive = routesToConsiderActive.some((route) =>
      currentPath.startsWith(route)
    );

    return isSpecificActive;
  }, [pathname, url, additionalActiveRoutes]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link href={url} onClick={handleClick}>
      <div
        className={`cursor-pointer flex items-center gap-1 ${
          isActive ? "text-[var(--primarycolor)]" : "text-[#374151]"
        }`}
      >
        <p className={`md:text-[16px] font-[500]`}>{title}</p>
        {isNotification && isNotification > 0 && (
          <p className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center font-medium text-[12px]">
            {isNotification > 9 ? "9+" : isNotification}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Header;
