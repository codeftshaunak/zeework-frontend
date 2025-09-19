"use client";

import { useRef } from "react";
import Title from "./Title";

import { Box, Image, Text, VStack } from "@chakra-ui/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from "swiper/modules";
import ProjectCard from "../../AgencyUI/ProjectCard";
import { AiOutlineBorderlessTable } from "react-icons/ai";

const LeftSide = ({ details }) => {
  const { agency_overview, agency_services, agency_skills, agency_portfolio } =
    details;
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <VStack
      alignItems={"flex-start"}
      width={{ base: "100%", lg: "70%" }}
      marginRight={{ lg: 5 }}
      gap={"5"}
      borderRight={{ base: "none", lg: "0.1px solid gray" }}
    >
      <div>
        <Title>Overview</Title>
        <article className="">
          <div dangerouslySetInnerHTML={{ __html: agency_overview }} />
        </article>
      </div>
      <Box>
        <Title>Services</Title>
        <div className="flex gap-2 flex-wrap">
          {agency_services.category?.map((i) => (
            <Text
              key={i._id}
              paddingX={"15px"}
              paddingY={"4px"}
              backgroundColor={"#E7F2EB"}
              color={"#355741"}
              borderRadius={"10px"}
              display={"flex"}
              alignItems={"center"}
              gap={1}
            >
              <AiOutlineBorderlessTable /> {i.category_name}
            </Text>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap mt-4">
          {agency_services.subCategory?.map((d, i) => (
            <Text
              key={i}
              paddingX={"15px"}
              paddingY={"4px"}
              backgroundColor={"#E7F2EB"}
              color={"#355741"}
              borderRadius={"10px"}
            >
              {d.sub_category_name}
            </Text>
          ))}
        </div>
      </Box>
      <div>
        {agency_skills?.length > 0 && (
          <>
            <Title>Skills</Title>
            <div className="flex gap-2 flex-wrap">
              {agency_skills?.map((item) => (
                <Text
                  key={item}
                  textTransform={"capitalize"}
                  paddingX={"15px"}
                  paddingY={{ base: "4px", md: "6px" }}
                  backgroundColor={"#E7F2EB"}
                  color={"#355741"}
                  borderRadius={"10px"}
                >
                  {item}
                </Text>
              ))}
            </div>
          </>
        )}
      </div>
      <Box width={"100%"}>
        <Title>Projects</Title>
        {agency_portfolio?.length > 0 ? (
          <div className="relative mt-3 z-0">
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
                ?.slice()
                .reverse()
                .map((item) => (
                  <SwiperSlide key={item._id}>
                    <ProjectCard info={item} isPrivate={true} />
                  </SwiperSlide>
                ))}
            </Swiper>
            {agency_portfolio?.length > 1 && (
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
          <Box marginTop={"20px"}>
            <Image
              src="/images/404not-added.png"
              width={"150px"}
              display={"block"}
              margin={"auto"}
            ></Image>
            <Text
              fontSize={"1.3rem"}
              textAlign={"center"}
              fontWeight={"600"}
              marginTop={"1.5rem"}
            >
              Haven&apos;t added any projects yet!
            </Text>
          </Box>
        )}
      </Box>
    </VStack>
  );
};

export default LeftSide;
