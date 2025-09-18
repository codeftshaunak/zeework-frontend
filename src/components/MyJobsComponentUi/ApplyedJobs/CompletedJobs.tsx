"use client";

import { VStack, Text, Button, Box, Image } from "@chakra-ui/react";
import { useNavigate } from "next/navigation";
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
                      <VStack
                        key={index}
                        className="border p-4 sm:py-10 m-2 rounded w-[280px] my-auto mx-auto relative cursor-pointer bg-white"
                        onClick={() => router.push(`/job/complete/${item?._id}`)}
                      >
                        <Image
                          src="./images/complete_job.png"
                          width="50px"
                          height="50px"
                        />
                        <Box textAlign="center" my={2} width="100%">
                          <Text
                            width="100%"
                            fontSize="1rem"
                            fontWeight={500}
                            lineHeight={"1"}
                          >
                            {item?.contract_title}
                          </Text>
                          <VStack
                            justifyContent="space-around"
                            width="200px"
                            margin="auto"
                            gap="1px"
                          >
                            <Text
                              fontSize="0.8rem"
                              color="gray.700"
                              fontWeight="600"
                            >
                              Budget: $
                              {item.job_type === "hourly"
                                ? `${item?.hourly_rate}/hr`
                                : item?.budget}
                            </Text>
                          </VStack>
                        </Box>
                        <Box
                          position="absolute"
                          fontWeight="600"
                          backgroundColor="var(--primarycolor)"
                          paddingX={4}
                          color="white"
                          top="10px"
                          borderRadius="5px"
                          right="10px"
                        >
                          <Text>Completed</Text>
                        </Box>
                      </VStack>
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
            <VStack
              alignItems="center"
              justifyContent="center"
              height="10rem"
              className="border border-[var(--bordersecondary)] rounded-lg bg-white"
            >
              <Text
                fontSize="1.2rem"
                mb={"1.2rem"}
                textTransform="capitalize"
                fontWeight="600"
              >
                No Jobs Are Currently Complete
              </Text>
              <Button
                borderRadius="25px"
                fontWeight="500"
                backgroundColor="var(--primarycolor)"
                color="white"
                _hover={{
                  border: "1px solid var(--primarycolor)",
                  backgroundColor: "white",
                  color: "black",
                }}
                onClick={() => router.push("/find-job")}
              >
                Find Jobs Now
              </Button>
            </VStack>
          )}
        </>
      )}
    </div>
  );
};

export default CompletedJobs;
