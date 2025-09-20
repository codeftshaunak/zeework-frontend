"use client";
import React from "react";

import { useRef } from "react";
import Title from "./Title";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from "swiper/modules";
import ProjectCard from "../../AgencyUI/ProjectCard";
import { AiOutlineBorderlessTable } from "react-icons/ai";
import Image from "next/image";

// Types
interface AgencyServiceCategory {
  _id: string;
  category_name: string;
}

interface AgencyServiceSubCategory {
  sub_category_name: string;
}

interface AgencyServices {
  category?: AgencyServiceCategory[];
  subCategory?: AgencyServiceSubCategory[];
}

interface PortfolioItem {
  _id: string;
  [key: string]: any;
}

interface AgencyDetails {
  agency_overview?: string;
  agency_services?: AgencyServices;
  agency_skills?: string[];
  agency_portfolio?: PortfolioItem[];
}

interface LeftSideProps {
  details: AgencyDetails;
}

const LeftSide: React.FC<LeftSideProps> = ({ details }) => {
  const { agency_overview, agency_services, agency_skills, agency_portfolio } =
    details;
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex flex-col p-5">
      <div>
        <Title>Overview</Title>
        <article>
          <div dangerouslySetInnerHTML={{ __html: agency_overview || "" }} />
        </article>
      </div>
      <div>
        <Title>Services</Title>
        <div className="flex flex-wrap gap-2">
          {agency_services?.category?.map((i) => (
            <span
              key={i._id}
              className="px-4 py-1 bg-[#E7F2EB] rounded flex items-center"
            >
              <AiOutlineBorderlessTable /> {i.category_name}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {agency_services?.subCategory?.map((d, index) => (
            <span key={index} className="px-4 py-1 bg-[#E7F2EB] rounded">
              {d.sub_category_name}
            </span>
          ))}
        </div>
      </div>
      <div>
        {agency_skills && agency_skills.length > 0 && (
          <>
            <Title>Skills</Title>
            <div className="flex flex-wrap gap-2">
              {agency_skills.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-1 md:py-1.5 bg-[#E7F2EB] rounded capitalize"
                >
                  {item}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="w-full">
        <Title>Projects</Title>
        {agency_portfolio && agency_portfolio.length > 0 ? (
          <div className="relative z-0 mt-3">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              breakpoints={{
                640: {
                  width: 640,
                  slidesPerView: 1,
                },
                768: {
                  width: 768,
                  slidesPerView: 2,
                },
              }}
              spaceBetween={30}
            >
              {agency_portfolio
                .slice()
                .reverse()
                .map((item) => (
                  <SwiperSlide key={item._id}>
                    <ProjectCard info={item} isPrivate={true} />
                  </SwiperSlide>
                ))}
            </Swiper>
            {agency_portfolio.length > 1 && (
              <>
                <button
                  ref={prevRef}
                  className="absolute z-20 -mt-4 bg-green-100 rounded-full shadow top-1/2 -left-2"
                >
                  <IoArrowBack className="p-2 text-4xl text-green-500" />
                </button>
                <button
                  ref={nextRef}
                  className="absolute z-20 -mt-4 bg-green-100 rounded-full shadow top-1/2 -right-2"
                >
                  <IoArrowForwardSharp className="p-2 text-4xl text-green-500" />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="mt-[20px] text-center">
            <Image
              src="/images/404not-added.png"
              alt="No projects added"
              width={200}
              height={200}
              className="mx-auto"
            />
            <span className="mt-[1.5rem] font-semibold text-center block">
              Haven&apos;t added any projects yet!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSide;
