"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { getAllJobs } from "../../helpers/APIs/jobApis";
import { useRouter } from "next/navigation";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { useDispatch, useSelector } from "react-redux";
import { setFindWorkData } from "../../redux/pagesSlice/pagesSlice";
import ModernJobCard from "./ModernJobCard";
import UserProfileCard from "./UserCard";
import AgencyUserCard from "./AgencyUserCard";
import TimerDownloadCard from "../Common/TimerDownloadCard";
import Banner from "../Banners/Banner";
import Greetings from "../Common/Greetings";
import { IoMdRefreshCircle } from "react-icons/io";

const ModernAllJobs = () => {
  const jobs = useSelector((state: any) => state.pages.findWork.jobsList);
  const latestJobs = jobs?.slice(0, 4);
  const router = useRouter();
  const { hasAgency, activeAgency } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getAllJobList = async () => {
    setIsLoading(true);
    try {
      const response = await getAllJobs();
      if (response?.length) {
        dispatch(setFindWorkData({ jobsList: response }));
      }
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!jobs?.length) getAllJobList();
  }, []);

  return (
    <div className="w-full max-w-[1400px]">
      <div className="flex justify-center w-full py-6">
        <div className="w-full lg:w-[75%]">
          <Banner />
          <Greetings />

          {/* Desktop Quick Actions */}
          <div className="hidden gap-5 mt-4 md:grid md:grid-cols-3">
            <div className="flex items-center justify-start col-span-1 gap-2 px-5 py-4 transition bg-white border cursor-pointer max-xl:flex-wrap rounded-xl hover:border-green-500">
              <img
                src="/images/dashboard/zeework_proposals.png"
                alt="proposals"
              />
              <div
                onClick={() => {
                  router.push("/search-job?page=1");
                }}
              >
                <div className="font-semibold text-md">Find A Job</div>
                <div className="text-sm text-gray-300">
                  Search & apply to your next
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start col-span-1 gap-2 px-5 py-4 transition bg-white border cursor-pointer max-xl:flex-wrap rounded-xl hover:border-green-500">
              <img src="/images/dashboard/zeework_stats.png" alt="proposals" />
              <div
                onClick={() => {
                  router.push("/my-stats");
                }}
              >
                <div className="font-semibold text-md">My Stats</div>
                <div className="text-sm text-gray-300">
                  Check your earnings & time spent working
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start col-span-1 gap-2 px-5 py-4 transition bg-white border cursor-pointer max-xl:flex-wrap rounded-xl hover:border-green-500">
              <img src="/images/dashboard/zeework_jobs.png" alt="proposals" />
              <div
                onClick={() => {
                  router.push("/my-jobs");
                }}
              >
                <div className="font-semibold text-md">My Jobs</div>
                <div className="text-sm text-gray-300">
                  View your active jobs & proposals
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Quick Actions */}
          <div className="flex flex-col gap-2 md:hidden">
            <div className="flex flex-row items-center justify-start w-full p-4 transition-all duration-300 bg-white border rounded cursor-pointer hover:border-green-500">
              <img
                src="/images/dashboard/zeework_proposals.png"
                alt="proposals"
              />
              <div
                onClick={() => {
                  router.push("/search-job?page=1");
                }}
              >
                <div className="text-sm font-semibold">Find A Job</div>
                <div className="text-sm text-gray-300">
                  Search & apply to your next
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start w-full p-4 transition-all duration-300 bg-white border rounded cursor-pointer hover:border-green-500">
              <img src="/images/dashboard/zeework_stats.png" alt="proposals" />
              <div
                onClick={() => {
                  router.push("/my-stats");
                }}
              >
                <div className="text-sm font-semibold">My Stats</div>
                <div className="text-sm text-gray-300">
                  Check your earnings & time spent working
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start w-full p-4 transition-all duration-300 bg-white border rounded cursor-pointer hover:border-green-500">
              <img src="/images/dashboard/zeework_jobs.png" alt="proposals" />
              <div
                onClick={() => {
                  router.push("/my-jobs");
                }}
              >
                <div className="text-sm font-semibold">My Jobs</div>
                <div className="text-sm text-gray-300">
                  View your active jobs & proposals
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 mt-3">
            <p className="text-xl font-bold capitalize">Latest Job Postings</p>
            <IoMdRefreshCircle
              className={`text-2xl sm:text-3xl text-primary hover:text-green-400 active:text-primary cursor-pointer ${
                isLoading && "animate-spin cursor-not-allowed"
              }`}
              onClick={() => {
                if (!isLoading) getAllJobList();
              }}
            />
          </div>

          <div className="w-full">
            <ModernJobCard isLoading={isLoading} jobs={latestJobs} />
          </div>

          {latestJobs?.length > 0 && (
            <div className="mx-auto mt-4">
              <button
                className="bg-[#E7F2EB] text-[#22C55E] border-2 w-[130px] m-auto border-[#22C55E] px-4 py-2 rounded-md flex items-center gap-2"
                onClick={() => router.push("/search-job")}
              >
                See More{" "}
                <img
                  src="/images/dashboard/zeework_button-drop.png"
                  className="pt-1"
                  alt="dropdown"
                />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden pl-6 lg:block">
          {hasAgency && activeAgency ? (
            <>
              <AgencyUserCard />
              <br />
              <UserProfileCard />
            </>
          ) : (
            <>
              <UserProfileCard />
              <br />
              <AgencyUserCard />
            </>
          )}
          <TimerDownloadCard />
        </div>
      </div>
    </div>
  );
};

export default ModernAllJobs;