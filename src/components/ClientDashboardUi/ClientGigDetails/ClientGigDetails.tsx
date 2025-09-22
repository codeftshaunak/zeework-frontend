"use client";

import { Avatar, Button } from "@chakra-ui/react";
import Image from "next/image";
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
import { useLocation, useRouter, useParams } from "next/navigation";
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
import HomeLayout from "../../../Layouts/HomeLayout";
import { clearMessageState } from "../../../redux/messageSlice/messageSlice";
import UniversalModal from "../../Modals/UniversalModal";
import BtnSpinner from "../../Skeletons/BtnSpinner";
import GigDetailsSkeleton from "../../Skeletons/GigDetailsSkeleton";

const ClientGigDetails = () => {
  const [gigData, setGigData] = useState({ gigInfo: {}, freelancerInfo: {} });
  const profile = useSelector((state: unknown) => state.profile.profile);
  const role = useSelector((state: unknown) => state.auth.role);
  const [isFullImg, setIsFullImg] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { socket } = useContext(SocketContext);
  const videoRef = useRef(null);
  const router = useRouter();
  const { state } = usePathname();
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
    router.push(role == 2 ? "/client-dashboard" : -1, { state: null });
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
                rows="4"
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
              </button>
              <Button
                isLoading={isLoading}
                loadingText="Confirm"
                type="submit"
                spinner={<BtnSpinner />}
                isDisabled={!message}
                onClick={() => handlePurchase()}
              >
                Confirm
              </button>
            </div>
          </div>
        </UniversalModal>
      </>
    </HomeLayout>
  );
};

export default ClientGigDetails;
