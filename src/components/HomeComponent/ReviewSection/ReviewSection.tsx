"use client";

 
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import Image from "next/image";

const ReviewCard = () => {
  return (
    <div className="rounded-xl py-16 mx-auto h-max w-[600px] max-sm:w-full flex flex-col items-center">
      <BiSolidQuoteAltLeft className="text-primary text-[32px]" />
      <h1 className="text-[18px] font-medium font-redHat text-center max-sm:w-full w-[570px]">
        Working with ZeeWork provides our team with everything we need to move
        agile in the market. Tasks are a breeze when we can hire world leading
        freelancers!
      </h1>
      <div className="mt-[30px] flex flex-col items-center justify-between">
        <div className="flex flex-col items-center gap-4">
          <Image
            className="h-[80px] w-[80px] rounded-[15px] object-cover"
            src="/images/ReviewSectionImg1.png"
            alt="Reviewer"
            width={80}
            height={80}
          />
          <div className="flex items-center flex-col">
            <h1 className="text-[20px] font-redHat font-medium">Sean</h1>
            <p className="font-redHat font-normal">CoFoundersLab</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewSection = () => {
  const swiperRef = useRef(null);

  return (
    <section className="bg-gradient-to-t from-[#84B3B1]/[0.05] to-[#C5FFB0]/[0.05] mt-16">
      <div className="mt-16 pt-5 pb-12 md:w-[85%] w-[90%] max-w-[1400px] mx-[auto] relative">
        <Image
          className="h-[80px] w-[80px] rounded-[15px] absolute blur-sm right-[100px] top-[180px] max-xl:hidden opacity-60"
          src="/images/ReviewSectionImg2.png"
          alt="Review decoration"
          width={80}
          height={80}
        />
        <Image
          className="h-[80px] w-[80px] rounded-[15px] absolute blur-sm left-[100px] top-[180px] max-xl:hidden opacity-60"
          src="/images/ReviewSectionImg3.png"
          alt="Review decoration"
          width={80}
          height={80}
        />
        <Image
          className="h-[80px] w-[80px] rounded-[15px] absolute blur-sm bottom-[80px] right-[280px] max-xl:hidden opacity-60"
          src="/images/ReviewSectionImg4.png"
          alt="Review decoration"
          width={80}
          height={80}
        />
        <Image
          className="h-[80px] w-[80px] rounded-[15px] absolute blur-sm bottom-[80px] left-[280px] max-xl:hidden opacity-60"
          src="/images/ReviewSectionImg5.png"
          alt="Review decoration"
          width={80}
          height={80}
        />
        <div className="flex md:justify-between items-center gap-2 flex-col md:flex-row sm:justify-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-[#22C35E] text-[18px] uppercase font-redHat font-normal">
              You can have the best people. Right now. Right here.
            </h2>
            <div className=" border-b w-16 border-primary"></div>
            <h1 className="text-4xl font-geist-extra md:text-left sm:text-center">
              What Clients Say?
            </h1>
          </div>
        </div>
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          pagination={true}
          id="HomeSwiper"
          modules={[Pagination]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          <SwiperSlide>
            <ReviewCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewSection;
