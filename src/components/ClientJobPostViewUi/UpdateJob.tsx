"use client";

import { toast } from "@/lib/toast";
import { useEffect, useState } from "react";
import { FormStateProvider } from "../../contexts/FormContext";
import Steps from "../JobCreate/Steps";
import FirstStep from "../JobCreate/FirstStep";
import SecondStep from "../JobCreate/SecondStep";
import FinalStep from "../JobCreate/FinalStep";
import Preview from "../JobCreate/Preview";
import HomeLayout from "../../components/Layouts/HomeLayout";
import { useRouter, useLocation } from "next/navigation";
import { updateJob } from "../../helpers/APIs/jobApis";
import { useDispatch, useSelector } from "react-redux";
import { setDashboard } from "../../redux/pagesSlice/pagesSlice";
import { Box, HStack } from "@/components/ui/migration-helpers";

const UpdateJob = () => {
  const existJobs = useSelector((state: any) => state.pages.dashboard.jobs);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const jobDetails = location.state && location?.state?.jobDetails;
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    for (const key in data) {
      if (data[key] instanceof Array) {
        data[key].forEach((item) => formData.append(`${key}[]`, item));
        continue;
      }
      formData.append(key, data[key]);
    }
    // create the job using form state
    const { code, msg, body } = await updateJob(jobDetails?._id, formData);

    if (code === 200) {
      toast.success(msg);

      dispatch(
        setDashboard({
          jobs: [...existJobs.filter((item) => item._id !== body._id), body],
        })
      );

      router.push(`/client-jobDetails/${jobDetails?._id}`, {
        state: { jobDetails: body },
      });
    } else {
      toast.warning(msg);

      router.push(-1);
    }
    setIsLoading(false);
  };

  // check job details
  useEffect(() => {
    if (!jobDetails) return router.push("/");
  }, []);

  return (
    <HomeLayout displaydir="row">
      <FormStateProvider>
        <Box marginTop={10}>
          {step < 4 ? (
            <HStack
              className="w-full"
              flexDirection={{ base: "column", md: "row" }}
            >
              <Steps step={step} setStep={setStep} />
              {step === 1 && (
                <FirstStep setStep={setStep} defaultValues={jobDetails} />
              )}
              {step === 2 && (
                <SecondStep setStep={setStep} defaultValues={jobDetails} />
              )}
              {step === 3 && (
                <FinalStep
                  setStep={setStep}
                  onCallback={onSubmit}
                  isLoading={isLoading}
                  defaultValues={jobDetails}
                />
              )}
              <Preview />
            </HStack>
          ) : null}
        </Box>
      </FormStateProvider>
    </HomeLayout>
  );
};

export default UpdateJob;
