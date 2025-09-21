"use client";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAgencyAllJobs, userAllJobs } from "../../helpers/APIs/jobApis";
import { getSingleJobDetails } from "../../helpers/APIs/jobApis";
import StarRatings from "react-star-ratings";
import JobDetailsSkeleton from "../Skeletons/JobDetailsSkeleton";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import UniversalModal from "../Modals/UniversalModal";
import { uploadImage } from "../../helpers/APIs/userApis";
import { agencyData, profileData } from "../../redux/authSlice/profileSlice";
import { toast } from "@/lib/toast";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  updateAgencyProfile,
  uploadSingleImage,
} from "../../helpers/APIs/agencyApis";
import { useDropzone } from "react-dropzone";
import getCroppedImg from "../../helpers/manageImages/getCroppedImg";
import { BiImages, BiSolidCrop } from "react-icons/bi";
import { TiArrowBack, TiMinus, TiPlus } from "react-icons/ti";
import Cropper from "react-easy-crop";
import { compressImageToWebP } from "../../helpers/manageImages/imageCompressed";
import Link from "next/link";
import { Slider, Button } from "../ui/migration-helpers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button as ShadButton } from "@/components/ui/button";
import {
  Clock,
  MapPin,
  DollarSign,
  User,
  Shield,
  Copy,
  ChevronRight,
} from "lucide-react";

// Type definitions
interface JobDetailsProps {
  setPage?: (page: number) => void;
  setDetails?: (details: any[]) => void;
  jobId?: string;
}

interface JobDetail {
  _id: string;
  title: string;
  description: string;
  amount: number;
  experience: string;
  created_at: string;
  file: string;
  client_details: ClientDetail[];
  client_history: ClientHistory[];
}

interface ClientDetail {
  location: string;
  active_freelancers: number;
  hired_freelancers: number;
  total_spend: number;
  job_open: number;
  avg_review: number;
  total_hours: number;
  job_posted: number;
  payment_verified: boolean;
  _id: string;
}

interface ClientHistory {
  _id: string;
  title: string;
  amount: number;
  status: string;
}

const JobDetails = ({
  setPage = () => {},
  setDetails = () => {},
}: JobDetailsProps) => {
  const profile = useSelector((state: any) => state.profile);
  const [cookies] = useCookies(["activeagency"]);
  const activeagency = cookies.activeagency;
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState<JobDetail[]>([]);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isProfileImg = activeagency
    ? !!profile.agency.agency_profileImage
    : !!profile.profile.profile_image;
  const [isPopUp, setIsPopUp] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const dispatch = useDispatch();

  // include drag and drop with photo cropping features
  const [fileName, setFileName] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fullImage, setFullImage] = useState<File[] | null>(null);
  const [croppedImage, setCroppedImage] = useState<File[] | null>(null);
  const [isCropped, setIsCropped] = useState(false);

  // upload profile photo of freelancer and agency
  const handleUploadPhoto = async () => {
    if (!fullImage || !fullImage[0]) {
      return setErrorMessage("Please select an image file!");
    }

    setIsImgLoading(true);
    try {
      // upload agency profile
      if (activeagency) {
        const formData = new FormData();
        formData.append(
          "imageFile",
          (isCropped && croppedImage ? croppedImage[0] : fullImage[0]) as File
        );
        const { body: imgBody, code: imgCode } =
          await uploadSingleImage(formData);

        const { code, body } =
          imgCode === 200
            ? await updateAgencyProfile({
                agency_profileImage: imgBody.imageUrl,
              })
            : {};

        if (code === 200) {
          dispatch(agencyData({ agency: body }));
        }
      } else {
        // upload freelancer profile
        const formData = new FormData();
        const compressedImage = await compressImageToWebP(
          isCropped && croppedImage ? croppedImage[0] : fullImage[0],
          0.8,
          800
        );
        formData.append("file", compressedImage);

        const { code, body } = await uploadImage(formData);

        if (code === 200) {
          dispatch(profileData({ profile: body }));
        }
      }
    } catch (error) {
      console.error(error);
    }

    setIsPopUp(false);
    setIsImgLoading(false);
    setImageSrc(null);
    setFileName("");
    setFullImage(null);
    setCroppedImage(null);
    setErrorMessage("");
  };

  const getDetails = async () => {
    setIsLoading(true);
    setJobDetails([]);
    try {
      const { code, body } = await getSingleJobDetails(id as string);
      if (code === 200) {
        setJobDetails(body);
        setDetails(body);
        const { applied_jobs } = activeagency
          ? await getAgencyAllJobs()
          : await userAllJobs();

        setIsAlreadyApplied(
          !!applied_jobs.find((item: any) => item?._id === id)
        );
      }
    } catch (error) {
      console.error("Error fetching job Details:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDetails();
  }, [id]);

  const dateObject = new Date(jobDetails[0]?.created_at);
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - dateObject.getTime();

  const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Construct the string representation
  const formattedTimeElapsed =
    days > 0
      ? `${days} day${days !== 1 ? "s" : ""} ago`
      : hours > 0
        ? `${hours} hour${hours !== 1 ? "s" : ""} ago`
        : `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

  const clientDetails = jobDetails[0]?.client_details[0] || {};
  const {
    location: clientLocation,
    active_freelancers,
    hired_freelancers,
    total_spend,
    job_open,
    avg_review,
    total_hours,
    job_posted,
    payment_verified,
  } = clientDetails;

  const hiredPercentage =
    job_open > 0 ? (hired_freelancers / job_open) * 100 : 0;
  const clientHistory = jobDetails[0]?.client_history || [];

  // handle photo drag 'n' drop with photo cropping
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFullImage(acceptedFiles);
    setFileName(acceptedFiles[0].name);
    setErrorMessage("");

    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: false,
  });

  const onCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCrop = async () => {
    if (!imageSrc) return;

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const file = new File([croppedImage as BlobPart], fileName, {
        type: "image/jpeg",
      });
      setCroppedImage([file]);
      setIsCropped(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRevert = () => {
    setIsCropped(false);
  };

  const handleCopyLink = () => {
    if (jobDetails.length === 0) return;

    const jobUrl = `${window.location.origin}/find-job/${jobDetails[0]._id}`;
    navigator.clipboard.writeText(jobUrl).then(() => {
      toast.success("Link copied to clipboard");
    });
  };

  // throwing job details skeleton
  if (isLoading || !jobDetails?.length) return <JobDetailsSkeleton hideNavigation={true} />;

  return (
    <>
      <div className="w-full mx-auto">
        <div className="flex w-full py-6">
          <div className="w-full px-6">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link
                href="/"
                className="hover:text-green-600 transition-colors duration-200"
              >
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href="/find-job"
                className="hover:text-green-600 transition-colors duration-200"
              >
                Jobs
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium truncate">
                {jobDetails[0]?.title}
              </span>
            </nav>

            {/* Main Job Header Card */}
            <div className="bg-white border border-gray-200/60 rounded-lg p-8 mb-8 shadow-sm">
              <div className="flex justify-between items-start gap-8">
                <div className="flex-1">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight capitalize">
                      {jobDetails[0]?.title}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Posted {formattedTimeElapsed}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900">
                          ${jobDetails[0]?.amount}
                        </div>
                        <div className="text-sm text-gray-500">Budget</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 capitalize">
                          {jobDetails[0]?.experience}
                        </div>
                        <div className="text-sm text-gray-500">
                          Experience level
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {isAlreadyApplied ? (
                    <ShadButton
                      disabled
                      variant="outline"
                      size="lg"
                      className="px-8 py-3 bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed"
                    >
                      Already Applied
                    </ShadButton>
                  ) : (
                    <ShadButton
                      onClick={() => {
                        if (isProfileImg) {
                          setPage(2);
                        } else {
                          setIsPopUp(true);
                        }
                      }}
                      size="lg"
                      className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Apply for this job
                    </ShadButton>
                  )}
                  <ShadButton
                    onClick={handleCopyLink}
                    variant="outline"
                    size="sm"
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy link
                  </ShadButton>
                </div>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2">
                {/* Job Description */}
                <div className="bg-white border border-gray-200/60 rounded-lg mb-8 shadow-sm">
                  <div className="p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Job Description
                    </h2>
                    <div
                      className="prose prose-base max-w-none text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: jobDetails[0]?.description,
                      }}
                    />

                    {jobDetails[0]?.file && (
                      <div className="mt-8 pt-8 border-t border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Attachments
                        </h3>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <Link
                            href={jobDetails[0].file}
                            target="_blank"
                            className="inline-flex items-center gap-3 text-green-600 hover:text-green-700 transition-colors duration-200 font-medium"
                          >
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                />
                              </svg>
                            </div>
                            View Attachment
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Client History */}
                {clientHistory?.length > 0 && (
                  <div className="bg-white border border-gray-200/60 rounded-lg shadow-sm">
                    <div className="p-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Client's Job History
                      </h2>
                      <div className="space-y-4">
                        {clientHistory?.map(
                          ({ _id, title, amount, status }) => (
                            <div
                              key={_id}
                              className="border border-gray-200/60 rounded-lg p-5 hover:bg-gray-50 transition-all duration-200 hover:shadow-sm"
                            >
                              <Link href={`/find-job/${_id}`}>
                                <h4 className="font-semibold text-gray-900 hover:text-green-600 transition-colors duration-200 mb-3">
                                  {title}
                                </h4>
                              </Link>
                              <div className="flex items-center justify-between">
                                <Badge
                                  variant={
                                    status === "open" ? "default" : "secondary"
                                  }
                                  className={`text-xs font-medium ${
                                    status === "open"
                                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  }`}
                                >
                                  {status === "open"
                                    ? "In Progress"
                                    : "Completed"}
                                </Badge>
                                <span className="text-base font-semibold text-gray-900">
                                  ${amount}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Client Info */}
              <div className="space-y-8">
                {/* About the Client */}
                <div className="bg-white border border-gray-200/60 rounded-lg shadow-sm">
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      About the client
                    </h3>

                    {/* Payment Verification */}
                    <div className="flex items-center gap-3 mb-6">
                      {payment_verified ? (
                        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">
                            Payment verified
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                          <Shield className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-600">
                            Payment unverified
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Reviews */}
                    {avg_review > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <StarRatings
                            rating={Number(avg_review)}
                            starDimension="18px"
                            starSpacing="2px"
                            starRatedColor="#22C35E"
                            starEmptyColor="#e5e7eb"
                          />
                          <span className="text-lg font-bold text-gray-900">
                            {avg_review.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {hired_freelancers} reviews
                        </span>
                      </div>
                    )}

                    {/* Location */}
                    {clientLocation && (
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-base font-medium text-gray-900">
                          {clientLocation}
                        </span>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {job_posted}
                          </div>
                          <div className="text-sm text-gray-600">
                            Jobs posted
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {hiredPercentage.toFixed()}%
                          </div>
                          <div className="text-sm text-gray-600">Hire rate</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-gray-900">
                            ${total_spend?.toFixed() || "0"}
                          </div>
                          <div className="text-sm text-gray-600">
                            Total spent
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {hired_freelancers}
                          </div>
                          <div className="text-sm text-gray-600">
                            Total hires
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {active_freelancers}
                          </div>
                          <div className="text-sm text-gray-600">Active</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {total_hours}
                          </div>
                          <div className="text-sm text-gray-600">Hours</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share Job */}
                <div className="bg-white border border-gray-200/60 rounded-lg shadow-sm">
                  <div className="p-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Job link
                    </h4>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-gray-600 break-all mb-4">
                      {typeof window !== "undefined"
                        ? window.location.origin
                        : ""}
                      /find-job/{jobDetails[0]._id}
                    </div>
                    <ShadButton
                      onClick={handleCopyLink}
                      variant="outline"
                      size="sm"
                      className="w-full text-green-600 border-green-200 hover:bg-green-50 transition-all duration-200"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy link
                    </ShadButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPopUp && (
        <UniversalModal isModal={isPopUp} setIsModal={setIsPopUp}>
          <div className="grid justify-center gap-6">
            <div className="text-gray-700 text-2xl font-medium font-['SF Pro Text'] leading-loose text-center mb-5">
              Upload your profile image before proceeding!
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col">
                <div className="flex flex-col gap-[2px]">
                  {!imageSrc && (
                    <div
                      {...getRootProps()}
                      className={`w-[100%] ${
                        fileName ? "py-5" : "py-8"
                      } px-3 outline-none border-2 rounded-md border-dashed border-primary cursor-pointer bg-green-100 font-medium tracking-wide`}
                    >
                      {!fileName && (
                        <RiUploadCloud2Fill className="mx-auto text-6xl text-green-300" />
                      )}
                      <input
                        {...getInputProps()}
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)]"
                        placeholder="Select an image"
                      />

                      {isDragActive ? (
                        <p className="text-center">Drop the files here ... </p>
                      ) : (
                        <p className="text-center">
                          Drag &apos;n&apos; drop image file here, or click to
                          select file
                        </p>
                      )}
                    </div>
                  )}
                  {fileName && (
                    <p className="mt-2 -mb-4 text-center text-green-600">
                      {fileName}
                    </p>
                  )}
                  {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  )}
                </div>
              </div>
              {imageSrc && (
                <>
                  <div className="relative w-full h-64">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      showGrid={false}
                      onCropChange={isCropped ? () => {} : setCrop}
                      onZoomChange={isCropped ? () => {} : setZoom}
                      onCropComplete={onCropComplete}
                      cropShape="round"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center w-full gap-1 sm:w-96">
                      <TiMinus />
                      <Slider
                        value={[zoom]}
                        min={1}
                        max={3}
                        step={0.1}
                        onValueChange={(val) => {
                          !isCropped && setZoom(val[0]);
                        }}
                        className="w-full"
                      />
                      <TiPlus />
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-x-5">
                      <button
                        type="button"
                        disabled={isCropped}
                        className={`flex items-center gap-1 ${
                          isCropped
                            ? "cursor-no-drop bg-slate-400"
                            : "bg-slate-500"
                        } rounded py-1 px-3 text-white w-fit mt-2`}
                        onClick={() => {
                          const fileInput = document.getElementById(
                            "file-input"
                          ) as HTMLInputElement;
                          fileInput?.click();
                        }}
                      >
                        <BiImages /> Changed File
                      </button>
                      <input
                        id="file-input"
                        type="file"
                        {...getInputProps()}
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFileName(file.name);
                            setFullImage([file]);
                            setErrorMessage("");
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                              setImageSrc(reader.result as string);
                            };
                          }
                        }}
                      />
                      <div className="flex items-center justify-center gap-5">
                        <button
                          type="button"
                          className={`flex items-center gap-1 ${
                            isCropped
                              ? "cursor-no-drop bg-slate-400"
                              : "bg-slate-500"
                          } rounded py-1 px-3 text-white w-fit mt-2`}
                          onClick={handleCrop}
                          disabled={isCropped}
                        >
                          {isCropped ? (
                            <>
                              <IoMdCheckmarkCircleOutline /> Cropped
                            </>
                          ) : (
                            <>
                              <BiSolidCrop /> Crop photo
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          className={`flex items-center gap-1 ${
                            !isCropped
                              ? "cursor-no-drop bg-slate-400"
                              : "bg-slate-500"
                          } rounded py-1 px-3 text-white w-fit mt-2`}
                          onClick={handleRevert}
                          disabled={!isCropped}
                        >
                          <TiArrowBack /> Revert
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {imageSrc && (
              <div className="mt-10 text-right">
                <Button
                  isLoading={isImgLoading}
                  onClick={() => handleUploadPhoto()}
                  className="px-7"
                >
                  {isImgLoading ? <BtnSpinner /> : "Upload"}
                </Button>
              </div>
            )}
          </div>
        </UniversalModal>
      )}
    </>
  );
};

export default JobDetails;
