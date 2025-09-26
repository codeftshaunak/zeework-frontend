import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

import { AiOutlineDollarCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import StarRatings from "react-star-ratings";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { LuBadgeX } from "react-icons/lu";
import JobCardSkeleton from "../Skeletons/JobCardSkeleton";

// Types
interface Job {
  _id: string;
  title: string;
  created_at: string;
  job_type: "fixed" | "hourly";
  experience: string;
  amount: number;
  description: string;
  skills: string[];
  client_details?: {
    payment_verified: boolean;
    avg_review: number;
    total_spend: number;
    location: string;
  };
}

interface JobCardProps {
  jobs: Job[] | Record<string, any>[] | undefined | null;
  searchTerm?: string;
  showHighlightedSearchTerm?: boolean;
  isLoading?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  jobs,
  searchTerm,
  showHighlightedSearchTerm,
  isLoading,
}) => {
  const router = useRouter();

  const truncateText = (text: string, maxLength: number) => {
    return text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm || !showHighlightedSearchTerm) {
      return text;
    }

    const regex = new RegExp(searchTerm, "gi");
    return text.replace(
      regex,
      (match) => `<span class="bg-primary/40">${match}</span>`
    );
  };

  function formatNumber(num: number | null | undefined) {
    if (!num) return "0";
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num?.toString();
  }

  // Ensure jobs is always an array
  const jobsArray = Array.isArray(jobs) ? jobs : [];

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          {[1, 2].map((item) => (
            <JobCardSkeleton key={item} />
          ))}
        </div>
      ) : (
        <div className="w-full">
          {jobsArray.length > 0 ? (
            jobsArray.map((job, index) => {
              const formattedDate = formatDistanceToNow(
                new Date(job?.created_at),
                {
                  addSuffix: true,
                }
              );

              return (
                <div
                  key={index}
                  className="border border-[#D1D5DA] rounded-xl bg-white h-max flex items-center mt-4 py-3"
                >
                  <div className="px-5 py-2.5 md:px-8 md:py-4">
                    <div
                      className="text-[#536179] text-sm"
                      dangerouslySetInnerHTML={{
                        __html: highlightSearchTerm(`Posted ${formattedDate}`),
                      }}
                    />
                    <div
                      className="mt-2 mb-2 text-lg font-medium capitalize cursor-pointer md:font-semibold md:text-xl"
                      onClick={() => {
                        router.push(`/find-job/${job?._id}`);
                      }}
                      dangerouslySetInnerHTML={{
                        __html: highlightSearchTerm(job?.title || ""),
                      }}
                    />
                    <div
                      className="text-[#536179] text-sm"
                      dangerouslySetInnerHTML={{
                        __html: highlightSearchTerm(
                          `${
                            (job?.job_type === "fixed" && " Fixed Budget ") ||
                            (job?.job_type === "hourly" && "Hourly")
                          } / ${job?.experience || "N/A"} / Est. Budget: $${
                            job?.amount || 0
                          }`
                        ),
                      }}
                    />
                    <div className="hidden mt-3 md:block">
                      <div
                        className="text-[#374151]"
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchTerm(
                            truncateText(job?.description || "", 250)
                          ),
                        }}
                      />
                      {job?.description && job.description.length > 250 && (
                        <button
                          className="underline text-[#16833E]"
                          onClick={() => {
                            router.push(`/find-job/${job?._id}`);
                          }}
                        >
                          see more
                        </button>
                      )}
                    </div>
                    <div className="hidden mt-3 sm:block md:hidden">
                      <div
                        className="text-[#374151]"
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchTerm(
                            truncateText(job?.description || "", 150)
                          ),
                        }}
                      />
                      {job?.description && job.description.length > 150 && (
                        <button
                          className="underline text-[#16833E]"
                          onClick={() => {
                            router.push(`/find-job/${job?._id}`);
                          }}
                        >
                          see more
                        </button>
                      )}
                    </div>
                    <div className="block mt-3 sm:hidden">
                      <div
                        className="text-[#374151]"
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchTerm(
                            truncateText(job?.description || "", 100)
                          ),
                        }}
                      />
                      {job?.description && job.description.length > 100 && (
                        <button
                          className="underline text-[#16833E]"
                          onClick={() => {
                            router.push(`/find-job/${job?._id}`);
                          }}
                        >
                          see more
                        </button>
                      )}
                    </div>

                    <div className="hidden mt-3 md:block">
                      <div className="flex flex-row flex-wrap items-center">
                        {job?.skills?.map((skill, indx) => (
                          <span
                            key={indx}
                            className="capitalize px-4 py-1.5 bg-[#E7F2EB] text-[#355741] rounded-lg h-9 flex items-center"
                            dangerouslySetInnerHTML={{
                              __html: highlightSearchTerm(skill),
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="block mt-3 md:hidden">
                      <div className="flex flex-row flex-wrap items-center">
                        {job?.skills?.map((skill, indx) => (
                          <span
                            key={indx}
                            className="capitalize p-1.5 bg-[#E7F2EB] text-[#355741] rounded-md text-sm font-light"
                            dangerouslySetInnerHTML={{
                              __html: highlightSearchTerm(skill),
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-2 md:gap-8 text-sm font-[300] md:font-medium text-[#536179]">
                      <div className="flex items-center gap-1">
                        {job.client_details?.payment_verified ? (
                          <RiVerifiedBadgeFill />
                        ) : (
                          <LuBadgeX />
                        )}
                        <p>
                          Payment{" "}
                          {job.client_details?.payment_verified
                            ? "Verified"
                            : "Unverified"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <StarRatings
                          rating={job.client_details?.avg_review || 0}
                          starDimension="16px"
                          starSpacing="1px"
                          starRatedColor="#22C35E"
                          starEmptyColor="#d7f7e4"
                        />
                        <p>
                          {job.client_details?.avg_review
                            ? job.client_details.avg_review
                            : "0"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 md:gap-8">
                        <div className="flex items-center gap-1">
                          <AiOutlineDollarCircle />
                          {formatNumber(job?.client_details?.total_spend)} Spent
                        </div>
                        <div className="flex items-center gap-1">
                          <CiLocationOn />
                          {job.client_details?.location || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <p className="mt-10 text-2xl text-center">Job Not Found</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default JobCard;
