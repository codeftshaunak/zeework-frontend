
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

      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const file = new File([croppedImageBlob as any], fileName, { type: "image/jpeg" });
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
        isCropped ? (croppedImage as any)[0] : fullImage[0]
      );

      formData.append("file", compressedImage as Blob);

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
        {/* Upload Area */}
        {!imageSrc && (
          <Card className="border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors">
            <CardContent className="p-8">
              <div
                {...getRootProps()}
                className="cursor-pointer text-center space-y-4"
              >
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-green-600" />
                </div>
                <input {...getInputProps()} />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Upload Profile Photo
                  </h3>
                  {isDragActive ? (
                    <p className="text-green-600 font-medium">Drop the image here...</p>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-gray-600">
                        Drag and drop your image here, or{" "}
                        <span className="text-green-600 font-medium">browse files</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG or JPEG (max 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {fileName && !imageSrc && (
          <div className="text-center py-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              <ImageIcon className="h-4 w-4" />
              {fileName}
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        )}
        {/* Cropping Interface */}
        {imageSrc && (
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Crop Area */}
                <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
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

                {/* Zoom Control */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => !isCropped && setZoom(Math.max(1, zoom - 0.1))}
                      disabled={isCropped || zoom <= 1}
                      className="h-8 w-8 p-0"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
                        {Math.round(zoom * 100)}%
                      </div>
                      <div className="flex gap-1">
                        {[1, 1.5, 2, 2.5, 3].map((zoomLevel) => (
                          <button
                            key={zoomLevel}
                            onClick={() => !isCropped && setZoom(zoomLevel)}
                            disabled={isCropped}
                            className={`h-2 w-6 rounded-sm transition-colors ${
                              zoom >= zoomLevel
                                ? 'bg-green-500'
                                : 'bg-gray-200 hover:bg-gray-300'
                            } ${isCropped ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => !isCropped && setZoom(Math.min(3, zoom + 0.1))}
                      disabled={isCropped || zoom >= 3}
                      className="h-8 w-8 p-0"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-center text-gray-500">
                    Use zoom controls to adjust the image size, then crop to save your selection
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isCropped}
                    onClick={() => document.getElementById("file-input")?.click()}
                    className="gap-2"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Change Photo
                  </Button>

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
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Button */}
        {imageSrc && (
          <div className="flex justify-end pt-4">
            <Button
              variant="gradient"
              onClick={uploadProfileImage}
              disabled={isLoading}
              className="gap-2 min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <BtnSpinner />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Photos;
