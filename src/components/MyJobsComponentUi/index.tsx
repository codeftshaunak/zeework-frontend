"use client";

import { useEffect, useState } from "react";
import { getAgencyAllJobs, userAllJobs } from "../../helpers/APIs/jobApis";
import ActiveJobSlider from "./ActiveJobSlider";
import ApplyedJobs from "./ApplyedJobs/ApplyedJobs";
import CompletedJobs from "./ApplyedJobs/CompletedJobs";
import { VStack, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "next/navigation";
import { useCookies } from "react-cookie";
import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { setMyJobsData } from "../../redux/pagesSlice/pagesSlice";
import AgencyContract from "./AgencyContract/AgencyContract";

const MyJobsComponentUi = () => {
  const [cookies] = useCookies(["activeagency"]);
  const userJobs = useSelector((state: any) => state.pages.myJobs.userJobs);
  const [loading, setLoading] = useState(false);
  const { active_jobs, completed_jobs, applied_jobs, contract_from_agency } =
    userJobs || {};
  const router = useRouter();
  const dispatch = useDispatch();

  const getUserJobs = async () => {
    setLoading(true);
    try {
      const response = cookies.activeagency
        ? await getAgencyAllJobs()
        : await userAllJobs();
      if (response) dispatch(setMyJobsData({ userJobs: response }));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (Object.keys(userJobs).length === 0) {
      getUserJobs();
    }
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-12">
          <div>
            <h2 className="mt-8 mb-4 text-2xl font-medium">Active Jobs</h2>
          </div>

          {loading ? (
            <HorizontalCardSkeleton />
          ) : active_jobs?.length > 0 ? (
            <div className="my-4">
              <ActiveJobSlider activeJobList={active_jobs} />
            </div>
          ) : (
            <VStack
              alignItems={"center"}
              justifyContent={"center"}
              className="border border-[var(--bordersecondary)] rounded-lg"
              height={"10rem"}
              bgColor={"white"}
            >
              <Text
                fontSize={"1.2rem"}
                textTransform={"capitalize"}
                fontWeight={"600"}
                marginBottom={"10px"}
              >
                Currently No Active Jobs
              </Text>
              <Button
                borderRadius={"25px"}
                fontWeight={"500"}
                backgroundColor={"var(--primarycolor)"}
                color={"white"}
                _hover={{
                  border: "1px solid var(--primarycolor)",
                  backgroundColor: "white",
                  color: "black",
                }}
                onClick={() => router.push("/find-job")}
              >
                Find Jobs Now
              </Button>
            </VStack>
          )}
        </div>
      </div>
      <div>
        {!cookies.activeagency && (
          <AgencyContract
            contractList={contract_from_agency}
            loading={loading}
          />
        )}
        <ApplyedJobs applyJobs={applied_jobs} loading={loading} />
        <CompletedJobs completedJobs={completed_jobs} loading={loading} />
      </div>
    </div>
  );
};

export default MyJobsComponentUi;
