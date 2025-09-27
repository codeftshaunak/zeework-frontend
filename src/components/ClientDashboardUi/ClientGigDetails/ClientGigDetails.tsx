"use client";

import { addDays, format } from "date-fns";
import { useContext, useEffect, useRef, useState } from "react";
import {
  FaCheck,
  FaPauseCircle,
  FaPlayCircle,
  FaRegClock,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import required modules
import { toast } from "@/lib/toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import { SocketContext } from "../../../contexts/SocketContext";
import { sendGigPurchasesReq } from "../../../helpers/APIs/clientApis";
import { getFreelancerById } from "../../../helpers/APIs/freelancerApis";
import { getGigDetails } from "../../../helpers/APIs/gigApis";
import { Avatar } from "@/components/ui/migration-helpers";
import { clearMessageState } from "../../../redux/messageSlice/messageSlice";
import UniversalModal from "../../Modals/UniversalModal";
import BtnSpinner from "../../Skeletons/BtnSpinner";
import GigDetailsSkeleton from "../../Skeletons/GigDetailsSkeleton";
import { Button } from "@/components/ui/migration-helpers";
import HomeLayout from "@/components/Layouts/HomeLayout";

const ClientGigDetails = () => {
  const [gigData, setGigData] = useState<any>({ gigInfo: {}, freelancerInfo: {} });
  const profile = useSelector((state: any) => state.profile.profile);
  const role : string = useSelector((state: any) => state.auth.role);
  const [isFullImg, setIsFullImg] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { socket } = useContext(SocketContext);
  const videoRef = useRef(null);
  const router = useRouter();
  const { state } :any = usePathname();
  const status = state?.status || gigData?.gigInfo?.status;
  const { id } = useParams();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const dispatch = useDispatch();

  const {
    title,
    pricing,
    skills,
    images,
    video,
    project_description,
    requirements,
    steps,
    freelancer_id,
    _id,
  } = gigData.gigInfo;

  const { firstName, lastName, hourly_rate, profile_image, professional_role } =
    gigData.freelancerInfo;

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const gigDetails = async () => {
    try {
      const response = await getGigDetails(id);

      setGigData((prev) => ({
        ...prev,
        gigInfo: response.body[0],
      }));

      const freelancerId = response.body[0]?.freelancer_id;

      if (freelancerId) {
        const { body } = await getFreelancerById(freelancerId);

        setGigData((prev) => ({
          ...prev,
          freelancerInfo: body,
        }));
      }
    } catch (error) {
      console.error("Error fetching gig details:", error);
    }
  };

  // handle back button
  // const handleBackward = () => {
  //   router.push("/client-dashboard", { state: null });
  // };

  const handleBackward = () => {
    if (role == "2") {
      router.push("/client-dashboard");
    } else {
      router.back();
    }
  };

  useEffect(() => {
    gigDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePurchase = async () => {
    setIsLoading(true);

    try {
      const res = await sendGigPurchasesReq({
        gig_id: _id,
        seller_id: freelancer_id,
        buyer_id: profile.user_id,
        message: message,
      });

      if (res?.code === 200) {
        if (socket) {
          socket.emit(
            "card_message",
            {
              sender_id: profile.user_id,
              receiver_id: freelancer_id,
              message: message,
              message_type: "gig_purchase",
              contract_ref: _id,
            },
            {
              title: title,
              amount: pricing?.service_price,
              type: "gig_purchase_request",
              url: {
                freelancer: `/purchase/gig/${_id}`,
                client: `/gig-details/${_id}`,
              },
            }
          );
        }
        dispatch(clearMessageState());
      }

      toast.default(res?.msg ||
          res.response.data.msg ||
          res.response.data.message ||
          "Something went wrong!");
    } catch (error) {
      toast.warning(error?.response?.data?.msg || "Something went wrong!");
      console.error(error);
    }
    setIsLoading(false);
    setIsModal(false);
    setMessage("");
    router.push("/client-dashboard");
  };

  // automatic render service option.
  const renderOptions = () => {
    const { service_options } = pricing;

    return Object.keys(service_options).map((option, index) => {
      const condition = service_options[option];

      return condition ? (
        <div
          key={index}
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
      <>
        <div className="w-full p-5 border rounded-md relative bg-white mt-8">
          <div className="flex gap-5 justify-end"></div>
          {gigData.freelancerInfo?.firstName ? (
            <div className="flex mt-3 w-full">
              <div className="w-full rounded-xl">
                {isFullImg ? (
                  <div className="absolute top-0 left-0 bg-white w-full z-10 rounded-xl border border-transparent">
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
                      className="w-full h-fit rounded-xl cursor-pointer"
                      onClick={() => setIsFullImg("")}
                    />
                  </div>
                ) : (
                  <div className="w-full">
                    <h4 className="text-3xl font-semibold">I will {title}</h4>
                    <div className="flex items-start gap-5 justify-between mt-3 rounded p-3 max-lg:flex-col">
                      <div className="flex items-center gap-10 w-full max-lg:w-full lg:max-w-[60%]">
                        <div className="w-full relative border rounded-xl">
                          <Swiper
                            modules={[Navigation]}
                            navigation={{
                              prevEl: prevRef.current,
                              nextEl: nextRef.current,
                            }}
                          >
                            {images?.length > 0 &&
                              images.map((url) => (
                                <SwiperSlide key={url}>
                                  <img
                                    src={url}
                                    className="w-full h-[600px] object-cover rounded-xl cursor-pointer"
                                    alt=""
                                    onClick={() => setIsFullImg(url)}
                                  />
                                </SwiperSlide>
                              ))}
                            {!!video?.length && (
                              <SwiperSlide>
                                <div className="relative flex items-center justify-center w-full rounded-xl">
                                  <video
                                    ref={videoRef}
                                    src={video}
                                    alt="Video Review"
                                    className="h-[600px] w-full"
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
                      <div className="w-full lg:max-w-[40%]">
                        <div className="border rounded-md px-2 sm:px-10 py-5 h-fit bg-green-50 tracking-wide">
                          <h4 className="text-md font-bold text-center border-b-2 pb-2 text-gray-700">
                            Overview Information
                          </h4>

                          <div className="flex items-center justify-between gap-1 font-semibold text-gray-700 mt-3">
                            Service Price{" "}
                            <span className="text-xl font-bold">
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
                          <div>
                            {pricing?.service_options && renderOptions()}
                          </div>

                          <div className="mt-5 flex items-start gap-2">
                            <FaRegClock className="text-lg mt-1" />
                            <div>
                              <p className="font-semibold">
                                {pricing?.delivery_days
                                  ? `${pricing.delivery_days
                                  } Days Delivery - ${format(
                                    addDays(
                                      new Date(),
                                      pricing.delivery_days
                                    ),
                                    "MMM dd, yyyy"
                                  )}`
                                  : null}
                              </p>
                              <p className="text-gray-300 text-sm">
                                Revisions May Occur After This Date.
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 sm:gap-10 lg:gap-4 xl:gap-10">
                            {role == "2" &&
                              (profile?.payment_verified ? (
                                <Button
                                  paddingX={10}
                                  onClick={() => setIsModal(true)}
                                  className="tracking-wide capitalize"
                                  isDisabled={status !== "approved"}
                                >
                                  {status !== "approved" ? status : "Purchases"}
                                </Button>
                              ) : (
                                <Button
                                  paddingX={10}
                                  className={`sm:tracking-wide capitalize text-xs`}
                                  onClick={() =>
                                    router.push("/setting/billing-payments")
                                  }
                                >
                                  Verify Payment Method
                                </Button>
                              ))}
                            <Button
                              paddingX={10}
                              onClick={handleBackward}
                             className="tracking-wide">
                              Back
                            </Button>
                          </div>
                        </div>
                        <div className="border rounded-md px-10 py-3 mt-5 bg-slate-50">
                          <h4 className="text-md font-bold text-center border-b-2 pb-2 text-gray-700">
                            Freelancer Information
                          </h4>
                          <div className="flex gap-6 mt-5">
                            <Avatar
                              src={profile_image}
                              name={firstName + " " + lastName}
                              size="md"
                              onClick={() =>
                                router.push(`/profile/f/${freelancer_id}`)
                              }
                            />
                            <div>
                              <p
                                className="text-md font-semibold cursor-pointer w-fit hover:text-primary"
                                onClick={() =>
                                  router.push(`/profile/f/${freelancer_id}`)
                                }
                              >
                                {firstName + " " + lastName}
                              </p>
                              <p className="font-semibold text-gray-700 text-sm">
                                {professional_role}
                              </p>
                              <p className="text-sm">
                                Hourly Rate: ${hourly_rate}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5 justify-between mt-5 rounded p-3 tracking-wide">
                      <div>
                        <p className="text-xl font-bold text-gray-700">
                          Project Details
                        </p>
                        <div className="mt-2">
                          {project_description?.project_summary}
                        </div>
                        <div className="mt-7">
                          <p className="text-xl font-bold text-gray-700">
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
                        <div className="mt-10">
                          <p className="text-xl font-bold text-gray-700">
                            Requirements:
                          </p>
                          <ul className="mt-2">
                            {requirements?.map((item) => (
                              <li key={item._id}>{item.requirement}</li>
                            ))}
                          </ul>
                          <div className="mt-10">
                            <p className="text-xl font-bold text-gray-700">
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
                        {project_description?.faqs?.length > 0 && (
                          <div className="mt-10">
                            <p className="text-xl font-bold text-gray-700">
                              Frequently Asked Questions:
                            </p>
                            <ul className="mt-2">
                              {project_description?.faqs?.map((item, index) => {
                                if (!item.question) return null;

                                return (
                                  <div key={item._id} className="mt-2">
                                    <p className="font-semibold text-lg capitalize">
                                      {index + 1}. {item.question}
                                    </p>
                                    <p>{item.answer}</p>
                                  </div>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <GigDetailsSkeleton isClient={true} />
          )}
        </div>
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          title="Enter your purchases message"
        >
          <div>
            <div>
              <textarea
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your message..."
                rows={4}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="flex justify-end mt-5">
              <Button
                onClick={() => {
                  setIsModal(false), setMessage("");
                }}
                colorScheme="primary"
                variant="outline"
                marginRight={5}
                isDisabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                
                loadingText="Confirm"
                type="submit"
                spinner={<BtnSpinner />}
                isDisabled={!message}
                onClick={() => handlePurchase()}
              >
                Confirm
              </Button>
            </div>
          </div>
        </UniversalModal>
      </>
    </HomeLayout>
  );
};

export default ClientGigDetails;
