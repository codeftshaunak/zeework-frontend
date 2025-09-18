"use client";

import { toaster } from "@/lib/providers";
import { useState } from "react";
import { HStack } from "@chakra-ui/react";
import Complete from "../../JobCreate/Completed";
import FinalStep from "../../JobCreate/FinalStep";
import FirstStep from "../../JobCreate/FirstStep";
import Preview from "../../JobCreate/Preview";
import SecondStep from "../../JobCreate/SecondStep";
import Steps from "../../JobCreate/Steps";
import { FormStateProvider } from "../../../contexts/FormContext";
import HomeLayout from "../../Layouts/HomeLayout";
import { createJob } from "../../../helpers/APIs/jobApis";
import { useDispatch, useSelector } from "react-redux";
import { setDashboard } from "../../../redux/pagesSlice/pagesSlice";

const JobPost = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const jobs = useSelector((state) => state.pages.dashboard.jobs);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    for (const key in data) {
      if (data[key] instanceof Array) {
        if (key === "categories") {
          data[key].forEach((item, index) => {
            for (const itemKey in item) {
              formData.append(`${key}[${index}][${itemKey}]`, item[itemKey]);
            }
          });
        } else {
          data[key].forEach((item) => formData.append(`${key}[]`, item));
        }
        continue;
      }
      formData.append(key, data[key]);
    }
    // create the job using form state
    const response = await createJob(formData);
    if (response?.code === 200)
      dispatch(setDashboard({ jobs: [...jobs, response.body] }));
    if (response.success) {
      toaster.create({
        title: "Job post created successfully",
        type: "success",
        duration: 3000,
      });

      setStep(4);
    } else {
      toaster.create({
        title: "Failed to create job post!",
        type: "warning",
        duration: 3000,
      });
    }
    setIsLoading(false);
  };

  return (
    <HomeLayout displaydir="row">
      <FormStateProvider>
        {step < 4 ? (
          <HStack
            justifyContent={"space-around"}
            width={"full"}
            alignItems={"flex-start"}
            marginTop={10}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Steps step={step} setStep={setStep} />
            {step === 1 && <FirstStep setStep={setStep} />}
            {step === 2 && <SecondStep setStep={setStep} />}
            {step === 3 && (
              <FinalStep
                setStep={setStep}
                onCallback={onSubmit}
                isLoading={isLoading}
              />
            )}
            <Preview />
          </HStack>
        ) : null}
        {step === 4 && <Complete setStep={setStep} />}
      </FormStateProvider>
    </HomeLayout>
  );
};

export default JobPost;
