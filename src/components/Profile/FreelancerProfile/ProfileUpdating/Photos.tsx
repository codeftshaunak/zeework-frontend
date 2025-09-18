"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { TiArrowBack, TiMinus, TiPlus, TiZoom } from "react-icons/ti";
import { BiImages, BiSolidCrop } from "react-icons/bi";
import getCroppedImg from "../../../../helpers/manageImages/getCroppedImg.ts";
import { uploadImage } from "../../../../helpers/APIs/userApis.ts";
import { profileData } from "../../../../redux/authSlice/profileSlice.ts";
import BtnSpinner from "../../../Skeletons/BtnSpinner.tsx";
import ErrorMsg from "../../../utils/Error/ErrorMsg.tsx";
import { compressImageToWebP } from "../../../../helpers/manageImages/imageCompressed.ts";

const Photos = ({ setIsModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [fileName, setFileName] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fullImage, setFullImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropped, setIsCropped] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFullImage(acceptedFiles);
    setFileName(file.name);
    setErrorMessage("");

    const reader = new FileReader();
    reader.readAsDataURL(file);
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
      const file = new File([croppedImage], fileName, { type: "image/jpeg" });
      setCroppedImage([file]);
      setIsCropped(true);
    } catch (e) {
      console.error(e);
      setErrorMessage("An error occurred while cropping the image.");
    }
  };

  const handleRevert = () => {
    setIsCropped(false);
  };

  const uploadProfileImage = async () => {
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
        setIsModal(false);
        setImageSrc(null);
        setFileName("");
        setCroppedImage(null);
        setFullImage(null);
        setIsCropped(false);
      } else {
        setErrorMessage("An error occurred while uploading the image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("An error occurred while uploading the image.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!setIsModal) {
      setImageSrc(null);
      setFileName("");
    }
  }, [setIsModal]);

  return (
    <div className="w-full flex flex-col gap-[20px]">
      <form>
        <div className="flex flex-col gap-[16px]">
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
                />
                {isDragActive ? (
                  <p className="text-center">Drop the files here ... </p>
                ) : (
                  <p className="text-center">
                    Drag &apos;n&apos; drop image file here, or click to select
                    file
                  </p>
                )}
              </div>
            )}
            {fileName && (
              <p className="text-center mt-2 -mb-4 text-green-600">
                {fileName}
              </p>
            )}
            {errorMessage && <ErrorMsg msg={errorMessage} />}
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
                      isCropped ? "cursor-no-drop bg-slate-400" : "bg-slate-500"
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
              onClick={uploadProfileImage}
              paddingX={7}
              spinner={<BtnSpinner />}
            >
              Upload
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Photos;
