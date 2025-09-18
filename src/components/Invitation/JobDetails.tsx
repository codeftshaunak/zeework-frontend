import { FaClock, FaHeadSideVirus } from "react-icons/fa6";
import { HStack, Text, VStack, Box } from "@chakra-ui/react";
import { MdCategory } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { useRouter } from "next/navigation";

export const JobDetailsSection = ({ jobDetails, jobStatus }) => {
  const {
    job_details,
    project_budget,
    budget,
    hourly_rate,
    contract_title,
    status,
  } = jobDetails || {};

  const amount = project_budget
    ? project_budget
    : budget
    ? budget
    : job_details?.[0]?.amount;

  const router = useRouter();
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return `Posted on ${formattedDate}`;
  };

  return (
    <div className="lg:col-span-2 w-full h-fit flex gap-10 bg-white p-5 sm:p-8 rounded-xl border border-[var(--bordersecondary)]">
      <VStack alignItems="start" width={"full"}>
        <div className="w-full flex flex-col sm:flex-row justify-between">
          <Text
            color="var(--primarytextcolor)"
            fontWeight="600"
            cursor="pointer"
            mb="0"
            alignItems={"end"}
            onClick={() => router.push(`/find-job/${jobDetails?.job_id}`)}
          >
            View Job Post
          </Text>
          {/* <Box textAlign={"right"}>
            <span
              className={`text-base font-normal px-3 uppercase rounded-full text-right border border-[var(--primarycolor)] bg-green-100`}
            >
              {jobStatus ? jobStatus : status}
            </span>
            <Text borderRadius="15px" fontWeight="300" marginTop={"0.5rem"}>
              {formatDate(new Date(job_details?.[0]?.created_at))}
            </Text>
          </Box> */}
        </div>
        <Text
          fontSize={{ base: "1.3rem", lg: "1.5rem" }}
          fontWeight="500"
          className="capitalize"
        >
          {contract_title ? contract_title : job_details?.[0]?.title}
        </Text>
        <div className="w-full flex gap-10 sm:gap-10 my-5 flex-wrap text-sm lg:text-base justify-between">
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
                  ${amount}
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
