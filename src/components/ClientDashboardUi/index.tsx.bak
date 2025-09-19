"use client";

import {
  Button,
  HStack,
  Progress,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { IoMdRefreshCircle } from "react-icons/io";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  getClientJobs,
  getHiredListByClient,
} from "../../helpers/APIs/clientApis";
import useUserActivityListener from "../../hooks/useUserActivityListener";
import { setDashboard } from "../../redux/pagesSlice/pagesSlice";
import Greetings from "../Common/Greetings";
import ClientJobSkeleton from "../Skeletons/ClientJobSkeleton";
import Pagination from "../utils/Pagination/Pagination";
import ClientProfileCard from "./ClientProfileCard";
import LatestOffers from "./LatestOffers/LatestOffers";

const ClientDashboardComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { jobs, hiredList } = useSelector((state: any) => state.pages.dashboard);
  const [isLoading, setIsLoading] = useState(false);
  const jobsx = jobs.slice().reverse();
  const [visibleJobs, setVisibleJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const pageSize = 5;
  const totalPages = Math.ceil(jobs.length / pageSize);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleJobsPagination = () => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setVisibleJobs(jobsx.slice(startIndex, endIndex));

    // Scroll to the top
    const jobPostingsDiv = document.getElementById("jobPostingsDiv");
    if (jobPostingsDiv && page !== 1) {
      jobPostingsDiv.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    handleJobsPagination();
  }, [page, jobs]);

  const filteredHiredList = Array.isArray(hiredList)
    ? hiredList.filter((item) => item?.is_active)
    : [];

  useUserActivityListener((data) => {
    if (data) {
      dispatch(
        setDashboard({
          hiredList: hiredList?.map((i) =>
            i?.freelancer_id === data.user.user_id ||
            i?.freelancer_id === data.user?.agency_id
              ? {
                  ...i,
                  freelancerDetails: {
                    ...i.freelancerDetails,
                    activity: data.status,
                  },
                }
              : i
          ),
        })
      );
    }
  });

  const getClientPostedJob = async () => {
    setIsLoading(true);
    try {
      const response = await getClientJobs();

      const sortedJobs = [...response].sort((a, b) =>
        a.created_at.localeCompare(b.created_at)
      );

      dispatch(setDashboard({ jobs: sortedJobs }));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getHiredFreelancer = async () => {
    const { code, body } = await getHiredListByClient();

    if (code === 200 && body?.length)
      dispatch(setDashboard({ hiredList: body }));
  };

  useEffect(() => {
    if (!jobs.length) getClientPostedJob();
    if (!hiredList.length) getHiredFreelancer();
  }, []);

  const isVisibleSliderButton =
    (filteredHiredList?.length > 3 && !isMobile) ||
    (filteredHiredList?.length > 1 && isMobile);

  return (
    <div className="w-full mt-8">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-3xl font-light lg:mb-4 mb-0 text-[#374151]">
          Your Dashboard
        </h2>
        <Greetings />
        <div className="flex gap-4 w-full max-lg:flex-col">
          <div className="max-lg:max-w-full lg:min-w-[70%]">
            <h2 className="text-[25px] mb-2">Your Team</h2>
            {/* <h6 className="text-[16px]">My Team</h6> */}
            {filteredHiredList?.length > 0 ? (
              <div className="relative">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    768: {
                      // width: 768,
                      slidesPerView: 2,
                    },
                    1440: {
                      // width: 1024,
                      slidesPerView: 3,
                    },
                  }}
                  modules={[Navigation]}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                >
                  {filteredHiredList?.length > 0 &&
                    filteredHiredList
                      ?.slice()
                      ?.reverse()
                      ?.filter((profile) => profile?.freelancerDetails)
                      ?.map((data, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <ClientProfileCard data={data} />
                          </SwiperSlide>
                        );
                      })}
                </Swiper>

                <button
                  ref={prevRef}
                  className="absolute top-1/2 -left-2 z-20 bg-green-100 rounded-full shadow -mt-4"
                  style={{ display: isVisibleSliderButton ? "block" : "none" }}
                >
                  <IoArrowBack className="text-4xl p-2 text-green-500" />
                </button>
                <button
                  ref={nextRef}
                  className="absolute top-1/2 -right-2 z-20 bg-green-100 rounded-full shadow -mt-4"
                  style={{ display: isVisibleSliderButton ? "block" : "none" }}
                >
                  <IoArrowForwardSharp className="text-4xl p-2 text-green-500" />
                </button>
              </div>
            ) : (
              <div className="border border-[var(--bordersecondary)] mt-4 rounded-md bg-white w-full h-max">
                <div className="flex justify-between border-b border-[var(--bordersecondary)] p-4">
                  <div className=" text-2xl font-medium text-[#374151]">
                    My Team
                  </div>
                </div>
                <div className=" lg:h-[200px] text-center py-4 h-max">
                  <div className="w-[70%] m-auto flex flex-col justify-center items-center gap-2 h-full">
                    <h2 className="font-bold text-xl">Welcome to ZeeWork!</h2>
                    <p className="py-3">
                      Ready to start building your team online? Explore our vast
                      database of programmers, designers, marketers, builders &
                      more. Click below to make your first hire & bring your
                      project live.
                    </p>
                    <Button
                      colorScheme="primary"
                      w={"12rem"}
                      onClick={() => router.push("/create-job")}
                    >
                      Post a new job
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <div className="max-lg:hidden">
              <div className="border border-[var(--bordersecondary)] mt-4 rounded-md overflow-hidden w-[100%]">
                <div className="flex justify-between border-b border-[var(--bordersecondary)] bg-white p-4">
                  <div className=" text-2xl font-medium text-[#374151]">
                    Latest Offers
                  </div>
                </div>
                <div className="bg-white text-center py-4 w-full">
                  <div className="w-full">
                    <LatestOffers />
                  </div>
                </div>
              </div>
              <div className="my-6 border border-[var(--bordersecondary)]  rounded-md w-full bg-white overflow-hidden">
                <div className=" flex items-center justify-between border-b border-[var(--bordersecondary)] p-4 ">
                  <div
                    id="jobPostingsDiv"
                    className="text-2xl font-medium text-[#374151]"
                  >
                    Your Job Postings
                  </div>
                  <IoMdRefreshCircle
                    className={`text-2xl sm:text-3xl text-primary hover:text-green-400 active:text-primary cursor-pointer ${
                      isLoading && "animate-spin cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (!isLoading) getClientPostedJob();
                    }}
                  />
                </div>
                <div className="w-full">
                  {isLoading ? (
                    <VStack
                      divider={
                        <StackDivider borderColor="var(--bordersecondary)" />
                      }
                      spacing={8}
                      align="stretch"
                      bgColor={"white"}
                      padding={5}
                    >
                      {[1, 2].map((item) => (
                        <ClientJobSkeleton key={item} />
                      ))}
                    </VStack>
                  ) : jobs?.length ? (
                    <VStack
                      divider={
                        <StackDivider borderColor="var(--bordersecondary)" />
                      }
                      spacing={8}
                      align="stretch"
                      bgColor={"white"}
                      padding={5}
                    >
                      {visibleJobs.map((job, index) => {
                        const formattedDate = formatDistanceToNow(
                          new Date(job?.created_at),
                          { addSuffix: true }
                        );
                        return (
                          <div
                            className="flex items-center justify-between w-full max-[480px]:flex-col"
                            key={index}
                          >
                            <VStack
                              alignItems={"start"}
                              justifyContent={"center"}
                              cursor={"pointer"}
                              onClick={() => {
                                router.push(`/client-jobDetails/${job?._id}`, {
                                  state: { jobDetails: job },
                                });
                              }}
                              w={"full"}
                            >
                              <h5 className="text-lg text-[#374151] font-medium capitalize">
                                {job?.title}
                              </h5>
                              <div className="text-sm text-[#6B7280]">
                                <div className="mb-1 text-[#6B7280] capitalize">
                                  Public - {job?.job_type}
                                </div>
                                <div>Posted {formattedDate} ago by you</div>
                              </div>
                            </VStack>

                            <VStack
                              width={"200px"}
                              justifyContent={"space-between"}
                              alignItems={"end"}
                              className="max-[480px]:!items-center"
                              marginTop={{ base: "1rem", sm: "0" }}
                            >
                              <HStack>
                                <div className=" text-[#6B7280] font-bold text-base">
                                  {job?.proposal_details?.length === 0
                                    ? "No"
                                    : job?.proposal_details?.filter(
                                        (item) =>
                                          item.contract_status === "applied"
                                      )?.length}{" "}
                                  New Applicants
                                </div>
                              </HStack>
                              <Button
                                colorScheme="22C35E"
                                color={"#000"}
                                border={"1px solid #22C35E"}
                                size="sm"
                                fontSize={"sm"}
                                w={"10rem"}
                                textTransform={"capitalize"}
                                transition={"0.3s ease-in-out"}
                                _hover={{
                                  bg: "#22C35E",
                                  color: "#fff",
                                }}
                                onClick={() => {
                                  router.push(`/client-jobDetails/${job._id}`, {
                                    state: { jobDetails: job },
                                  });
                                }}
                              >
                                Go to job post
                              </Button>
                              <Button
                                colorScheme="22C35E"
                                color={"#000"}
                                border={"1px solid #22C35E"}
                                size="sm"
                                fontSize={"sm"}
                                w={"10rem"}
                                textTransform={"capitalize"}
                                transition={"0.3s ease-in-out"}
                                _hover={{
                                  bg: "#22C35E",
                                  color: "#fff",
                                }}
                                onClick={() => {
                                  router.push(`/client-jobDetails/${job._id}`, {
                                    state: { jobDetails: job },
                                  });
                                }}
                              >
                                Find Applicants
                              </Button>
                            </VStack>
                          </div>
                        );
                      })}

                      {/* Pagination */}

                      <Pagination
                        totalPages={totalPages}
                        currentPage={page}
                        onPageChange={setPage}
                      />
                    </VStack>
                  ) : (
                    <div className="p-5 text-lg text-center py-10">
                      You haven&apos;t post any jobs yet!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[300px]">
            <VStack
              gap={"5"}
              className="w-full lg:w-[300px]"
              height={"max-content"}
            >
              <Button
                colorScheme="primary"
                w={"100%"}
                fontSize={"1.3rem"}
                padding={"30px 0"}
                textTransform={"capitalize"}
                onClick={() => {
                  router.push("/create-job");
                }}
              >
                Post a new job
              </Button>
              <div className=" w-full border border-[var(--bordersecondary)] bg-white rounded-md p-4 h-full">
                <h4 className="text-[18px] mb-4 font-bold">
                  Tips For Getting Started
                </h4>
                <div className=" my-6">
                  <Progress value={60} colorScheme="primary" size={"sm"} />
                </div>
                <div className=" flex items-center border border-[var(--bordersecondary)] rounded-md py-2 px-4 mb-4">
                  <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                    <img
                      src="images/dashboard/zeework_proposals.png"
                      alt="proposals"
                      className="w-[42px] "
                    />
                  </div>
                  <p
                    className="ml-3 cursor-pointer"
                    onClick={() => {
                      router.push("/setting/billing-payments");
                    }}
                  >
                    Add Your Billing Method
                  </p>
                </div>
                <div className=" flex items-center border border-[var(--bordersecondary)] rounded-md py-2 px-4 mb-4">
                  <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                    <img
                      src="images/dashboard/zeework_proposals.png"
                      alt="proposals"
                    />
                  </div>
                  <p
                    className="ml-3 cursor-pointer"
                    onClick={() => {
                      router.push("/create-job");
                    }}
                  >
                    Post Your First Job
                  </p>
                </div>
                <div className=" flex items-center border border-[var(--bordersecondary)] rounded-md py-2 px-4 mb-4">
                  <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                    <img
                      src="images/dashboard/zeework_proposals.png"
                      alt="proposals"
                    />
                  </div>
                  <p
                    className="ml-3 cursor-pointer"
                    onClick={() => {
                      router.push("/setting/billing-payments");
                    }}
                  >
                    Invite Talent To Apply
                  </p>
                </div>
                <div className=" flex items-center border border-[var(--bordersecondary)] rounded-md py-2 px-4 mb-4">
                  <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                    <img
                      src="images/dashboard/zeework_proposals.png"
                      alt="proposals"
                    />
                  </div>
                  <p className="ml-3">Review Proposals</p>
                </div>
                <div className=" flex items-center border border-[var(--bordersecondary)] rounded-md py-2 px-4 mb-4">
                  <div className="w-[42px] h-[42px] bg-[#F0FDF4] rounded-lg">
                    <img
                      src="images/dashboard/zeework_proposals.png"
                      alt="proposals"
                    />
                  </div>
                  <p className="ml-3">Hire Your Perfect Freelancer</p>
                </div>
              </div>
            </VStack>
          </div>
        </div>
        <div className="lg:hidden">
          <div className="border border-[var(--bordersecondary)] mt-4 rounded-md overflow-hidden">
            <div className="flex justify-between border-b border-[var(--bordersecondary)] bg-white p-4">
              <div className=" text-2xl font-medium text-[#374151]">
                Latest Offers
              </div>
            </div>
            <div className="bg-white text-center py-4">
              <div>
                <LatestOffers />
              </div>
            </div>
          </div>
          <div className="my-6 border border-[var(--bordersecondary)]  rounded-md w-full bg-white overflow-hidden">
            <div className=" flex items-center justify-between border-b border-[var(--bordersecondary)] p-4 ">
              <div
                id="jobPostingsDiv"
                className=" text-2xl font-medium text-[#374151]"
              >
                Your Job Postings
              </div>
            </div>
            <div className="w-full">
              {isLoading ? (
                <VStack
                  divider={
                    <StackDivider borderColor="var(--bordersecondary)" />
                  }
                  spacing={8}
                  align="stretch"
                  bgColor={"white"}
                  padding={5}
                >
                  {[1, 2].map((item) => (
                    <ClientJobSkeleton key={item} />
                  ))}
                </VStack>
              ) : jobs?.length ? (
                <VStack
                  divider={
                    <StackDivider borderColor="var(--bordersecondary)" />
                  }
                  spacing={8}
                  align="stretch"
                  bgColor={"white"}
                  padding={5}
                >
                  {visibleJobs?.slice().map((job, index) => {
                    const formattedDate = formatDistanceToNow(
                      new Date(job?.created_at),
                      { addSuffix: true }
                    );
                    return (
                      <div
                        className="flex items-center justify-between w-full max-[480px]:flex-col"
                        key={index}
                      >
                        <VStack
                          alignItems={"start"}
                          justifyContent={"center"}
                          cursor={"pointer"}
                          onClick={() => {
                            router.push(`/client-jobDetails/${job?._id}`, {
                              state: { jobDetails: job },
                            });
                          }}
                          w={"full"}
                        >
                          <h5 className="text-lg text-[#374151] font-medium capitalize">
                            {job?.title}
                          </h5>
                          <div className="text-sm text-[#6B7280]">
                            <div className="mb-1 text-[#6B7280] capitalize">
                              Public - {job?.job_type}
                            </div>
                            <div>Posted {formattedDate} ago by you</div>
                          </div>
                        </VStack>

                        <VStack
                          width={"200px"}
                          justifyContent={"space-between"}
                          alignItems={"end"}
                          className="max-[480px]:!items-center"
                          marginTop={{ base: "1rem", sm: "0" }}
                        >
                          <HStack>
                            <div className=" text-[#6B7280] font-bold text-base">
                              {job?.proposal_details?.length === 0
                                ? "No"
                                : job?.proposal_details?.length}{" "}
                              New
                            </div>
                            <div className=" text-[#6B7280] text-base font-bold"></div>
                          </HStack>
                          <Button
                            colorScheme="22C35E"
                            color={"#000"}
                            border={"1px solid #22C35E"}
                            size="sm"
                            fontSize={"sm"}
                            w={"10rem"}
                            textTransform={"capitalize"}
                            transition={"0.3s ease-in-out"}
                            _hover={{
                              bg: "#22C35E",
                              color: "#fff",
                            }}
                            onClick={() => {
                              router.push(`/client-jobDetails/${job._id}`, {
                                state: { jobDetails: job },
                              });
                            }}
                          >
                            Go to job post
                          </Button>
                          <Button
                            colorScheme="22C35E"
                            color={"#000"}
                            border={"1px solid #22C35E"}
                            size="sm"
                            fontSize={"sm"}
                            w={"10rem"}
                            textTransform={"capitalize"}
                            transition={"0.3s ease-in-out"}
                            _hover={{
                              bg: "#22C35E",
                              color: "#fff",
                            }}
                            onClick={() => {
                              router.push(`/client-jobDetails/${job._id}`, {
                                state: { jobDetails: job },
                              });
                            }}
                          >
                            Find Applicants
                          </Button>
                        </VStack>
                      </div>
                    );
                  })}

                  {/* Pagination */}

                  <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={setPage}
                  />
                </VStack>
              ) : (
                <div className="p-5 text-lg text-center py-10">
                  You haven&apos;t post any jobs yet!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardComponent;
