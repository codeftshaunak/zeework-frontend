"use client";

import {
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
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
        <HStack>
          <Text
            fontSize={{ base: "1.3rem", md: "1.7rem", lg: "2.3rem" }}
            fontWeight={"600"}
            marginBottom={"0px"}
          >
            Your Agency Members
          </Text>
          <VStack
            backgroundColor={"white"}
            borderRadius={"50%"}
            width={"30px"}
            border={"1px solid var(--primarycolor)"}
            height={"30px"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"0.6s ease-in-out"}
            cursor={"pointer"}
            _hover={{
              border: "2px solid var(--primarycolor)",
              backgroundColor: "transparent",
              color: "var(--primarycolor)",
            }}
            onClick={() => router.push("/search-freelancers")}
          >
            <FiPlus fontSize={"25px"} />
          </VStack>
        </HStack>
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
  // eslint-disable-next-line no-unused-vars
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
        <Tabs marginTop={"1.5rem"} flexWrap={"wrap"} colorScheme="primary">
          <TabList flexWrap={"wrap"}>
            <Tab fontSize={"1.1rem"} fontWeight={"semibold"}>
              Active Members
            </Tab>
            <Tab fontSize={"1.1rem"} fontWeight={"semibold"}>
              Pending Members
            </Tab>
            <Tab fontSize={"1.1rem"} fontWeight={"semibold"}>
              Rejected Members
            </Tab>
          </TabList>
          {/* <TabIndicator
            height="2px"
            borderRadius="1px"
            color={"#000"}
            className=" bg-fg-brand"
          /> */}
          <TabPanels marginTop={"5"}>
            <TabPanel display={"flex"} gap={12} flexWrap={"wrap"}>
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
            </TabPanel>
            <TabPanel display={"flex"} gap={5} flexWrap={"wrap"}>
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
            </TabPanel>
            <TabPanel display={"flex"} gap={5} flexWrap={"wrap"}>
              {rejectInvitation && rejectInvitation?.length > 0 ? (
                rejectInvitation?.map((invitation, index) => (
                  <AgencyFreelancerCard details={invitation} key={index} />
                ))
              ) : (
                <h2 className="text-center text-lg">No Rejected Members.</h2>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </>
  );
};

export default AgencyMembers;
