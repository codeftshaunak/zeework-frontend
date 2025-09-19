"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Text, VStack } from "@chakra-ui/react";
import HorizontalCardSkeleton from "../../Skeletons/HorizontalCardSkeleton";
import { useRouter } from "next/navigation";
import ContractCard from "./ContractCard";

// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from "swiper/modules";

import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";

const AgencyContract = ({ contractList, loading }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-12">
          <div>
            <h2 className="mt-8 mb-4 text-2xl font-medium">
              Agency Contract Jobs
            </h2>
          </div>

          {loading ? (
            <HorizontalCardSkeleton />
          ) : contractList?.length > 0 ? (
            <div className="my-4 relative">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
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
                modules={[Navigation]}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
              >
                {contractList?.length > 0 &&
                  contractList?.map((job, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <ContractCard job={job} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
              {contractList.length && (
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
              )}
            </div>
          ) : (
            <VStack
              alignItems={"center"}
              justifyContent={"center"}
              className="border border-[var(--bordersecondary)] rounded-lg"
              height={"10rem"}
              bgColor={"white"}
            >
              <Text
                fontSize={"1.2rem"}
                textTransform={"capitalize"}
                fontWeight={"600"}
                marginBottom={"10px"}
              >
                Currently No Contract Jobs
              </Text>
              <Button
                borderRadius={"25px"}
                fontWeight={"500"}
                backgroundColor={"var(--primarycolor)"}
                color={"white"}
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
        </div>
      </div>
    </div>
  );
};

export default AgencyContract;
