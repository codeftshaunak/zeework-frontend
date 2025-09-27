
"use client";
import React from "react";
import Image from "next/image";

import { FaClock, FaHeadSideVirus } from "react-icons/fa6";

import { MdCategory } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { useRouter } from "next/navigation";
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
      options as any
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
        return <Image src={fileDetails.file} alt="Image" width={400} height={300} className="max-w-full h-auto" />;
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

  return (
    <div className="w-full h-fit flex gap-10 bg-white p-5 sm:p-8 rounded-xl border border-[var(--bordersecondary)]">
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-col sm:flex-row justify-between">
          <span
           
           
            className="cursor-pointer items-end"
            onClick={() => router.push(`/find-job/${jobDetails?.job_id}`)}
          >
            View Job Post
          </span>{" "}
          <div className="text-right">
            <span
              className={`text-base font-normal px-3 uppercase rounded-full text-right border ${
                status !== "rejected"
                  ? "border-[var(--primarycolor)] bg-green-100"
                  : "border-red-500 bg-red-100"
              }`}
            >
              {status}
            </span>
            <span className="rounded-2xl font-light">
              {formatDate(new Date(created_at))}
            </span>
          </div>
        </div>
        <span
          className="text-xl lg:text-2xl font-medium capitalize"
        >
          {job_details?.[0]?.title}{" "}
        </span>
        <div className="flex gap-x-10 sm:gap-x-20 flex-wrap mt-1 text-sm lg:text-base">
          {job_details?.[0]?.experience && (
            <div className="flex flex-row items-center">
              <span className="mt-2">
                <FaHeadSideVirus />
              </span>
              <div>
                <span className="font-semibold">
                  {job_details?.[0]?.experience}
                </span>
                <span className="text-xs">
                  Experience Level
                </span>
              </div>
            </div>
          )}

          {job_details?.[0]?.categories?.[0]?.value && (
            <div className="flex flex-row items-center">
              <span className="mt-2">
                <MdCategory />
              </span>
              <div>
                <span className="font-semibold">
                  {job_details?.[0]?.categories?.[0]?.value}
                </span>
                <span className="text-xs">
                  Category
                </span>
              </div>
            </div>
          )}
          {job_details?.[0]?.job_type == "fixed" && (
            <div className="flex flex-row items-center">
              <span className="mt-2">
                <FaClock />
              </span>
              <div>
                <span className="font-semibold">
                  ${project_budget ? project_budget : budget}
                </span>
                <span className="text-xs">
                  Fixed Budget
                </span>
              </div>
            </div>
          )}
          {job_details?.[0]?.job_type == "hourly" && (
            <div className="flex flex-row items-center">
              <span className="mt-2">
                <FaClock />
              </span>
              <div>
                <span className="font-semibold">
                  ${hourly_rate ? hourly_rate : job_details?.[0]?.amount}
                </span>
                <span className="text-xs">
                  Hourly Range
                </span>
              </div>
            </div>
          )}
          {job_details?.[0]?.durations && (
            <div className="flex flex-row items-center">
              <span className="mt-2">
                <IoCalendar />
              </span>
              <div>
                <span className="font-semibold">
                  {job_details?.[0]?.durations}
                </span>
                <span className="text-xs">
                  Duration
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 flex-wrap mt-2">
          {job_details?.[0]?.skills?.map((skill) => (
            <span
              key={skill}
              className="capitalize px-4 py-1.5 bg-[#E7F2EB] text-[#355741] rounded-lg h-9 flex items-center"
            >
              {skill}
            </span>
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
      </div>

      {isModal && (
        <UniversalModal isModal={isModal} setIsModal={setIsModal}>
          <div>{renderFile(taskDetails)}</div>
        </UniversalModal>
      )}
    </div>
  );
};
