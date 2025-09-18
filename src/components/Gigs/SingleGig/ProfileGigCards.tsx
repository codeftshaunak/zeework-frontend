"use client";

import { useEffect, useRef, useState } from "react";
import { getFreelancerGigs } from "../../../helpers/APIs/gigApis";
import { useNavigate } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from "swiper/modules";
import { Image } from "@chakra-ui/react";

export const ProfileGigCards = () => {
  const [approvedGigs, setApprovedGigs] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const getAllGigs = async () => {
    try {
      const response = await getFreelancerGigs();
      const approvedGigs = response?.body?.filter(
        (gig) => gig?.status === "approved"
      );

      setApprovedGigs(approvedGigs);
    } catch (error) {
      console.log(error);
    }
  };
  // Fetching All Gigs
  useEffect(() => {
    getAllGigs();
  }, []);

  return (
    <>
      {approvedGigs?.length > 0 && (
        <div className="max-w-[1016px] relative -z-0">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
          >
            {approvedGigs?.map((gig) => (
              <SwiperSlide key={gig._id} className="w-full">
                <ProfileGigCard gig={gig} />
              </SwiperSlide>
            ))}
          </Swiper>
          {approvedGigs?.length > 1 && (
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
      )}
    </>
  );
};

export const ProfileGigCard = ({ gig }) => {
  const router = useRouter();
  const { title, pricing, images } = gig;

  const handleDetails = () => {
    router.push(`/freelancer/gig/details/${gig._id}`);
  };

  return (
    <div className="flex justify-start gap-3 sm:gap-10 w-full max-sm:flex-col">
      <div className="max-sm:w-full flex justify-center items-center h-44 w-64">
        <div>
          <Image
            className="h-44 w-full sm:w-64 bg-cover object-cover rounded"
            src={images[0]}
            alt={title}
          />
        </div>
      </div>
      <div className="grid justify-between gap-4 sm:gap-8">
        <div>
          <h4 className="text-xl sm:text-2xl font-semibold text-left">
            I will {title}
          </h4>
          <div className="font-semibold text-gray-600 mt-6">
            <span className="bg-green-50 px-3 py-2 rounded-full mr-6">
              From ${pricing?.service_price}
            </span>
            <span className="capitalize">
              {pricing?.delivery_days} days delivery
            </span>
          </div>
        </div>
        <button
          onClick={handleDetails}
          className=" text-sm py-1 px-3 rounded-full border-2 border-[var(--primarytextcolor)] text-[var(--primarytextcolor)] hover:text-white hover:bg-[var(--primarytextcolor)] transition h-fit mt-auto w-fit font-semibold"
        >
          View Gig
        </button>
      </div>
    </div>
  );
};
