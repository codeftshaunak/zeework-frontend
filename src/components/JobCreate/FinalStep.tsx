import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormState } from "../../contexts/FormContext";
import { thirdStepSchema } from "../../schemas/job-create-schema";
import { Button } from "@chakra-ui/react";
import BtnSpinner from "../Skeletons/BtnSpinner";
import ErrorMsg from "../utils/Error/ErrorMsg";

const options = [
  {
    key: "3 to 6 Months",
    title: "3 to 6 Months",
  },
  {
    key: "1 to 3 Months",
    title: "1 to 3 Months",
  },
  {
    key: "Less than 1 Month",
    title: "Less than 1 Month",
  },
];

function FinalStep({ onCallback = () => {}, isLoading, defaultValues }) {
  const { insertToFormState, formState } = useFormState();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(thirdStepSchema),
    defaultValues: {
      durations: defaultValues?.durations || "Less than 1 Month",
    },
  });

  // if there any values in form state context then push this to the form
  useEffect(() => {
    if (formState) {
      const values = {};
      values.durations =
        formState?.durations || defaultValues?.durations || "Less than 1 Month";
      reset(values);
    }
  }, [formState]);

  // on form submit assign values to the context and call the callback
  const onSubmit = (v) => {
    const value = insertToFormState(v);
    onCallback(value);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-[530px] h-[716px] flex-col justify-start items-start gap-9 inline-flex"
      >
        <div>
          <div className="w-max-[440px] text-black text-3xl font-medium font-['SF Pro Text'] leading-9">
            How long will our work take?
          </div>
          <div className="w-max-[530px] mt-2 text-gray-700 text-sm font-normal font-['SF Pro Text'] leading-tight">
            This won`t restrict any proposals, but helps match expertise to your
            budget.
          </div>
          {errors?.durations && <ErrorMsg msg={errors.durations.message} />}
        </div>

        {options.map((option, index) => (
          <div
            key={index}
            className="flex p-[1.12rem] items-center border border-outline-primary w-full md:w-[446px] rounded-xl active-checkbox cursor-pointer bg-white"
            onClick={() => {
              const radioValue = option.key;
              reset({ durations: radioValue });
            }}
          >
            <input
              id={option.key}
              type="radio"
              value={option.key}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
              {...register("durations")}
            />
            <label htmlFor="default-radio-1" className="ml-4">
              <div className="w-[375px] text-stone-900 text-lg font-semibold font-['SF Pro Text'] leading-7 cursor-pointer">
                {option.title}
              </div>
            </label>
          </div>
        ))}

        <div className="w-[136px] h-9 flex-col justify-start items-start gap-2.5 inline-flex">
          {/* <div className="self-stretch h-9 px-3 py-2 bg-green-500 rounded-md shadow justify-center items-center gap-1 inline-flex">
            <div className="text-center text-white text-sm font-medium font-['SF Pro Text'] leading-tight">
              Save & Continue
            </div>
          </div> */}
          <Button
            isLoading={isLoading}
            loadingText="Posting"
            colorScheme="primary"
            type="submit"
            spinner={<BtnSpinner />}
            paddingX={5}
          >
            Post Job
          </Button>
        </div>
      </form>
    </>
  );
}

export default FinalStep;
