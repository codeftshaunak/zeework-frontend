import { FaClock, FaHeadSideVirus } from "react-icons/fa6";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { MdCategory } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";

export const JobDetails = ({ jobDetails }) => {
  const { job_details, project_budget, budget, hourly_rate, contract_title } =
    jobDetails || {};

  return (
    <div className="lg:col-span-2 w-full h-fit flex gap-10 bg-white p-5 sm:p-8 rounded-xl border border-[var(--bordersecondary)]">
      <VStack alignItems="start" width={"full"}>
        <Text
          fontSize={{ base: "1.3rem", lg: "1.5rem" }}
          fontWeight="500"
          className="capitalize"
        >
          {contract_title ? contract_title : job_details?.[0]?.title}
        </Text>
        <div className="flex gap-x-10 sm:gap-x-20 flex-wrap mt-1 text-sm lg:text-base">
          {job_details?.[0]?.experience && (
            <HStack alignItems="start">
              <Text mt="0.5rem">
                <FaHeadSideVirus fontSize="20px" />
              </Text>
              <div>
                <Text mb="0" fontWeight="600">
                  {job_details?.[0]?.experience}
                </Text>
                <Text mb="0" fontSize="0.8rem">
                  Experience Level
                </Text>
              </div>
            </HStack>
          )}

          {job_details?.[0]?.categories?.[0]?.value && (
            <HStack alignItems="start">
              <Text mt="0.5rem">
                <MdCategory fontSize="20px" />
              </Text>
              <div>
                <Text mb="0" fontWeight="600">
                  {job_details?.[0]?.categories?.[0]?.value}
                </Text>
                <Text mb="0" fontSize="0.8rem">
                  Category
                </Text>
              </div>
            </HStack>
          )}
          {job_details?.[0]?.job_type == "fixed" && (
            <HStack alignItems="start">
              <Text mt="0.5rem">
                <FaClock fontSize="20px" />
              </Text>
              <div>
                <Text mb="0" fontWeight="600">
                  ${project_budget ? project_budget : budget}
                </Text>
                <Text mb="0" fontSize="0.8rem">
                  Fixed Budget
                </Text>
              </div>
            </HStack>
          )}
          {job_details?.[0]?.job_type == "hourly" && (
            <HStack alignItems="start">
              <Text mt="0.5rem">
                <FaClock fontSize="20px" />
              </Text>
              <div>
                <Text mb="0" fontWeight="600">
                  ${hourly_rate ? hourly_rate : job_details?.[0]?.amount}
                </Text>
                <Text mb="0" fontSize="0.8rem">
                  Hourly Range
                </Text>
              </div>
            </HStack>
          )}
          {job_details?.[0]?.durations && (
            <HStack alignItems="start">
              <Text mt="0.5rem">
                <IoCalendar fontSize="20px" />
              </Text>
              <div>
                <Text mb="0" fontWeight="600">
                  {job_details?.[0]?.durations}
                </Text>
                <Text mb="0" fontSize="0.8rem">
                  Duration
                </Text>
              </div>
            </HStack>
          )}
        </div>

        <div className="flex gap-4 flex-wrap mt-2">
          {job_details?.[0]?.skills?.map((skill) => (
            <Text
              key={skill}
              textTransform={"capitalize"}
              paddingX={"15px"}
              paddingY={"6px"}
              backgroundColor={"#E7F2EB"}
              color={"#355741"}
              borderRadius={"10px"}
              height={"36px"}
            >
              {skill}
            </Text>
          ))}
        </div>

        <p className="lg:text-lg font-semibold text-gray-600 mt-5 -mb-1">
          Specifications:
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: job_details?.[0].description,
          }}
        ></div>
      </VStack>
    </div>
  );
};
