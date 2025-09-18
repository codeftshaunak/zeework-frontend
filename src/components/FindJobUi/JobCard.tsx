import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { Text, HStack } from "@chakra-ui/react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import StarRatings from "react-star-ratings";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { LuBadgeX } from "react-icons/lu";
import JobCardSkeleton from "../Skeletons/JobCardSkeleton";

const JobCard = ({
  jobs,
  searchTerm,
  showHighlightedSearchTerm,
  isLoading,
}) => {
  const router = useRouter();

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const highlightSearchTerm = (text) => {
    if (!searchTerm || !showHighlightedSearchTerm) {
      return text;
    }

    const regex = new RegExp(searchTerm, "gi");
    return text.replace(
      regex,
      (match) => `<span class="bg-primary/40">${match}</span>`
    );
  };

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num?.toString();
  }

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          {[1, 2].map((item) => (
            <JobCardSkeleton key={item} />
            // <HorizontalCardSkeleton key={item} className={"mt-4"} />
          ))}
        </div>
      ) : (
        <div className="w-full">
          {jobs?.length > 0 ? (
            jobs?.map((job, index) => {
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
                      className="font-medium text-lg md:font-semibold mt-2 mb-2 cursor-pointer md:text-xl capitalize"
                      onClick={() => {
                        router.push(`/find-job/${job?._id}`);
                      }}
                      dangerouslySetInnerHTML={{
                        __html: highlightSearchTerm(job?.title),
                      }}
                    />
                    <div
                      className="text-[#536179] text-sm"
                      dangerouslySetInnerHTML={{
                        __html: highlightSearchTerm(
                          `${
                            (job?.job_type === "fixed" && " Fixed Budget ") ||
                            (job?.job_type === "hourly" && "Hourly")
                          } / ${job?.experience} / Est. Budget: $${job?.amount}`
                        ),
                      }}
                    />
                    <div className="mt-3 hidden md:block">
                      <div
                        className=" text-[#374151]"
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchTerm(
                            truncateText(job?.description, 250)
                          ),
                        }}
                      />
                      {job?.description?.length > 250 && (
                        <button
                          className={
                            job?.description
                              ? "underline text-[#16833E]"
                              : "hidden"
                          }
                          onClick={() => {
                            router.push(`/find-job/${job?._id}`);
                          }}
                        >
                          see more
                        </button>
                      )}
                    </div>
                    <div className="mt-3 hidden sm:block md:hidden">
                      <div
                        className=" text-[#374151]"
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchTerm(
                            truncateText(job?.description, 150)
                          ),
                        }}
                      />
                      {job?.description?.length > 150 && (
                        <button
                          className={
                            job?.description
                              ? "underline text-[#16833E]"
                              : "hidden"
                          }
                          onClick={() => {
                            router.push(`/find-job/${job?._id}`);
                          }}
                        >
                          see more
                        </button>
                      )}
                    </div>
                    <div className="mt-3 block sm:hidden ">
                      <div
                        className="text-[#374151]"
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchTerm(
                            truncateText(job?.description, 100)
                          ),
                        }}
                      />
                      {job?.description?.length > 100 && (
                        <button
                          className={
                            job?.description
                              ? "underline text-[#16833E]"
                              : "hidden"
                          }
                          onClick={() => {
                            router.push(`/find-job/${job?._id}`);
                          }}
                        >
                          see more
                        </button>
                      )}
                    </div>

                    <div className="mt-3 hidden md:block">
                      <HStack marginTop={"1rem"} flexWrap={"wrap"}>
                        {job?.skills?.map((skill, indx) => (
                          <Text
                            key={indx}
                            textTransform={"capitalize"}
                            paddingX={"15px"}
                            paddingY={"6px"}
                            backgroundColor={"#E7F2EB"}
                            color={"#355741"}
                            borderRadius={"10px"}
                            height={"36px"}
                            dangerouslySetInnerHTML={{
                              __html: highlightSearchTerm(skill),
                            }}
                          />
                        ))}
                      </HStack>
                    </div>
                    <div className="mt-3 block md:hidden">
                      <HStack marginTop={"1rem"} flexWrap={"wrap"}>
                        {job?.skills.map((skill, indx) => (
                          <Text
                            key={indx}
                            textTransform={"capitalize"}
                            padding={"5px"}
                            backgroundColor={"#E7F2EB"}
                            color={"#355741"}
                            borderRadius={"6px"}
                            fontSize={"14px"}
                            fontWeight={"300"}
                            dangerouslySetInnerHTML={{
                              __html: highlightSearchTerm(skill),
                            }}
                          />
                        ))}
                      </HStack>
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
                      <div className="flex items-center gap1">
                        <StarRatings
                          rating={job.client_details?.avg_review}
                          starDimension="16px"
                          starSpacing="1px"
                          starRatedColor="#22C35E"
                          starEmptyColor="#d7f7e4"
                        />
                        <p>
                          {job.client_details?.avg_review
                            ? job.client_details?.avg_review
                            : "0"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 md:gap-8">
                        <div className="flex items-center gap-1">
                          <AiOutlineDollarCircle />
                          {formatNumber(
                            job?.client_details?.total_spend === null
                              ? 0
                              : job?.client_details?.total_spend
                          )}{" "}
                          Spent
                        </div>
                        <div className="flex items-center gap-1">
                          <CiLocationOn />
                          {job.client_details?.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <p className="text-center text-2xl mt-10">Job Not Found</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default JobCard;
