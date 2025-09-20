
"use client";
import React from "react";

import { useEffect, useState } from "react";
import {
  Tabs,
  
  
  
  
  Text,
  
  VStack,
  StackDivider,
} from "@/components/ui/migration-helpers";
import { getFreelancerGigs } from "../../helpers/APIs/gigApis";
import SingleGig from "./SingleGig/SingleGig";
import SmoothMotion from "../utils/Animation/SmoothMotion";
import SingleGigSkeleton from "../Skeletons/SingleGigSkeleton";

const GigStatus = () => {
  const [approvedGigs, setApprovedGigs] = useState([]);
  const [pendingGigs, setPendingGigs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getAllGigs = async () => {
    try {
      const response = await getFreelancerGigs();
      const approvedGigs = response?.body?.filter(
        (gig) => gig?.status === "approved"
      );
      const pendingGigs = response?.body?.filter(
        (gig) => gig?.status === "pending"
      );

      setApprovedGigs(approvedGigs);
      setPendingGigs(pendingGigs);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  // Fetching All Gigs
  useEffect(() => {
    getAllGigs();
  }, []);

  return (
    <Tabs.Root
      variant="unstyled"
      size="md"
      className="w-full relative"
     
      onChange={(index) => setActiveTab(index)}
    >
      <Tabs.List>
        <Tabs.Trigger>Approve ({approvedGigs?.length || 0})</Tabs.Trigger>
        <Tabs.Trigger>Under Review ({pendingGigs?.length || 0})</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Indicator
        className="bg-fg-brand"
      />
      <SmoothMotion key={activeTab}>
        <Tabs.Content className="w-full">
          <Tabs.Content className="w-full">
            <div className="flex flex-col gap-3">
              {isLoading ? (
                <SingleGigSkeleton />
              ) : approvedGigs?.length > 0 ? (
                approvedGigs?.map((gig) => (
                  <SingleGig key={gig._id} gig={gig} getAllGigs={getAllGigs} />
                ))
              ) : (
                <span className="py-[30px] text-center">
                  Currently you haven&apos;t any approved gigs.
                </span>
              )}
            </div>
          </Tabs.Content>
          <Tabs.Content>
            <div className="flex flex-col gap-3">
              {isLoading ? (
                <SingleGigSkeleton />
              ) : pendingGigs?.length > 0 ? (
                pendingGigs?.map((gig) => (
                  <SingleGig key={gig._id} gig={gig} getAllGigs={getAllGigs} />
                ))
              ) : (
                <span className="text-center">
                  Currently you haven&apos;t any pending gigs.
                </span>
              )}
            </div>
          </Tabs.Content>
        </Tabs.Content>
      </SmoothMotion>
    </Tabs.Root>
  );
};

export default GigStatus;
