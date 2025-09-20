"use client";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAgencyAllJobs, userAllJobs } from "../../helpers/APIs/jobApis";
import { getSingleJobDetails } from "../../helpers/APIs/jobApis";
import StarRatings from "react-star-ratings";
import JobDetailsSkeleton from "../Skeletons/JobDetailsSkeleton";
import { RiUploadCloud2Fill, RiVerifiedBadgeFill } from "react-icons/ri";
import { LuBadgeX } from "react-icons/lu";
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
import { TiArrowBack, TiMinus, TiPlus, TiZoom } from "react-icons/ti";
import Cropper from "react-easy-crop";
import { compressImageToWebP } from "../../helpers/manageImages/imageCompressed";
import Link from "next/link";
import { Slider, Button } from "../ui/migration-helpers";
// import { Slider } from "@/components/ui/slider";

// Type definitions
interface JobDetailsProps {
  setPage?: (page: number) => void;
  setDetails?: (details: any[]) => void;
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
          isCropped && croppedImage ? croppedImage[0] : fullImage[0]
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
          isCropped && croppedImage ? croppedImage[0] : fullImage[0]
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
  const lastHistory =
    clientHistory.length > 0 ? clientHistory[clientHistory.length - 1] : null;

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
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCrop = async () => {
    if (!imageSrc) return;

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const file = new File([croppedImage], fileName, { type: "image/jpeg" });
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
  if (isLoading || !jobDetails?.length) return <JobDetailsSkeleton />;

  return (
    <>
      <div className="w-full">
        <div className="w-full py-2">
          <div className="flex items-center gap-2 py-6">
            <Link href="/">
              <img src="/icons/home.svg" alt="home" className="w-5 h-5" />
            </Link>
            <img
              src="/icons/chevron-right.svg"
              alt="arrow right"
              className="w-4 h-4"
            />
            <div className="capitalize">{jobDetails[0]?.title}</div>
          </div>
          <div className="w-full p-6 mb-4 bg-white border border-tertiary rounded-2xl">
            <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-2">
              <div className="flex flex-col gap-2 max-[570px]:flex-col max-sm:flex-row max-sm:items-center">
                <div className="flex max-[380px]:flex-col max-[380px]:items-center max-xl:flex-col">
                  <div className="font-semibold min-[380px]:mr-2 capitalize text-[20px]">
                    {jobDetails[0]?.title}{" "}
                  </div>
                  <div className="flex items-center mt-1 text-gray-300 max-sm:mt-0">
                    {formattedTimeElapsed}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex gap-2">
                    <img src="/icons/receipt.svg" alt="receipt" />{" "}
                    <div className="text-gray-300">
                      ${jobDetails[0]?.amount}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <img src="/icons/user.svg" alt="user" />{" "}
                    <div className="text-gray-300 capitalize">
                      {jobDetails[0]?.experience}
                    </div>
                  </div>
                </div>
              </div>
              {isAlreadyApplied ? (
                <button className="bg-[#22c55e] text-secondary max-lg:text-[12px] font-semibold rounded h-[36px] px-4 disabled cursor-not-allowed leading-3">
                  You have already applied
                </button>
              ) : (
                <button
                  className="rounded font-semibold h-[36px] px-4 bg-[#22c55e] text-secondary"
                  onClick={() => {
                    if (isProfileImg) {
                      setPage(2);
                    } else {
                      setIsPopUp(true);
                    }
                  }}
                >
                  Apply for this job
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between w-full gap-4 lg:gap-0 lg:flex-row">
            <div className="w-full lg:w-[68%]">
              <div className="w-full p-6 capitalize bg-white border border-tertiary rounded-2xl h-max">
                <p className="mb-6 text-xl font-semibold">Details:</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobDetails[0]?.description,
                  }}
                />

                <div className="mt-10">
                  <p className="mb-2 text-lg font-semibold">Attachments:</p>
                  <div>
                    <Link
                      href={jobDetails[0].file}
                      target="_blank"
                      className="text-[var(--primarycolor)]"
                    >
                      Attachment 1
                    </Link>
                  </div>
                </div>
              </div>
              <div className="hidden w-full p-6 mt-4 bg-white border border-tertiary rounded-2xl h-max max-lg:block">
                <div className="mb-6 text-xl font-semibold capitalize">
                  About the client
                </div>
                <div className="font-semibold">
                  Payment method {payment_verified ? "verified" : "unverified"}
                </div>
                <div className="flex items-center mb-4">
                  {jobDetails?.length > 0 && (
                    <StarRatings
                      rating={Number(avg_review)}
                      starDimension="18px"
                      starSpacing="1px"
                      starRatedColor="#22C35E"
                      starEmptyColor="#d7f7e4"
                    />
                  )}
                  {avg_review} of {hired_freelancers} reviews
                </div>
                <div className="font-semibold">{clientLocation}</div>
                <div className="mb-4">01:18 am</div>
                <div className="font-semibold">{job_posted} jobs posted</div>
                <div className="mb-4">
                  {hiredPercentage.toFixed()}% hire rate, {job_open} open job
                </div>
                <div className="font-semibold">
                  ${total_spend?.toFixed()} total spent
                </div>
                <div className="mb-4">
                  {hired_freelancers} hire, {active_freelancers} active
                </div>
                <div className="font-semibold">
                  {hired_freelancers} hire, {active_freelancers} active
                </div>
                <div>{total_hours} hours</div>
              </div>
              <div className="w-full mt-4 bg-white border border-tertiary rounded-2xl">
                <div className="p-6 font-semibold">Clients History</div>
                {clientHistory?.map(({ _id, title, amount, status }) => (
                  <div
                    key={_id}
                    className={
                      lastHistory && _id === lastHistory._id
                        ? "border-b px-6 mb-4 bg-white border-transparent"
                        : "border-b px-6 mb-4 bg-white border-tertiary"
                    }
                  >
                    <Link href={`/find-job/${_id}`}>
                      <div className="font-semibold hover:text-blue-900">
                        {title}
                      </div>
                    </Link>

                    <div className="text-gray-200">
                      {status === "open" ? "Job in progress" : "Already done"}
                    </div>
                    <div className="flex justify-between w-full mb-4">
                      <div className="text-gray-300">Budget: ${amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-[30%] border border-tertiary rounded-2xl p-6 bg-white h-max max-lg:hidden">
              <div className="mb-6 text-xl font-semibold capitalize">
                About the client
              </div>

              <div className="flex items-center gap-1 mb-1 font-semibold">
                {payment_verified ? (
                  <RiVerifiedBadgeFill className="text-[#22C35E]" />
                ) : (
                  <LuBadgeX />
                )}
                <p>
                  Payment method {payment_verified ? "verified" : "unverified"}
                </p>
              </div>
              <div className="flex items-center mb-4">
                {jobDetails?.length > 0 && (
                  <StarRatings
                    rating={Number(avg_review)}
                    starDimension="18px"
                    starSpacing="1px"
                    starRatedColor="#22C35E"
                    starEmptyColor="#d7f7e4"
                  />
                )}
                {avg_review} of {hired_freelancers} reviews
              </div>
              <div className="font-semibold">{clientLocation}</div>
              <div className="font-semibold">{job_posted} jobs posted</div>
              <div className="mb-4">
                {hiredPercentage.toFixed()}% hire rate, {job_open} open job
              </div>
              <div className="font-semibold">
                ${total_spend?.toFixed()} total spent
              </div>
              <div className="mb-4">
                {hired_freelancers} hire, {active_freelancers} active
              </div>
              <div className="font-semibold">
                {hired_freelancers} hire, {active_freelancers} active
              </div>
              <div>{total_hours} hours</div>

              <div className="my-3">
                <hr />
              </div>
              <div>
                <h2 className="text-[#374151] text-lg font-semibold">
                  Job link
                </h2>
                <div className="p-2 text-sm font-medium text-gray-200 bg-gray-100 rounded-md">
                  <p className="break-all line-clamp-1">{`${window.location.origin}/find-job/${jobDetails[0]._id}`}</p>
                </div>
                <p
                  className="text-[var(--primarycolor)] cursor-pointer hover:underline mt-1 font-medium text-sm"
                  onClick={handleCopyLink}
                >
                  Copy link
                </p>
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
                      onCropChange={isCropped ? undefined : setCrop}
                      onZoomChange={isCropped ? undefined : setZoom}
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
