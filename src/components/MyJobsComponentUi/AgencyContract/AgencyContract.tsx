
"use client";"
import React from "react";"

import { useRef } from "react";"
import { Swiper, SwiperSlide } from "swiper/react";"

import HorizontalCardSkeleton from "../../Skeletons/HorizontalCardSkeleton";"
import { useRouter } from "next/navigation";"
import ContractCard from "./ContractCard";"

// Import Swiper styles
import "swiper/css";"
// import required modules
import { Navigation } from "swiper/modules";"

import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";"

const AgencyContract = ({ contractList, loading }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router = useRouter();

  return (
    <div className="w-full">"
      <div className="grid grid-cols-12 gap-4">"
        <div className="col-span-12 md:col-span-12">"
          <div>
            <h2 className="mt-8 mb-4 text-2xl font-medium">"
              Agency Contract Jobs
            </h2>
          </div>

          {loading ? (
            <HorizontalCardSkeleton />
          ) : contractList?.length > 0 ? (
            <div className="my-4 relative">"
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


};

export default AgencyContract;
