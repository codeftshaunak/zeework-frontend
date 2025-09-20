"use client";
import React from "react";

import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCloudUploadAlt, FaStar } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Select from "react-select/creatable";
import {
  createAgencyProject,
  deleteAgencyProject,
} from "../../helpers/APIs/agencyApis";
import { getSkills } from "../../helpers/APIs/freelancerApis";
import { uploadImages } from "../../helpers/APIs/gigApis";
import ProjectCard from "./ProjectCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from "swiper/modules";

import UniversalModal from "../Modals/UniversalModal";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { compressImageToWebP } from "../../helpers/manageImages/imageCompressed";

const AgencyProjects = ({ agency, setAgency }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, register, handleSubmit, reset } = useForm();
  const [isModal, setIsModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [skills, setSkills] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isDeleteAgencyId, setIsDeleteAgencyId] = useState(null);
  const { agency_services } = agency || {};

  const onSubmit = async (data) => {
    setIsLoading(true);
    const imagesFormData = new FormData();

    // Compress and append images to FormData
    for (const image of selectedImages) {
      const compressedImage = await compressImageToWebP(image);
      if (compressedImage) imagesFormData.append("imageFiles", compressedImage);
    }

    try {
      const { body, code } = await createAgencyProject(data);
      const portfolio = body?.agency_portfolio?.slice(-1)[0];
      if (code === 200) {
        imagesFormData.append("ref", "agency_project_portfolio");
        imagesFormData.append("ref_id", body._id);
        if (portfolio?._id) {
          const response = await uploadImages(
            imagesFormData,
            `?portfolio_id=${portfolio._id}`
          );
          setAgency(response.body || body);
        }
      }
      setIsModal(false);
      // setAgency(new Date());
      setSelectedImages([]);
      setIsLoading(false);
    } catch (error) {
      setIsModal(false);
      setSelectedImages([]);
      setIsLoading(false);
    }
    reset();
  };

  const getAllSkills = async () => {
    try {
      const skillsPromises = agency_services?.category?.map((c) =>
        getSkills(c._id)
      );
      const skillsResponses = await Promise.all(skillsPromises);
      const skills = skillsResponses?.flatMap(({ code, body }) => {
        if (code === 200) {
          return body?.map((item) => ({
            label: item.skill_name,
            value: item.skill_name,
          }));
        }
      });

      setSkills(skills);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (skills?.length < 1) getAllSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agency]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImages((prev) => [...prev, file]);
  };

  const handleImageDelete = (indexToRemove) => {
    const updatedImages = selectedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedImages(updatedImages);
  };

  const handleDeleteAgency = async () => {
    setIsLoading(true);
    try {
      const { body, code } = await deleteAgencyProject(isDeleteAgencyId);
      if (code === 200) setAgency(body);
    } catch (error) {
      console.error(error);
    }
    setIsDeleteAgencyId(null);
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-full mt-[2rem]">
        <div className="flex flex-row items-center">
          <span className="mb-[0px] font-semibold">Projects</span>
          <div
            className="flex flex-col cursor-pointer rounded w-[30px] border h-[30px] items-center justify-center transition-all duration-300 hover:border-2 hover:border-green-500 hover:bg-transparent hover:text-green-500"
            onClick={() => setIsModal(true)}
          >
            <FiPlus />
          </div>
        </div>
        {agency?.agency_portfolio?.length > 0 ? (
          <div className="relative z-0 mt-3">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              breakpoints={{
                640: {
                  width: 640,
                  slidesPerView: 1,
                },

                768: {
                  width: 768,
                  slidesPerView: 2,
                },
              }}
              spaceBetween={30}
            >
              {agency?.agency_portfolio
                ?.slice()
                .reverse()
                ?.map((item) => (
                  <SwiperSlide key={item._id}>
                    <ProjectCard
                      info={item}
                      setIsDeleteAgencyId={setIsDeleteAgencyId}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
            {agency?.agency_portfolio?.length > 1 && (
              <>
                <button
                  ref={prevRef}
                  className="absolute z-20 -mt-4 bg-green-100 rounded-full shadow top-1/2 -left-2"
                >
                  <IoArrowBack className="p-2 text-4xl text-green-500" />
                </button>
                <button
                  ref={nextRef}
                  className="absolute z-20 -mt-4 bg-green-100 rounded-full shadow top-1/2 -right-2"
                >
                  <IoArrowForwardSharp className="p-2 text-4xl text-green-500" />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="mt-[20px]">
            <img src="/images/404not-added.png" className="m-[auto]"></img>
            <span className="mt-[1.5rem] font-semibold text-center">
              You haven&apos;t added any projects yet!
            </span>
            <span className="text-base text-center">
              Showcase your best work here.
            </span>
          </div>
        )}
      </div>

      {/* Only New Project Creating UI */}
      <UniversalModal
        isModal={isModal}
        setIsModal={setIsModal}
        title="Create Portfolio"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col">
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151] mb-2">
                  Project Name
                </p>
                <div className="w-[100%] py-[2px] px-[12px] outline-none border-[1px] border-[var(--bordersecondary)] rounded-md">
                  <input
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)]"
                    placeholder="Project Name"
                    required
                    {...register("project_name")}
                  />
                </div>
                <br />
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151] mb-2">
                  Project Description
                </p>
                <div className="w-[100%] py-[2px] px-[12px] outline-none border-[1px] border-[var(--bordersecondary)] rounded-md">
                  <textarea
                    type="text"
                    className="w-full py-1.5 outline-none text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)]"
                    placeholder="Description"
                    required
                    {...register("project_description")}
                  />
                </div>
                <br />
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151] mb-2">
                  Technologies
                </p>
                <div className="w-[100%]">
                  <Controller
                    control={control}
                    name="technologies"
                    render={({ field: { onChange, ref } }) => (
                      <Select
                        inputRef={ref}
                        required
                        closeMenuOnSelect={false}
                        onChange={(val) => onChange(val.map((c) => c.value))}
                        options={skills}
                        isMulti
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[2px] mt-6">
                <p className="text-[14px] font-[500] text-[#374151] mb-2">
                  Media
                </p>
                <div className="w-[100%] p-[12px] outline-none border-[1px] border-[var(--bordersecondary)] rounded-md flex">
                  <div className="flex">
                    {selectedImages?.map((image, index) => (
                      <div
                        key={index}
                        className="relative mr-2 border border-green-300 rounded"
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Selected ${index + 1}`}
                          className="object-cover h-20 rounded w-28"
                        />
                        <span
                          className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 rounded-full cursor-pointer bg-red-50/10 backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
                          onClick={() => handleImageDelete(index)}
                        >
                          <IoMdClose />
                        </span>
                        {index === 0 && (
                          <div className="absolute bottom-0 left-0 flex items-center justify-center w-full gap-1 text-sm text-white bg-black/10 backdrop-blur backdrop-filter">
                            <FaStar />
                            <span>Primary</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {selectedImages.length < 3 && (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        name="file"
                        multiple
                        style={{ display: "none" }}
                        id="fileInput"
                        disabled={selectedImages.length >= 3}
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
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 text-right">
            <button
              className="inline-flex items-center justify-center text-sm font-medium transition-colors rounded-md hover:bg-accent hover:text-accent-foreground"
              isLoading={isLoading}
              loadingText="Submit"
              type="submit"
              spinner={<BtnSpinner />}
            >
              Submit
            </button>
          </div>
        </form>
      </UniversalModal>

      {/* Delete Project */}
      <UniversalModal
        isModal={isDeleteAgencyId}
        setIsModal={setIsDeleteAgencyId}
      >
        <p className="text-xl font-semibold sm:text-2xl">
          Are you sure you want to delete this project?
        </p>

        <div className="flex gap-5 mt-8 sm:gap-10 sm:mt-20">
          <button
            className="inline-flex items-center justify-center w-full text-sm font-medium transition-colors rounded-md hover:bg-accent hover:text-accent-foreground"
            onClick={() => setIsDeleteAgencyId(null)}
          >
            No, I don&apos;t want to Delete
          </button>
          <button
            className="inline-flex items-center justify-center w-full text-sm font-medium transition-colors rounded-md hover:bg-accent hover:text-accent-foreground"
            isLoading={isLoading}
            loadingText=" Yes, I want to Delete"
            onClick={handleDeleteAgency}
            spinner={<BtnSpinner />}
          >
            Yes, I want to Delete
          </button>
        </div>
      </UniversalModal>
    </>
  );
};

export default AgencyProjects;
