
"use client";
import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAgencyById } from "../../../helpers/APIs/agencyApis";

import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import TopSide from "./TopSide";
import AgencyProfileSkeleton from "../../Skeletons/AgencyProfileSkeleton";
import DataNotAvailable from "../../DataNotAvailable/DataNotAvailable";

const ViewAgencyProfile = () => {
  const [agencyDetails, setAgencyDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const getAgencyDetails = async () => {
    try {
      const { code, body } = await getAgencyById(id);
      if (code === 200) setAgencyDetails(body);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAgencyDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <AgencyProfileSkeleton />
      ) : agencyDetails?.agency_name ? (
        <div className="flex flex-col className="w-full">
          <TopSide details={agencyDetails} />
          <div
            className="lg:flex w-full py-[20px] relative shadow-sm border p-4 bg-white mt-2 lg:px-10"
          >
            <LeftSide details={agencyDetails} />
            <RightSide details={agencyDetails} />
          </div>
        </div>
      ) : (
        <DataNotAvailable onRefresh={getAgencyDetails} />
      )}
    </>
  );
};

export default ViewAgencyProfile;
