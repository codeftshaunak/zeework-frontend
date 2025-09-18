import {
  Avatar,
  Button,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
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
  const [activeTab, setActiveTab] = useState(0);

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
      <Tabs
        position="relative"
        variant="unstyled"
        onChange={(index) => setActiveTab(index)}
      >
        <TabList>
          <Tab className="font-semibold text-[1.5rem]">Overview</Tab>
          {jobDetails?.job_type === "hourly" && (
            <Tab className="font-semibold text-[1.5rem] !hidden sm:!block">
              Work Sheet
            </Tab>
          )}
        </TabList>
        <TabIndicator
          mt="1.5px"
          height="2px"
          bg="var(--primarytextcolor)"
          borderRadius="1px"
        />
        <SmoothMotion key={activeTab}>
          <TabPanels>
            <TabPanel paddingX={0}>
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
                          size={"lg"}
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
                            {client_details?.[0]?.firstName +
                              " " +
                              client_details?.[0]?.lastName}
                          </p>{" "}
                          {client_details?.[0]?.avg_review && (
                            <div className="flex items-center">
                              <StarRatings
                                rating={client_details?.[0]?.avg_review}
                                starDimension="18px"
                                starSpacing="1px"
                                starRatedColor="#22C35E"
                                starEmptyColor="#8ab89b"
                              />{" "}
                              ({client_details?.[0]?.avg_review}) Reviews
                            </div>
                          )}
                          {client_details?.[0]?.location && (
                            <p className="flex items-center gap-1">
                              <FaLocationDot />
                              {client_details?.[0]?.location}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-lg font-semibold">Contract Title:</p>
                        <p className="text-lg capitalize">
                          {jobDetails?.contract_title}
                        </p>
                      </div>

                      <Button
                        mt={5}
                        width={"full"}
                        colorScheme={"primary"}
                        variant={freelancer_review ? "outline" : "solid"}
                        isDisabled={freelancer_review}
                        onClick={() =>
                          !freelancer_review &&
                          router.push(`/submit-review/${_id}`, {
                            state: {
                              jobDetails: jobDetails,
                              receiverDetails: client_details?.[0],
                            },
                          })
                        }
                      >
                        {freelancer_review
                          ? "Already Given Feedback"
                          : "Send Feedback For Client"}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <DataNotAvailable onRefresh={getInvitationDetails} />
              )}
            </TabPanel>
            {jobDetails?.job_type === "hourly" && (
              <TabPanel paddingX={0}>
                {timeSheetLoading ? (
                  <HorizontalCardSkeleton className={"mt-3 sm:mt-5 lg:mt-10"} />
                ) : timeSheet?.details ? (
                  <div className=" mt-3 sm:mt-5 lg:mt-10">
                    <JobTimeSheet data={timeSheet} />
                  </div>
                ) : (
                  <DataNotAvailable
                    onRefresh={() => {
                      setTimeSheetLoading(true);
                      getOfferTimeSheet();
                    }}
                  />
                )}
              </TabPanel>
            )}
          </TabPanels>
        </SmoothMotion>
      </Tabs>
    </div>
  );
};

export default CompleteJob;
