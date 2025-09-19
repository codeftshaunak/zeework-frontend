"use client";

import { useEffect, useState } from "react";
import {
  Tabs,
  
  
  
  
  Text,
  
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { getFreelancerGigs } from "../../helpers/APIs/gigApis";
import SingleGig from "./SingleGig/SingleGig";
import SmoothMotion from "../utils/Animation/SmoothMotion";
import SingleGigSkeleton from "../Skeletons/SingleGigSkeleton";

const GigStatus = () => {
  const [approvedGigs, setApprovedGigs] = useState([]);
  const [pendingGigs, setPendingGigs] = useState([]);
  const [active setActiveTab] = useState(0);
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
      width={"100%"}
      height={"100%"}
      position={"relative"}
      onChange={(index) => setActiveTab(index)}
    >
      <Tabs.List height={"3.5rem"}>
        <Tab>Approve ({approvedGigs?.length || 0})</Tabs.Trigger>
        <Tab>Under Review ({pendingGigs?.length || 0})</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Indicator
        height="2px"
        borderRadius="1px"
        color={"#000"}
        className=" bg-fg-brand"
      />
      <SmoothMotion key={activeTab}>
        <Tabs.Content width={"100%"} height={"100%"}>
          <Tabs.Content width={"100%"}>
            <VStack
              divider={<StackDivider borderColor="var(--bordersecondary)" />}
              spacing={3}
              align="stretch"
            >
              {isLoading ? (
                <SingleGigSkeleton />
              ) : approvedGigs?.length > 0 ? (
                approvedGigs?.map((gig) => (
                  <SingleGig key={gig._id} gig={gig} getAllGigs={getAllGigs} />
                ))
              ) : (
                <Text textAlign={"center"} paddingY={"30px"}>
                  Currently you haven&apos;t any approved gigs.
                </Text>
              )}
            </VStack>
          </Tabs.Content>
          <Tabs.Content>
            <VStack
              divider={<StackDivider borderColor="var(--bordersecondary)" />}
              spacing={3}
              align="stretch"
            >
              {isLoading ? (
                <SingleGigSkeleton />
              ) : pendingGigs?.length > 0 ? (
                pendingGigs?.map((gig) => (
                  <SingleGig key={gig._id} gig={gig} getAllGigs={getAllGigs} />
                ))
              ) : (
                <Text textAlign={"center"}>
                  Currently you haven&apos;t any pending gigs.
                </Text>
              )}
            </VStack>
          </Tabs.Content>
        </Tabs.Content>
      </SmoothMotion>
    </Tabs.Root>
  );
};

export default GigStatus;
