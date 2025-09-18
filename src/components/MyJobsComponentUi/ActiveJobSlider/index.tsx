"use client";

import { useRef } from "react";
import ActiveJobCard from "../ActiveJobCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from "swiper/modules";

const ActiveJobSlider = ({ activeJobList }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative">
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
        {activeJobList?.length > 0 &&
          activeJobList?.map((job, index) => {
            return (
              <SwiperSlide key={index}>
                <ActiveJobCard job={job} />
              </SwiperSlide>
            );
          })}
      </Swiper>

      {activeJobList.length && (
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
  );
};

export default ActiveJobSlider;
