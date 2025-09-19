import React from "react";

import { MdLocationPin } from "react-icons/md";
import Title from "./Title";
const RightSide = ({ details }) => {
  const {
    agency_hourlyRate,
    agency_officeLocation,
    agency_size,
    agency_foundedYear,
    agency_language,
    agency_totalJob,
  } = details || {};

  return (
    <>
      <div className="flex flex-col} className="items-flex-start justify-right"
        marginX={{ xl: "auto" }}
        marginTop={{ base: 10, lg: 0 }}
      >
        <span className="font-semibold">
          Agency Activity
        </span>
        <div className="relative">
          <span className="mb-[0.5rem] text-base font-medium">
            Hourly Rate
          </span>
          <span className="mb-[0.5rem] font-semibold">
            ${agency_hourlyRate}
          </span>
        </div>

        <div className="relative">
          <span className="mb-[0.51rem] font-semibold">
            Total Completed Job
          </span>
          <span className="font-semibold">
            {agency_totalJob}
          </span>
        </div>

        <div className="relative"}>
          <div className="flex flex-row items-center className="mb-[0.5rem] mt-[1rem]">
            <span className="mb-[0] font-semibold">
              Office Location
            </span>
          </div>

          <div>
            {!!agency_officeLocation?.country && (
              <div className="flex flex-row items-center> <MdLocationPin /> <span> {agency_officeLocation?.street},{" "}
                  {agency_officeLocation?.state}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap= items-flex-start"10px">
          <span className="mb-[0.51rem] font-semibold">
            Company Information
          </span>

          <div className="flex flex-col gap= items-flex-start"10px">
            <div className="flex flex-row items-center className="items-start">
              {agency_size && (
                <div className="mb-[1rem] ml-[0.57rem]">
                  <span
                   className="mb-[0.5rem] text-base font-medium">
                    Agency Size:
                  </span>
                  <span>{agency_size}</span>
                </div>
              )}
            </div>
            <div className="flex flex-row items-center className="items-start">
              {agency_foundedYear && (
                <div className="mb-[1rem] ml-[0.57rem]">
                  <span
                   className="mb-[0.5rem] text-base font-medium">
                    Agency Founded:
                  </span>
                  <span>{agency_foundedYear}</span>
                </div>
              )}
            </div>
            <div className="flex flex-row items-center className="items-start">
              <div>
                {/* {agency_focus?.length(
                  <div className="mb-[1rem]">
                    <Title size="sm">Agency Focus:</Title>
                    <ul className="flex gap-1 flex-wrap mt-1">
                      {agency_focus.map((item, index) => (
                        <li key={index} className="border px-2 rounded-full">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </div>
            </div>
            <div className="flex flex-row items-center className="items-start">
              {agency_language && (
                <div className="mb-[1rem] ml-[0.56rem]">
                  <Title size="sm">Language:</Title>
                  <span>{agency_language}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSide;
