"use client";

import {
  Box,
  Button,
  FormErrorMessage,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
  let div = document.createElement("div");
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
  const toast = useToast();
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
      jobData.agency_id = profile.agency._id;
    }

    try {
      const response = await applyJob(jobData);
      handleSubmissionResponse(response);
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred while applying",
        position: "top",
        status: "error",
        isClosable: true,
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmissionResponse = (response) => {
    const isSuccess = response?.code === 200;
    const toastMessage = isSuccess ? "Job Applied Successfully" : response?.msg;

    toast({
      title: toastMessage,
      position: "top",
      status: isSuccess ? "success" : "error",
      isClosable: true,
      duration: 2000,
    });

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
    <Box w="100%" pt={2} pb={6}>
      {/* Breadcrumb */}
      <Box className="flex gap-2 py-6">
        <img src="/icons/home.svg" alt="home" />
        <img src="/icons/chevron-right.svg" alt="arrow right" />
        <Box className="cursor-pointer" onClick={() => setPage(1)}>
          {details_new?.title}
        </Box>
        <img src="/icons/chevron-right.svg" alt="arrow right" />
        <Box>Submit Proposal</Box>
      </Box>

      <Box className="w-full flex justify-between pb-4 max-lg:flex-col max-lg:gap-4">
        <Box
          w="100%"
          className="lg:!flex-col-reverse lg:flex lg:justify-end lg:gap-4"
        >
          {/* Job Details */}
          <Box className="w-full lg:w-[96%] border border-tertiary rounded-2xl p-5 sm:p-10 bg-white h-max mb-4">
            <Box fontWeight="semibold" marginBottom="1" className="text-xl">
              Job Details
            </Box>
            <br />
            <Box
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
          </Box>

          {/* Proposal Type Selection */}
          {hasAgency && (
            <Box className="w-full lg:w-[96%] border border-tertiary rounded-2xl p-5 sm:p-10 bg-white">
              <Box fontWeight="semibold" marginBottom="6" className="text-xl">
                Proposal Type
              </Box>
              <Box fontWeight="semibold">
                Do you want to submit the proposal as a freelancer or as an
                agency member?
              </Box>
              <Controller
                name="applicantType"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} marginTop="4">
                    <Stack>
                      <Radio size="lg" value="freelancer" colorScheme="green">
                        As a freelancer
                      </Radio>
                      <Radio
                        size="lg"
                        value="agency_member"
                        colorScheme="green"
                      >
                        As an agency member
                      </Radio>
                    </Stack>
                  </RadioGroup>
                )}
              />
              {errors.applicantType && (
                <ErrorMsg msg={errors.applicantType.message} />
              )}
            </Box>
          )}
        </Box>

        {/* Form Section */}
        <Box w="70%" className="max-lg:!w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box w="full">
              {/* Fixed Job Form */}
              {isFixedJob && (
                <Box className="w-full">
                  {/* Budget Type Selection */}
                  <Box className="border border-tertiary rounded-2xl p-10 mb-4 bg-white">
                    <Box fontWeight="semibold" mb={2}>
                      Select Budget Type
                    </Box>
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
                  </Box>

                  {/* Bid Details Section */}
                  <Box className="border border-tertiary rounded-2xl p-10 mb-4 bg-white">
                    <Box
                      fontWeight="semibold"
                      mb={2}
                      textTransform="capitalize"
                      fontSize="xl"
                    >
                      Write Your Fee For The Contract
                    </Box>
                    <p className="mb-2">
                      Client Budget: ${details_new?.amount}
                    </p>

                    <Controller
                      name="desiredPrice"
                      control={control}
                      render={({ field }) => (
                        <Box isInvalid={errors.desiredPrice}>
                          <Input
                            {...field}
                            type="number"
                            placeholder="$100.00"
                            className="rounded-md border border-tertiary p-1 w-full"
                          />
                          <FormErrorMessage>
                            {errors.desiredPrice?.message}
                          </FormErrorMessage>
                        </Box>
                      )}
                    />

                    <HStack margin="5px 0" justify="space-between">
                      <Box marginTop="8px">5% Freelancer Service Fee</Box>
                      <Box>
                        $
                        {desiredPrice
                          ? (desiredPrice * 0.05).toFixed(2)
                          : "0.00"}
                      </Box>
                    </HStack>

                    <HStack marginBottom="5px" justify="space-between">
                      <Box fontWeight="semibold">You&apos;ll receive</Box>
                      <Box fontWeight="semibold">
                        ${calculateServiceFee().toFixed(2)}
                      </Box>
                    </HStack>
                  </Box>
                </Box>
              )}

              {/* Hourly Job Form */}
              {isHourlyJob && (
                <Box className="border border-tertiary rounded-2xl p-5 sm:p-10 mb-4 bg-white">
                  <Box fontWeight="semibold" mb={5} fontSize="xl">
                    Select Proposal Rate
                  </Box>
                  <HStack justifyContent="space-between" fontSize="0.9rem">
                    <Box>Your Profile Rate: ${hourly_rate}/hr</Box>
                    <Box>Client Budget: ${details_new?.amount}/hr</Box>
                  </HStack>

                  <Box my={4}>What is your hourly rate for this job?</Box>
                  <Controller
                    name="hourlyRate"
                    control={control}
                    render={({ field }) => (
                      <Box isInvalid={errors.hourlyRate}>
                        <Input
                          {...field}
                          type="number"
                          className="rounded-md border border-tertiary p-1 w-full"
                        />
                        <FormErrorMessage>
                          {errors.hourlyRate?.message}
                        </FormErrorMessage>
                      </Box>
                    )}
                  />

                  <HStack justify="space-between" mt={4}>
                    <Box fontWeight="semibold">5% Freelancer Service Fee</Box>
                    <Box fontWeight="semibold">
                      ${hourlyRate ? (hourlyRate * 0.05).toFixed(2) : "0.00"}
                    </Box>
                  </HStack>

                  <HStack justify="space-between" mt={4}>
                    <Box fontWeight="semibold">You&apos;ll Receive</Box>
                    <Box fontWeight="semibold">
                      ${calculateServiceFee().toFixed(2)}
                    </Box>
                  </HStack>
                </Box>
              )}

              {/* Additional Details Section */}
              <Box className="border border-tertiary rounded-2xl max-sm:px-2 p-10 bg-white">
                <Box fontWeight="semibold" fontSize="xl" mb={2}>
                  Additional Details
                </Box>
                <Box marginBottom="10px">Cover Letter</Box>
                <Box width="full">
                  <QuillToolbar />
                  <Controller
                    name="coverLetter"
                    control={control}
                    render={({ field }) => (
                      <Box isInvalid={errors.coverLetter}>
                        <ReactQuill
                          theme="snow"
                          value={field.value}
                          onChange={(value) => {
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
                      </Box>
                    )}
                  />
                </Box>

                <Box textAlign="right" color="gray.300" mt={4}>
                  ({coverLetterLength}/500)
                </Box>

                {/* File Upload Section */}
                <Box fontWeight="semibold" mb={8}>
                  Attachment
                </Box>
                <Box className="max-w-xl">
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
                </Box>

                {/* Submit Button */}
                <Button
                  isLoading={isLoading}
                  loadingText="Apply"
                  colorScheme="primary"
                  type="submit"
                  spinner={<BtnSpinner />}
                  marginTop={10}
                  rounded="full"
                  paddingBottom="3px"
                  paddingX="40px"
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default JobApply;
