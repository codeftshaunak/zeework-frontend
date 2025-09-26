
"use client";
import React from "react";

import { toast } from "@/lib/toast";
import { useState } from "react";

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
      toast.success("Job post created successfully");

      setStep(4);
    } else {
      toast.warning("Failed to create job post!");
    }
    setIsLoading(false);
  };

  return (
    <HomeLayout displaydir="row">
      <FormStateProvider>
        {step < 4 ? (
          <div className="flex flex-row items-center justify-around w-full items-flex-start mt-10"
          >
            <Steps step={step} setStep={setStep} />
            {step === 1 && <FirstStep setStep={setStep} />}
            {step === 2 && <SecondStep setStep={setStep} />}
            {step === 3 && (
              <FinalStep
                setStep={setStep}
                onCallback={onSubmit}
                
              />
            )}
            <Preview />
          </div>
        ) : null}
        {step === 4 && <Complete setStep={setStep} />}
      </FormStateProvider>
    </HomeLayout>
  );
};

export default JobPost;
