
"use client";
import React from "react";

import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@/components/ui/migration-helpers";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { useForm } from "react-hook-form";
import { BiImages, BiSolidCrop } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  RiDeleteBin2Fill,
  RiEdit2Fill,
  RiUploadCloud2Fill,
} from "react-icons/ri";
import { TiArrowBack, TiMinus, TiPlus, TiZoom } from "react-icons/ti";
import { useDispatch } from "react-redux";
import {
  updateAgencyProfile,
  uploadSingleImage,
} from "../../helpers/APIs/agencyApis";
import getCroppedImg from "../../helpers/manageImages/getCroppedImg";
import { clearMessageState } from "../../redux/messageSlice/messageSlice";
import { clearNotificationState } from "../../redux/notificationSlice/notificationSlice";
import { clearPagesState } from "../../redux/pagesSlice/pagesSlice";
import UniversalModal from "../Modals/UniversalModal";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { AgencyBodyLayout } from "./AgencyBody";
import { useRouter } from "next/navigation";
import { compressImageToWebP } from "../../helpers/manageImages/imageCompressed";

const AgencyProfileHeader = ({ agency, setAgency }) => {
  const {
    agency_name,
    agency_tagline,
    agency_coverImage,
    agency_profileImage,
    user_id,
  } = agency || {};

  // agency active
   
  const [cookies, setCookie] = useCookies(["activeagency"]);
  const [isModal, setIsModal] = useState(false);
  const [modalType, setIsModalType] = useState("");
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

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
      if (!imageSrc || !croppedAreaPixels) {
        setErrorMessage("Please select and crop an image before uploading.");
        return;
      }

      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const file = new File([croppedImage as BlobPart], fileName, { type: "image/jpeg" });
      setCroppedImage([file]);
      setIsCropped(true);
    } catch (e) {
      console.error(e);
      setErrorMessage("An error occurred while cropping the image.");
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (modalType === "Profile Photo" || modalType === "Cover Photo") {
        const formData = new FormData();
        const compressedImage : any = await compressImageToWebP(
          isCropped ? croppedImage?.[0] : fullImage?.[0],
          0.5,
          "profile"
        );

        formData.append("imageFile", compressedImage);

        const { body: imgBody, code: imgCode } = await uploadSingleImage(
          formData
        );
        if (imgCode === 200) {
          const { code, body } = await updateAgencyProfile(
            modalType === "Profile Photo"
              ? { agency_profileImage: imgBody.imageUrl }
              : { agency_coverImage: imgBody.imageUrl }
          );

          if (code === 200) {
            setAgency(body);
          }
        }
      } else {
        const { body, code } = await updateAgencyProfile(data);
        if (code === 200) setAgency(body);
      }
    } catch (error) {
      console.error(error);
    }

    reset();
    setIsModal(false);
    setIsLoading(false);
    setImageSrc(null);
    setFileName("");
    setCroppedImage(null);
    setFullImage(null);
    setIsCropped(false);
  };

  // handle open modal
  const handleUpdate = (type, data={}) => {
    setImageSrc(null);
    setFileName("");
    setCroppedImage(null);
    setFullImage(null);
    setIsCropped(false);
    setIsModalType(type);
    setModalData(data);
    setIsModal(true);
  };

  const handleRevert = () => {
    setIsCropped(false);
  };

  const handleSwitchFreelancer = () => {
    setCookie("activeagency", false);
    dispatch(clearPagesState());
    dispatch(clearMessageState());
    dispatch(clearNotificationState());
    router.push(`/profile/f/${user_id}`);
  };

  return (
    <>
      <div className="flex flex-col w-full relative">
        <div className="flex flex-col w-full relative">
          {agency_coverImage ? (
            <Image
              src={agency_coverImage}
              alt="cover image"
              className="shadow w-full rounded"
              style={{
                objectFit: "cover",
                filter: "brightness(80%)"
              }}
            />
          ) : (
            <Image
              src="/images/zeework_agency_cover.png"
              alt="cover image"
              className="shadow w-full rounded"
              style={{
                objectFit: "cover",
                filter: "brightness(80%)"
              }}
            />
          )}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row items-center text-2xl">
            <div className="flex flex-col items-center justify-center bg-white rounded w-[50px] h-[50px] cursor-pointer transition-all duration-300 hover:border-2 hover:border-green-600 hover:bg-transparent hover:text-green-600"
              onClick={() => handleUpdate("Cover Photo")}
            >
              <RiEdit2Fill />
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded w-[50px] h-[50px] cursor-pointer transition-all duration-300 hover:border-2 hover:border-green-600 hover:bg-transparent hover:text-green-600"
            >
              <RiDeleteBin2Fill />
            </div>
          </div>
        </div>

        <AgencyBodyLayout>
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center w-full">
              <div className="flex flex-row items-center relative">
                <Avatar
                  src={agency_profileImage}
                  name={agency_name}
                  className="rounded"
                />

                <div className="absolute bottom-0 right-0 flex flex-col items-center justify-center bg-white border rounded w-[30px] h-[30px] cursor-pointer transition-all duration-300 hover:border-2 hover:border-green-600 hover:bg-transparent hover:text-green-600"
                  onClick={() => handleUpdate("Profile Photo")}
                >
                  <RiEdit2Fill />
                </div>
              </div>

              <div className="flex flex-col items-start ml-[1.1rem]">
                <div className="flex flex-row items-center">
                  <span className="font-semibold">
                    {agency_name}
                  </span>
                  <div className="flex flex-col items-center justify-center bg-white border rounded w-[30px] h-[30px] cursor-pointer transition-all duration-300 hover:border-2 hover:border-green-600 hover:bg-transparent hover:text-green-600"
                    onClick={() => handleUpdate("Agency Name", agency_name)}
                  >
                    <RiEdit2Fill />
                  </div>
                </div>

                <div className="flex flex-row items-center">
                  <span>{agency_tagline}</span>
                  <div className="flex flex-col items-center justify-center bg-white border rounded w-[30px] h-[30px] cursor-pointer transition-all duration-300 hover:border-2 hover:border-green-600 hover:bg-transparent hover:text-green-600"
                    onClick={() =>
                      handleUpdate("Agency Tagline", agency_tagline)
                    }
                  >
                    <RiEdit2Fill />
                  </div>
                </div>
              </div>
            </div>

            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 bg-green-600 text-white px-4 py-2 mt-1 md:mt-0 hover:bg-transparent hover:border-2 hover:border-green-600 hover:text-black"
              onClick={handleSwitchFreelancer}
            >
              Switch To Your Freelancer Profile
            </button>
          </div>
        </AgencyBodyLayout>
      </div>

      {/* Profile Updating Thing */}
      {isModal && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={`Update ${modalType}`}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* update profile photo */}
            {(modalType === "Profile Photo" || modalType === "Cover Photo") && (
              <>
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
                            <p className="text-center">
                              Drop the files here ...{" "}
                            </p>
                          ) : (
                            <p className="text-center">
                              Drag &apos;n&apos; drop image file here, or click
                              to select file
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
                          aspect={modalType === "Profile Photo" ? 1 : 3 / 1}
                          showGrid={false}
                          onCropChange={isCropped ? undefined : setCrop}
                          onZoomChange={isCropped ? undefined : setZoom}
                          onCropComplete={onCropComplete}
                          cropShape={modalType === "Profile Photo" ? "round" : "rect"}
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-1 w-full sm:w-96">
                          <TiMinus />
                          <Slider
                            aria-label="zoom-slider"
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(val) => {
                              !isCropped && setZoom(val[0]);
                            }}
                          >
                            <SliderTrack className="bg-slate-300">
                              <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb boxSize={6}>
                              <div className="text-slate-500" as={TiZoom} />
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
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-green-600 text-white px-7 py-2 hover:bg-green-700 disabled:opacity-50"
                      disabled={isLoading}
                      onClick={() => onSubmit({})}
                    >
                      {isLoading ? (
                        <>
                          <BtnSpinner />
                          Uploading
                        </>
                      ) : (
                        "Upload"
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
            {/* update agency name */}
            {modalType === "Agency Name" && (
              <input
                type="text"
                {...register("agency_name")}
                required
                defaultValue={modalData}
                className="px-3 py-1 border rounded w-full"
              />
            )}
            {/* update agency tagline */}
            {modalType === "Agency Tagline" && (
              <input
                type="text"
                {...register("agency_tagline")}
                required
                defaultValue={modalData}
                className="px-3 py-1 border rounded w-full"
              />
            )}

            {modalType !== "Profile Photo" && modalType !== "Cover Photo" && (
              <div className="text-right mt-10">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-green-600 text-white px-4 py-2 hover:bg-green-700 disabled:opacity-50"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <BtnSpinner />
                      Submit
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            )}
          </form>
        </UniversalModal>
      )}
    </>
  );
};

export default AgencyProfileHeader;
