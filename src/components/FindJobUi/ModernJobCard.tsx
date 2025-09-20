import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
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

interface ModernJobCardProps {
  jobs: Job[] | undefined | null;
  searchTerm?: string;
  showHighlightedSearchTerm?: boolean;
  isLoading: boolean;
}

const ModernJobCard: React.FC<ModernJobCardProps> = ({
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
                  className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 mt-4 overflow-hidden"
                >
                  <div className="px-6 py-4 md:px-8 md:py-6">
                    <div
                      className="text-[#536179] text-sm"
                      dangerouslySetInnerHTML={{
                        __html: highlightSearchTerm(`Posted ${formattedDate}`),
                      }}
                    />
                    <div
                      className="mt-3 mb-3 text-lg font-semibold capitalize cursor-pointer hover:text-green-600 transition-colors duration-200 md:text-xl line-clamp-2"
                      onClick={() => {
                        router.push(`/find-job/${job?._id}`);
                      }}
                      dangerouslySetInnerHTML={{
                        __html: highlightSearchTerm(job?.title || ""),
                      }}
                    />
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {job?.job_type === "fixed" ? "Fixed Budget" : "Hourly"}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {job?.experience || "N/A"}
                      </span>
                      <span className="font-semibold text-gray-900">
                        ${job?.amount || 0}
                      </span>
                    </div>
                    <div className="hidden mt-2 md:block">
                      <div
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchTerm(
                            truncateText(job?.description || "", 250)
                          ),
                        }}
                      />
                      {job?.description && job.description.length > 250 && (
                        <button
                          className="mt-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-200"
                          onClick={() => {
                            router.push(`/find-job/${job?._id}`);
                          }}
                        >
                          Read more →
                        </button>
                      )}
                    </div>
                    <div className="hidden mt-2 sm:block md:hidden">
                      <div
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchTerm(
                            truncateText(job?.description || "", 150)
                          ),
                        }}
                      />
                      {job?.description && job.description.length > 150 && (
                        <button
                          className="mt-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-200"
                          onClick={() => {
                            router.push(`/find-job/${job?._id}`);
                          }}
                        >
                          Read more →
                        </button>
                      )}
                    </div>

                    {/* Skills section */}
                    {job?.skills && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {job.skills.slice(0, 5).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 5 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-500">
                            +{job.skills.length - 5} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Client info */}
                    {job?.client_details && (
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                          {job.client_details.payment_verified ? (
                            <div className="inline-flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              <span className="text-xs text-green-600 font-medium">
                                Payment verified
                              </span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                              <span className="text-xs text-gray-500">
                                Payment unverified
                              </span>
                            </div>
                          )}
                          {job.client_details.avg_review > 0 && (
                            <div className="inline-flex items-center">
                              <span className="text-yellow-400 mr-1">★</span>
                              <span className="text-xs text-gray-600 font-medium">
                                {job.client_details.avg_review.toFixed(1)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                          📍 {job.client_details.location || "Remote"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No jobs found</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ModernJobCard;