
"use client";
import React from "react";

import { useContext, useEffect, useState } from "react";
import { toast } from "@/lib/toast";
import {
  Avatar,
  Image,
  Tabs,
} from "@/components/ui/migration-helpers";
import { useRouter, useParams } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import InvitationSkeleton from "../Skeletons/InvitationSkeleton";
import { JobDetailsSection } from "../Invitation/JobDetails";
import {
  getFreelancerById,
  offerDetails,
} from "../../helpers/APIs/freelancerApis";
import { getTaskDetails } from "../../helpers/APIs/userApis";
import { getAgencyById } from "../../helpers/APIs/agencyApis";
import UniversalModal from "../Modals/UniversalModal";
import { MainButtonRounded } from "../Button/MainButton";
import {
  endJobContract,
  getTimeSheet,
  taskApproveOrReject,
} from "../../helpers/APIs/jobApis";
import { useForm } from "react-hook-form";
import { SocketContext } from "../../contexts/SocketContext";
import { LuMessagesSquare } from "react-icons/lu";
import DataNotAvailable from "../DataNotAvailable/DataNotAvailable";
import JobTimeSheet from "../Reports/JobTimeSheet";
import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";
import { MdOutlineReviews } from "react-icons/md";
import { clearMessageState } from "../../redux/messageSlice/messageSlice";
import { useDispatch } from "react-redux";
import ErrorMsg from "../utils/Error/ErrorMsg";
import SmoothMotion from "../utils/Animation/SmoothMotion";

const SingleContractDetails = () => {
  const [jobDetails, setJobDetails] = useState({});
  const [freelancerDetails, setFreelancerDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [taskDetails, setTaskDetails] = useState([]);
  const [timeSheet, setTimeSheet] = useState({});
  const [timeSheetLoading, setTimeSheetLoading] = useState(true);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [active, setActiveTab] = useState(0);

  const { socket } = useContext(SocketContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const getTaskDetail = async (offer_id) => {
    try {
      const response = await getTaskDetails(offer_id);
      setTaskDetails(response.body);
    } catch (error) {
      console.log(error);
    }
  };

  const getFileType = (fileUrl) => {
    const extension = fileUrl.split(".").pop().toLowerCase();
    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return "image";
      case "pdf":
        return "pdf";
      case "yaml":
        return "yaml";
      case "zip":
        return "zip";
      default:
        return "unknown";
    }
  };

  const renderFile = (fileDetails) => {
    if (!fileDetails || !fileDetails.file) return null;

    const fileType = getFileType(fileDetails.file);

    switch (fileType) {
      case "image":
        return <img src={fileDetails.file} alt="Image" />;
      case "pdf":
        return (
          <iframe
            src={fileDetails.file}
            className="text-sm text-blue-500 font-semibold border px-2 py-1 rounded w-full"
            title="PDF Viewer"
          ></iframe>
        );
      case "yaml":
        return (
          <a
            href={fileDetails.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 font-semibold border px-2 py-1 rounded"
          >
            View YAML
          </a>
        );
      case "zip":
        return (
          <a
            href={fileDetails.file}
            download
            className="text-sm text-blue-500 font-semibold border px-2 py-1 rounded"
          >
            Download ZIP
          </a>
        );
      default:
        return (
          <a
            href={fileDetails.file}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 font-semibold border px-2 py-1 rounded"
          >
            Download File
          </a>
        );
    }
  };

  const {
    firstName,
    lastName,
    profile_image,
    location,
    agency_name,
    agency_profileImage,
    agency_location,
  } = freelancerDetails || {};

  const getInvitationDetails = async () => {
    try {
      const { body, code } = await offerDetails(id);
      if (code === 200) {
        setJobDetails(body[0]);
        if (body[0]?.job_type === "hourly") getOfferTimeSheet();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getOfferTimeSheet = async () => {
    try {
      const { code, body } = await getTimeSheet(id);
      if (code === 200) setTimeSheet(body);
    } catch (error) {
      console.log(error);
    }
    setTimeSheetLoading(false);
  };

  const getFreelancerDetails = async () => {
    if (!jobDetails?.freelancer_id) return;

    try {
      const { body, code } =
        jobDetails.offer_to === "freelancer"
          ? await getFreelancerById(jobDetails?.freelancer_id)
          : await getAgencyById(jobDetails?.freelancer_id);
      if (code === 200) {
        setFreelancerDetails(body);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getInvitationDetails();
    getTaskDetail(id);
  }, [id]);

  useEffect(() => {
    getFreelancerDetails();
  }, [jobDetails]);

  const dataAvailable = freelancerDetails && jobDetails;

  const handleRefresh = () => {
    getInvitationDetails();
    getTaskDetail(id);
    getFreelancerDetails();
  };

  // handle contract task response
  const handleTaskApproveReject = async (data) => {
    setIsApiLoading(true);
    try {
      const { code, msg } = await taskApproveOrReject({
        action_type: data?.action_type,
        contract_ref: jobDetails._id,
      });

      toast.default(msg);
      if (code === 200) {
        if (socket) {
          socket.emit(
            "card_message",
            {
              sender_id: jobDetails.client_id,
              receiver_id: jobDetails.freelancer_id,
              message: data?.message || "Approved submitted job task!",
              // message_type: "offer",
              contract_ref: jobDetails._id,
            },
            {
              title: jobDetails.job_title,
              type:
                data?.action_type === "approved"
                  ? "Task Approved"
                  : "Task Rejected",
              job_type: jobDetails.job_type,
              amount: jobDetails.hourly_rate || jobDetails.budget,
              url: {
                freelancer:
                  data?.action_type === "approved"
                    ? `/job/complete/${jobDetails._id}`
                    : `/active-job/submit/${jobDetails._id}`,
                client: `/contract/${jobDetails._id}`,
              },
            }
          );
        }
        dispatch(clearMessageState());
        router.push("/my-stats");
      }
    } catch (error) {
      console.error(error);
    }
    setIsApiLoading(false);
    setReviewModal(false);
    setModalType(false);
  };

  // handle end contract
  const handleEndContract = async (data) => {
    setIsApiLoading(true);

    try {
      const { code, msg } = await endJobContract({
        ...data,
        contract_ref: jobDetails._id,
      });

      toast.default(msg);
      if (code === 200) {
        if (socket) {
          socket.emit(
            "card_message",
            {
              sender_id: jobDetails.client_id,
              receiver_id: jobDetails.freelancer_id,
              message:
                data?.refaund_reason || "Successfully end the job contract",
              // message_type: "offer",
              contract_ref: jobDetails._id,
            },
            {
              title: jobDetails.job_title,
              type: `${data.action_type} Job`,
              job_type: jobDetails.job_type,
              amount: jobDetails.hourly_rate || jobDetails.budget,
              url: {
                freelancer: `/active-job/submit/${jobDetails._id}`,
                client: `/contract/${jobDetails._id}`,
              },
            }
          );
        }

        dispatch(clearMessageState());
        if (data.action_type === "end_contract") {
          setFeedbackModal(true);
        } else {
          router.push("/my-stats");
        }
      }
    } catch (error) {
      console.error(error);
    }
    reset();
    setIsApiLoading(false);
    setOpenModal(false);
    setModalType("");
  };

  return (
    <div className="w-full py-5">
      <div className="top-profile-section">
        <div className="my-4">
          <h2 className="my-3 text-2xl font-bold text-[1.6rem] text-[#374151]">
            Contract Details
          </h2>
        </div>

        <div >
          <Tabs.Root
            variant="unstyled"
            onChange={(index) => setActiveTab(index)}
          >
            <Tabs.List>
              <Tabs.Trigger className="font-semibold text-[1.5rem]">Overview</Tabs.Trigger>
              {jobDetails?.job_type === "hourly" && (
                <Tabs.Trigger className="font-semibold text-[1.5rem] !hidden sm:!block">
                  Work Sheet
                </Tabs.Trigger>
              )}
            </Tabs.List>
            <Tabs.Indicator
              mt="1.5px"
            />
            <SmoothMotion key={activeTab}>
              <Tabs.Content>
                <Tabs.Content paddingX={0}>
                  {isLoading ? (
                    <InvitationSkeleton />
                  ) : dataAvailable ? (
                    <div>
                      <div className="grid lg:grid-cols-3 gap-5 mt-3">
                        <div className="col-span-2">
                          <JobDetailsSection jobDetails={jobDetails} />
                        </div>
                        <div className="col-span-1 w-full h-fit bg-white p-8 rounded-xl border border-[var(--bordersecondary)]">
                          <div className="flex gap-3 mb-4">
                            <Avatar
                              size="lg"
                              src={
                                profile_image
                                  ? profile_image
                                  : agency_profileImage
                              }
                              name={
                                firstName
                                  ? firstName + " " + lastName
                                  : agency_name
                              }
                            />{" "}
                            <div>
                              <p className="text-2xl font-semibold">
                                {firstName
                                  ? firstName + " " + lastName
                                  : agency_name}
                              </p>{" "}
                              {/* <div className="flex items-center">
                            <StarRatings
                              rating={freelancerDetails?.avg_review}
                              starDimension="18px"
                              starSpacing="1px"
                              starRatedColor="#22C35E"
                              starEmptyColor="#8ab89b"
                            />{" "}
                            ({freelancerDetails?.avg_review}) Reviews
                          </div> */}
                              <p className="flex items-center gap-1">
                                <FaLocationDot />
                                {location ? location : agency_location?.name}
                              </p>
                            </div>
                          </div>
                          <div className="mt-5">
                            <p className="text-lg font-semibold">
                              Contract Title:
                            </p>
                            <p className="text-lg capitalize">
                              {jobDetails?.contract_title}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-5 mb-3">
                            <p className="text-lg font-semibold">Job Status:</p>
                            <p className="border border-green-500 px-3 capitalize rounded-full bg-green-50 w-fit font-semibold">
                              {jobDetails?.status === "task_submitted"
                                ? "Task Submited"
                                : jobDetails?.status}
                            </p>
                          </div>

                          {/* Send Message */}
                          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full"
                           
                            borderColor="green.200"
                            leftIcon={<LuMessagesSquare />}
                            onClick={() =>
                              router.push(
                                `/message/${jobDetails.freelancer_id}?contract_ref=${jobDetails._id}`
                              )
                            }
                          >
                            Message
                          </button>

                          {/* Review Submitted Task */}
                          {jobDetails?.status === "task_submitted" &&
                            jobDetails?.job_type !== "hourly" && (
                              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full"
                               
                                onClick={() => {
                                  reset(),
                                    setModalType("review"),
                                    setReviewModal(true);
                                }}
                                borderColor="green.200"
                              >
                                Review Submitted Task
                              </button>
                            )}

                          {/* Send Feedback */}
                          {jobDetails?.status === "completed" && (
                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full"
                              onClick={() =>
                                router.push(`/submit-review/${jobDetails._id}`, {
                                  state: {
                                    jobDetails: jobDetails,
                                    receiverDetails: freelancerDetails,
                                  },
                                })
                              }
                              isDisabled={jobDetails?.client_review}
                            >
                              {jobDetails?.client_review
                                ? "Feedback Submitted"
                                : "Send Feedback"}
                            </button>
                          )}

                          {/* End Job Contract */}
                          {jobDetails?.status !== "completed" &&
                            jobDetails?.status !== "rejected" && (
                              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full"
                               
                                onClick={() => {
                                  reset(),
                                    setModalType("endContract"),
                                    setOpenModal(true);
                                }}
                                leftIcon={<IoMdClose />}
                                isDisabled={
                                  jobDetails?.status === "refund" ||
                                  jobDetails === "end_contract"
                                }
                              >
                                {jobDetails?.status === "completed"
                                  ? "Already Completed"
                                  : "End Contract"}
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <DataNotAvailable onRefresh={handleRefresh} />
                  )}
                </Tabs.Content>
                {jobDetails?.job_type === "hourly" && (
                  <Tabs.Content paddingX={0}>
                    {timeSheetLoading ? (
                      <HorizontalCardSkeleton />
                    ) : timeSheet?.details ? (
                      <JobTimeSheet data={timeSheet} />
                    ) : (
                      <DataNotAvailable
                        onRefresh={() => {
                          setTimeSheetLoading(true);
                          getOfferTimeSheet();
                        }}
                      />
                    )}
                  </Tabs.Content>
                )}
              </Tabs.Content>
            </SmoothMotion>
          </Tabs.Root>
        </div>
      </div>

      {/* End Contract Methods */}
      {openModal && (
        <UniversalModal isModal={openModal} setIsModal={setOpenModal}>
          <form onSubmit={handleSubmit(handleEndContract)}>
            {modalType === "endContract" && (
              <>
                <Image
                  src="/images/zeework_end_contract.png"
                  className="m-[auto]"
                />
                <span
                 className="m-[1rem 0] text-2xl font-semibold text-center">
                  Are you sure you want to end this contract?
                </span>
                <div className="mt-6 mx-auto flex gap-5 w-full">
                  <MainButtonRounded
                    noRounded={true}
                    variant="outline"
                    isDisable={isApiLoading}
                    className="w-full"
                    onClick={() => setModalType("refundRequest")}
                  >
                    Ask For Refund
                  </MainButtonRounded>
                  <MainButtonRounded
                    type="submit"
                    noRounded={true}
                    isLoading={isApiLoading}
                    className="w-full"
                    onClick={() => setValue("action_type", "end_contract")}
                  >
                    End Contract & Pay Freelancer
                  </MainButtonRounded>
                </div>
              </>
            )}
            {modalType === "refundRequest" && (
              <>
                <div className="w-full grid gap-3">
                  <label
                    htmlFor="message"
                    className="block font-medium text-gray-700"
                  >
                    Refund Reason:
                  </label>
                  <textarea
                    id="message"
                    {...register("refaund_reason", {
                      required: "Refund reason is required",
                    })}
                    placeholder="Describe.."
                    className="p-2 border rounded"
                  ></textarea>
                  {errors.refaund_reason && (
                    <ErrorMsg msg={errors.refaund_reason.message} />
                  )}
                </div>
                <div className="mt-6 mx-auto flex gap-5 w-full">
                  <MainButtonRounded
                    noRounded={true}
                    variant="outline"
                    onClick={() => {
                      reset(), setModalType("endContract");
                    }}
                    isDisable={isApiLoading}
                    className="w-full"
                  >
                    Back
                  </MainButtonRounded>
                  <MainButtonRounded
                    type="submit"
                    noRounded={true}
                    isLoading={isApiLoading}
                    className="w-full"
                    onClick={() => setValue("action_type", "refund")}
                  >
                    Submit Refund Request
                  </MainButtonRounded>
                </div>
              </>
            )}
          </form>
        </UniversalModal>
      )}

      {/* Task Respond Methods */}
      {reviewModal && (
        <UniversalModal
          isModal={reviewModal}
          setIsModal={setReviewModal}
          title="Review Task"
        >
          <form onSubmit={handleSubmit(handleTaskApproveReject)}>
            {modalType === "review" && (
              <>
                {" "}
                <div className="flex flex-col gap-2 items-start">
                  <div className="text-md">
                    <span className="font-semibold">Description:</span>{" "}
                    {taskDetails.message}
                  </div>
                  <div className="text-md w-full">
                    <span className="font-semibold">Attachment:</span>{" "}
                    {renderFile(taskDetails)}
                  </div>
                </div>
                <div className="mt-6 mx-auto flex gap-5 w-full">
                  <MainButtonRounded
                    noRounded={true}
                    type="submit"
                    onClick={() => setValue("action_type", "approved")}
                    isLoading={isApiLoading}
                    className="w-full"
                  >
                    Approve Task & End Contract
                  </MainButtonRounded>
                  <MainButtonRounded
                    noRounded={true}
                    variant="outline"
                    isDisable={isApiLoading}
                    className="w-full"
                    onClick={() => setModalType("requestToChange")}
                  >
                    Request Changes
                  </MainButtonRounded>
                </div>
              </>
            )}
            {modalType === "requestToChange" && (
              <>
                <div className="w-full grid gap-3">
                  <label
                    htmlFor="message"
                    className="block font-medium text-gray-700"
                  >
                    Messages:
                  </label>
                  <textarea
                    id="message"
                    {...register("message", {
                      required: "Refund reason is required",
                    })}
                    placeholder="Describe.."
                    className="p-2 border rounded"
                    required
                  ></textarea>
                  {errors.message && <ErrorMsg msg={errors.message.message} />}
                </div>
                <div className="mt-6 mx-auto flex gap-5 w-full">
                  <MainButtonRounded
                    noRounded={true}
                    variant="outline"
                    onClick={() => setModalType("review")}
                    isDisable={isApiLoading}
                    className="w-full"
                  >
                    Back
                  </MainButtonRounded>
                  <MainButtonRounded
                    noRounded={true}
                    isLoading={isApiLoading}
                    className="w-full"
                    type="submit"
                    onClick={() => setValue("action_type", "rejected")}
                  >
                    Request Changes
                  </MainButtonRounded>
                </div>
              </>
            )}
          </form>
        </UniversalModal>
      )}

      {/* Send Feedback Popup */}
      <UniversalModal
        isModal={feedbackModal}
        setIsModal={setFeedbackModal}
        isCloseBtn={false}
      >
        <div className="text-center">
          <div className="w-[72px] h-[72px] flex items-center justify-center bg-green-50 rounded-full mx-auto">
            <MdOutlineReviews className="text-4xl text-[#22C35E]" />
          </div>

          <div className="text-gray-700 text-2xl font-semibold font-['SF Pro Text'] leading-loose">
            Contract Successfully Completed
          </div>
          <div className="text-center text-gray-600 font-medium font-['SF Pro Text'] leading-tight">
            Your contract with the freelancer has ended successfully. Please
            provide your feedback to help us improve our services and assist
            other clients in making informed decisions.
          </div>
          <div className="w-full flex justify-between items-center gap-6 mt-8">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full"
              onClick={() => router.push("/my-stats")}
            >
              View Letter
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full"
              onClick={() =>
                router.push(`/submit-review/${jobDetails._id}`, {
                  state: {
                    jobDetails: jobDetails,
                    receiverDetails: freelancerDetails,
                  },
                  replace: true,
                })
              }
            >
              Provide Feedback
            </button>
          </div>
        </div>
      </UniversalModal>
    </div>
  );
};

export default SingleContractDetails;
