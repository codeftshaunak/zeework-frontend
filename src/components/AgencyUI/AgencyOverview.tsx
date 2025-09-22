"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import QuillToolbar, {
  formats,
  modules,
} from "../utils/QuillToolbar/QuillToolbar";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-100 rounded border animate-pulse" />
});
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
        <div className="flex flex-row items-center mb-[0.5rem] mt-[1rem]">
          <span className="mb-[0] font-semibold">
            Overview
          </span>
          <div
            className="flex flex-col cursor-pointer rounded w-[20px] border h-[20px] items-center justify-center transition-all duration-300 hover:border-2 hover:border-green-500 hover:bg-transparent hover:text-green-500"
            onClick={() => {
              reset({ agency_overview: overviewValue });
              setIsModal(true);
            }}
          >
            <RiEdit2Fill size={10} />
          </div>
        </div>
        <div className="bg-[#f8f9fa] p-4 rounded">
          <div
            dangerouslySetInnerHTML={{
              __html: overviewValue || "No overview provided",
            }}
          />
        </div>
      </div>

      <UniversalModal
        isOpen={isModal}
        onClose={() => setIsModal(false)}
        title="Update Agency Overview"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agency Overview
            </label>
            <QuillToolbar />
            <Controller
              name="agency_overview"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  theme="snow"
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

          <div className="flex justify-end space-x-2 pt-16">
            <button
              type="button"
              onClick={() => setIsModal(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? <BtnSpinner /> : "Update Overview"}
            </button>
          </div>
        </form>
      </UniversalModal>
    </>
  );
};

export default AgencyOverview;