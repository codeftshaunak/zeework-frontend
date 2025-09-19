"use client";

import { useEffect, useState } from "react";
import queryString from "query-string";
import {
  HStack,
  Text,
  VStack,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { toaster } from "@/lib/providers";
import {
  acceptAgencyInvitation,
  getInvitationOfAgency,
} from "../../helpers/APIs/freelancerApis";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { useRouter } from "next/navigation";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { IoBagCheck, IoCalendar } from "react-icons/io5";
import { BsTranslate } from "react-icons/bs";
import InvitationSkeleton from "../Skeletons/InvitationSkeleton";
import DataNotAvailable from "../DataNotAvailable/DataNotAvailable";

const AgencyDetails = () => {
  const [invitationDetails, setInvitationDetails] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const currentUrl = window.location.href;
  const { invite_id } = queryString.parseUrl(currentUrl).query;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const {
    agency_id,
    agency_name,
    agency_tagline,
    agency_profileImage,
    agency_hourlyRate,
    agency_skills,
    agency_language,
    agency_foundedYear,
    agency_totalJob,
    agency_location,
    agency_overview,
  } = invitationDetails?.agency_details || {};

  const status = invitationDetails?.invitation_details?.status;

  const getInvitationDetails = async () => {
    setIsLoading(true);
    try {
      const { body, code } = await getInvitationOfAgency(invite_id);
      if (code === 200) setInvitationDetails(body?.[0]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const acceptInvitation = async () => {
    setIsSuccess(true);
    try {
      const res = await acceptAgencyInvitation({
        invite_id: invite_id,
        status: "accepted",
      });

      if (res.code === 200) {
        toaster.create({
          title: "You’ve successfully accepted the invitation",
          duration: 3000,
          type: "success",
        });
        router.push("/");
      } else {
        toaster.create({
          title:
            res.message ||
            res?.msg ||
            res.response.data.msg ||
            res.response.data.message ||
            "Something went wrong!",
          duration: 3000,
          type: "warning",
        });
      }
    } catch (error) {
      toaster.create({
        title: error?.response?.data?.msg || "Something went wrong!",
        duration: 3000,
        type: "warning",
      });
    }
    setIsSuccess(false);
  };

  const rejectInvitation = async () => {
    setIsReject(true);
    try {
      const { code, msg } = await acceptAgencyInvitation({
        invite_id: invite_id,
        status: "rejected",
      });

      if (code === 200) {
        toaster.create({
          title: "You’ve successfully rejected the invitation",
          duration: 3000,
          type: "success",
        });
        router.push("/");
      } else {
        toaster.create({
          title: msg,
          duration: 3000,
          type: "warning",
        });
      }
    } catch (error) {
      toaster.create({
        title: "Error performing action",
        duration: 3000,
        type: "warning",
      });
    }
    setIsReject(false);
  };

  useEffect(() => {
    getInvitationDetails();
  }, []);

  return (
    <div className="w-full">
      {isLoading ? (
        <InvitationSkeleton />
      ) : status ? (
        <div className="grid lg:grid-cols-3 gap-5">
          <VStack
            alignItems="start"
            width="full"
            border="1px solid var(--bordersecondary)"
            padding="1rem 1rem"
            borderRadius="xl"
            bgColor={"white"}
            className="lg:col-span-2"
          >
            <p
              className="text-green-500 font-semibold border-b border-transparent hover:border-green-500 border-spacing-0 transition cursor-pointer"
              onClick={() => router.push(`/profile/a/${agency_id}`)}
            >
              View Profile
            </p>
            <div className="flex flex-col md:flex-row gap-8 items-center bg-white mb-5 rounded-xl">
              {/* <div className="w-[150px] h-[150px]">

              </div> */}
              <div className="w-[95%] space-y-2 m-auto">
                <Avatar
                  name={agency_name}
                  src={agency_profileImage}
                  width={"100px"}
                  height={"100px"}
                  borderRadius={"50%"}
                  fontSize={"3rem"}
                  objectFit={"cover"}
                />
                <div className="flex justify-between ">
                  <div className="flex gap-3">
                    <div>
                      <HStack>
                        <h2 className="text-xl font-semibold text-green-600">
                          {agency_name}
                        </h2>
                      </HStack>
                      <p className="font-medium text-gray-400">
                        {agency_tagline}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-6 sm:gap-x-10 flex-wrap py-3 text-sm lg:text-base">
                  <HStack alignItems="start">
                    <Text mt="0.5rem">
                      <FaClock fontSize="20px" />
                    </Text>
                    <div>
                      <Text mb="0" fontWeight="600">
                        {agency_hourlyRate || "Not Found"}
                        <sub>/hr</sub>
                      </Text>
                      <Text mb="0" fontSize="0.8rem">
                        Hourly Rate
                      </Text>
                    </div>
                  </HStack>

                  <HStack alignItems="start">
                    <Text mt="0.5rem">
                      <IoBagCheck fontSize="20px" />
                    </Text>
                    <div>
                      <Text mb="0" fontWeight="600">
                        {agency_totalJob || "Not Found"}
                      </Text>
                      <Text mb="0" fontSize="0.8rem">
                        Completed Jobs
                      </Text>
                    </div>
                  </HStack>
                  <HStack alignItems="start">
                    <Text mt="0.5rem">
                      <BsTranslate fontSize="20px" />
                    </Text>
                    <div>
                      <Text mb="0" fontWeight="600">
                        {agency_language || "Not Found"}
                      </Text>
                      <Text mb="0" fontSize="0.8rem">
                        Language
                      </Text>
                    </div>
                  </HStack>
                  <HStack alignItems="start">
                    <Text mt="0.5rem">
                      <IoCalendar fontSize="20px" />
                    </Text>
                    <div>
                      <Text mb="0" fontWeight="600">
                        {agency_foundedYear || "Not Found"}
                      </Text>
                      <Text mb="0" fontSize="0.8rem">
                        Founded
                      </Text>
                    </div>
                  </HStack>
                  <HStack alignItems="start">
                    <Text mt="0.5rem">
                      <FaLocationDot fontSize="20px" />
                    </Text>
                    <div>
                      <Text mb="0" fontWeight="600">
                        {agency_location?.name || "Not Found"}
                      </Text>
                      <Text mb="0" fontSize="0.8rem">
                        Location
                      </Text>
                    </div>
                  </HStack>
                </div>
                <div className="flex gap-2 flex-wrap mt-8">
                  {agency_skills &&
                    agency_skills.map((skill, index) => (
                      <h4
                        key={index}
                        className="text-sm bg-gray-200 px-3 py-1 text-white rounded cursor-pointer"
                      >
                        {skill}
                      </h4>
                    ))}
                </div>

                <div className="pt-3">
                  <p className="sm:text-lg font-semibold">Overview:</p>
                  <article className="">
                    <div
                      dangerouslySetInnerHTML={{ __html: agency_overview }}
                    />
                  </article>
                </div>
              </div>
            </div>
          </VStack>
          <div className="lg:col-span-1 w-full h-fit bg-white p-5 sm:p-8 rounded-xl border border-[var(--bordersecondary)]">
            <div>
              <p className="sm:text-lg font-semibold">Contract Title:</p>
              <p className="capitalize">
                {invitationDetails?.invitation_details?.position_assign}
              </p>
            </div>
            <div className="mt-4">
              <p className="sm:text-lg font-semibold">Message:</p>
              <p>{invitationDetails?.invitation_details?.message}</p>
            </div>

            <VStack marginTop="2rem" alignItems="start" gap={3}>
              <Button
                width={"full"}
                isLoading={isSuccess}
                loadingText="Accept Invitation"
                colorScheme="primary"
                type="submit"
                spinner={<BtnSpinner />}
                paddingX={5}
                onClick={() => acceptInvitation()}
                isDisabled={status !== "pending" || isReject}
              >
                {status === "accepted"
                  ? "Already Accepted"
                  : "Accept Invitation"}
              </Button>
              <Button
                width={"full"}
                isLoading={isReject}
                loadingText="Reject Invitation"
                colorScheme="primary"
                type="submit"
                variant="outline"
                spinner={<BtnSpinner />}
                paddingX={5}
                onClick={() => rejectInvitation()}
                isDisabled={status !== "pending" || isSuccess}
              >
                {status === "rejected"
                  ? "Already Rejected"
                  : "Reject Invitation"}
              </Button>
            </VStack>
          </div>
        </div>
      ) : (
        <DataNotAvailable onRefresh={getInvitationDetails} />
      )}
    </div>
  );
};

export default AgencyDetails;
