"use client";

import Image from "next/image";
import { addDays, format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import {
  FaCheck,
  FaPauseCircle,
  FaPlayCircle,
  FaRegClock,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useRouter, useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { getGigDetails } from "../../../helpers/APIs/gigApis";
import HomeLayout from "../../../Layouts/HomeLayout";
// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from "swiper/modules";
import DataNotAvailable from "../../DataNotAvailable/DataNotAvailable";
import GigDetailsSkeleton from "../../Skeletons/GigDetailsSkeleton";

const GigDetails = () => {
  const [gigData, setGigData] = useState({});
  const [isFullImg, setIsFullImg] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const router = useRouter();
  const { id } = useParams();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    title,
    pricing,
    skills,
    images,
    video,
    project_description,
    requirements,
    steps,
  } = gigData;

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const gigDetails = async () => {
    setIsLoading(true);
    try {
      const response = await getGigDetails(id);
      setGigData(response.body[0]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  // handle back button
  const handleBackward = () => {
    router.push(-1);
  };

  // handle edit button
  const handleGigEdit = () => {
    router.push(`/freelancer/gig/edit/${id}`);
  };

  useEffect(() => {
    gigDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // automatic render service option
  const renderOptions = () => {
    const { service_options } = pricing;

    return Object.keys(service_options).map((option) => {
      const condition = service_options[option];

      return condition ? (
        <div
          key={option}
          className="flex items-center justify-between gap-1 font-semibold text-gray-700 mt-1 capitalize"
        >
          {option.replace(/_/g, " ")}
          <FaCheck className="text-green-600" />
        </div>
      ) : null;
    });
  };

  return (
    <HomeLayout>
      <div className="w-full p-5 border rounded-md relative bg-white mt-8">
        <div className="flex gap-5 justify-end">
          <button
            onClick={handleBackward}
            className="text-start px-10 py-1 rounded border-2 border-[var(--primarytextcolor)] text-white hover:text-black bg-[var(--primarytextcolor)] hover:bg-white transition h-fit mt-auto w-fit font-semibold"
          >
            Back
          </button>
          <button
            onClick={handleGigEdit}
            disabled={!gigData?.title}
            className={`text-start px-10 py-1 rounded border-2 border-[var(--primarytextcolor)]  text-black  bg-white transition h-fit mt-auto w-fit font-semibold ${
              gigData?.title
                ? "hover:text-white hover:bg-[var(--primarytextcolor)]"
                : "cursor-not-allowed opacity-50"
            }`}
          >
            Edit
          </button>
        </div>
        {isLoading ? (
          <GigDetailsSkeleton />
        ) : title ? (
          <div className="lg:grid grid-cols-3 mt-3">
            <div className="col-span-2">
              <div className="xl:p-5">
                {isFullImg ? (
                  <div className="absolute top-0 left-0 bg-white w-full">
                    <span
                      className="h-7 w-7 bg-red-500/20 rounded-full absolute -top-2 -right-2 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
                      onClick={() => {
                        setIsFullImg("");
                      }}
                    >
                      <IoMdClose className="text-2xl" />
                    </span>
                    <img
                      src={isFullImg}
                      alt=""
                      className="w-full h-fit rounded-md cursor-pointer"
                      onClick={() => setIsFullImg("")}
                    />
                  </div>
                ) : (
                  <div>
                    <h4 className="text-2xl md:text-3xl font-semibold">
                      I will {title}
                    </h4>
                    <div className="flex gap-5 justify-between md:mt-3 rounded p-3">
                      <div className="flex items-center gap-10 w-full">
                        <div className="w-full h-fit object-cover relative border rounded-xl">
                          <Swiper
                            modules={[Navigation]}
                            navigation={{

};

export default GigDetails;
