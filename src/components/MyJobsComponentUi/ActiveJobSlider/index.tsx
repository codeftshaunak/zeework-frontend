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


};

export default ActiveJobSlider;
