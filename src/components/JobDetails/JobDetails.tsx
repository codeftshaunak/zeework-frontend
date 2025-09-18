"use client";

import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "next/navigation";
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
import {
  Box,
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useToast,
} from "@chakra-ui/react";
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

const JobDetails = ({ setPage, setDetails }) => {
  const profile = useSelector((state: any) => state.profile);
  const [cookies] = useCookies(["activeagency"]);
  const activeagency = cookies.activeagency;
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState([]);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isProfileImg = activeagency
    ? !!profile.agency.agency_profileImage
    : !!profile.profile.profile_image;
  const [isPopUp, setIsPopUp] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const dispatch = useDispatch();

  const toast = useToast();

  // include drag and drop with photo cropping features
  const [fileName, setFileName] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fullImage, setFullImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropped, setIsCropped] = useState(false);

  // upload profile photo of freelancer and agency
  const handleUploadPhoto = async () => {
    if (!fullImage[0]) {
      return setErrorMessage("Please select an image file!");
    }

    setIsImgLoading(true);
    try {
      // upload agency profile
      if (activeagency) {
        const formData = new FormData();
        formData.append(
          "imageFile",
          isCropped ? croppedImage[0] : fullImage[0]
        );
        const { body: imgBody, code: imgCode } = await uploadSingleImage(
          formData
        );

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
          isCropped ? croppedImage[0] : fullImage[0]
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
      const { code, body } = await getSingleJobDetails(id);
      if (code === 200) {
        setJobDetails(body);
        setDetails(body);
        const { applied_jobs } = activeagency
          ? await getAgencyAllJobs()
          : await userAllJobs();

        setIsAlreadyApplied(!!applied_jobs.find((item) => item?._id === id));
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
  const timeDifference = currentTime - dateObject;

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
    location,
    active_freelancers,
    hired_freelancers,
    total_spend,
    job_open,
    avg_review,
    total_hours,
    job_posted,
    payment_verified,
    _id,
  } = clientDetails;

  const hiredPercentage =
    (clientDetails?.hired_freelancers / clientDetails?.job_open) * 100;
  const clientHistory = jobDetails[0]?.client_history;
  const lastHistory = clientHistory?.slice(-1);

  // handle photo drag 'n' drop with photo cropping
  const onDrop = useCallback((acceptedFiles) => {
    setFullImage(acceptedFiles);
    setFileName(acceptedFiles[0].name);
    setErrorMessage("");

    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: false,
  });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
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
    const jobUrl = `${window.location.origin}/find-job/${jobDetails[0]._id}`;
    navigator.clipboard.writeText(jobUrl).then(() => {
      toast({
        title: "Link copied to clipboard",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    });
  };

  // throwing job details skeleton
  if (isLoading || !jobDetails?.length) return <JobDetailsSkeleton />;

  return (
    <>
      <div className="w-full">
        <div className="py-2 w-full">
          <div className="flex gap-2 py-6">
            <Link to={"/"}>
              <img src="/icons/home.svg" alt="home" />
            </Link>
            <img src="/icons/chevron-right.svg" alt="arrow right" />
            <div className="capitalize">{jobDetails[0]?.title}</div>
          </div>
          <div className="w-full border border-tertiary rounded-2xl p-6 mb-4 bg-white ">
            <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-2">
              <div className="flex flex-col gap-2 max-[570px]:flex-col max-sm:flex-row max-sm:items-center">
                <div className="flex max-[380px]:flex-col max-[380px]:items-center max-xl:flex-col">
                  <div className="font-semibold min-[380px]:mr-2 capitalize text-[20px]">
                    {jobDetails[0]?.title}{" "}
                  </div>
                  <div className="text-gray-300 mt-1 max-sm:mt-0 items-center flex">
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
                <button className=" bg-[#22c55e] text-secondary max-lg:text-[12px] font-semibold rounded h-[36px] px-4 disabled cursor-not-allowed leading-3">
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
          <div className="w-full flex justify-between gap-4 lg:gap-0 lg:flex-row flex-col">
            <div className="w-full lg:w-[68%]">
              <div className="w-full border border-tertiary rounded-2xl p-6 capitalize bg-white h-max">
                <p className="font-semibold mb-6 text-xl">Details:</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobDetails[0]?.description,
                  }}
                />

                <div className="mt-10">
                  <p className="text-lg font-semibold mb-2">Attachments:</p>
                  <div>
                    <Link
                      to={jobDetails[0].file}
                      target="_blank"
                      className="text-[var(--primarycolor)]"
                    >
                      Attachment 1
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full mt-4 border border-tertiary rounded-2xl p-6 bg-white h-max max-lg:block hidden">
                <div className="font-semibold mb-6 capitalize text-xl">
                  About the client
                </div>
                <div className="font-semibold">
                  Payment method{" "}
                  {payment_verified > 0 ? "verified" : "unverified"}
                </div>
                <div className="flex items-center mb-4">
                  {jobDetails?.length > 0 && (
                    <StarRatings
                      rating={Number(
                        jobDetails[0]?.client_details[0]?.avg_review
                      )}
                      starDimension="18px"
                      starSpacing="1px"
                      starRatedColor="#22C35E"
                      starEmptyColor="#d7f7e4"
                    />
                  )}
                  {avg_review} of {hired_freelancers} reviews
                </div>
                <div className="font-semibold">{location}</div>
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
              <div className="w-full border border-tertiary rounded-2xl mt-4 bg-white">
                <div className="font-semibold p-6">Clients History</div>
                {clientHistory?.map(({ _id, title, amount, status }) => (
                  <div
                    key={_id}
                    className={
                      _id === lastHistory[0]._id
                        ? "border-b px-6 mb-4 bg-white border-transparent"
                        : "border-b px-6 mb-4 bg-white border-tertiary"
                    }
                  >
                    <Link to={`/find-job/${_id}`}>
                      <div className="font-semibold hover:text-blue-900">
                        {title}
                      </div>
                    </Link>

                    <div className="text-gray-200">
                      {status === "open" ? "Job in progress" : "Already done"}
                    </div>
                    <div className="w-full flex justify-between mb-4">
                      <div className="text-gray-300">Budget: ${amount}</div>
                      {/* <div className="text-gray-300">298 hrs @ $20.00</div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-[30%] border border-tertiary rounded-2xl p-6 bg-white h-max max-lg:hidden">
              <div className="font-semibold mb-6 capitalize text-xl">
                About the client
              </div>

              <div className="font-semibold flex items-center gap-1 mb-1">
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
                    rating={Number(
                      jobDetails[0]?.client_details[0]?.avg_review
                    )}
                    starDimension="18px"
                    starSpacing="1px"
                    starRatedColor="#22C35E"
                    starEmptyColor="#d7f7e4"
                  />
                )}
                {avg_review} of {hired_freelancers} reviews
              </div>
              <div className="font-semibold">{location}</div>
              {/* <div className="mb-4">01:18 am</div> */}
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
              <div className="">
                <h2 className="text-[#374151] text-lg font-semibold">
                  Job link
                </h2>
                <div className="p-2 rounded-md bg-gray-100 text-gray-200 text-sm font-medium">
                  <p className="line-clamp-1 break-all">{`${window.location.origin}/find-job/${jobDetails[0]._id}`}</p>
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
          <div className="grid gap-6 justify-center">
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
                        <RiUploadCloud2Fill className="text-green-300 text-6xl mx-auto" />
                      )}
                      <input
                        {...getInputProps()}
                        className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)]"
                        placeholder="Select an image"
                        onChange={() => {
                          const file = getInputProps().files[0];
                          if (file) {
                            setFileName(file.name);
                          }
                          setErrorMessage("");
                        }}
                      />

                      {isDragActive ? (
                        <p className="text-center ">Drop the files here ... </p>
                      ) : (
                        <p className="text-center ">
                          Drag &apos;n&apos; drop image file here, or click to
                          select file
                        </p>
                      )}
                    </div>
                  )}
                  {fileName && (
                    <p className="text-center mt-2 -mb-4 text-green-600">
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
                      cropShape={"round"}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1 w-full sm:w-96">
                      <TiMinus />
                      <Slider
                        aria-label="zoom-slider"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(val) => {
                          !isCropped && setZoom(val);
                        }}
                      >
                        <SliderTrack className="bg-slate-300">
                          <SliderFilledTrack bg={"slategrey"} />
                        </SliderTrack>
                        <SliderThumb boxSize={6}>
                          <Box className="text-slate-500" as={TiZoom} />
                        </SliderThumb>
                      </Slider>
                      <TiPlus />
                    </div>
                    <div className="flex items-center justify-center gap-x-5 flex-wrap">
                      <button
                        type="button"
                        disabled={isCropped}
                        className={`flex items-center gap-1 ${
                          isCropped
                            ? "cursor-no-drop bg-slate-400"
                            : "bg-slate-500"
                        } rounded py-1 px-3 text-white w-fit mt-2`}
                        onClick={() => {
                          document.getElementById("file-input").click();
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
                          const file = e.target.files[0];
                          if (file) {
                            setFileName(file.name);
                            setFullImage([file]);
                            setErrorMessage("");
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                              setImageSrc(reader.result);
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
              <div className="text-right mt-10">
                <Button
                  isLoading={isImgLoading}
                  loadingText="Uploading"
                  colorScheme="primary"
                  onClick={() => handleUploadPhoto()}
                  paddingX={7}
                  spinner={<BtnSpinner />}
                >
                  Upload
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
