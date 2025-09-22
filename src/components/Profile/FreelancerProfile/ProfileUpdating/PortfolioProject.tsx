"use client";

import Image from "next/image";
import { toast } from "@/lib/toast";
import { FaCloudUploadAlt, FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSkills } from "../../../../helpers/APIs/freelancerApis";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { profileData } from "../../../../redux/authSlice/profileSlice";
import { updateFreelancerProfile } from "../../../../helpers/APIs/userApis";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnSpinner from "../../../Skeletons/BtnSpinner";
import ErrorMsg from "../../../utils/Error/ErrorMsg";
import { compressImageToWebP } from "../../../../helpers/manageImages/imageCompressed";
import { portfolioSchema } from "../../../../schemas/freelancer-profile-schema";

// TypeScript interfaces
interface PortfolioProjectProps {
  type: string;
  setIsModal: (isOpen: boolean) => void;
}

interface SkillOption {
  label: string;
  value: string;
}

interface ImageFile {
  file?: File;
  preview: string;
}

interface FormData {
  project_name: string;
  project_description: string;
  technologies: SkillOption[];
  attachements: ImageFile[];
}

interface RootState {
  profile: {
    profile: {
      categories: unknown[];
    };
  };
}

const PortfolioProject: React.FC<PortfolioProjectProps> = ({ type, setIsModal }) => {
  const existProfile = useSelector((state: RootState) => state.profile.profile);
  const [isLoading, setIsLoading] = useState(false);
  const animatedComponents = makeAnimated();
  const [options, setOptions] = useState<SkillOption[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(portfolioSchema),
  });

  // get skills of profile categories
  const getCategorySkills = async (categoryIds: unknown[]) => {
    try {
      if (!categoryIds) {
        console.error("No category IDs provided.");
        return;
      }

      const validCategoryIds = categoryIds.filter((category) => category._id);
      const promises = validCategoryIds.map(async ({ _id }) => {
        try {
          const { body, code } = await getSkills(_id);
          if (code === 200) {
            return body?.map((item) => ({
              value: item?.skill_name,
              label: item?.skill_name,
              _id: item?._id,
            }));
          } else {
            return [];
          }
        } catch (error) {
          console.error(`Error fetching skills for category ID ${_id}:`, error);
          return [];
        }
      });

      const results = await Promise.all(promises);
      const newSkillOptions = results.flat();

      setOptions(newSkillOptions);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
    setOptionsLoading(false);
  };

  useEffect(() => {
    if (existProfile?.categories) {
      getCategorySkills(existProfile.categories);
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    const newImages = [...selectedImages, ...files].slice(0, 3);
    setSelectedImages(newImages);
    setValue("images", newImages, { shouldValidate: true });
  };

  const handleImageDelete = (indexToRemove: number) => {
    const updatedImages = selectedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedImages(updatedImages);
    setValue("images", updatedImages, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const formData = new FormData();

    // Compress and append images to FormData
    for (const file of data.images) {
      const compressedImage = await compressImageToWebP(file);
      formData.append(`file`, compressedImage, file.name);
    }

    data.technologies.forEach((tech) => {
      formData.append("portfolio[technologies]", tech.value);
    });

    formData.append("portfolio[project_name]", data.project_name);
    formData.append("portfolio[project_description]", data.project_description);

    try {
      const response = await updateFreelancerProfile(formData);

      if (response.code === 200) {
        toast.success("Portfolio Added Successfully");
        dispatch(profileData({ profile: response?.body }));
        setIsModal(false);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      {type === "Add New Project" && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <p className="text-[14px] font-[500] text-[#374151] mb-1">
                    Project Name
                  </p>
                  <div>
                    <input
                      type="text"
                      className="w-full py-1.5 px-2 outline-none border-[1px] rounded-md text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)]"
                      placeholder="Project Name"

                            setValue("technologies", selected);
                            trigger("technologies");

};

export default PortfolioProject;
