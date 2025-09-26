import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Star, Shield, ShieldCheck } from "lucide-react";
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
  isLoading?: boolean;
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

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <Star key={i} className="h-3.5 w-3.5 fill-yellow-200 text-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="h-3.5 w-3.5 text-gray-300" />
        );
      }
    }
    return stars;
  };

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
                <Card key={index} className="group border border-gray-200/60 hover:border-green-200 bg-white hover:shadow-lg transition-all duration-300 cursor-pointer mb-4">
                  <CardContent className="p-6 space-y-4" onClick={() => router.push(`/find-job/${job?._id}`)}>
                    {/* Header Section */}
                    <div className="space-y-3">
                      {/* Job Type & Budget Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {job?.job_type === "fixed" ? "Fixed-price" : "Hourly"}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
                            {job?.experience || "Entry level"}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500"
                          dangerouslySetInnerHTML={{
                            __html: highlightSearchTerm(`Posted ${formattedDate}`),
                          }}
                        />
                      </div>

                      {/* Job Title */}
                      <h2
                        className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-200 line-clamp-2 leading-6"
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchTerm(job?.title || ""),
                        }}
                      />

                      {/* Budget */}
                      <div className="text-base font-medium text-gray-900">
                        {job?.job_type === "fixed"
                          ? `$${job?.amount || 0} fixed-price`
                          : `$${job?.amount || 0}/hr`
                        }
                      </div>
                    </div>
                    {/* Job Description */}
                    <div className="space-y-3">
                      <div
                        className="text-sm text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchTerm(
                            truncateText(job?.description || "", 200)
                          ),
                        }}
                      />
                      {job?.description && job.description.length > 200 && (
                        <button
                          className="text-sm text-green-600 hover:text-green-700 font-medium hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/find-job/${job?._id}`);
                          }}
                        >
                          more
                        </button>
                      )}
                    </div>

                    {/* Skills section */}
                    {job?.skills && job.skills.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {job.skills.slice(0, 6).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 6 && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs text-gray-500">
                              +{job.skills.length - 6}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Client info footer */}
                    {job?.client_details && (
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-3">
                            {/* Payment verification badge */}
                            {job.client_details.payment_verified ? (
                              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                <ShieldCheck className="h-3 w-3" />
                                Payment verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                                <Shield className="h-3 w-3" />
                                Payment unverified
                              </span>
                            )}

                            {/* Star rating */}
                            {job.client_details.avg_review > 0 && (
                              <div className="flex items-center gap-1">
                                <div className="flex items-center">
                                  {renderStars(job.client_details.avg_review)}
                                </div>
                                <span className="font-medium text-gray-700 ml-1">
                                  {job.client_details.avg_review.toFixed(1)}
                                </span>
                              </div>
                            )}

                            {/* Client spend */}
                            {job.client_details.total_spend > 0 && (
                              <span className="text-gray-600">
                                ${formatNumber(job.client_details.total_spend)} spent
                              </span>
                            )}
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-1 text-gray-500">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{job.client_details.location || "Remote"}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-16 px-6">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                  <p className="text-sm text-gray-600">Try adjusting your search filters or check back later for new opportunities</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ModernJobCard;