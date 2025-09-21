"use client";

import { toast } from "@/lib/toast";
import dynamic from "next/dynamic";
import QuillToolbar, {
  formats,
  modules,
} from "../../../utils/QuillToolbar/QuillToolbar";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-100 rounded border animate-pulse" />
});
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnSpinner from "../../../Skeletons/BtnSpinner";
import { updateFreelancerProfile } from "../../../../helpers/APIs/userApis";
import ErrorMsg from "../../../utils/Error/ErrorMsg";
import { profileData } from "../../../../redux/authSlice/profileSlice";
import { basicInfoSchema } from "../../../../schemas/freelancer-profile-schema";

// TypeScript interfaces
interface BasicInfoProps {
  setIsModal: (isOpen: boolean) => void;
}

interface ProfileState {
  professional_role: string;
  hourly_rate: number;
  description: string;
}

interface RootState {
  profile: {
    profile: ProfileState;
  };
}

interface FormData {
  professional_role: string;
  hourly_rate: string;
  description: string;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ setIsModal }) => {
  const existProfile = useSelector((state: RootState) => state.profile.profile);
  const { professional_role, hourly_rate, description } = existProfile || {};
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(basicInfoSchema),
    defaultValues: {
      professional_role: professional_role || "",
      hourly_rate: hourly_rate || "",
      description: description || "",
    },
  });

  useEffect(() => {
    if (existProfile) {
      setValue("professional_role", professional_role);
      setValue("hourly_rate", Number(hourly_rate) || 0);
      setValue("description", description);
    }
  }, [existProfile, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await updateFreelancerProfile({
        professional_role: data.professional_role,
        hourly_rate: data.hourly_rate,
        description: data.description,
      });
      if (response.code === 405 || response.code === 500) {
        toast.warning(response.msg);
        setIsModal(false);
      } else if (response.code === 200) {
        toast.success("Basic Info Updated Successfully");
        dispatch(profileData({ profile: response.body }));
        setIsModal(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeTrailingEmptyTags = (html: string) => {
    const cleanedHtml = html.replace(
      /(<p(?: class="ql-align-justify")?\s*>\s*<br\s*\/?>\s*<\/p>\s*)+$/,
      ""
    );
    return cleanedHtml;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[2px]">
              <p className="text-[14px] font-[500] text-[#374151]">Title</p>
              <div>
                <input
                  type="text"
                  className="w-full py-1.5 px-2 outline-none text-[14px] text-[#000] font-[400] border border-[var(--bordersecondary)] rounded-md"
                  placeholder="Professional Role"
                  {...register("professional_role")}
                />
                {errors.professional_role && (
                  <ErrorMsg msg={errors.professional_role.message} />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-[14px] font-[500] text-[#374151]">Hourly</p>
              <div>
                <input
                  type="number"
                  className="w-full py-1.5 px-2 outline-none text-[14px] text-[#000] font-[400] border border-[var(--bordersecondary)] rounded-md"
                  placeholder="Hourly Rate"
                  {...register("hourly_rate")}
                />
                {errors.hourly_rate && (
                  <ErrorMsg msg={errors.hourly_rate.message} />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-[14px] font-[500] text-[#374151]">
                Description
              </p>
              <div className="w-[100%]">
                <QuillToolbar />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      onChange={(content) => {
                        const cleanedContent = removeTrailingEmptyTags(content);
                        field.onChange(cleanedContent);
                      }}
                      theme="snow"
                      className="h-36 [&>*]:rounded-b-md"
                      modules={modules}
                      formats={formats}
                    />
                  )}
                />
                {errors.description && (
                  <ErrorMsg msg={errors.description.message} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pt-5 w-full">
          <button
            disabled={isLoading}
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <BtnSpinner />
                <span className="ml-2">Updating</span>
              </>
            ) : (
              "Update Info"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfo;
