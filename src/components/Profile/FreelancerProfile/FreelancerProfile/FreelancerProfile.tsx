import { useEffect, useRef, useState } from "react";
import { BsLink45Deg, BsPlus } from "react-icons/bs";
import { HStack, VStack, Avatar, Text, useToast } from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "next/navigation";
import { useSelector } from "react-redux";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { format } from "date-fns";
import { TbPencil } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";
import { getWorkHistory } from "../../../../helpers/APIs/freelancerApis";
import { getAssociatedAgency } from "../../../../helpers/APIs/agencyApis";
import { formatTime, getUserLocation } from "../../../../helpers/APIs/formet";
import ProfileContainer from "../../ProfileContainer";
import SkillCard from "./SkillCard";
import { ProfileGigCards } from "../../../Gigs/SingleGig/ProfileGigCards";
import ReviewCard from "./ReviewCard";
import ProfileUpdating from "../ProfileUpdating/ProfileUpdating";
import PortfolioCard from "./PortfolioCard";
import LinkedAccounts from "./LinkingAccounts/LinkedAccounts";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from "swiper/modules";

export const FreelancerProfile = ({ viewAs }) => {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [workHistory, setWorkHistory] = useState([]);
  const [associateAgency, setAssociateAgency] = useState({});
  const [type, setType] = useState("");
  const [defaultValue, setDefaultValue] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const profile = useSelector((state: any) => state.profile);
  const {
    firstName,
    lastName,
    profile_image,
    location,
    professional_role,
    hourly_rate,
    description,
    skills,
    experience,
    education,
    portfolio,
  } = profile.profile || [];

  const [localTime, setLocalTime] = useState();
  const toast = useToast();

  const findWorkHistory = async () => {
    try {
      const { code, body } = await getWorkHistory();
      if (code === 200) setWorkHistory(body);
    } catch (error) {
      console.error(error);
    }
  };

  const associatedAgency = async () => {
    try {
      const { code, body } = await getAssociatedAgency();
      if (code === 200) setAssociateAgency(body);
    } catch (error) {
      console.error(error);
    }
  };

  async function getCurrentTimeAndLocation() {
    try {
      const currentDate = new Date();
      const currentTime = formatTime(currentDate);
      const location = await getUserLocation();
      setLocalTime(currentTime);
      return console.log(
        `${location.latitude}, ${location.longitude} - ${currentTime} local time`
      );
    } catch (error) {
      return error;
    }
  }

  setTimeout(() => {
    getCurrentTimeAndLocation();
  }, 1000);

  const handleCopyProfileURL = () => {
    const profileURL = `${window.location.origin}/profile/f/${profile?.profile?.user_id}`;
    navigator.clipboard.writeText(profileURL);

    toast({
      title: "Zeework Profile Copied.",
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  useEffect(() => {
    findWorkHistory();
    associatedAgency();
  }, []);

  const openUpdatingModal = (type, data = null) => {
    setDefaultValue(data);
    setType(type);
    setIsModal(true);
  };

  return (
    <ProfileContainer>
      <div className="w-[100%] justify-center m-auto flex flex-col gap-[24px]">
        <div className="w-[100%] bg-white flex items-center justify-between border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg max-sm:flex-col max-sm:gap-4">
          <div className="flex gap-[14px] items-center max-[380px]:gap-0">
            <div style={{ position: "relative", padding: "10px" }}>
              {!viewAs && (
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    cursor: "pointer",
                    zIndex: "1",
                  }}
                >
                  <div
                    className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                    onClick={() => openUpdatingModal("Update Profile Photo")}
                  >
                    <TbPencil className="text-gray-300" />
                  </div>
                </div>
              )}

              {!profile_image ||
              profile_image == "null" ||
              profile_image === null ? (
                <Avatar
                  name={firstName + " " + lastName}
                  width={"60px"}
                  height={"60px"}
                />
              ) : (
                <img
                  src={profile_image}
                  className="w-[60px] object-cover h-[60px] rounded-full shadow-md"
                />
              )}
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-[24px] max-[380px]:text-sm text-[#374151] font-semibold pl-3">
                {firstName + " " + lastName?.slice(0, 1) + "."}
              </p>
              <HStack className="text-[16px] max-[380px]:text-xs text-[#374151] font-[400]">
                <CiLocationOn />
                <p className="capitalize">
                  {location}, {localTime} local time
                </p>
              </HStack>
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <div
              className="flex items-center cursor-pointer justify-center w-[36px] h-[36px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] max-sm:hidden"
              onClick={handleCopyProfileURL}
            >
              <BsLink45Deg width={"20px"} height={"20px"} />
            </div>
            {!viewAs && (
              <button
                className="py-[8px] px-[12px] rounded-[6px] text-[14px] font-500 text-[#fff] bg-[#22C55E]"
                onClick={() => router.push("/setting")}
              >
                Profile Settings
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-[24px] w-full">
          <div className="flex w-[30%] gap-[24px] flex-col max-lg:hidden">
            {/* ==================== Freelance Stats ====================== */}
            <div className="w-full flex py-6 bg-white  relative flex-col gap-[24px] border-[1px] px-[24px] border-[var(--bordersecondary)] rounded-lg">
              <p className="text-[20px] text-[#374151] font-[600]">
                Freelance Stats
              </p>
              <VStack
                backgroundColor={"#f4f5f787"}
                height={"80px"}
                shadow={"sm"}
                justifyContent={"center"}
              >
                <Text fontWeight={"600"} top={"8rem"} textAlign={"center"}>
                  Updated Freelancer Stats <br /> Coming Soon
                </Text>
              </VStack>
            </div>

            {/* ==================== View associated agency ====================== */}
            {associateAgency?.agency_details && (
              <div className="w-full flex py-6 bg-white  relative flex-col gap-3 border-[1px] px-[24px] border-[var(--bordersecondary)] rounded-lg">
                <p className="text-[20px] text-[#374151] font-[600]">
                  Associate with
                </p>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Avatar
                    name={associateAgency?.agency_details?.agency_name}
                    src={associateAgency?.agency_details?.agency_profileImage}
                  />
                  <div className="text-gray-600">
                    <p
                      className="font-medium text-primary flex items-center gap-1 cursor-pointer"
                      onClick={() =>
                        router.push(`/profile/a/${associateAgency?.agency_id}`)
                      }
                    >
                      {associateAgency?.agency_details?.agency_name}{" "}
                      {associateAgency?.agency_details?.agency_officeLocation
                        ?.country &&
                        `from ${associateAgency?.agency_details?.agency_officeLocation?.country}`}
                      {/* {associateAgency?.agency_details?.agency_verified && (
                      <RiVerifiedBadgeFill />
                    )} */}
                    </p>
                    <p className="flex items-center gap-1 font-medium">
                      From{" "}
                      {format(new Date(associateAgency?.join_date), "MM/yy")} to{" "}
                      {associateAgency?.leave_date
                        ? format(new Date(associateAgency.leave_date), "MM/yy")
                        : "Present"}
                    </p>
                    {/* <p className="flex items-baseline gap-1">
                      <span className="font-semibold">{100}%</span>{" "}
                      <span className="text-sm">Job Success</span>
                    </p> */}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== Education ====================== */}
            <div className="flex w-full flex-col gap-[24px] border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
              <div className="flex items-center justify-between">
                <p className="text-[20px] text-[#374151] font-[600]">
                  Education
                </p>
                {!viewAs && (
                  <div
                    className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                    onClick={() => openUpdatingModal("Add Education")}
                  >
                    <BsPlus />
                  </div>
                )}
              </div>
              {education?.length > 0 &&
                education?.map((edu, index) => {
                  const startDate = new Date(edu.start_date);
                  const endDate = new Date(edu.end_date);
                  const startYear = startDate.getFullYear();
                  const endYear = endDate.getFullYear();

                  return (
                    <div className="flex flex-col gap-[8px]" key={index}>
                      <div className="flex items-center justify-between">
                        <p className="text-[16px] text-[#374151] font-[600]">
                          {edu?.institution}
                        </p>
                        <div className="flex items-center gap-[12px]">
                          {!viewAs && (
                            <div
                              className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                              onClick={() =>
                                openUpdatingModal("Update Education", edu)
                              }
                            >
                              <TbPencil className="text-gray-300" />
                            </div>
                          )}
                          {!viewAs && (
                            <div
                              className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                              onClick={() =>
                                openUpdatingModal("Delete Education", edu)
                              }
                            >
                              <HiOutlineTrash className="text-gray-300" />
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-[14px] text-[#374151] font-[400]">
                        {edu?.degree_name}
                      </p>
                      <p className="text-[14px] text-[#374151] font-[400]">
                        {startYear} to {endYear}
                      </p>
                    </div>
                  );
                })}
            </div>

            {/* ==================== Experience ====================== */}
            <div className="flex flex-col gap-[24px] border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg  bg-white">
              <div className="flex items-center justify-between">
                <p className="text-[20px] text-[#374151] font-[600]">
                  Experience
                </p>
                {!viewAs && (
                  <div
                    className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                    onClick={() => openUpdatingModal("Add Experience")}
                  >
                    <BsPlus />
                  </div>
                )}
              </div>
              {experience?.length > 0 &&
                experience?.map((experience, index) => {
                  const startDate = new Date(experience.start_date);
                  const endDate = new Date(experience.end_date);
                  const startYear = startDate.getFullYear();
                  const endYear = endDate.getFullYear();
                  return (
                    <div className="flex flex-col gap-[8px]" key={index}>
                      <div className="flex items-center justify-between">
                        <p className="text-[16px] text-[#374151] font-[600]">
                          {experience?.company_name}
                        </p>
                        <div className="flex items-center gap-[12px]">
                          {!viewAs && (
                            <div
                              className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                              onClick={() =>
                                openUpdatingModal(
                                  "Update Experience",
                                  experience
                                )
                              }
                            >
                              <TbPencil className="text-gray-300" />
                            </div>
                          )}
                          {!viewAs && (
                            <div
                              className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                              onClick={() =>
                                openUpdatingModal(
                                  "Delete Experience",
                                  experience
                                )
                              }
                            >
                              <HiOutlineTrash className="text-gray-300" />
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-[14px] text-[#374151]  font-bold">
                        {experience?.position}
                      </p>
                      <p className="text-[14px] text-[#374151] font-[400]">
                        {experience?.job_location} | {startYear} to {endYear}
                      </p>
                      <p className="text-[14px] text-[#374151] font-[400]">
                        {experience?.job_description?.length > 100
                          ? experience.job_description.slice(0, 100) + "..."
                          : experience.job_description}
                      </p>
                    </div>
                  );
                })}
            </div>

            {/* ==================== Linking Accounts =================== */}
            <LinkedAccounts />
          </div>

          <div className="w-full lg:w-[70%] flex flex-col gap-[24px]">
            {/* ==================== Basic info ====================== */}
            <div className="flex flex-col gap-5  border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
              <div className="flex gap-[16px] justify-between">
                <p className="text-[20px] text-[#374151] font-[600] w-[100%]">
                  {professional_role}
                </p>

                <div className="flex gap-5">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    ${hourly_rate}/hr
                  </p>
                  {!viewAs && (
                    <div
                      className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                      // onClick={() => {
                      //   openEditBasicModal(
                      //     professional_role,
                      //     hourly_rate,
                      //     description
                      //   );
                      // }}
                      onClick={() => openUpdatingModal("Update Basic Info")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
                          stroke="#6B7280"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 4.33301L11.6667 6.99967"
                          stroke="#6B7280"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div className="h-max">
                <div
                  className={`${
                    showDetails ? "line-clamp-none" : "line-clamp-3"
                  }`}
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
                <button
                  className={`${
                    description.length >= 300
                      ? "underline text-[#16833E]"
                      : "hidden"
                  } `}
                  onClick={() => {
                    setShowDetails(!showDetails);
                  }}
                >
                  {showDetails ? "less" : "more"}
                </button>
              </div>
            </div>
            {/* ===================== skills ============= */}
            <div className="flex flex-col gap-[24px]  border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
              {!viewAs && (
                <div className="flex items-center justify-between">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    Skills
                  </p>
                  <div
                    className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                    onClick={() => openUpdatingModal("Update Skills")}
                  >
                    <TbPencil className="text-gray-300" />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
                {skills?.length > 0 &&
                  skills?.map((skill, idx) => {
                    return <SkillCard title={skill} key={idx} />;
                  })}
              </div>
            </div>
            {/* ======================= portfolio =============== */}
            <>
              {" "}
              <div className="flex flex-col gap-[24px]  border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
                <div className="flex items-center justify-between">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    Portfolio Projects
                  </p>
                  {!viewAs && (
                    <div
                      className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                      onClick={() => {
                        openUpdatingModal("Add New Project");
                      }}
                    >
                      <BsPlus />
                    </div>
                  )}
                </div>
                <div className="-z-0">
                  {portfolio?.length ? (
                    <div className="relative">
                      <Swiper
                        modules={[Navigation]}
                        navigation={{
                          prevEl: prevRef.current,
                          nextEl: nextRef.current,
                        }}
                        spaceBetween={30}
                        breakpoints={{
                          768: {
                            // width: 768,
                            slidesPerView: 2,
                          },
                          1024: {
                            // width: 1024,
                            slidesPerView: 3,
                          },
                        }}
                        pagination={{
                          clickable: true,
                        }}
                      >
                        {portfolio?.length > 0 &&
                          portfolio
                            ?.slice()
                            .reverse()
                            .map((port, idx) => (
                              <SwiperSlide key={idx}>
                                <PortfolioCard
                                  key={idx}
                                  portfolio={port}
                                  categories={profile?.profile?.categories}
                                />
                              </SwiperSlide>
                            ))}
                      </Swiper>
                      {portfolio?.length > 1 && (
                        <>
                          <button
                            ref={prevRef}
                            className="absolute top-1/2 -left-2 z-20 bg-green-100 rounded-full shadow -mt-4"
                          >
                            <IoArrowBack className="text-4xl p-2 text-green-500" />
                          </button>
                          <button
                            ref={nextRef}
                            className="absolute top-1/2 -right-2 z-20 bg-green-100 rounded-full shadow -mt-4"
                          >
                            <IoArrowForwardSharp className="text-4xl p-2 text-green-500" />
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <button
                        className="text-start px-3 py-1 rounded-md border-2 border-[var(--primarytextcolor)] hover:text-white hover:bg-[var(--primarytextcolor)] transition h-fit w-fit font-semibold mt-3"
                        onClick={() => {
                          openUpdatingModal("Add New Project");
                        }}
                      >
                        Add Portfolio For Attract Client & Get Offer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
            {/* ==================== GIGS ====================== */}
            <div className="flex flex-col gap-[24px]  border-[1px] pt-[20px] px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
              <div>
                <p className="text-[20px] text-[#374151] font-[600] pb-3">
                  {viewAs ? "Freelancer Gigs" : "Your Gigs"}
                </p>
                <hr />
                <br />
                <p className="mt-3">
                  Projects are a new way to earn on ZeeWork. Create project
                  offerings that highlight your strengths and attract more
                  clients.
                </p>
                <br />
                {!viewAs && (
                  <button
                    className="text-start px-5 py-1 rounded-full border-2 border-[var(--primarytextcolor)] hover:text-white hover:bg-[var(--primarytextcolor)] transition h-fit w-fit font-semibold mt-3"
                    onClick={() => router.push("/freelancer/gig")}
                  >
                    Manage Gigs
                  </button>
                )}
                <div className="mt-10 w-full">
                  <ProfileGigCards />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4"></div>
            </div>

            <div className="hidden flex-[0.5] gap-[24px] flex-col w-full max-lg:flex">
              <div className="flex flex-col gap-[24px] border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
                <div className="flex items-center justify-between">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    Education
                  </p>
                  {!viewAs && (
                    <div
                      className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)]"
                      onClick={() => openUpdatingModal("Add Education")}
                    >
                      <BsPlus />
                    </div>
                  )}
                </div>
                {education?.length > 0 &&
                  education?.map((edu, index) => (
                    <div className="flex flex-col gap-[8px]" key={index}>
                      <div className="flex items-center justify-between">
                        <p className="text-[16px] text-[#374151] font-[600]">
                          {edu?.institution}
                        </p>
                        <div className="flex items-center gap-[12px]">
                          {!viewAs && (
                            <div
                              className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                              onClick={() =>
                                openUpdatingModal("Update Education", edu)
                              }
                            >
                              <TbPencil className="text-gray-300" />
                            </div>
                          )}
                          {!viewAs && (
                            <div
                              className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                              onClick={() =>
                                openUpdatingModal("Delete Education", edu)
                              }
                            >
                              <HiOutlineTrash className="text-gray-300" />
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-[14px] text-[#374151] font-[400]">
                        {edu?.degree_name}
                      </p>
                      <p className="text-[14px] text-[#374151] font-[400]">
                        {edu?.end_date}
                      </p>
                    </div>
                  ))}
              </div>
              <div className="flex flex-col gap-[24px] border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
                <div className="flex items-center justify-between">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    Experience
                  </p>
                  {!viewAs && (
                    <div
                      className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                      onClick={() => openUpdatingModal("Add Experience")}
                    >
                      <BsPlus />
                    </div>
                  )}
                </div>
                {experience?.length > 0 &&
                  experience?.map((experience, index) => {
                    const startDate = new Date(experience.start_date);
                    const endDate = new Date(experience.end_date);
                    const startYear = startDate.getFullYear();
                    const endYear = endDate.getFullYear();
                    return (
                      <div className="flex flex-col gap-[8px]" key={index}>
                        <div className="flex items-center justify-between">
                          <p className="text-[16px] text-[#374151] font-[600]">
                            {experience?.company_name}
                          </p>
                          <div className="flex items-center gap-[12px]">
                            {!viewAs && (
                              <div
                                className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                                onClick={() =>
                                  openUpdatingModal(
                                    "Update Experience",
                                    experience
                                  )
                                }
                              >
                                <TbPencil className="text-gray-300" />
                              </div>
                            )}
                            {!viewAs && (
                              <div
                                className="flex items-center justify-center w-[28px] h-[28px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer"
                                onClick={() =>
                                  openUpdatingModal(
                                    "Delete Experience",
                                    experience
                                  )
                                }
                              >
                                <HiOutlineTrash className="text-gray-300" />
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-[14px] text-[#374151]  font-bold">
                          {experience?.position}
                        </p>
                        <p className="text-[14px] text-[#374151] font-[400]">
                          {experience?.job_location} | {startYear} to {endYear}
                        </p>
                        <p className="text-[14px] text-[#374151] font-[400]">
                          {experience?.job_description}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* ================= work history ====================== */}
            <div className="border-[1px] pt-8 overflow-hidden border-[var(--bordersecondary)] bg-white rounded-xl">
              <div className="flex flex-col gap-6 px-6 ">
                {" "}
                <div className="flex items-center justify-between">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    Work History
                  </p>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <p className="text-[14px] text-[#22C35E] font-[600] cursor-pointer">
                    Completed Jobs
                  </p>
                  <div className="h-[2px] w-[60px] bg-[#22C35E]"></div>
                </div>
              </div>

              {workHistory?.length ? (
                workHistory?.map((item, index) => (
                  <ReviewCard key={index} workDetails={item} />
                ))
              ) : (
                <p className="p-6 text-center">No completed jobs yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Manage Profile Updating Thing */}
      <ProfileUpdating
        type={type}
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
        isModal={isModal}
        setIsModal={setIsModal}
      />
    </ProfileContainer>
  );
};
