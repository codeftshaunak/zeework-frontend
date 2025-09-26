"use client";

import {
  Box,
  Button,
  FormErrorMessage,
  HStack,
  Input,
  RadioGroup,
  Select,
  Stack,
} from "@/components/ui/migration-helpers";
import { toast } from "@/lib/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import {
  FaFile,
  FaFileArchive,
  FaFileExcel,
  FaFileImage,
  FaFilePowerpoint,
  FaFileVideo,
  FaRegFilePdf,
  FaRegFileWord,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues.
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-100 rounded border animate-pulse" />
});
import { useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import * as Yup from "yup";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { applyJob } from "../../helpers/APIs/jobApis";
import BtnSpinner from "../Skeletons/BtnSpinner";
import ErrorMsg from "../utils/Error/ErrorMsg";
import QuillToolbar, {
  formats,
  modules,
} from "../utils/QuillToolbar/QuillToolbar";

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

// Validation schemas
const fixedJobSchema = Yup.object().shape({
  desiredPrice: Yup.number()
    .required("Fee amount is required")
    .min(1, "Fee amount must be greater than 0")
    .typeError("Fee amount must be a valid number"),
  budgetType: Yup.string()
    .required("Budget type is required")
    .oneOf(["project", "milestone"], "Please select a valid budget type"),
  coverLetter: Yup.string()
    .required("Cover Letter is required")
    .test(
      "not-empty",
      "Cover Letter cannot be empty",
      (value) => stripHtml(value).length > 0
    )
    .test(
      "len",
      "Cover Letter cannot exceed 500 characters",
      (value) => stripHtml(value).length <= 500
    ),
  applicantType: Yup.string()
    .required("Applicant type is required")
    .oneOf(
      ["freelancer", "agency_member"],
      "Please select a valid applicant type"
    ),
});

const hourlyJobSchema = Yup.object().shape({
  hourlyRate: Yup.number()
    .required("Hourly rate is required")
    .min(1, "Hourly rate must be greater than 0")
    .typeError("Hourly rate must be a valid number"),
  coverLetter: Yup.string()
    .required("Cover Letter is required")
    .test(
      "not-empty",
      "Cover Letter cannot be empty",
      (value) => stripHtml(value).length > 0
    )
    .test(
      "len",
      "Cover Letter cannot exceed 500 characters",
      (value) => stripHtml(value).length <= 500
    ),
  applicantType: Yup.string()
    .required("Applicant type is required")
    .oneOf(
      ["freelancer", "agency_member"],
      "Please select a valid applicant type"
    ),
});

const JobApply = ({ setPage, details }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const details_new = details[0];
  const profile = useSelector((state: any) => state?.profile);
  const { hasAgency } = useContext(CurrentUserContext);
  const { hourly_rate } = profile.profile || [];
  const [cookies] = useCookies(["activeagency"]);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  // Determine if it's a fixed or hourly job
  const isFixedJob = details_new?.job_type === "fixed";
  const isHourlyJob = details_new?.job_type === "hourly";

  // Form setup with conditional schema
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(isFixedJob ? fixedJobSchema : hourlyJobSchema),
    defaultValues: {
      applicantType: cookies.activeagency ? "agency_member" : "freelancer",
      budgetType: "project",
      desiredPrice: isFixedJob ? details_new?.amount : undefined,
      hourlyRate: isHourlyJob
        ? cookies.activeagency
          ? profile?.agency?.agency_hourlyRate
          : profile?.profile?.hourly_rate
        : undefined,
      coverLetter: "",
    },
  });

  // Watch form values
  const watchedValues = watch();
  const { applicantType, budgetType, desiredPrice, hourlyRate, coverLetter } =
    watchedValues;

  // Calculate service fee
  const calculateServiceFee = () => {
    const amount = isFixedJob ? desiredPrice : hourlyRate;
    if (!amount) return 0;
    return amount - amount * 0.05;
  };

  // Update hourly rate when applicant type changes
  useEffect(() => {
    if (isHourlyJob) {
      const newRate =
        applicantType === "freelancer"
          ? profile?.profile?.hourly_rate
          : profile?.agency?.agency_hourlyRate;
      setValue("hourlyRate", newRate);
    }
  }, [applicantType, isHourlyJob, setValue, profile]);

  // Form submission handler
  const onSubmit = async (data) => {
    setIsLoading(true);

    const jobData = {
      job_id: id,
      desired_price: isFixedJob ? data.desiredPrice : data.hourlyRate,
      job_type: isFixedJob ? data.budgetType : "hourly",
      cover_letter: data.coverLetter,
      file: selectedFile,
      applied_by: data.applicantType,
    };

    // Add agency_id if applicant is agency member
    if (data.applicantType === "agency_member") {
      (jobData as any).agency_id = (profile as any).agency._id;
    }

    try {
      const response = await applyJob(jobData);
      handleSubmissionResponse(response);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while applying");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmissionResponse = (response) => {
    const isSuccess = response?.code === 200;
    const toastMessage = isSuccess ? "Job Applied Successfully" : response?.msg;

    toast.default(toastMessage);

    if (isSuccess) {
      router.push("/find-job");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // File type icon helper
  const getFileTypeIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "svg":
        return <FaFileImage />;
      case "mp4":
      case "avi":
      case "mov":
      case "mkv":
        return <FaFileVideo />;
      case "pdf":
        return <FaRegFilePdf />;
      case "zip":
        return <FaFileArchive />;
      case "doc":
      case "docx":
        return <FaRegFileWord />;
      case "xls":
      case "xlsx":
        return <FaFileExcel />;
      case "ppt":
      case "pptx":
        return <FaFilePowerpoint />;
      default:
        return <FaFile />;
    }
  };

  const fileIcon = selectedFile ? getFileTypeIcon(selectedFile.name) : null;
  const coverLetterLength = stripHtml(coverLetter || "").length;

  const removeTrailingEmptyTags = (html) => {
    return html.replace(
      /(<p(?: class="ql-align-justify")?\s*>\s*<br\s*\/?>\s*<\/p>\s*)+$/,
      ""
    );
  };

  return (
    <div pt={2} pb={6} className="w-full">
      {/* Breadcrumb */}
      <div className="flex gap-2 py-6">
        <img src="/icons/home.svg" alt="home" />
        <img src="/icons/chevron-right.svg" alt="arrow right" />
        <div className="cursor-pointer" onClick={() => setPage(1)}>
          {details_new?.title}
        </div>
        <img src="/icons/chevron-right.svg" alt="arrow right" />
        <div>Submit Proposal</div>
      </div>

      <div className="w-full flex justify-between pb-4 max-lg:flex-col max-lg:gap-4">
        <div
         className="lg:!flex-col-reverse lg:flex lg:justify-end lg:gap-4 w-full">
          {/* Job Details */}
          <div className="w-full lg:w-[96%] border border-tertiary rounded-2xl p-5 sm:p-10 bg-white h-max mb-4">
            <div className="text-xl">
              Job Details
            </div>
            <br />
            <div
              className={
                showJobDetails
                  ? "capitalize line-clamp-none"
                  : "capitalize line-clamp-4"
              }
              dangerouslySetInnerHTML={{ __html: details_new?.description }}
            />
            <button
              className={
                details_new?.description?.length >= 350
                  ? "mt-4 text-[#16833E] underline"
                  : "hidden"
              }
              onClick={() => setShowJobDetails(!showJobDetails)}
            >
              {showJobDetails ? "less" : "more"}
            </button>
          </div>

          {/* Proposal Type Selection */}
          {hasAgency && (
            <div className="w-full lg:w-[96%] border border-tertiary rounded-2xl p-5 sm:p-10 bg-white">
              <div className="text-xl">
                Proposal Type
              </div>
              <div>
                Do you want to submit the proposal as a freelancer or as an
                agency member?
              </div>
              <Controller
                name="applicantType"
                control={control}
                render={({ field }) => (
                  <RadioGroup.Root {...field} marginTop="4">
                    <div className="flex"><RadioGroup.Item value="freelancer">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>As a freelancer</RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="agency_member">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>As an agency member</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    </div>
                  </RadioGroup.Root>
                )}
              />
              {errors.applicantType && (
                <ErrorMsg msg={errors.applicantType.message} />
              )}
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="max-lg:!w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              {/* Fixed Job Form */}
              {isFixedJob && (
                <div className="w-full">
                  {/* Budget Type Selection */}
                  <div className="border border-tertiary rounded-2xl p-10 mb-4 bg-white">
                    <div>
                      Select Budget Type
                    </div>
                    <Controller
                      name="budgetType"
                      control={control}
                      render={({ field }) => (
                        <Select {...field}>
                          <option value="project">Project</option>
                          <option value="milestone">Milestone</option>
                        </Select>
                      )}
                    />
                    {errors.budgetType && (
                      <ErrorMsg msg={errors.budgetType.message} />
                    )}
                  </div>

                  {/* Bid Details Section */}
                  <div className="border border-tertiary rounded-2xl p-10 mb-4 bg-white">
                    <div
                     
                     
                    >
                      Write Your Fee For The Contract
                    </div>
                    <p className="mb-2">
                      Client Budget: ${details_new?.amount}
                    </p>

                    <Controller
                      name="desiredPrice"
                      control={control}
                      render={({ field }) => (
                        <div isInvalid={errors.desiredPrice}>
                          <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm rounded-md border border-tertiary p-1 w-full"
                            {...field}
                            type="number"
                            placeholder="$100.00"
                           
                          />
                          <FormErrorMessage>
                            {errors.desiredPrice?.message}
                          </FormErrorMessage>
                        </div>
                      )}
                    />

                    <div className="flex flex-row items-center justify-between">
                      <div>5% Freelancer Service Fee</div>
                      <div>
                        $
                        {desiredPrice
                          ? (desiredPrice * 0.05).toFixed(2)
                          : "0.00"}
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-between">
                      <div>You&apos;ll receive</div>
                      <div>
                        ${calculateServiceFee().toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Hourly Job Form */}
              {isHourlyJob && (
                <div className="border border-tertiary rounded-2xl p-5 sm:p-10 mb-4 bg-white">
                  <div>
                    Select Proposal Rate
                  </div>
                  <div className="flex flex-row items-center">
                    <div>Your Profile Rate: ${hourly_rate}/hr</div>
                    <div>Client Budget: ${details_new?.amount}/hr</div>
                  </div>
                  <div>What is your hourly rate for this job?</div>
                  <Controller name="hourlyRate"
                    control={control}
                    render={({ field }) => (
                      <div isInvalid={errors.hourlyRate}>
                        <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm rounded-md border border-tertiary p-1 w-full"
                          {...field}
                          type="number"
                         
                        />
                        <FormErrorMessage>
                          {errors.hourlyRate?.message}
                        </FormErrorMessage>
                      </div>
                    )}
                  />

                  <div className="flex flex-row items-center justify-between">
                    <div>5% Freelancer Service Fee</div>
                    <div>
                      ${hourlyRate ? (hourlyRate * 0.05).toFixed(2) : "0.00"}
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <div>You&apos;ll Receive</div>
                    <div>
                      ${calculateServiceFee().toFixed(2)}
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Details Section */}
              <div className="border border-tertiary rounded-2xl max-sm:px-2 p-10 bg-white">
                <div>
                  Additional Details
                </div>
                <div>Cover Letter</div>
                <div>
                  <QuillToolbar />
                  <Controller
                    name="coverLetter"
                    control={control}
                    render={({ field }) => (
                      <div isInvalid={errors.coverLetter}>
                        <ReactQuill
                          theme="snow"
                          value={field.value}
                          onChange={(value: any) => {
                            const cleanedValue = removeTrailingEmptyTags(value);
                            field.onChange(cleanedValue);
                            trigger("coverLetter");
                          }}
                          className="h-64 [&>*]:rounded-b-md"
                          modules={modules}
                          formats={formats}
                        />
                        <FormErrorMessage>
                          {errors.coverLetter?.message}
                        </FormErrorMessage>
                      </div>
                    )}
                  />
                </div>

                <div>
                  ({coverLetterLength}/500)
                </div>

                {/* File Upload Section */}
                <div>
                  Attachment
                </div>
                <div className="max-w-xl">
                  {selectedFile ? (
                    <div className="bg-white w-full py-4 px-3 rounded-lg shadow relative">
                      <div className="flex items-center justify-start gap-3">
                        <div className="text-5xl text-green-300">
                          {fileIcon}
                        </div>
                        <p>{selectedFile?.name}</p>
                      </div>
                      <span
                        className="h-7 w-7 bg-red-100/20 rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
                        onClick={() => setSelectedFile(null)}
                      >
                        <IoMdClose className="text-2xl" />
                      </span>
                    </div>
                  ) : (
                    <label className="flex justify-center w-full h-20 px-4 transition bg-green-200 border-2 border-green-600 border-dashed rounded-md appearance-none cursor-pointer">
                      <span className="flex items-center space-x-2">
                        <span>
                          Drag or&nbsp;
                          <span className="text-green-600 underline">
                            upload
                          </span>
                          &nbsp;project files
                        </span>
                      </span>
                      <input
                        type="file"
                        name="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>

                {/* Submit Button */}
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  
                  loadingText="Apply"
                  type="submit"
                  spinner={<BtnSpinner />}
                  marginTop={10}
                  paddingBottom="3px"
                  paddingX="40px"
                >
                  Apply
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApply;
