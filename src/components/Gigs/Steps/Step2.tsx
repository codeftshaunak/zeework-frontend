
"use client";
import React from "react";


import { useCallback, useEffect, useState } from "react";
import { FaCloudUploadAlt, FaStar } from "react-icons/fa";
import { IoMdClose, IoMdVideocam } from "react-icons/io";
import { GigCreateLayout } from "../GigCreate";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMsg from "../../utils/Error/ErrorMsg";

// validation schema
const schema = yup.object().shape({
  images: yup
    .array()
    .label("Image")
    .min(1, "At least one image is required")
    .required(),
});

const Step2 = ({ submitCallback, onBack, afterSubmit, formValues }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const defaultValues = { images: selectedImages, video: selectedVideo };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = methods;

  // add selected images
  const insertImages = (files) => {
    const newImages = [
      ...selectedImages,
      ...files.map((f) => ({ file: f, preview: URL.createObjectURL(f) })),
    ];
    setSelectedImages(newImages);
  };

  // image delete function
  const removeImage = (indexToRemove) => {
    const newImages = [...selectedImages].filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedImages(newImages);
  };

  // image upload function
  const handleImageSelect = useCallback(
    async (e) => {
      const files = Array.from(e.target.files);

      // Check if the total number of selected images doesn't exceed the limit
      if (selectedImages?.length + files?.length <= 3) {
        // create temporary blob files
        insertImages(files);
      }
    },
    [selectedImages]
  );

  // insert video
  const insertVideo = (file) => {
    setSelectedVideo({ file, preview: URL.createObjectURL(file) });
  };
  // remove video
  const removeVideo = () => setSelectedVideo(null);

  // video upload function
  const handleVideoSelect = async (e) => {
    const file = e.target.files[0];

    insertVideo(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
  };

  // onSubmit fuction
  const onSubmit = useCallback(() => {
    submitCallback({
      images: selectedImages,
      video: selectedVideo,
    });
    afterSubmit();
  }, [afterSubmit, selectedImages, selectedVideo, submitCallback]);

  // load state
  useEffect(() => {
    const images = formValues?.images;
    const video = formValues?.video;

    if (images) setSelectedImages(images);
    if (video?.preview !== "") setSelectedVideo(video);
  }, [formValues]);

  // listen form data
  useEffect(() => {
    setValue("images", selectedImages);
    if (selectedImages.length) trigger("images");
  }, [selectedImages, setValue, trigger]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GigCreateLayout title="Create a Gig Gallery" onBackward={onBack}>
          <div className="flex flex-col gap-[2px] mt-6">
            <label htmlFor="fileInput" className="text-xl font-[600] pb-0 mb-0">
              Project Images
            </label>
            <p className="mt-0 mb-3">
              Upload up to 3 images (.jpg or .png), less than 10MB.
            </p>
            <div className="w-full md:w-[500px] p-[12px] outline-none border-[1px] rounded-md flex bg-white">
              <div className="flex">
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    className="rounded border border-green-300 mr-2 relative"
                  >
                    <img
                      src={image.preview}
                      alt={`Selected ${index + 1}`}
                      className="w-28 h-20 object-cover rounded"
                    />
                    <span
                      className="h-5 w-5 bg-red-50/10 rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
                      onClick={() => removeImage(index)}
                    >
                      <IoMdClose />
                    </span>
                    {index === 0 && (
                      <div className="absolute bottom-0 left-0 bg-black/10 backdrop-blur backdrop-filter text-white flex justify-center items-center gap-1 w-full text-sm">
                        <FaStar />
                        <span>Primary</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {selectedImages?.length < 3 && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    name="file"
                    multiple
                    style={{ display: "none" }}
                    id="fileInput"
                    disabled={selectedImages?.length >= 3}
                  />
                  <label htmlFor="fileInput">
                    <div
                      className={`w-24 h-20 border border-green-400 rounded cursor-pointer bg-green-100 hover:bg-green-200 flex flex-col items-center justify-center text-center`}
                    >
                      <span>
                        <FaCloudUploadAlt className="text-2xl text-center" />
                      </span>
                      <span className="font-semibold">
                        {selectedImages?.length > 0 ? "Add More" : "Add"}
                      </span>
                    </div>
                  </label>
                </div>
              )}
            </div>{" "}
            {errors.images && <ErrorMsg msg={errors.images.message} />}
          </div>

          <div className="flex flex-col className="items-start">
            <label className="text-xl font-[600] pb-0 mb-0">
              Project Videos
            </label>
            <p className="mt-0 mb-2">Upload one video (.mp4), up to 10MB.</p>
            {(selectedVideo === null ||
              selectedVideo?.preview === "" ||
              selectedVideo === undefined) && (
              <label htmlFor="videoInput" className="w-full md:w-fit">
                <div className="flex flex-col className= p-[2rem 2rem] shadow-lg rounded-lg cursor-pointer"text-center"
                  backgroundColor="white"
                 
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <IoMdVideocam size="1.6rem" />
                  <span>
                    Drag video here or <br /> <strong>browse</strong>
                  </span>
                  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="videoInput"
                    type="file"
                    accept="video/*"
                    name="videoFile"
                    onChange={handleVideoSelect}
                    style={{ display: "none" }} // Hide the actual input
                  />
                </div>
              </label>
            )}

            {selectedVideo && (
              <div className="aspect-video relative">
                <video
                  className="w-72 h-56 object-cover rounded"
                  src={selectedVideo?.preview}
                  controls
                />
                <span
                  className="h-5 w-5 bg-red-50/10 rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
                  onClick={removeVideo}
                >
                  <IoMdClose />
                </span>
              </div>
            )}
          </div>
        </GigCreateLayout>
      </form>
    </FormProvider>
  );
};

export default Step2;
