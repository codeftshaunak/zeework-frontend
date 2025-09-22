
"use client";
import Image from "next/image";
import React from "react";

import { FaClock, FaHeadSideVirus } from "react-icons/fa6";

import { MdCategory } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UniversalModal from "../Modals/UniversalModal";

export 
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

};
