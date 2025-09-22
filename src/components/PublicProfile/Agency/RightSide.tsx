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
        </div>
      </div>
    );
  };

export default RightSide;
