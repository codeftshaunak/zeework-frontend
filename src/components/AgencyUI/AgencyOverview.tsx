"use client";

import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import QuillToolbar, {
  formats,
  modules,
} from "../utils/QuillToolbar/QuillToolbar";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateAgencyProfile } from "../../helpers/APIs/agencyApis";
import UniversalModal from "../Modals/UniversalModal";

import BtnSpinner from "../Skeletons/BtnSpinner";
import { RiEdit2Fill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import ErrorMsg from "../utils/Error/ErrorMsg";
import { overviewSchema } from "../../schemas/agency-profile-schema";

const AgencyOverview = ({ overview: overviewValue, setAgency }) => {
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(overviewSchema),
    defaultValues: { agency_overview: overviewValue },
  });

  useEffect(() => {
    reset({ agency_overview: overviewValue });
  }, [overviewValue, reset]);

  // handle update info
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { body, code } = await updateAgencyProfile(data);

      if (code === 200) setAgency(body);
    } catch (error) {
      console.log(error);
    }
    setIsModal(false);
    setIsLoading(false);
    reset();
  };

  const removeTrailingEmptyTags = (html) => {
    console.log("Original HTML:", html);
    const cleanedHtml = html.replace(/(<p>\s*<br\s*\/?>\s*<\/p>\s*)+$/, "");
    console.log("Cleaned HTML:", cleanedHtml);
    return cleanedHtml;
  };

  return (
    <>
      <div>
        <div className="flex flex-row items-center className="mb-[0.5rem] mt-[1rem]">
          <span}
           className="mb-[0] font-semibold">
            Overview
          </span>
          <div className="className= flex flex-col backgroundColor= cursor-pointer"rounded w-[20px] border h-[20px] items-center justify-center"
            transition="0.6s ease-in-out"
            _hover={{
              border: "2px solid var(--primarycolor)",
              backgroundColor: "transparent",
              color: "var(--primarycolor)",
            }}
            onClick={() => {
              reset({ agency_overview: overviewValue });
              setIsModal(true);
            }}
          >
            {overviewValue ? <RiEdit2Fill /> : <FiPlus />}
          </div>
        </div>
        {overviewValue && (
          <article >
            <div dangerouslySetInnerHTML={{ __html: overviewValue }} />
          </article>
        )}
      </div>

      {/* update overview */}
      {isModal && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={`Update Profile Overview`}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div >
              <QuillToolbar />
              <Controller
                name="agency_overview"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={(content) => {
                      const cleanedContent = removeTrailingEmptyTags(content);
                      field.onChange(cleanedContent);
                    }}
                    className="h-64 [&>*]:rounded-b-md"
                    modules={modules}
                    formats={formats}
                  />
                )}
              />
              {errors.agency_overview && (
                <ErrorMsg msg={errors.agency_overview.message} />
              )}
            </div>
            <div className="text-right mt-10">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                isLoading={isLoading}
                loadingText="Submit"
                type="submit"
                spinner={<BtnSpinner />}
              >
                Submit
              </button>
            </div>
          </form>
        </UniversalModal>
      )}
    </>
  );
};

export default AgencyOverview;
