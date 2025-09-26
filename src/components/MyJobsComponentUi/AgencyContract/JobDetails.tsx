import React from "react";
import { FaClock, FaHeadSideVirus } from "react-icons/fa6";

import { MdCategory } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";

export const JobDetails = ({ jobDetails }) => {
  const { job_details, project_budget, budget, hourly_rate, contract_title } =
    jobDetails || {};

  return (
    <div className="lg:col-span-2 w-full h-fit flex gap-10 bg-white p-5 sm:p-8 rounded-xl border border-[var(--bordersecondary)]">
      <div className="flex flex-col w-full">
        <span
         
          className="capitalize"
        >
          {contract_title ? contract_title : job_details?.[0]?.title}
        </span>
        <div className="flex gap-x-10 sm:gap-x-20 flex-wrap mt-1 text-sm lg:text-base">
          {job_details?.[0]?.experience && (
            <div className="flex flex-row items-center"> <span>
                <FaHeadSideVirus />
              </span>
              <div>
                <span>
                  {job_details?.[0]?.experience}
                </span>
                <span>
                  Experience Level
                </span>
              </div>
            </div>
          )}

          {job_details?.[0]?.categories?.[0]?.value && (
            <div className="flex flex-row items-center"> <span>
                <MdCategory />
              </span>
              <div>
                <span>
                  {job_details?.[0]?.categories?.[0]?.value}
                </span>
                <span>
                  Category
                </span>
              </div>
            </div>
          )}
          {job_details?.[0]?.job_type == "fixed" && (
            <div className="flex flex-row items-center"> <span>
                <FaClock />
              </span>
              <div>
                <span>
                  ${project_budget ? project_budget : budget}
                </span>
                <span>
                  Fixed Budget
                </span>
              </div>
            </div>
          )}
          {job_details?.[0]?.job_type == "hourly" && (
            <div className="flex flex-row items-center"> <span>
                <FaClock />
              </span>
              <div>
                <span>
                  ${hourly_rate ? hourly_rate : job_details?.[0]?.amount}
                </span>
                <span>
                  Hourly Range
                </span>
              </div>
            </div>
          )}
          {job_details?.[0]?.durations && (
            <div className="flex flex-row items-center"> <span>
                <IoCalendar />
              </span>
              <div>
                <span>
                  {job_details?.[0]?.durations}
                </span>
                <span>
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
              paddingX="15px"
              paddingY="6px"
              backgroundColor="#E7F2EB"
             className="rounded capitalize">
              {skill}
            </span>
          ))}
        </div>

        <p className="lg:text-lg font-semibold text-gray-600 mt-5 -mb-1">
          Specifications:
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: job_details?.[0].description,
          }}
        ></div>
      </div>
    </div>
  );
};
