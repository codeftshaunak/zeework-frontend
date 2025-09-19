import { toaster } from "@/lib/providers";
"use client";

import {
  Avatar,
  Button,
  
  
  
  
  
  Tabs,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLocationDot } from "react-icons/fa6";
import { LuMessagesSquare, LuView } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import StarRatings from "react-star-ratings";
import { SocketContext } from "../../../contexts/SocketContext";
import { offerDetails } from "../../../helpers/APIs/freelancerApis";
import { getTimeSheet, submitTask } from "../../../helpers/APIs/jobApis";
import { getTaskDetails } from "../../../helpers/APIs/userApis";
import { clearMessageState } from "../../../redux/messageSlice/messageSlice";
import { setMyJobsData } from "../../../redux/pagesSlice/pagesSlice";
import DataNotAvailable from "../../DataNotAvailable/DataNotAvailable";
import { JobDetailsSection } from "../../Invitation/JobDetails";
import UniversalModal from "../../Modals/UniversalModal";
import JobTimeSheet from "../../Reports/JobTimeSheet";
import BtnSpinner from "../../Skeletons/BtnSpinner";
import HorizontalCardSkeleton from "../../Skeletons/HorizontalCardSkeleton";
import InvitationSkeleton from "../../Skeletons/InvitationSkeleton";
import SmoothMotion from "../../utils/Animation/SmoothMotion";
import ErrorMsg from "../../utils/Error/ErrorMsg";

const ActiveJobDetailsComponent = () => {
  const { socket } = useContext(SocketContext);
  const [jobDetails, setJobDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isSubmitTask, setIsSubmitTask] = useState(false);
  const [viewSubmittedTask, setViewSubmittedTask] = useState(false);
  const [taskDetails, setTaskDetails] = useState({});
  const [timeSheet, setTimeSheet] = useState({});
  const [timeSheetLoading, setTimeSheetLoading] = useState(true);
  const [active setActiveTab] = useState(0);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const clientDetails = jobDetails?.client_details?.[0];
  const { id } = useParams();
  const router = useRouter();

  const getInvitationDetails = async () => {
    setIsLoading(true);
    try {
      const { body, code } = await offerDetails(id);
      if (code === 200) {
        setJobDetails(body[0]);
        if (body[0]?.job_type === "hourly") getOfferTimeSheet();
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
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

  const getTaskDetail = async () => {
    try {
      const response = await getTaskDetails(id);
      setTaskDetails(response.body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvitationDetails();
    getTaskDetail();
  }, []);

  const handleSubmitTask = async (data) => {
    setIsSubmitLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", data.file[0]);
      formData.append("message", data.message);
      formData.append("client_id", jobDetails.client_id);
      formData.append("job_id", jobDetails.job_id);
      formData.append("contract_ref", jobDetails._id);

      const { code, msg } = await submitTask(formData);
      toaster.create({
        title: msg,
        status: code === 200 ? "success" : "warning",
        duration: 3000,
      });
      if (code === 200) {
        if (socket) {
          socket.emit(
            "card_message",
            {
              sender_id: jobDetails.freelancer_id,
              receiver_id: jobDetails.client_id,
              message: data?.message,
              // message_type: "offer",
              contract_ref: jobDetails._id,
            },
            {
              job_id: jobDetails.job_id,
              title: jobDetails.job_title,
              job_offer_id: jobDetails._id,
              type: "Job Task Submitted",
              job_type: jobDetails.job_type,
              amount: jobDetails.hourly_rate || jobDetails.budget,
              url: {
                freelancer: `/active-job/submit/${jobDetails._id}`,
                client: `/contract/${jobDetails._id}`,
              },
            }
          );
        }

        dispatch(setMyJobsData({ userJobs: {} }));
        dispatch(clearMessageState());
        router.push("/my-jobs");
      }
    } catch (error) {
      console.error(error);
    }
    setIsSubmitLoading(false);
    setIsSubmitTask(false);
  };

  const dataAvailable = jobDetails && clientDetails;

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
            width="100%"
            height="600px"
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

  return (
    <div className="w-full py-5">
      <div className="top-profile-section">
        <div className="my-4">
          <h2 className="my-3 text-2xl font-bold text-[1.6rem] text-[#374151]">
            Contract Details
          </h2>
        </div>

        <div className="">
          <Tabs.Root
            position="relative"
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
              height="2px"
              bg="var(--primarytextcolor)"
              borderRadius="1px"
            />
            <SmoothMotion key={activeTab}>
              <Tabs.Content>
                <Tabs.Content paddingX={0}>
                  {isLoading ? (
                    <InvitationSkeleton />
                  ) : dataAvailable ? (
                    <div>
                      <div className="grid lg:grid-cols-3 gap-5">
                        <JobDetailsSection jobDetails={jobDetails} />
                        <div className="lg:col-span-1 w-full h-fit bg-white p-5 sm:p-8 rounded-xl border border-[var(--bordersecondary)]">
                          <div className="flex gap-3 mb-4">
                            <Avatar
                              size={"lg"}
                              name={
                                clientDetails?.firstName +
                                " " +
                                clientDetails?.lastName
                              }
                            />{" "}
                            <div>
                              <p className="text-sm lg:text-xl font-semibold">
                                {clientDetails?.firstName +
                                  " " +
                                  clientDetails?.lastName}
                              </p>{" "}
                              <div className="flex items-center flex-wrap">
                                <StarRatings
                                  rating={clientDetails?.avg_review}
                                  starDimension="14px"
                                  starSpacing="1px"
                                  starRatedColor="#22C35E"
                                  starEmptyColor="#8ab89b"
                                />
                                <p className="text-sm">
                                  ({clientDetails?.avg_review}) Reviews
                                </p>
                              </div>
                              <p className="flex items-center gap-1">
                                <FaLocationDot />
                                {clientDetails?.location}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="sm:text-lg font-semibold">
                              Contract Title:
                            </p>
                            <p className="sm:text-lg capitalize">
                              {jobDetails?.contract_title}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-5">
                            <p className="sm:text-lg font-semibold">
                              Job Status:
                            </p>
                            <p className="border border-green-500 px-3 capitalize rounded-full bg-green-50 w-fit font-semibold">
                              {jobDetails?.status?.replace(/_/g, " ")}
                            </p>
                          </div>

                          <Button
                            mt={10}
                            mb={3}
                            width={"full"}
                            border={"1px"}
                            borderColor={"green.200"}
                            leftIcon={<LuMessagesSquare />}
                            onClick={() =>
                              router.push(
                                `/message/${jobDetails.client_id}?contract_ref=${jobDetails._id}`
                              )
                            }
                          >
                            Message
                          </Button>
                          {/* for freelancer */}
                          {jobDetails?.offer_to === "freelancer" && (
                            <>
                              {jobDetails?.status === "completed" ? (
                                <Button
                                  width={"full"}
                                  border={"1px"}
                                  borderColor={"yellow.200"}
                                >
                                  Job Already Completed
                                </Button>
                              ) : (
                                <>
                                  {jobDetails?.job_type === "fixed" &&
                                    (jobDetails?.status === "task_submitted" ? (
                                      <Button
                                        width={"full"}
                                        border={"1px"}
                                        colorScheme="primary"
                                        variant={"outline"}
                                        onClick={() =>
                                          setViewSubmittedTask(true)
                                        }
                                        leftIcon={<LuView />}
                                      >
                                        View Submission
                                      </Button>
                                    ) : (
                                      <Button
                                        width={"full"}
                                        border={"1px"}
                                        colorScheme="primary"
                                        isDisabled={
                                          jobDetails?.status ===
                                          "task_submitted"
                                        }
                                        onClick={() => {
                                          reset();
                                          setIsSubmitTask(true);
                                        }}
                                      >
                                        Submit Work
                                      </Button>
                                    ))}
                                </>
                              )}
                            </>
                          )}

                          {/* for agency */}
                          {jobDetails?.offer_to === "agency" &&
                            (jobDetails?.status === "completed" ? (
                              <Button
                                width={"full"}
                                border={"1px"}
                                borderColor={"yellow.200"}
                              >
                                Job Already Completed
                              </Button>
                            ) : (
                              <>
                                <Button
                                  colorScheme="primary"
                                  width={"full"}
                                  onClick={() =>
                                    router.push(
                                      `/contract-assign/${jobDetails._id}`
                                    )
                                  }
                                >
                                  Assign contract to agency member
                                </Button>
                              </>
                            ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <DataNotAvailable onRefresh={getInvitationDetails} />
                  )}
                </Tabs.Content>
                {jobDetails?.job_type === "hourly" && (
                  <Tabs.Content paddingX={0}>
                    {timeSheetLoading ? (
                      <HorizontalCardSkeleton />
                    ) : timeSheet?.details ? (
                      <div className=" mt-3 sm:mt-5 lg:mt-10">
                        <JobTimeSheet data={timeSheet} />
                      </div>
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

      {/* Submit Completed Task */}
      {isSubmitTask && (
        <UniversalModal
          isModal={isSubmitTask}
          setIsModal={setIsSubmitTask}
          title={"Send completed task"}
        >
          <form onSubmit={handleSubmit(handleSubmitTask)}>
            <div className="grid gap-5">
              <div className="w-full grid gap-3">
                <label
                  htmlFor="file"
                  className="block font-medium text-gray-700"
                >
                  Upload File:
                </label>
                <input
                  type="file"
                  id="file"
                  {...register("file", {
                    required: "Task file is required",
                  })}
                  className="p-2 border rounded"
                />
                {errors.file && <ErrorMsg msg={errors.file.message} />}
              </div>
              <div className="w-full grid gap-3">
                <label
                  htmlFor="message"
                  className="block font-medium text-gray-700"
                >
                  Task Description:
                </label>
                <textarea
                  id="message"
                  {...register("message", {
                    required: "Submission message is required",
                  })}
                  placeholder="Description.."
                  className="p-2 border rounded"
                ></textarea>
                {errors.message && <ErrorMsg msg={errors.message.message} />}
              </div>
            </div>
            <div className="text-right mt-10">
              <Button
                isLoading={isSubmitLoading}
                loadingText="Submitting"
                colorScheme="primary"
                type="submit"
                spinner={<BtnSpinner />}
              >
                Submit
              </Button>
            </div>
          </form>
        </UniversalModal>
      )}

      {/* Task Respond Methods */}
      {viewSubmittedTask && (
        <UniversalModal
          isModal={viewSubmittedTask}
          setIsModal={setViewSubmittedTask}
          title={"Submitted Task"}
        >
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
        </UniversalModal>
      )}
    </div>
  );
};

export default ActiveJobDetailsComponent;
