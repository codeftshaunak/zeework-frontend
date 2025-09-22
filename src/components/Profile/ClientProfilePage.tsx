
"use client";
import { toast } from "@/lib/toast";

import React, { useEffect, useState, useCallback } from "react";
import ProfileContainer from "./ProfileContainer";
import { BsLink45Deg } from "react-icons/bs";
import {
  Avatar,
  Box,
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@/components/ui/migration-helpers";

// TypeScript interfaces
interface ProfileState {
  firstName: string;
  lastName: string;
  location: string;
  profile_image: string;
  briefDescription: string;
  businessName: string;
}

interface FormData {
  briefDescription: string;
  businessName: string;
}

interface RootState {
  profile: {
    profile: ProfileState;
  };
  auth: {
    role: string;
  };
}

interface WorkHistoryItem {
  [key: string]: unknown;
}
import ReviewCard from "./FreelancerProfile/FreelancerProfile/ReviewCard";

import { getAllDetailsOfUser, uploadImage } from "../../helpers/APIs/userApis";
import { CiLocationOn } from "react-icons/ci";
import { formatTime, getUserLocation } from "../../helpers/APIs/formet";
import { useRouter } from "next/navigation";
import { getWorkHistory } from "../../helpers/APIs/freelancerApis";
import { useDispatch, useSelector } from "react-redux";
import UniversalModal from "../Modals/UniversalModal";
import { useForm } from "react-hook-form";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { profileData } from "../../redux/authSlice/profileSlice";
import { updateClientProfile } from "../../helpers/APIs/clientApis";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/manageImages/getCroppedImg";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { TiArrowBack, TiMinus, TiPlus, TiZoom } from "react-icons/ti";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiImages, BiSolidCrop } from "react-icons/bi";
import ErrorMsg from "../utils/Error/ErrorMsg";
import { compressImageToWebP } from "../../helpers/manageImages/imageCompressed";
import EditButton from "../Button/EditButton";

export const ClientProfilePage: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [workHistory, setWorkHistory] = useState<WorkHistoryItem[]>([]);
  const router = useRouter();
  const role = useSelector((state: RootState) => state.auth.role);
  const [isModal, setIsModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      briefDescription: profile?.briefDescription || "",
      businessName: profile?.businessName || "",
    },
  });
  const dispatch = useDispatch();

  // include drag and drop with photo cropping features
  const [fileName, setFileName] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<unknown>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fullImage, setFullImage] = useState<File[] | null>(null);
  const [croppedImage, setCroppedImage] = useState<File[] | null>(null);
  const [isCropped, setIsCropped] = useState(false);

  const {
    firstName,
    lastName,
    location,
    profile_image,
    briefDescription,
    businessName,
  } = profile || {};
  const [localTime, setLocalTime] = useState<string>();

  async function getCurrentTimeAndLocation() {
    try {
      const currentDate = new Date();
      const currentTime = formatTime(currentDate);
      const location = await getUserLocation();
      setLocalTime(currentTime);
      return console.log(
        `${location.latitude}, ${location.longitude} - ${currentTime} local time`
      );
    } catch (error) {
      return error;
    }
  }
  setTimeout(() => {
    getCurrentTimeAndLocation();
  }, 1000);

  const getWorkHistoryInfo = async () => {
    try {
      const { code, body } = await getWorkHistory();

      if (code === 200) {
        setWorkHistory(body || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyProfileURL = () => {
    const profileURL = window.location.href;
    navigator.clipboard.writeText(profileURL);

    toast.success("Zeework Profile Copied.");
  };

  const handleOpenModal = (type: string) => {
    setModalType(type);
    setIsModal(true);
    setImageSrc(null);
    setFileName("");
  };

  // update profile photo
  const updateProfilePhoto = async () => {
    try {
      const formData = new FormData();
      const compressedImage = await compressImageToWebP(
        isCropped ? croppedImage[0] : fullImage[0]
      );
      formData.append("file", compressedImage);

      const response = await uploadImage(formData);

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // Update client profile info
  const handleUpdateProfile = async (data?: FormData) => {
    setIsLoading(true);
    let response;
    try {
      // update profile photo and other info
      if (modalType === "Profile Photo") {
        response = await updateProfilePhoto();
      
        } else {
        response = await updateClientProfile(data);
      }

      // dispatch profile info in redux
      if (response && response.code === 200) {
        dispatch(
          profileData({
            profile: response.body,
          })
        );
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
    setIsModal(false);
    setModalType("");
    setImageSrc(null);
    setFileName("");
    reset();
  };

  // handle photo drag 'n' drop with photo cropping
  const onDrop = useCallback((acceptedFiles: File[]) => {
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

  const onCropComplete = useCallback((croppedArea: unknown, croppedAreaPixels: unknown) => {
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

  useEffect(() => {
    if (profile) {
      reset({
        briefDescription: profile?.briefDescription || "",
        businessName: profile?.businessName || "",
      });
    }
  }, [profile, reset]);

  useEffect(() => {
    getWorkHistoryInfo();
  }, []);
  return (
    <>
      <ProfileContainer>
        <div className="w-full sm:w-[100%] flex flex-col gap-[24px] m-auto">
          <div className="w-full flex items-center justify-between border-2 py-[20px] px-[24px] border-[var(--primarycolor)] bg-green-50 rounded-xl max-sm:flex-col max-sm:gap-4">
            <div className="flex gap-[14px] items-center">
              <div className="relative">
                <div
                  style={{
                    top: "0px",
                    left: "0px",
                    cursor: "pointer",
                    zIndex: "50",
                  }}
                >
                  <EditButton
                    onClick={() => handleOpenModal("Profile Photo")}
                  />
                </div>

                <Avatar
                  src={profile_image}
                  name={firstName + " " + lastName}
                />
              </div>
              <div className="flex flex-col justify-start gap-[10px]">
                <div className="flex gap-[16px] items-center">
                  <p className="text-[24px] text-[#374151] font-semibold">
                    {businessName}
                  </p>
                  <EditButton
                    onClick={() => handleOpenModal("Business Name")}
                  />
                </div>
                <div className="flex flex-row items-center text-[16px] text-[#374151] font-[400]">
                  <CiLocationOn />{" "}
                  <p className="capitalize">
                    {" "}
                    {location}, {localTime} local time
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-[12px]">
              <div
                className="flex items-center justify-center w-[36px] h-[36px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)] cursor-pointer hover:bg-slate-100"
                onClick={handleCopyProfileURL}
              >
                <BsLink45Deg />
              </div>
              <button
                className="py-[8px] px-[12px] rounded-[6px] text-[14px] font-500 text-[#fff] bg-[#22C55E]"
                onClick={() => router.push("/setting")}
              >
                Profile Settings
              </button>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row gap-[24px]">
            <div className="flex flex-1 gap-[24px] flex-col">
              <div className="flex py-6 bg-white w-full xl:w-[400px] relative flex-col gap-[24px] border-[1px] px-[24px] border-[var(--bordersecondary)] rounded-lg">
                <p className="text-[20px] text-[#374151] font-[600]">
                  Client Stats
                </p>
                <div className="flex flex-col justify-center h-[80px] bg-gray-100 shadow-sm">
                  <span className="font-semibold text-center">
                    Updated Client Stats <br /> Coming Soon
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-[2] flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[24px] border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] bg-white rounded-xl">
                <div>
                  <div className="flex gap-[16px] justify-between">
                    <p className="text-[20px] text-[#374151] font-[600]">
                      Client Description
                    </p>{" "}
                    <EditButton
                      onClick={() => handleOpenModal("Brief Description")}
                    />
                  </div>
                </div>
                <p className="text-[14px] text-[#374151] font-[400] max-w-[400px]">
                  {briefDescription}
                </p>
              </div>
              <div className="border-[1px] py-8 overflow-hidden border-[var(--bordersecondary)] bg-white rounded-xl">
                <div className="flex flex-col gap-6 px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-[20px] text-[#374151] font-[600]">
                      Work History
                    </p>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <p className="text-[14px] text-[#22C35E] font-[600] cursor-pointer">
                      Completed Jobs
                    </p>
                    <div className="h-[2px] w-[60px] bg-[#22C35E]"></div>
                  </div>
                </div>

                {[...workHistory]?.reverse()?.map((item, index) => (
                  <ReviewCard key={index} workDetails={item} role={role} />
                )) || (
                  <div className="text-center py-8 text-gray-500">
                    No work history available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ProfileContainer>

      {/* Modal for editing profile */}
      <UniversalModal
        title={modalType}
        isModal={isModal}
        setIsModal={setIsModal}
      >
        {modalType === "Profile Photo" && (
          <div className="flex flex-col gap-4">
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400"
            >
              <input {...getInputProps()} />
              <RiUploadCloud2Fill className="mx-auto h-12 w-12 text-gray-400" />
              {isDragActive ? (
                <p className="text-center">Drop the files here ...</p>
              ) : (
                <p className="text-center">
                  Drag &apos;n&apos; drop image file here, or click to select
                </p>
              )}
            </div>

            {imageSrc && (
              <div className="relative">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
                <div className="flex items-center gap-2 mt-4">
                  <TiMinus />
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(value) => setZoom(value)}
                    className="flex-1"
                  >
                    <SliderTrack className="bg-slate-300">
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <TiZoom className="text-slate-500" />
                    </SliderThumb>
                  </Slider>
                  <TiPlus />
                </div>
                <div className="flex items-center justify-center gap-x-5 flex-wrap mt-4">
                  <button
                    type="button"
                    disabled={isCropped}
                    className={`flex items-center gap-1 ${
                      isCropped
                        ? "cursor-no-drop bg-slate-400"
                        : "bg-slate-500"
                    } rounded py-1 px-3 text-white w-fit`}
                    onClick={() => {
                      document.getElementById("file-input")?.click();
                    }}
                  >
                    <BiImages /> Change File
                  </button>
                  <input
                    id="file-input"
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                  <button
                    type="button"
                    className={`flex items-center gap-1 ${
                      isCropped
                        ? "cursor-no-drop bg-slate-400"
                        : "bg-slate-500"
                    } rounded py-1 px-3 text-white w-fit`}
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
                    } rounded py-1 px-3 text-white w-fit`}
                    onClick={handleRevert}
                    disabled={!isCropped}
                  >
                    <TiArrowBack /> Revert
                  </button>
                </div>
              </div>
            )}

            {errorMessage && <ErrorMsg message={errorMessage} />}

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setIsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleUpdateProfile()}
                disabled={isLoading || !imageSrc}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {isLoading ? <BtnSpinner /> : "Upload Photo"}
              </button>
            </div>
          </div>
        )}

        {(modalType === "Business Name" || modalType === "Brief Description") && (
          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <div className="space-y-4">
              {modalType === "Business Name" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Business Name
                  </label>
                  <input
                    {...register("businessName", { required: "Business name is required" })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  {errors.businessName && (
                    <ErrorMsg message={errors.businessName.message} />
                  )}
                </div>
              )}

              {modalType === "Brief Description" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Brief Description
                  </label>
                  <textarea
                    {...register("briefDescription", { required: "Description is required" })}
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                  {errors.briefDescription && (
                    <ErrorMsg message={errors.briefDescription.message} />
                  )}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {isLoading ? <BtnSpinner /> : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        )}
      </UniversalModal>
    </>
  );
};
