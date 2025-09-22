
"use client";
import React from "react";

import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import {
  Upload,
  RotateCcw,
  Crop,
  ZoomIn,
  ZoomOut,
  Image as ImageIcon,
  AlertCircle
} from "lucide-react";
import getCroppedImg from "../../../../helpers/manageImages/getCroppedImg";
import { uploadImage } from "../../../../helpers/APIs/userApis";
import { profileData } from "../../../../redux/authSlice/profileSlice";
import BtnSpinner from "../../../Skeletons/BtnSpinner";
import { compressImageToWebP } from "../../../../helpers/manageImages/imageCompressed";

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
    <div className="w-full space-y-6">
      <div className="space-y-4">

                      if (file) {
                        setFileName(file.name);
                        setFullImage([file]);
                        setErrorMessage("");
                        setIsCropped(false);
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          setImageSrc(reader.result);
                        };
                      }
                    }}
                  />

                  <Button
                    variant={isCropped ? "secondary" : "outline"}
                    size="sm"
                    onClick={handleCrop}
                    disabled={isCropped}
                    className="gap-2"
                  >
                    {isCropped ? (
                      <>
                        <IoMdCheckmarkCircleOutline className="h-4 w-4" />
                        Cropped
                      </>
                    ) : (
                      <>
                        <Crop className="h-4 w-4" />
                        Crop Photo
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRevert}
                    disabled={!isCropped}
                    className="gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />

};

export default Photos;
