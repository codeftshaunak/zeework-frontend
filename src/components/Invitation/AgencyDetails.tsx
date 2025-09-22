
"use client";"
import { Avatar } from "@chakra-ui/react";
import React from "react";"

import { useEffect, useState } from "react";"
import queryString from "query-string";"
import {
  HStack,
  Text,
  VStack,
  Avatar,
  Button,
} from "@/components/ui/migration-helpers";"
import { toast } from "@/lib/toast";"
import {
  acceptAgencyInvitation,
  getInvitationOfAgency,
} from "../../helpers/APIs/freelancerApis";"
import BtnSpinner from "../Skeletons/BtnSpinner";"
import { useRouter } from "next/navigation";"
import { FaClock, FaLocationDot } from "react-icons/fa6";"
import { IoBagCheck, IoCalendar } from "react-icons/io5";"
import { BsTranslate } from "react-icons/bs";"
import InvitationSkeleton from "../Skeletons/InvitationSkeleton";"
import DataNotAvailable from "../DataNotAvailable/DataNotAvailable";"

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
        status: "accepted","
      });

      if (res.code === 200) {
        toast.default("You’ve successfully accepted the invitation");"
        router.push("/");"
      } else {
        toast.default(res.message ||
            res?.msg ||
            res.response.data.msg ||
            res.response.data.message ||
            "Something went wrong!");"
      }
    } catch (error) {
      toast.default(error?.response?.data?.msg || "Something went wrong!");"
    }
    setIsSuccess(false);
  };

  const rejectInvitation = async () => {
    setIsReject(true);
    try {
      const { code, msg } = await acceptAgencyInvitation({
        invite_id: invite_id,
        status: "rejected","
      });

      if (code === 200) {
        toast.default("You’ve successfully rejected the invitation");"
        router.push("/");"
      } else {
        toast.default(msg);
      }
    } catch (error) {
      toast.default("Error performing action");"
    }
    setIsReject(false);
  };

  useEffect(() => {
    getInvitationDetails();
  },[]);

  return (
    <div className="w-full">"
      {isLoading ? (
        <InvitationSkeleton />
      ) : status ? (
        <div className="grid lg:grid-cols-3 gap-5">"
          <div className="flex flex-col bg-white lg:col-span-2"
           
           
           
           
           
           
          >
            <p
              className="text-green-500 font-semibold border-b border-transparent hover:border-green-500 border-spacing-0 transition cursor-pointer"
              onClick={() => router.push(`/profile/a/${agency_id}`)}`
            >
              View Profile
            </p>
            <div className="flex flex-col md:flex-row gap-8 items-center bg-white mb-5 rounded-xl">"
              {/* <div className="w-[150px] h-[150px]">"

              </div> */}
              <div className="w-[95%] space-y-2 m-auto">"
                <Avatar
                  name={agency_name}
                  src={agency_profileImage} className="rounded"
                  objectFit="cover"
                />
                <div className="flex justify-between">"
                  <div className="flex gap-3">"
                    <div>
                      <div className="flex flex-row items-center> <h2 className="text-xl font-semibold text-green-600">"
                          {agency_name}
                        </h2>
                      </div>
                      <p className="font-medium text-gray-400">"
                        {agency_tagline}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-6 sm:gap-x-10 flex-wrap py-3 text-sm lg:text-base">"
                  <div className="flex flex-row items-center> <span>"
                      <FaClock />
                    </span>
                    <div>
                      <span>
                        {agency_hourlyRate || "Not Found"}"
                        <sub>/hr</sub>
                      </span>
                      <span>
                        Hourly Rate
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row items-center> <span>"
                      <IoBagCheck />
                    </span>
                    <div>
                      <span>
                        {agency_totalJob || "Not Found"}"
                      </span>
                      <span>
                        Completed Jobs
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center> <span>"
                      <BsTranslate />
                    </span>
                    <div>
                      <span>
                        {agency_language || "Not Found"}"
                      </span>
                      <span>
                        Language
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center> <span>"
                      <IoCalendar />
                    </span>
                    <div>
                      <span>
                        {agency_foundedYear || "Not Found"}"
                      </span>
                      <span>
                        Founded
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center> <span>"
                      <FaLocationDot />
                    </span>
                    <div>
                      <span>
                        {agency_location?.name || "Not Found"}"
                      </span>
                      <span>
                        Location
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap mt-8">"

};

export default AgencyDetails;
