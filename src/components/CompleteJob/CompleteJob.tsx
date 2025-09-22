
"use client";
import { Avatar } from "@chakra-ui/react";
import React from "react";

import {
  Avatar,
  Button,
  
  
  
  
  
  Tabs,
} from "@/components/ui/migration-helpers";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useRouter, useParams } from "next/navigation";
import StarRatings from "react-star-ratings";
import { offerDetails } from "../../helpers/APIs/freelancerApis";
import { getTimeSheet } from "../../helpers/APIs/jobApis";
import DataNotAvailable from "../DataNotAvailable/DataNotAvailable";
import { JobDetailsSection } from "../Invitation/JobDetails";
import JobTimeSheet from "../Reports/JobTimeSheet";
import SmoothMotion from "../utils/Animation/SmoothMotion";
import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";
import InvitationSkeleton from "../Skeletons/InvitationSkeleton";

const CompleteJob = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState({});
  const [timeSheet, setTimeSheet] = useState({});
  const [timeSheetLoading, setTimeSheetLoading] = useState(true);
  const [active setActiveTab] = useState(0);

  const { id } = useParams();
  const router = useRouter();
  const { client_details, freelancer_review, _id } = jobDetails;

  const getInvitationDetails = async () => {
    setIsLoading(true);
    try {
      const { body, code } = await offerDetails(id);

      if (code === 200) {
        setJobDetails(body[0] || {});
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
    setTimeSheetLoading(false);
  };

  useEffect(() => {
    getInvitationDetails();
  }, []);

  const dataAvailable = jobDetails && client_details;

  return (
    <div className="w-full">
      <div className="my-4">
        <h2 className="my-3 text-2xl font-bold text-[1.6rem] text-[#374151]">
          Completed Job Details
        </h2>
      </div>
      <Tabs.Root
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
        />
        <SmoothMotion key={activeTab}>
          <Tabs.Content>
            <Tabs.Content paddingX={0}>
              {isLoading ? (
                <InvitationSkeleton />
              ) : dataAvailable ? (
                <div>
                  <div className="grid lg:grid-cols-3 gap-5 mt-3 sm:mt-5 lg:mt-10">
                    <div className="col-span-2">
                      <JobDetailsSection
                        jobDetails={jobDetails}
                        jobStatus="closed"
                      />
                    </div>
                    <div className="col-span-1 w-full h-fit bg-white p-8 rounded-xl border border-[var(--bordersecondary)]">
                      <div className="flex gap-3 mb-4">
                        <Avatar
                          size="lg"
                          // src={
                          //   profile_image
                          //     ? profile_image
                          //     : agency_profileImage
                          // }
                          name={
                            client_details?.[0]?.firstName +
                            " " +
                            client_details?.[0]?.lastName
                          }
                        />{" "}
                        <div>
                          <p className="text-2xl font-semibold">

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
  );
};

export default CompleteJob;
