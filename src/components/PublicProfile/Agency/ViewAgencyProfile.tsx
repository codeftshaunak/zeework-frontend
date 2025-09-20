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

// Types
interface AgencyDetails {
  agency_name?: string;
  [key: string]: any; // Allow for additional properties
}

interface ApiResponse {
  code: number;
  body?: AgencyDetails;
}

const ViewAgencyProfile: React.FC = () => {
  const [agencyDetails, setAgencyDetails] = useState<AgencyDetails>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const params = useParams();
  const id = params?.id as string;

  const getAgencyDetails = async (): Promise<void> => {
    try {
      if (!id) {
        setIsLoading(false);
        return;
      }

      const response: ApiResponse = await getAgencyById(id);
      if (response.code === 200 && response.body) {
        setAgencyDetails(response.body);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAgencyDetails();
  }, [id]); // Added id as dependency

  return (
    <>
      {isLoading ? (
        <AgencyProfileSkeleton />
      ) : agencyDetails?.agency_name ? (
        <div className="flex flex-col w-full">
          <TopSide details={agencyDetails} />
          <div className="lg:flex w-full py-[20px] relative shadow-sm border p-4 bg-white mt-2 lg:px-10">
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
