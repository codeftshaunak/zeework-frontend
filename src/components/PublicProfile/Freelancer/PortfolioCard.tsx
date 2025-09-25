"use client";

import { Box, HStack, VStack } from "@/components/ui/migration-helpers";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import { RiInformationLine } from "react-icons/ri";
import { toast } from "@/lib/toast";

import { BsLink45Deg } from "react-icons/bs";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import UniversalModal from "../../Modals/UniversalModal";

const PortfolioCard = ({ portfolio }) => {
  const { project_name, attachements, technologies, project_description } =
    portfolio;
  const [isHover, setIsHover] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleCopyProfileURL = () => {
    const profileURL = window.location.href;
    navigator.clipboard.writeText(profileURL);

    toast.success("Zeework Profile Copied.");
  };

  return (
    <>
      <div
        className="flex flex-col rounded-md -z-10 relative overflow-hidden w-full border"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="overflow-hidden">
          {attachements && (
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
            >
              {attachements?.length &&
                attachements?.map((item) => (
                  <SwiperSlide
                    key={item}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={item}
                      className="h-48 object-cover rounded-t w-full"
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
        <p className="text-[14px] text-[var(--primarycolor)] cursor-pointer font-[600] border px-3 py-2 rounded-b">
          {project_name}
        </p>
        {isHover && (
          <Box
            transition="0.6s ease-in-out"
            className="h-48 w-full absolute top-0 left-0 bg-black/30 transition duration-300 z-10"
          >
            <HStack
              transform={"translate(-50%, -50%)"}
              top="50%"
              left="50%"
             className="absolute">
              <VStack className="items-center justify-center">
                <button
                  className="text-xl flex items-center gap-1 text-white px-5 py-2 bg-white/10 backdrop-filter backdrop-blur rounded-lg"
                  onClick={() => setIsModal(true)}
                >
                  <RiInformationLine /> Details
                </button>
              </VStack>
            </HStack>
          </Box>
        )}
      </div>
      {isModal && (
        <UniversalModal isModal={isModal} setIsModal={setIsModal} size="4xl">
          <p
            className={`text-2xl sm:text-4xl font-semibold pb-3 px-5 -mx-6 ${
              isScrolled && "border-b shadow mb-0.5"
            }`}
          >
            {project_name}
          </p>
          <div
            onScroll={(e) => {
              setIsScrolled(e.target.scrollTop !== 0);
            }}
            className="overflow-y-scroll h-[600px] bg-white"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::WebkitScrollbar": {
                display: "none",
              },
            }}
          >
            <div className="rounded-lg overflow-hidden relative">
              <Swiper
                slidesPerView={1}
                freeMode={true}
                modules={[Navigation]}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
              >
                {attachements?.length &&
                  attachements?.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img src={img} className="w-full h-fit" />
                    </SwiperSlide>
                  ))}
              </Swiper>
              <>
                <button
                  ref={prevRef}
                  className="absolute top-1/2 left-0 z-20 bg-green-100 rounded-full shadow -mt-4"
                >
                  <IoArrowBack className="text-4xl p-2 text-green-500" />
                </button>
                <button
                  ref={nextRef}
                  className="absolute top-1/2 right-0 z-20 bg-green-100 rounded-full shadow -mt-4"
                >
                  <IoArrowForwardSharp className="text-4xl p-2 text-green-500" />
                </button>
              </>
            </div>
            <div className="flex gap-3 mt-5">
              {technologies?.map((item) => (
                <span key={item} className="py-1 px-3 bg-slate-100 rounded-md">
                  {item}
                </span>
              ))}
            </div>{" "}
            <div>
              <p className="mt-8 font-semibold text-lg">Description:</p>
              {showFullDescription ? (
                <>
                  {project_description}
                  <div
                    className="flex items-center justify-end gap-1 font-semibold mt-5"
                    onClick={handleCopyProfileURL}
                  >
                    Copy Profile{" "}
                    <BsLink45Deg className="w-8 h-8 bg-green-500 rounded-[6px] cursor-pointer hover:bg-green-600 text-white font-semibold p-1" />
                  </div>
                </>
              ) : (
                <>
                  {project_description.length > 100 ? (
                    <>
                      {project_description.slice(0, 100)}{" "}
                      <button
                        className="text-blue-500 cursor-pointer"
                        onClick={toggleDescription}
                      >
                        See more
                      </button>
                    </>
                  ) : (
                    <>
                      {project_description}
                      <div
                        className="flex items-center justify-end gap-1 font-semibold mt-5"
                        onClick={handleCopyProfileURL}
                      >
                        Copy Profile{" "}
                        <BsLink45Deg className="w-8 h-8 bg-green-500 rounded-[6px] cursor-pointer hover:bg-green-600 text-white font-semibold p-1" />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </UniversalModal>
      )}
    </>
  );
};

export default PortfolioCard;
