"use client";

import { useContext, useEffect, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { useParams } from "next/navigation";
import { toaster } from "@/lib/providers";
import SkillCard from "../../Profile/FreelancerProfile/FreelancerProfile/SkillCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import HomeLayout from "../../../Layouts/HomeLayout";
import { FaLocationDot } from "react-icons/fa6";
import AgencyProfileSkeleton from "../../Skeletons/AgencyProfileSkeleton";
import { useRouter } from "next/navigation";
import PortfolioCard from "./PortfolioCard";
import { useSelector } from "react-redux";
import { getFreelancerById } from "../../../helpers/APIs/freelancerApis";
import DataNotAvailable from "../../DataNotAvailable/DataNotAvailable";
import LinkedAccounts from "../../Profile/FreelancerProfile/FreelancerProfile/LinkingAccounts/LinkedAccounts";
import ProfilesCard from "../../Profile/FreelancerProfile/FreelancerProfile/LinkingAccounts/ProfilesCard/ProfilesCard";
import { CurrentUserContext } from "../../../contexts/CurrentUser";
import AddPaymentNotifyModal from "../../Modals/AddPaymentNotifyModal";

const ViewFreelancerProfile = () => {
  const role = useSelector((state: any) => state.auth.role);
  const { profile } = useContext(CurrentUserContext);
  const [freelancerDetails, setFreelancerDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [paymentNotifyModal, setPaymentNotifyModal] = useState(false);

  const { id } = useParams();
  const {
    professional_role,
    profile_image,
    hourly_rate,
    description,
    skills,
    experience,
    education,
    portfolio,
    firstName,
    lastName,
    location,
    user_id,
    linked_accounts,
  } = freelancerDetails;

  const dataAvailable = freelancerDetails && firstName;

  const getDetails = async () => {
    setIsLoading(true);
    try {
      const { body, code } = await getFreelancerById(id);
      if (code === 200) setFreelancerDetails(body);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleHire = async () => {
    if (!freelancerDetails) return;

    if (!profile?.profile?.payment_verified) return setPaymentNotifyModal(true);

    router.push(`/client/hire?freelancer=${user_id}`);
  };

  const handleCopyProfileURL = () => {
    const profileURL = window.location.href;
    navigator.clipboard.writeText(profileURL);

    toaster.create({
      title: "Freelancer Profile Copied.",
      type: "success",
      duration: 3000,
    });
  };

  return (
    <>
      {isLoading ? (
        <AgencyProfileSkeleton />
      ) : dataAvailable ? (
        <div className="w-full justify-center m-auto flex flex-col gap-[24px] mt-10">
          <div className="w-[100%] bg-white flex items-center justify-between border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg max-sm:flex-col max-sm:gap-4">
            <div className="flex gap-[14px] items-center">
              <Avatar
                src={profile_image}
                name={firstName + " " + lastName}
                width={"80px"}
                height={"80px"}
              />

              <div className="flex flex-col justify-start">
                <p className="text-2xl text-[#374151] font-semibold">
                  {firstName + " " + lastName?.slice(0, 1) + "."}
                </p>
                <p className="font-semibold text-gray-700">
                  {professional_role}
                </p>
                <div className="flex items-center gap-1 text-[#374151] font-[400]">
                  <FaLocationDot className="text-gray-300" />
                  <p>{location}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-[12px]">
              <div
                className="flex items-center cursor-pointer justify-center w-[36px] h-[36px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)]"
                onClick={handleCopyProfileURL}
              >
                <BsLink45Deg width={"20px"} height={"20px"} />
              </div>
              {role == 2 && (
                <button
                  className="py-2 px-10 rounded-[6px] text-[14px] font-500 text-[#fff] bg-[#22C55E]"
                  onClick={handleHire}
                >
                  Hire
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

              {/* ==================== Education ====================== */}
              {education?.length > 0 && (
                <div className="flex w-full flex-col gap-[24px] border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
                  <div className="flex items-center justify-between">
                    <p className="text-[20px] text-[#374151] font-[600]">
                      Education
                    </p>
                  </div>
                  {education?.map((edu) => {
                    const startDate = new Date(edu.start_date);
                    const endDate = new Date(edu.end_date);
                    const startYear = startDate.getFullYear();
                    const endYear = endDate.getFullYear();

                    return (
                      <div className="flex flex-col gap-[8px]" key={edu?._id}>
                        <div className="flex items-center justify-between">
                          <p className="text-[16px] text-[#374151] font-[600] capitalize">
                            {edu?.institution}
                          </p>
                        </div>
                        <p className="text-[14px] text-[#374151] font-[400] capitalize">
                          {edu?.degree_name}
                        </p>
                        <p className="text-[14px] text-[#374151] font-[400]">
                          {startYear} to {endYear}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ==================== Experience ====================== */}
              {experience?.length > 0 && (
                <div className="flex flex-col gap-[24px] border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg  bg-white">
                  <div className="flex items-center justify-between">
                    <p className="text-[20px] text-[#374151] font-[600]">
                      Experience
                    </p>
                  </div>
                  {experience?.map((experience, index) => {
                    const startDate = new Date(experience.start_date);
                    const endDate = new Date(experience.end_date);
                    const startYear = startDate.getFullYear();
                    const endYear = endDate.getFullYear();
                    return (
                      <div className="flex flex-col gap-[8px]" key={index}>
                        <div className="flex items-center justify-between">
                          <p className="text-[16px] text-[#374151] font-[600] capitalize">
                            {experience?.company_name}
                          </p>
                        </div>
                        <p className="text-[14px] text-[#374151] font-bold capitalize">
                          {experience?.position}
                        </p>
                        <p className="text-[14px] text-[#374151] font-[400] capitalize">
                          {experience?.job_location} | {startYear} to {endYear}
                        </p>
                        <p
                          className="text-[14px] text-[#374151] font-[400]"
                          title={experience?.job_description}
                        >
                          {experience?.job_description?.length > 100
                            ? experience.job_description.slice(0, 100) + "..."
                            : experience.job_description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ==================== Linking Accounts =================== */}
              {linked_accounts?.length ? (
                <div className="flex flex-col gap-[24px] border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
                  <p className="text-[20px] text-[#374151] font-[600]">
                    Linked Accounts
                  </p>
                  <VStack
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={4}
                    align="stretch"
                    className="bg-slate-50 rounded-md p-3"
                  >
                    {linked_accounts.map((item) => (
                      <ProfilesCard
                        key={item.username}
                        data={item}
                        isPublic={true}
                      />
                    ))}
                  </VStack>
                </div>
              ) : null}
            </div>
            <div className="w-full lg:w-[70%] flex flex-col gap-[24px]">
              <div className="flex flex-col gap-5  border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-xl bg-white">
                <div className="flex gap-[16px] justify-between">
                  <p className="text-[20px] text-[#374151] font-[600] w-[480px]">
                    {professional_role}
                  </p>

                  <div className="flex gap-5">
                    <p className="text-[20px] text-[#374151] font-[600]">
                      ${hourly_rate}/hr
                    </p>
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
              <div className="flex flex-col gap-[24px]  border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-xl bg-white">
                <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
                  {skills?.length > 0 &&
                    skills?.map((skill, idx) => {
                      return <SkillCard title={skill} key={idx} />;
                    })}
                </div>
              </div>
              {/* ======================= portfolio =============== */}
              {portfolio.length ? (
                <>
                  <div className="flex flex-col gap-[24px]  border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-xl bg-white">
                    <div className="flex items-center justify-between">
                      <p className="text-[20px] text-[#374151] font-[600]">
                        Portfolio
                      </p>
                    </div>
                    <div className="-z-0">
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        freeMode={true}
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
                        // modules={[FreeMode, Pagination]}
                      >
                        {portfolio?.length > 0 &&
                          portfolio
                            ?.slice()
                            .reverse()
                            .map((port, idx) => (
                              <SwiperSlide key={idx}>
                                <PortfolioCard portfolio={port} />
                              </SwiperSlide>
                            ))}
                      </Swiper>
                    </div>
                  </div>
                </>
              ) : null}

              {/* <div className="flex flex-col gap-[24px]  border-[1px] pt-[20px] px-[24px] border-[var(--bordersecondary)] rounded-xl bg-white">
              <div>
                <hr />
                <div className="mt-10 w-full"><ProfileGigCards /></div>
              </div>

              <div className="grid grid-cols-3 gap-4"></div>
            </div> */}

              {/* ================= work history ====================== */}
              <div className="flex flex-col gap-[24px]  border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-xl bg-white">
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
                {/* {profile?.work_history?.length ? (
                profile?.work_history?.map((item, index) => (
                  <ReviewCard key={index} workDetails={item} />
                ))
              ) : (
                <p>No completed jobs yet.</p>
              )} */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DataNotAvailable onRefresh={getDetails} />
      )}

      <AddPaymentNotifyModal
        isOpen={paymentNotifyModal}
        setIsOpen={setPaymentNotifyModal}
      />
    </>
  );
};

export default ViewFreelancerProfile;
