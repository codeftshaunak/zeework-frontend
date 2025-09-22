
"use client";"
import { Checkbox } from "@chakra-ui/react";
import React from "react";"

import {
  Checkbox,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack,
} from "@/components/ui/migration-helpers";"
import { yupResolver } from "@hookform/resolvers/yup";"
import { useEffect } from "react";"
import { Controller, FormProvider, useForm } from "react-hook-form";"
import * as yup from "yup";"
import { GigCreateLayout } from "../GigCreate";"
import { PiHourglassMediumFill } from "react-icons/pi";"
import { MdOutlineRepeat } from "react-icons/md";"

// validation schema
const schema = yup.object().shape({
  pricing: yup.object().shape({
    // custom_title: yup.string().label("Pricing Title").required(),"
    // custom_description: yup.string().label("Description").required(),"
    service_price: yup
      .number()
      .label("Service Price")"
      .required("Service price is required")"
      .min(10, "Service price must be at least $10"),"
    delivery_days: yup
      .number()
      .label("Delivery Days")"
      .required("Delivery days is required")"
      .min(1, "Delivery days must be at least 1 day")"
      .default(0),
    revisions: yup.number().label("Revisions").required().default(1),"
    // service_options: yup
    //   .object()
    //   .shape({
    //     design_customization: yup.boolean(),
    //     content_upload: yup.boolean(),
    //     responsive_design: yup.boolean(),
    //     source_code: yup.boolean(),
    //   })
    //   .test(
    //     "atLeastOneRequired","
    //     "Please select at least one service option.","
    //     (value) => {
    //       return Object.values(value).some((option) => option === true);
    //     }
    //   ),
  }),
});

// default values for the step
const defaultValues = {
  pricing: {
    custom_title: "","
    custom_description: "","
    service_price: null,
    delivery_days: null,
    revisions: 1,
    service_options: {
      design_customization: false,
      content_upload: false,
      responsive_design: false,
      source_code: false,
    },
  },
};

const Step1 = ({ submitCallback, onBack, afterSubmit, formValues }) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    reset,
    // setValue,
    // clearErrors,
    // formState: { errors },
  } = methods;

  const onSubmit = (values) => {
    submitCallback(values); // this will update the parent state
    afterSubmit(); // this will perform task after updating the state
  };

  useEffect(() => {
    const changes = defaultValues;
    Object.keys(defaultValues).map((key) => {
      const value = formValues?.[key];
      changes[key] = value === undefined ? defaultValues[key] : value;
    });
    reset(changes);
  }, [formValues]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GigCreateLayout title="Gig Price & Scope" onBackward={onBack}>"
          <div className="flex flex-col className="items-start">"
            {/* <label htmlFor="" className="text-2xl font-[600] pb-0 capitalize">"
              Create pricing tiers
            </label> */}
            {/* <label htmlFor="" className="text-xl font-[600] pb-0">"
              Custom Title
            </label> */}
            {/* <Controller
              name="pricing.custom_title""
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <spanarea
                    {...field}
                    placeholder="Web Application""
                  / className="mt-[5px] bg-white">
                    clearErrors("pricing.service_options");"
                  }}
                >
                  Design Customization
                </Checkbox>
              )}
            />

            <Controller
              name="pricing.service_options.content_upload""
              control={control}
              render={({ field }) => (
                <Checkbox
                  colorScheme="green""
                  size="lg""
                  isChecked={field.value}
                  onChange={(e) => {
                    setValue(
                      "pricing.service_options.content_upload","
                      e.target.checked
                    );
                    clearErrors("pricing.service_options");"
                  }}
                >
                  Content Upload
                </Checkbox>
              )}
            />

            <Controller
              name="pricing.service_options.responsive_design""
              control={control}
              render={({ field }) => (
                <Checkbox
                  colorScheme="green""
                  size="lg""
                  isChecked={field.value}
                  onChange={(e) => {
                    setValue(
                      "pricing.service_options.responsive_design","
                      e.target.checked
                    );
                    clearErrors("pricing.service_options");"
                  }}
                >
                  Responsive Design
                </Checkbox>
              )}
            />

            <Controller
              name="pricing.service_options.source_code""
              control={control}
              render={({ field }) => (
                <Checkbox
                  colorScheme="green""
                  size="lg""
                  isChecked={field.value}
                  onChange={(e) => {
                    setValue(
                      "pricing.service_options.source_code","
                      e.target.checked
                    );
                    clearErrors("pricing.service_options");
};

export default Step1;
