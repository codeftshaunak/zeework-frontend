import { Button, useToast } from "@chakra-ui/react";
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

const PortfolioProject = ({ type, setIsModal }) => {
  const existProfile = useSelector((state: any) => state.profile.profile);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const animatedComponents = makeAnimated();
  const [options, setOptions] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
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
  const getCategorySkills = async (categoryIds) => {
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...selectedImages, ...files].slice(0, 3);
    setSelectedImages(newImages);
    setValue("images", newImages, { shouldValidate: true });
  };

  const handleImageDelete = (indexToRemove) => {
    const updatedImages = selectedImages.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedImages(updatedImages);
    setValue("images", updatedImages, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
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
        toast({
          title: "Portfolio Added Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
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
                      {...register("project_name")}
                    />
                    {errors.project_name && (
                      <ErrorMsg msg={errors.project_name.message} />
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-[14px] font-[500] text-[#374151] mb-1">
                    Project Description
                  </p>
                  <div>
                    <textarea
                      className="w-full py-1.5 px-2 outline-none border-[1px] rounded-md text-[14px] text-[#000] font-[400] border-[var(--bordersecondary)] -mb-1.5"
                      placeholder="Description"
                      {...register("project_description")}
                    />
                    {errors.project_description && (
                      <ErrorMsg msg={errors.project_description.message} />
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-[14px] font-[500] text-[#374151] mb-1">
                    Technologies
                  </p>
                  <div>
                    <Controller
                      name="technologies"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          isLoading={optionsLoading}
                          options={options}
                          onChange={(selected) => {
                            field.onChange(selected);
                            setValue("technologies", selected);
                            trigger("technologies");
                          }}
                        />
                      )}
                    />
                    {errors.technologies && (
                      <ErrorMsg msg={errors.technologies.message} />
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-[14px] font-[500] text-[#374151] mb-1">
                    Media
                  </p>
                  <div className="w-[100%] p-[12px] outline-none border-[1px] rounded-md flex">
                    <div className="flex">
                      {selectedImages?.map((image, index) => (
                        <div
                          key={index}
                          className="rounded border border-green-300 mr-2 relative"
                        >
                          <img
                            src={URL?.createObjectURL(image)}
                            alt={`Selected ${index + 1}`}
                            className="w-28 h-20 object-cover rounded"
                          />
                          <span
                            className="h-5 w-5 bg-red-50/10 rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
                            onClick={() => handleImageDelete(index)}
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
                  {errors.images && <ErrorMsg msg={errors.images.message} />}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-5 w-full">
              <Button
                isLoading={isLoading}
                loadingText="Adding Project"
                colorScheme="primary"
                type="submit"
                fontSize={"0.9rem"}
                spinner={<BtnSpinner />}
              >
                Add Project
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default PortfolioProject;
