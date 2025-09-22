
"use client";"
import { Checkbox } from "@chakra-ui/react";
import React from "react";"

import {
  Button,
  Checkbox,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@/components/ui/migration-helpers";"
import { yupResolver } from "@hookform/resolvers/yup";"
import { useEffect } from "react";"
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";"
import { FiPlus } from "react-icons/fi";"
import * as yup from "yup";"
import { GigCreateLayout } from "../GigCreate";"

// validation schema
const schema = yup.object().shape({
  requirements: yup
    .array(
      yup.object().shape({
        requirement: yup.string().label("Title").required(),"
        required: yup.boolean().label("Required").default(false).required(),"
      })
    )
    .label("Requirements"),"
  steps: yup
    .array(
      yup.object().shape({
        step_title: yup.string().label("Title").required(),"
        description: yup.string().label("Description").required(),"
      })
    )
    .label("Requirements"),"
});

// default values for the step
const defaultValues = {
  requirements: [{ requirement: "", required: false }],"
  steps: [{ step_title: "", description: "" }],"
};

const Step3 = ({ submitCallback, onBack, afterSubmit, formValues }) => {
  const methods = useForm({
    defaultValues,
    // resolver: yupResolver(schema),
  });
  const { handleSubmit, control, setValue, reset } = methods;

  // requirement field array
  const { fields: requirementFields, append: appendRequirement } =
    useFieldArray({
      control,
      name: "requirements","
    });
  // step field array
  const { fields: stepFields, append: appendStep } = useFieldArray({
    control,
    name: "steps","
  });

  // Add a new requirement object to the array
  const addRequirement = () => {
    appendRequirement({ requirement: "", required: false });"
  };

  // Add a new step object to the array
  const addStep = () => {
    appendStep({ step_title: "", description: "" });"
  };

  // form submit operations
  const onSubmit = (values) => {
    submitCallback(values); // this will update the parent state
    afterSubmit(); // this will perform task after updating the state
  };

  // load state
  useEffect(() => {
    const changes = {};

    Object.keys(defaultValues).map((key) => {
      const value = formValues?.[key];
      changes[key] = value === undefined ? defaultValues[key] : value;
    });

    reset(changes);
  }, [formValues]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GigCreateLayout title="Gig Requirement & Steps" onBackward={onBack}>"
          <div className="flex flex-col className="items-start w-full">"
            <label
              htmlFor="fileInput""
              className="text-xl md:text-2xl font-[600] pb-0 mb-0""
            >
              Information you need from the client before you start your project
            </label>

            <div className="flex flex-col backgroundColor= w-full p-[1rem 1.5rem] mt-[1rem]"white""
             
            >
              {requirementFields.map((requirement, index) => (
                <div className="flex flex-col key={index} className="items-start w-full mb-[0.8rem]""
                >
                  <label htmlFor="" className="font-semibold mb-0 pb-0">"
                    Requirement
                  </label>
                  <div className="flex flex-col className="items-start w-full">"
                    <Controller
                      name={`requirements[${index}].requirement`} // Use index to create unique names`
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <spanarea
                            {...field}
                            placeholder="You will get a fantastic deliverable that drives impact""
                            className="mt-[5px]""
                          />
                          <div className="flex flex-row items-center className="w-full">"
                            <Checkbox
                              colorScheme="green""
                              size="lg""
                              {...field}
                              onChange={(e) => {
                                // Update the checkbox value using the index
                                setValue(
                                  `requirements[${index}].required`,`
                                  e.target.checked
                                );
                              }}
                            ></Checkbox>
                            <span className="text-base">"
                              Client needs to answer before I can start working
                            </span>
                          </div>
                          {fieldState.error && (
                            <p style={{ color: "red", marginTop: "5px" }}>"
                              {fieldState.error.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center className="w-full">"
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground""
                backgroundColor="transparent""
                _hover={{
                  backgroundColor: "transparent","
                }}
                onClick={() => addRequirement()}
              >
                <FiPlus size="1.3rem" /> <span>Add a requirement</span>"
              </button>
            </div>
          </div>

          <div className="flex flex-col className="items-start w-full">"
            <label
              htmlFor="fileInput""
              className="text-xl md:text-2xl font-[600] pb-0 mb-0""
            >
              Steps you&apos;ll take to get the project done
            </label>
            <div className="flex flex-col backgroundColor= p-[2rem 1.5rem] mt-[1rem] w-full"white""
             
            >
              {stepFields.map((step, index) => (
                <div className="flex flex-col key={index} className="items-start w-full shadow rounded-md p-3 mt-2""
                >
                  <label htmlFor="" className="font-semibold">"
                    Step {index + 1} title
                  </label>

                  <Controller
                    name={`steps[${index}].step_title`} // Unique name using index`
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-[5px]""
                          {...field}
                          placeholder="Enter step title"
};

export default Step3;
