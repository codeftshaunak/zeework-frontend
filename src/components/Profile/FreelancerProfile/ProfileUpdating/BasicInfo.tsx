"use client";

import { Button, useToast } from "@chakra-ui/react";
import QuillToolbar, {
  formats,
  modules,
} from "../../../utils/QuillToolbar/QuillToolbar";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnSpinner from "../../../Skeletons/BtnSpinner";
import { updateFreelancerProfile } from "../../../../helpers/APIs/userApis";
import ErrorMsg from "../../../utils/Error/ErrorMsg";
import { profileData } from "../../../../redux/authSlice/profileSlice";
import { basicInfoSchema } from "../../../../schemas/freelancer-profile-schema";

const BasicInfo = ({ setIsModal }) => {
  const existProfile = useSelector((state: any) => state.profile.profile);
  const { professional_role, hourly_rate, description } = existProfile || {};
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
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
      setValue("hourly_rate", hourly_rate);
      setValue("description", description);
    }
  }, [existProfile, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await updateFreelancerProfile({
        professional_role: data.professional_role,
        hourly_rate: data.hourly_rate,
        description: data.description,
      });
      if (response.code === 405 || response.code === 500) {
        toast({
          title: response.msg,
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setIsModal(false);
      } else if (response.code === 200) {
        toast({
          title: "Basic Info Updated Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        dispatch(profileData({ profile: response.body }));
        setIsModal(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeTrailingEmptyTags = (html) => {
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
          <Button
            isLoading={isLoading}
            loadingText="Updating"
            colorScheme="primary"
            type="submit"
            fontSize={"0.9rem"}
            spinner={<BtnSpinner />}
          >
            Update Info
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfo;
