"use client";

import { FaClock, FaHeadSideVirus } from "react-icons/fa6";
import { HStack, Text, VStack, Box } from "@chakra-ui/react";
import { MdCategory } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { useNavigate } from "next/navigation";
import { useState } from "react";
import UniversalModal from "../Modals/UniversalModal";

export const TaskDetails = ({ jobDetails, taskDetails }) => {
  const [isModal, setIsModal] = useState(false);
  const { job_details, project_budget, budget, hourly_rate, contract_title } =
    jobDetails || {};
  const { message, status, created_at } = taskDetails;
  const router = useRouter();
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return `Submitted on ${formattedDate}`;
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
    <div className="w-full h-fit flex gap-10 bg-white p-5 sm:p-8 rounded-xl border border-[var(--bordersecondary)]">
      <VStack alignItems="start" width={"full"}>
        <div className="w-full flex flex-col sm:flex-row justify-between">
          <Text
            color="var(--primarytextcolor)"
            fontWeight="600"
            cursor="pointer"
            mb="0"
            alignItems={"end"}
            onClick={() => router.push(`/find-job/${jobDetails?.job_id}`)}
          >
            View Job Post
          </Text>{" "}
          <Box textAlign={"right"}>
            <span
              className={`text-base font-normal px-3 uppercase rounded-full text-right border ${
                status !== "rejected"
                  ? "border-[var(--primarycolor)] bg-green-100"
                  : "border-red-500 bg-red-100"
              }`}
            >
              {status}
            </span>
            <Text borderRadius="15px" fontWeight="300">
              {formatDate(new Date(created_at))}
            </Text>
          </Box>
        </div>
        <Text
          fontSize={{ base: "1.3rem", lg: "1.4rem" }}
          fontWeight="500"
          className="capitalize"
        >
          {job_details?.[0]?.title}{" "}
        </Text>
        <div className="flex gap-x-10 sm:gap-x-20 flex-wrap mt-1 text-sm lg:text-base">
          {job_details?.[0]?.experience && (
            <HStack alignItems="start">
              <Text mt="0.5rem">
                <FaHeadSideVirus fontSize="20px" />
              </Text>
              <div>
                <Text mb="0" fontWeight="600">
                  {job_details?.[0]?.experience}
                </Text>
                <Text mb="0" fontSize="0.8rem">
                  Experience Level
                </Text>
              </div>
            </HStack>
          )}

          {job_details?.[0]?.categories?.[0]?.value && (
            <HStack alignItems="start">
              <Text mt="0.5rem">
                <MdCategory fontSize="20px" />
              </Text>
              <div>
                <Text mb="0" fontWeight="600">
                  {job_details?.[0]?.categories?.[0]?.value}
                </Text>
                <Text mb="0" fontSize="0.8rem">
                  Category
                </Text>
              </div>
            </HStack>
          )}
          {job_details?.[0]?.job_type == "fixed" && (
            <HStack alignItems="start">
              <Text mt="0.5rem">
                <FaClock fontSize="20px" />
              </Text>
              <div>
                <Text mb="0" fontWeight="600">
                  ${project_budget ? project_budget : budget}
                </Text>
                <Text mb="0" fontSize="0.8rem">
                  Fixed Budget
                </Text>
              </div>
            </HStack>
          )}
          {job_details?.[0]?.job_type == "hourly" && (
            <HStack alignItems="start">
              <Text mt="0.5rem">
                <FaClock fontSize="20px" />
              </Text>
              <div>
                <Text mb="0" fontWeight="600">
                  ${hourly_rate ? hourly_rate : job_details?.[0]?.amount}
                </Text>
                <Text mb="0" fontSize="0.8rem">
                  Hourly Range
                </Text>
              </div>
            </HStack>
          )}
          {job_details?.[0]?.durations && (
            <HStack alignItems="start">
              <Text mt="0.5rem">
                <IoCalendar fontSize="20px" />
              </Text>
              <div>
                <Text mb="0" fontWeight="600">
                  {job_details?.[0]?.durations}
                </Text>
                <Text mb="0" fontSize="0.8rem">
                  Duration
                </Text>
              </div>
            </HStack>
          )}
        </div>

        <div className="flex gap-4 flex-wrap mt-2">
          {job_details?.[0]?.skills?.map((skill) => (
            <Text
              key={skill}
              textTransform={"capitalize"}
              paddingX={"15px"}
              paddingY={"6px"}
              backgroundColor={"#E7F2EB"}
              color={"#355741"}
              borderRadius={"10px"}
              height={"36px"}
            >
              {skill}
            </Text>
          ))}
        </div>

        <div className="mt-6 grid gap-7">
          <div>
            <p className="text-lg font-medium text-gray-700">Contract Title:</p>
            <p>{contract_title}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">
              Submission Message:
            </p>
            <p>{message}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium text-gray-700">
              Submission File:
            </p>
            <p
              className="w-fit px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition duration-300 text-white cursor-pointer"
              onClick={() => setIsModal(true)}
            >
              Open File
            </p>
          </div>
        </div>
      </VStack>

      {isModal && (
        <UniversalModal isModal={isModal} setIsModal={setIsModal}>
          <div>{renderFile(taskDetails)}</div>
        </UniversalModal>
      )}
    </div>
  );
};
