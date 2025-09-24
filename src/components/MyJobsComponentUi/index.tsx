
"use client";
import React from "react";

import { useEffect, useState } from "react";
import { getAgencyAllJobs, userAllJobs } from "../../helpers/APIs/jobApis";
import ActiveJobSlider from "./ActiveJobSlider";
import ApplyedJobs from "./ApplyedJobs/ApplyedJobs";
import CompletedJobs from "./ApplyedJobs/CompletedJobs";

import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { setMyJobsData } from "../../redux/pagesSlice/pagesSlice";
import AgencyContract from "./AgencyContract/AgencyContract";

const MyJobsComponentUi = () => {
  const [cookies] = useCookies(["activeagency"]);
  const userJobs = useSelector((state: any) => state.pages.myJobs.userJobs);
  const [loading, setLoading] = useState(false);
  const { active_jobs, completed_jobs, applied_jobs, contract_from_agency } =
    userJobs || {};
  const router = useRouter();
  const dispatch = useDispatch();

  const getUserJobs = async () => {
    setLoading(true);
    try {
      const response = cookies.activeagency
        ? await getAgencyAllJobs()
        : await userAllJobs();
      if (response) dispatch(setMyJobsData({ userJobs: response }));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (Object.keys(userJobs).length === 0) {
      getUserJobs();
    }
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-12">
          <div>
            <h2 className="mt-8 mb-4 text-2xl font-medium">Active Jobs</h2>
          </div>

          {loading ? (
            <HorizontalCardSkeleton />
          ) : active_jobs?.length > 0 ? (
            <div className="my-4">
              <ActiveJobSlider activeJobList={active_jobs} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border border-[var(--bordersecondary)] rounded-lg h-[10rem] bg-white"
            >
              <span
               className="mb-[10px] text-xl font-semibold capitalize">
                Currently No Active Jobs
              </span>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded"
                backgroundColor={"var(--primarycolor)"}
                _hover={{
                  border: "1px solid var(--primarycolor)",
                  backgroundColor: "white",
                  color: "black",
                }}
                onClick={() => router.push("/find-job")}
              >
                Find Jobs Now
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        {!cookies.activeagency && (
          <AgencyContract
            contractList={contract_from_agency}
            loading={loading}
          />
        )}
        <ApplyedJobs applyJobs={applied_jobs} loading={loading} />
        <CompletedJobs completedJobs={completed_jobs} loading={loading} />
      </div>
    </div>
  );
};

export default MyJobsComponentUi;
