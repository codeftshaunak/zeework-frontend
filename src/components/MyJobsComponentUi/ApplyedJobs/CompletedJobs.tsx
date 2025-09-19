
"use client";
import React from "react";


import { useRouter } from "next/navigation";
import HorizontalCardSkeleton from "../../Skeletons/HorizontalCardSkeleton";

import { Swiper, SwiperSlide } from "swiper/react";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from "swiper/modules";
import { useRef } from "react";

const CompletedJobs = ({ completedJobs, loading }) => {
  const router = useRouter();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="my-3 space-y-4">
      <h2 className="mt-8 mb-4 text-2xl font-medium">Completed Jobs</h2>
      {loading ? (
        <HorizontalCardSkeleton />
      ) : (
        <>
          {completedJobs?.length > 0 ? (
            <div className="m-auto w-[100%] border border-[var(--bordersecondary)] p-5 rounded-lg bg-white">
              <div className="w-full relative">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                  }}
                  modules={[Navigation]}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                >
                  {completedJobs.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex flex-col key={index} border p-4 sm:py-10 m-2 rounded w-[280px] my-auto mx-auto relative cursor-pointer bg-white"
                        onClick={() => router.push(`/job/complete/${item?._id}`)}
                      >
                        <Image
                          src="./images/complete_job.png"
                        />
                        <div>
                          <span
                          >
                            {item?.contract_title}
                          </span>
                          <div className="flex flex-col"
                          >
                            <span
                             
                             
                             
                            >
                              Budget: $
                              {item.job_type === "hourly"
                                ? `${item?.hourly_rate}/hr`
                                : item?.budget}
                            </span>
                          </div>
                        </div>
                        <div
                         
                          backgroundColor="var(--primarycolor)"
                          paddingX={4}
                         
                          top="10px"
                         
                          right="10px"
                         className="absolute">
                          <span>Completed</span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

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
              </div>
            </div>
          ) : (
            <div className="flex flex-col border border-[var(--bordersecondary)] rounded-lg bg-white"
             
             
             
             
            >
              <span
               
               
              >
                No Jobs Are Currently Complete
              </span>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                backgroundColor="var(--primarycolor)"
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
        </>
      )}
    </div>
  );
};

export default CompletedJobs;
