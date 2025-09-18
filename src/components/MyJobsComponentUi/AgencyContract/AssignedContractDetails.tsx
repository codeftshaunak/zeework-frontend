"use client";

import { useContext, useEffect, useState } from "react";
import { Avatar, Button } from "@chakra-ui/react";
import {
  
  
  
  
  
  Tabs,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "next/navigation";
import { toaster } from "@/lib/providers";
import StarRatings from "react-star-ratings";
import { FaLocationDot } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { LuMessagesSquare } from "react-icons/lu";
import { SocketContext } from "../../../contexts/SocketContext";
import { offerDetails } from "../../../helpers/APIs/freelancerApis";
import { getTimeSheet, submitTask } from "../../../helpers/APIs/jobApis";
import InvitationSkeleton from "../../Skeletons/InvitationSkeleton";
import UniversalModal from "../../Modals/UniversalModal";
import BtnSpinner from "../../Skeletons/BtnSpinner";
import { JobDetails } from "./JobDetails";
import DataNotAvailable from "../../DataNotAvailable/DataNotAvailable";
import HorizontalCardSkeleton from "../../Skeletons/HorizontalCardSkeleton";
import JobTimeSheet from "../../Reports/JobTimeSheet";
import { clearMessageState } from "../../../redux/messageSlice/messageSlice";
import { useDispatch } from "react-redux";
import ErrorMsg from "../../utils/Error/ErrorMsg";
import { motion, AnimatePresence } from "framer-motion";
import SmoothMotion from "../../utils/Animation/SmoothMotion";

const AssignedContractDetails = () => {
  const { socket } = useContext(SocketContext);
  const [jobDetails, setJobDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isSubmitTask, setIsSubmitTask] = useState(false);
  const [timeSheet, setTimeSheet] = useState([]);
  const [sheetLoading, setSheetLoading] = useState(true);
  const [active setActiveTab] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const clientDetails = jobDetails?.client_details?.[0];
  const dataAvailable = jobDetails && clientDetails;

  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

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
    setSheetLoading(false);
  };

  useEffect(() => {
    getInvitationDetails();
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
              sender_id: jobDetails.assigned_member.freelancer_id,
              receiver_id: jobDetails.client_id,
              message: data?.message,
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
                freelancer: `/assigned-contract/${jobDetails.assigned_member.freelancer_id}`,
                client: `/contract/${jobDetails._id}`,
              },
            }
          );
        }

        dispatch(clearMessageState());
        router.push("/my-jobs");
      }
    } catch (error) {
      console.error(error);
    }
    setIsSubmitLoading(false);
    setIsSubmitTask(false);
  };

  return (
    <>
      <div className="w-full py-5">
        <div className="top-profile-section">
          <div className="my-4">
            <h2 className="my-3 text-2xl font-bold text-[1.6rem] text-[#374151]">
              Assigned Contract Details
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
                  <Tabs.Content key="overview" paddingX={0}>
                    {isLoading ? (
                      <InvitationSkeleton />
                    ) : dataAvailable ? (
                      <div className="grid lg:grid-cols-3 gap-5">
                        <JobDetails jobDetails={jobDetails} />
                        <div className="lg:col-span-1 w-full h-fit bg-white p-5 sm:p-8 rounded-xl border border-[var(--bordersecondary)]">
                          <div className="flex gap-3 mb-4">
                            <Avatar
                              size={"lg"}
                              name={`${clientDetails?.firstName} ${clientDetails?.lastName}`}
                            />
                            <div>
                              <p className="text-sm lg:text-xl font-semibold">
                                {`${clientDetails?.firstName} ${clientDetails?.lastName}`}
                              </p>
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
                            width={"full"}
                            border={"1px"}
                            borderColor={"green.200"}
                            leftIcon={<LuMessagesSquare />}
                            onClick={() =>
                              router.push(`/message/${jobDetails.client_id}`)
                            }
                          >
                            Message
                          </Button>
                          {/* for freelancer */}
                          {jobDetails?.status === "completed" ? (
                            <Button
                              width={"full"}
                              border={"1px"}
                              borderColor={"yellow.200"}
                              mt={3}
                            >
                              Job Already Completed
                            </Button>
                          ) : (
                            jobDetails?.job_type === "fixed" && (
                              <Button
                                width={"full"}
                                border={"1px"}
                                borderColor={"green.200"}
                                onClick={() => {
                                  if (jobDetails?.status !== "task_submitted")
                                    reset(), setIsSubmitTask(true);
                                }}
                                mt={3}
                              >
                                {jobDetails?.status === "task_submitted"
                                  ? "Already Submitted"
                                  : "Submit Work"}
                              </Button>
                            )
                          )}
                        </div>
                      </div>
                    ) : (
                      <DataNotAvailable onRefresh={getInvitationDetails} />
                    )}
                  </Tabs.Content>

                  {jobDetails?.job_type === "hourly" && (
                    <Tabs.Content key="timesheet" paddingX={0}>
                      {sheetLoading ? (
                        <HorizontalCardSkeleton />
                      ) : timeSheet?.details ? (
                        <JobTimeSheet data={timeSheet} />
                      ) : (
                        <DataNotAvailable
                          onRefresh={() => {
                            setSheetLoading(true);
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
      </div>
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
    </>
  );
};

export default AssignedContractDetails;
