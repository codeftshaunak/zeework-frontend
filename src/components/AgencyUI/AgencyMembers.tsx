
"use client";
import React from "react";

import {
  HStack,
  
  
  
  
  Tabs,
  Text,
  VStack,
} from "@/components/ui/migration-helpers";
import { useContext, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { getAgencyMembers } from "../../helpers/APIs/agencyApis";
import {
  AgencyFreelancerCard,
  AgencyManagerCard,
} from "./AgencyFreelancerCard";

const AgencyMembers = () => {
  const router = useRouter();
  return (
    <div className="w-full mt-5" id="agencyMember">
      <div className="full">
        <div className="flex flex-row items-center">
          <span className="mb-[0px] font-semibold">
            Your Agency Members
          </span>
          <div
            className="flex flex-col cursor-pointer rounded w-[30px] border h-[30px] items-center justify-center ml-2 hover:border-[var(--primarycolor)] hover:bg-transparent hover:text-[var(--primarycolor)] transition-all duration-300"
            onClick={() => router.push("/search-freelancers")}
          >
            <FiPlus />
          </div>
        </div>
        <br />
        <AgencyManagerCard />
      </div>
      <AgencyAllInvitations />
    </div>
  );
};

export const AgencyAllInvitations = () => {
  const { hasAgency } = useContext(CurrentUserContext);
  const [memburs, setMemburs] = useState([]);
  const [acceptInvitation, setAcceptInvitation] = useState([]);
  const [rejectInvitation, setRejectInvitation] = useState([]);
   
  const [cancelInvitations, setCancelInvitations] = useState([]);
  const [pandingInvitation, setPandingInvitation] = useState([]);

  const getAgencyMembersDetails = async () => {
    try {
      const { body, code } = await getAgencyMembers(hasAgency);
      if (code === 200) setMemburs(body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAgencyMembersDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAgency]);

  useEffect(() => {
    setAcceptInvitation(memburs.acceptedInvitations);
    setCancelInvitations(memburs.cancelInvitations);
    setRejectInvitation(memburs.rejectedInvitations);
    setPandingInvitation(memburs.pendingInvitations);
  }, [memburs]);

  return (
    <>
      {memburs?.pendingInvitations && (
        <Tabs.Root className="mt-[1.5rem]" flexWrap="wrap" colorScheme="primary">
          <Tabs.List flexWrap="wrap">
            <Tabs.Trigger>
              Active Members
            </Tabs.Trigger>
            <Tabs.Trigger>
              Pending Members
            </Tabs.Trigger>
            <Tabs.Trigger>
              Rejected Members
            </Tabs.Trigger>
          </Tabs.List>
          {/* <Tabs.Indicator
            className="bg-fg-brand"
          /> */}
          <Tabs.Content className="mt-[5]">
            <Tabs.Content gap={12} flexWrap="wrap">
              {acceptInvitation && acceptInvitation?.length > 0 ? (
                acceptInvitation?.map((invitation, index) => (
                  <AgencyFreelancerCard
                    details={invitation}
                    key={index}
                    setRemainingMembers={setAcceptInvitation}
                  />
                ))
              ) : (
                <h2 className="text-center text-lg">No Active Members.</h2>
              )}
            </Tabs.Content>
            <Tabs.Content gap={5} flexWrap="wrap">
              {pandingInvitation && pandingInvitation?.length > 0 ? (
                pandingInvitation?.map((invitation, index) => (
                  <AgencyFreelancerCard
                    details={invitation}
                    key={index}
                    setRemainingMembers={setPandingInvitation}
                  />
                ))
              ) : (
                <h2 className="text-center text-lg">
                  Pending Member Not Found
                </h2>
              )}
            </Tabs.Content>
            <Tabs.Content gap={5} flexWrap="wrap">
              {rejectInvitation && rejectInvitation?.length > 0 ? (
                rejectInvitation?.map((invitation, index) => (
                  <AgencyFreelancerCard details={invitation} key={index} />
                ))
              ) : (
                <h2 className="text-center text-lg">No Rejected Members.</h2>
              )}
            </Tabs.Content>
          </Tabs.Content>
        </Tabs.Root>
      )}
    </>
  );
};

export default AgencyMembers;
