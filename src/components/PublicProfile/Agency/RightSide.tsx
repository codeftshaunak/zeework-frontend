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
    // agency_focus, // uncomment when you want to use focus section
  } = details || {};

  return (
    <div className="flex flex-col items-start justify-end mx-auto mt-10 lg:mt-0">
      {/* Section: Activity */}
      <span className="font-semibold">Agency Activity</span>

      <div className="relative mt-4">
        <span className="block mb-2 text-base font-medium">Hourly Rate</span>
        <span className="font-semibold">${agency_hourlyRate}</span>
      </div>

      <div className="relative mt-4">
        <span className="block mb-2 font-medium">Total Completed Job</span>
        <span className="font-semibold">{agency_totalJob}</span>
      </div>

      {/* Section: Office Location */}
      <div className="relative mt-6">
        <div className="flex flex-row items-center mb-2">
          <span className="font-semibold">Office Location</span>
        </div>

        {agency_officeLocation?.country && (
          <div className="flex flex-row items-center gap-1 text-sm text-gray-700">
            <MdLocationPin className="text-lg text-gray-600" />
            <span>
              {agency_officeLocation?.street}, {agency_officeLocation?.state}
            </span>
          </div>
        )}
      </div>

      {/* Section: Company Info */}
      <div className="flex flex-col items-start gap-4 mt-6">
        <span className="font-semibold">Company Information</span>

        {agency_size && (
          <div className="flex flex-col">
            <span className="text-base font-medium">Agency Size:</span>
            <span>{agency_size}</span>
          </div>
        )}

        {agency_foundedYear && (
          <div className="flex flex-col">
            <span className="text-base font-medium">Agency Founded:</span>
            <span>{agency_foundedYear}</span>
          </div>
        )}

        {/* Agency Focus (optional) */}
        {/* {agency_focus?.length > 0 && (
          <div className="mb-4">
            <Title size="sm">Agency Focus:</Title>
            <ul className="flex flex-wrap gap-1 mt-1">
              {agency_focus.map((item, index) => (
                <li key={index} className="px-2 py-1 text-sm border rounded-full">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )} */}

        {agency_language && (
          <div className="flex flex-col">
            <Title size="sm">Language:</Title>
            <span>{agency_language}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSide;
