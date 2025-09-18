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
                              prevEl: prevRef.current,
                              nextEl: nextRef.current,
                            }}
                          >
                            {images?.length &&
                              images?.map((url) => (
                                <SwiperSlide key={url}>
                                  <img
                                    src={url}
                                    className="w-full h-[600px] object-cover rounded-xl cursor-pointer"
                                    alt=""
                                    onClick={() => setIsFullImg(url)}
                                  />

                                  {/* <div
                                    className="h-[600px] w-full bg-cover cursor-pointer rounded-xl"
                                    style={{ backgroundImage: `url(${url})` }}
                                    onClick={() => setIsFullImg(url)}
                                  ></div> */}
                                </SwiperSlide>
                              ))}
                            {!!video?.length && (
                              <SwiperSlide>
                                <div className="relative flex items-center justify-center w-full rounded-xl">
                                  <video
                                    ref={videoRef}
                                    src={video}
                                    alt="Video Review"
                                    className="h-60 md:h-[600px] w-full "
                                    controls={false}
                                  />
                                  <div
                                    className="absolute cursor-pointer rounded-xl"
                                    onClick={handlePlayPauseClick}
                                  >
                                    {isPlaying ? (
                                      <FaPauseCircle className="text-6xl text-white/60" />
                                    ) : (
                                      <FaPlayCircle className="text-6xl text-white/60" />
                                    )}
                                  </div>
                                </div>
                              </SwiperSlide>
                            )}
                          </Swiper>
                          <button
                            ref={prevRef}
                            className="absolute top-1/2 -left-4 z-20 bg-green-100 rounded-full shadow -mt-4"
                          >
                            <MdNavigateBefore className="text-4xl" />
                          </button>
                          <button
                            ref={nextRef}
                            className="absolute top-1/2 -right-4 z-20 bg-green-100 rounded-full shadow -mt-4"
                          >
                            <MdNavigateNext className="text-4xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5 justify-between md:mt-5 rounded p-3 tracking-wide">
                      <div>
                        <p className="text-lg md:text-xl font-bold text-gray-700">
                          Project Details
                        </p>
                        <div className="mt-2">
                          {project_description?.project_summary}
                        </div>
                        <div className="mt-3 md:mt-7">
                          <p className="text-lg md:text-xl font-bold text-gray-700">
                            Technology:
                          </p>
                          <div className="flex gap-2 flex-wrap font-semibold mt-2">
                            {skills?.map((item) => (
                              <span
                                key={item}
                                className="px-3 py-2 h-fit bg-green-50 rounded-lg"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 sm:mt-10">
                          <p className="text-lg md:text-xl font-bold text-gray-700">
                            Requirements:
                          </p>
                          <ul className="mt-2">
                            {requirements?.map((item) => (
                              <li key={item._id}>{item.requirement}</li>
                            ))}
                          </ul>
                          <div className="mt-3 md:mt-10">
                            <p className="text-lg md:text-xl font-bold text-gray-700">
                              Delivery Progress:
                            </p>
                            <div className="mt-2">
                              {steps?.map((item, index) => (
                                <div key={item._id} className="mt-2">
                                  <p className="font-semibold capitalize">
                                    {index + 1}. {item.step_title}
                                  </p>
                                  <p>{item.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-10">
                          <p className="text-lg md:text-xl font-bold text-gray-700">
                            Frequently Asked Questions:
                          </p>
                          <ul className="mt-2">
                            {project_description?.faqs?.map((item, index) => (
                              <div key={item._id} className="mt-2">
                                <p className="font-semibold text-lg capitalize">
                                  {index + 1}. {item.question}
                                </p>
                                <p>{item.answer}</p>
                              </div>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-1 border rounded-md px-5 xl:px-10 py-5 h-fit mt-5 md:mt-20 bg-green-50 tracking-wide">
              <h4 className="text-lg md:text-xl font-bold text-center border-b-2 pb-2 text-gray-700 mt-5">
                Overview Information
              </h4>

              <div className="flex items-center justify-between gap-1 font-semibold text-gray-700 mt-3">
                Service Price{" "}
                <span className="text-2xl font-bold">
                  ${pricing?.service_price}
                </span>
              </div>
              <div className="flex items-center justify-between gap-1 font-semibold text-gray-700 mt-3">
                Delivery Time
                <span>{pricing?.delivery_days} Days</span>
              </div>
              <div className="flex items-center justify-between gap-1 font-semibold text-gray-700 mt-2">
                Number of Revisions
                <span>{pricing?.revisions}</span>
              </div>
              <div>{pricing?.service_options && renderOptions()}</div>

              <div className="mt-5 flex items-start gap-2 capitalize">
                <FaRegClock className="text-lg mt-1" />
                <div>
                  <p className="font-semibold capitalize">
                    {pricing?.delivery_days
                      ? `${pricing.delivery_days} days delivery - ${format(
                          addDays(new Date(), pricing.delivery_days),
                          "MMM dd, yyyy"
                        )}`
                      : null}
                  </p>
                  <p className="text-gray-300 text-sm">
                    Revisions May Occur After This Date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <DataNotAvailable onRefresh={gigDetails} />
        )}
      </div>
    </HomeLayout>
  );
};

export default GigDetails;
