
"use client";
import React from "react";

import {
  Button,
  Checkbox,
  HStack,
  Text,
  Textarea,
  VStack,
  Input,
} from "@/components/ui/migration-helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import * as yup from "yup";
import { GigCreateLayout } from "../GigCreate";
import ErrorMsg from "../../utils/Error/ErrorMsg";

// validation schema
const schema = yup.object().shape({
  project_description: yup
    .object()
    .shape({
      project_summary: yup.string().label("Project Summery").required(),
      // faqs: yup
      //   .array(
      //     yup.object().shape({
      //       question: yup.string().label("Question").required(),
      //       answer: yup.string().label("Answer").required(),
      //     })
      //   )
      //   .label("Faq"),
    })
    .label("Project Description")
    .required(),
  terms: yup.boolean().oneOf([true], "You must accept the Terms & Conditions"),
  privacy_notice: yup
    .boolean()
    .oneOf([true], "You must accept the Privacy Policy"),
});

// default values for the step
const defaultValues = {
  project_description: {
    project_summary: "",
    faqs: [{ question: "", answer: "" }],
  },
  terms: false,
  privacy_notice: false,
};

const Step4 = ({
  submitCallback,
  onBack,
  afterSubmit,
  formValues,
  isLoading,
}) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
    trigger,
  } = methods;

  const { fields: faqFields, append: appendFaq } = useFieldArray({
    control,
    name: "project_description.faqs",
  });

  const addFaq = () => {
    appendFaq({ question: "", answer: "" });
  };

  // form submit operations
  const onSubmit = (values) => {
    const data = submitCallback(values); // this will update the parent state

    afterSubmit(data); // this will perform task after updating the state
  };

  // Load state
  useEffect(() => {
    const changes = {};
    Object.keys(defaultValues).forEach((key) => {
      if (key !== "terms" && key !== "privacy_notice") {
        const value = formValues?.[key];
        changes[key] = value === undefined ? defaultValues[key] : value;
      }
    });

    // Only reset fields other than terms and privacy_notice
    reset(changes);

    // Reset terms and privacy_notice if they are not in formValues
    setValue("terms", defaultValues.terms);
    setValue("privacy_notice", defaultValues.privacy_notice);
  }, [formValues]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GigCreateLayout
          title="Project description"
          forwardBtnText="Submit now"
          onBackward={onBack}
          isLoading={isLoading}
        >
          <div className="flex flex-col className="items-start">
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Project Summary
            </label>
            <p>
              Tell the client what you are going to deliver and how it&apos;ll
              benefit them.
            </p>
            <Controller
              name="project_description.project_summary"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <spanarea {...field} / className="mt-[5px] bg-white">
                    {fieldState.error && (
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>

          <div className="flex flex-col className="items-start w-full">
            <label htmlFor="fileInput" className="text-xl font-[600] pb-0 mb-0">
              Frequently asked questions (optional)
            </label>
            <p>
              Provide answers to common questions your clients may have about
              your project. Feel free to include details that will help them
              better understand your work process.
            </p>
            <div className="flex flex-col className="w-full">
              {faqFields.map((faq, index) => (
                <div className="flex flex-col key={index} className= p-[2rem 1.5rem] mt-[1rem] rounded-md"items-start w-full"
                  backgroundColor="white"
                 
                >
                  <label htmlFor="" className="font-semibold">
                    Question {index + 1}
                  </label>
                  <Controller
                    name={`project_description.faqs[${index}].question`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-[5px]"
                          {...field}
                         
                          type="text"
                        />
                        {fieldState.error && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                  <label htmlFor="" className="font-semibold">
                    Answer
                  </label>
                  <Controller
                    name={`project_description.faqs[${index}].answer`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <spanarea
                          {...field}
                        / className="mt-[5px] bg-white">
                        {fieldState.error && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center className="w-full">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                backgroundColor="transparent"
                onClick={() => addFaq()}
                _hover={{
                  backgroundColor: "transparent",
                }}
              >
                <FiPlus size="1.3rem" /> <span>Add a step</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col className="items-start w-full">
            <label
              htmlFor="fileInput"
              className="text-xl md:text-2xl font-[600] pb-0 mb-0"
            >
              Terms of Service
            </label>

            <div className="flex flex-row items-center className="w-full">
              <Checkbox
                colorScheme="primary"
                size="lg"
                onChange={(e) => {
                  setValue("terms", e.target.checked);
                  trigger("terms");
                }}
              ></Checkbox>
              <span className="text-sm">
                I understand and agree to the{" "}
                <strong>ZeeWork Terms of Service</strong>, including the{" "}
                <strong>User Agreement</strong> and{" "}
                <strong>Privacy Policy</strong>
              </span>
            </div>
            {errors.terms && <ErrorMsg msg={errors.terms.message} />}
          </div>

          <div className="flex flex-col className="items-start w-full">
            <label
              htmlFor="fileInput"
              className="text-xl md:text-2xl font-[600] pb-0 mb-0"
            >
              Privacy Notice
            </label>
            <div className="flex flex-row items-center className="w-full">
              <Checkbox
                colorScheme="primary"
                size="lg"
                onChange={(e) => {
                  setValue("privacy_notice", e.target.checked);
                  trigger("privacy_notice");
                }}
              ></Checkbox>
              <span className="text-sm">
                By submitting the project and activating it you agree to the
                Privacy Policy.
              </span>
            </div>
            {errors.privacy_notice && (
              <ErrorMsg msg={errors.privacy_notice.message} />
            )}
          </div>
        </GigCreateLayout>
      </form>
    </FormProvider>
  );
};

export default Step4;
