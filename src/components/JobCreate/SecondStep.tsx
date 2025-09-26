"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "../../contexts/FormContext";
import { secondStepSchema } from "../../schemas/job-create-schema";
import ErrorMsg from "../utils/Error/ErrorMsg";

const options = [
  {
    key: "Entry",
    title: "Entry",
    text: "Looking somerelatively new to this field",
  },
  {
    key: "Intermediate",
    title: "Intermediate",
    text: "Looking some relatively good in this field",
  },
  {
    key: "Expert",
    title: "Expert",
    text: "Looking some relatively expert to this field",
  },
];

function SecondStep({ setStep, defaultValues= {} }) {
  const { insertToFormState, formState } = useFormState();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(secondStepSchema),
    defaultValues: {
      experience: defaultValues?.experience || "Expert",
    },
  });

  // on form submit assign values to the context and go to next step
  const onSubmit = (v) => {
    insertToFormState(v);
    setStep(3);
  };

  // if there any values in form state context then push this to the form
  useEffect(() => {
    if (formState) {
      const values: any = {};
      values.experience =
        (formState as any)?.experience || (defaultValues as any)?.experience || "Expert";
      reset(values);
    }
  }, [formState]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-[530px] h-[716px] flex-col justify-start items-start gap-9 inline-flex"
      >
        <div>
          <div className="w-max-[440px] text-black text-3xl font-medium font-['SF Pro Text'] leading-9">
            What level experience you need?
          </div>
          <div className="w-max-[530px] mt-2 text-gray-700 text-sm font-normal font-['SF Pro Text'] leading-tight">
            This won`t restrict any proposals, but helps match expertise to your
            budget.
          </div>
        </div>
        {errors?.experience && <ErrorMsg msg={errors.experience.message} />}

        {options.map((option, index) => (
          <div
            className={`flex p-5 items-center  w-full md:w-[446px] h-[88px] rounded-xl border border-outline-primary active-checkbox cursor-pointer bg-white`}
            key={index}
            onClick={() => {
              const radioValue = option.key;
              reset({ experience: radioValue });
            }}
          >
            <input
              id={option.key}
              type="radio"
              value={option.key}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
              {...register("experience")}
            />
            <label htmlFor="default-radio-1" className="ml-4 cursor-pointer">
              <div className="w-[375px] text-stone-900 text-lg font-semibold font-['SF Pro Text'] leading-7">
                {option.title}
              </div>
              <div className="w-[375px] text-neutral-500 text-sm font-normal font-['SF Pro Text'] leading-tight">
                {option.text}
              </div>
            </label>
          </div>
        ))}

        <button
          className="w-[136px] h-9 flex-col justify-start items-start gap-2.5 inline-flex"
          type="submit"
        >
          <div className="self-stretch h-9 px-3 py-2 bg-green-500 rounded-md shadow justify-center items-center gap-1 inline-flex">
            <div className="text-center text-white text-sm font-medium font-['SF Pro Text'] leading-tight">
              Save & Continue
            </div>
          </div>
        </button>
      </form>
    </>
  );
}

export default SecondStep;
