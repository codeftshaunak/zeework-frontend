"use client";

import { BsInfoCircle } from "react-icons/bs";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdCheckmarkCircleOutline, IoMdClose } from "react-icons/io";
import UniversalModal from "../Modals/UniversalModal";
import {
  Box,
  Button,
  Slider,
} from "@chakra-ui/react";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { uploadImage } from "../../helpers/APIs/userApis";
import { profileData } from "../../redux/authSlice/profileSlice";
import { useLocation } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/manageImages/getCroppedImg";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { TiArrowBack, TiMinus, TiPlus, TiZoom } from "react-icons/ti";
import { BiImages, BiSolidCrop } from "react-icons/bi";
import { compressImageToWebP } from "../../helpers/manageImages/imageCompressed";

const ProfilePhotoNotify = () => {
  const profile = useSelector((state: any) => state.profile.profile);
  const role = useSelector((state: any) => state.auth.role);
  const [isCloseNotification, setIsCloseNotification] = useState(
    sessionStorage.getItem("profileImgNotify")
  );
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [fullImage, setFullImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropped, setIsCropped] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const { pathname } = usePathname();

  const handleToastClose = () => {
    setIsCloseNotification("true");
    sessionStorage.setItem("profileImgNotify", "true");
  };

  const isVisible =
    pathname !== "/login" &&
    pathname !== "/signup" &&
    pathname !== "/onboarding" &&
    role == 1 &&
    !profile.profile_image &&
    !isCloseNotification;

  const handleUploadPhoto = async () => {
    if (!fullImage || fullImage.length === 0) {
      setErrorMessage("Please select an image file before uploading.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    try {
      const formData = new FormData();
      const compressedImage = await compressImageToWebP(
        isCropped ? croppedImage[0] : fullImage[0]
      );

      formData.append("file", compressedImage);

      const { code, body } = await uploadImage(formData);

      if (code === 200) {
        dispatch(
          profileData({
            profile: body,
          })
        );
        handleToastClose();
        setIsModal(false);
        setImageSrc(null);
        setFileName("");
        setCroppedImage(null);
        setFullImage(null);
        setIsCropped(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while uploading the image.");
    }
    setIsLoading(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFullImage(acceptedFiles);
    setFileName(acceptedFiles[0].name);
    setErrorMessage("");
    setIsCropped(false);

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

  const handleOpenOnDrop = () => {
    setImageSrc(null);
    setFileName("");
    setCroppedImage(null);
    setFullImage(null);
    setIsCropped(false);
    setIsModal(true);
  };

  return (
    <>
      {isVisible && (
        <div className="w-[85%] bg-green-100 py-4 relative shadow-sm rounded-lg mt-2">
          <div className="flex items-center justify-center gap-1 tracking-wide">
            <BsInfoCircle />
            <p className="capitalize">
              Don&apos;t forget to upload your profile photo.{" "}
              <span
                className="cursor-pointer underline underline-offset-2 hover:no-underline transition font-bold text-[var(--primarycolor)]"
                onClick={handleOpenOnDrop}
              >
                Click to Upload Here
              </span>
            </p>
          </div>
          <div
            className="absolute top-2 right-3 cursor-pointer rounded-full hover:bg-white/10"
            onClick={handleToastClose}
          >
            <IoMdClose fontSize={"20px"} />
          </div>
        </div>
      )}

      <UniversalModal
        title="Upload Your Profile Photo"
        isModal={isModal}
        setIsModal={setIsModal}
      >
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
                    cropShape="round"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 w-full sm:w-96">
                    <TiMinus />
                    <Slider.Root
                      value={[zoom]}
                      min={1}
                      max={3}
                      step={0.1}
                      onValueChange={(details) => {
                        !isCropped && setZoom(details.value[0]);
                      }}
                    >
                      <Slider.Track className="bg-slate-300">
                        <Slider.Range style={{ backgroundColor: "slategrey" }} />
                      </Slider.Track>
                      <Slider.Thumb index={0} className="w-6 h-6">
                        <Box className="text-slate-500" as={TiZoom} />
                      </Slider.Thumb>
                    </Slider.Root>
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
                isLoading={isLoading}
                loadingText="Uploading"
                colorScheme="primary"
                type="button"
                onClick={handleUploadPhoto}
                paddingX={7}
                spinner={<BtnSpinner />}
                disabled={!croppedImage && !fullImage}
              >
                Upload
              </Button>
            </div>
          )}
        </>
      </UniversalModal>
    </>
  );
};

export default ProfilePhotoNotify;
