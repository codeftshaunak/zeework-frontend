"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { toast } from "@/lib/toast";
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt, FaStar } from "react-icons/fa";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import {
  deleteFreelancerPortfolio,
  getSkills,
  updatePortfolioProject,
} from "../../../../helpers/APIs/freelancerApis";
import { profileData } from "../../../../redux/authSlice/profileSlice";
import UniversalModal from "../../../Modals/UniversalModal";
import BtnSpinner from "../../../Skeletons/BtnSpinner";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMsg from "../../../utils/Error/ErrorMsg";
import { uploadSingleImage } from "../../../../helpers/APIs/agencyApis";
import { compressImageToWebP } from "../../../../helpers/manageImages/imageCompressed";

// TypeScript interfaces
interface Portfolio {
  project_name: string;
  attachements: string[];
  project_description: string;
  technologies: string[];
  _id: string;
}

interface Category {
  _id: string;
  name: string;
}

interface PortfolioCardProps {
  portfolio: Portfolio;
  categories: Category[];
  viewAs?: boolean;
}

interface FormData {
  project_name: string;
  project_description: string;
  technologies: { label: string; value: string }[];
  attachements: { file?: File; preview: string }[];
}

const validationSchema = yup.object().shape({
  project_name: yup.string().required("Project Name is required"),
  project_description: yup.string().required("Project Description is required"),
  technologies: yup.array().min(1, "Select at least one technology"),
  attachements: yup
    .array()
    .min(1, "At least one image is required")
    .max(3, "Maximum three photos are allowed")
    .required("Image is required"),
});

const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio, categories, viewAs }) => {
  const { project_name, attachements, project_description, technologies, _id } =
    portfolio;

  const [isHover, setIsHover] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [options, setOptions] = useState(null);
  const dispatch = useDispatch();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      project_name: project_name || "",
      project_description: project_description || "",
      technologies:
        technologies?.map((item) => ({
          label: item,
          value: item,
        })) || [],
      attachements: attachements?.map((i) => ({ preview: i })) || [],
    },
  });

  const selectedImages = getValues().attachements || [];

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Handle Media Image Uploaded
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files);
    const newImages = [
      ...selectedImages,
      { file: files[0], preview: URL.createObjectURL(files[0]) },
    ].slice(0, 3);
    setValue("attachements", newImages, { shouldValidate: true });
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setValue("attachements", updatedImages, { shouldValidate: true });
  };

  // get skills Methods
  const getCategorySkills = async () => {
    try {
      const validCategoryIds = categories?.filter((category) => category._id);
      const promises = validCategoryIds?.map(async ({ _id }) => {
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
  };

  // handle to delete portfolio
  const handleDeletePortfolio = async () => {
    setIsLoading(true);
    try {
      const { body, code, msg } = await deleteFreelancerPortfolio(_id);
      if (code === 200) {
        dispatch(profileData({ profile: body }));
        toast.success(msg);
      } else {
        toast.warning(msg);
      }
    } catch (error) {
      console.error(error);
      toast.warning("Failed to delete portfolio!");
    }
    setIsLoading(false);
    setIsDeleteModal(false);
  };

  useEffect(() => {
    if (isModal) getCategorySkills();
  }, [isModal]);

  const uploadImages = async () => {
    try {
      const imagesUrl = [];

      for (const image of selectedImages) {
        if (!image.file) continue;

        const compressedImage = await compressImageToWebP(image.file);

        const formData = new FormData();
        formData.append("imageFile", compressedImage);

        const response = await uploadSingleImage(formData);
        if (response.code === 200) {
          imagesUrl.push(response.body.imageUrl);
        }
      }

      return imagesUrl;
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: FormData) => {
    setUpdateLoading(true);
    try {
      const imagesUrl = await uploadImages();
      const updatedProject = {
        ...data,
        technologies: data.technologies.map((item) => item.label),
        attachements: [
          ...selectedImages.filter((i) => !i.file).map((i) => i.preview),
          ...imagesUrl,
        ],
      };

      const { code, msg, body, message } = await updatePortfolioProject({
        project_id: _id,
        project: updatedProject,
      });

      if (code === 200) dispatch(profileData({ profile: body }));

      toast.default(code ? msg : message);
    } catch (error) {
      console.error(error);
    }

    setIsModal(false);
    setUpdateLoading(false);
  };

  return (
    <>
      <div
        className="flex flex-col rounded-md -z-10 relative overflow-hidden w-full border"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="overflow-hidden">
          <img
            src={attachements?.[0]}
            className="h-48 object-cover rounded-t w-full"
          />
        </div>
        <p className="text-[14px] text-[var(--primarycolor)] cursor-pointer font-[600] border px-3 py-2 rounded-b">
          {project_name}
        </p>
        {isHover && !viewAs && (
          <Box
            transition="0.6s ease-in-out"
            className="h-48 w-full absolute top-0 left-0 bg-black/30 transition duration-300 z-10"
          >
            <HStack
              transform={"translate(-50%, -50%)"}
              top="50%"
              left="50%"
             className="absolute">
              <VStack
                backgroundColor="white"
                w="40px"
                className="items-center justify-center rounded cursor-pointer"
                transition="0.6s ease-in-out"
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  // backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                onClick={() => setIsDetails(true)}
              >
                <BsFillInfoCircleFill />
              </VStack>
              <VStack
                backgroundColor="white"
                w="40px"
                className="items-center justify-center rounded cursor-pointer"
                transition="0.6s ease-in-out"
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  // backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                onClick={() => {
                  reset({
                    project_name,
                    project_description,
                    technologies: technologies?.map((item) => ({
                      label: item,
                      value: item,
                    })),
                    attachements: attachements?.map((i) => ({ preview: i })),
                  }),
                    setIsModal(true);
                }}
              >
                <RiEdit2Fill />
              </VStack>
              <VStack
                backgroundColor="white"
                w="40px"
                className="items-center justify-center rounded cursor-pointer"
                transition="0.6s ease-in-out"
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  // backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                onClick={() => setIsDeleteModal(true)}
              >
                <RiDeleteBin2Fill />
              </VStack>
            </HStack>
          </Box>
        )}
      </div>

      {/* Update Portfolio */}
      <UniversalModal
        isModal={isModal}
        setIsModal={setIsModal}
        title="Update Portfolio Project"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-[2px]">
              <p className="text-[14px] font-[500] text-[#374151]">
                Project Name
              </p>
              <div>
                <input
                  type="text"
                  {...register("project_name")}
                  className="w-full py-1.5 px-2 outline-none text-[14px] text-[#000] font-[400] border border-[var(--bordersecondary)] rounded-md"
                  placeholder="Project Name"
                />
                {errors.project_name && (
                  <ErrorMsg msg={errors.project_name.message} />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-[14px] font-[500] text-[#374151]">
                Project Description
              </p>
              <div>
                <textarea
                  {...register("project_description")}
                  className="w-full py-1.5 px-2 outline-none text-[14px] text-[#000] font-[400] border border-[var(--bordersecondary)] rounded-md"
                  placeholder="Description"
                  rows={3}
                />
                {errors.project_description && (
                  <ErrorMsg
                    msg={errors.project_description.message}
                    className="-mt-1"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-[14px] font-[500] text-[#374151]">
                Technologies
              </p>
              <div>
                <Controller
                  name="technologies"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Select
                      closeMenuOnSelect={false}
                      onChange={(val) => field.onChange(val)}
                      options={options}
                      isMulti
                      value={field.value || []}
                    />
                  )}
                />
                {errors.technologies && (
                  <ErrorMsg msg={errors.technologies.message} />
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-[2px]">
                <p className="text-[14px] font-[500] text-[#374151]">Media</p>
                <div className="w-[100%] p-[12px] outline-none border border-[var(--bordersecondary)] rounded-md flex">
                  <div className="flex">
                    {selectedImages?.map((image, index) => (
                      <div
                        key={image.preview}
                        className="rounded border border-green-300 mr-2 relative"
                      >
                        <img
                          src={image.preview}
                          alt={`Selected ${index + 1}`}
                          className="w-28 h-20 object-cover rounded"
                        />
                        <span
                          className="h-5 w-5 bg-red-50/10 rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
                          onClick={() => {
                            handleImageDelete(index);
                          }}
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
                        onChange={handleImageUpload}
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
                </div>
              </div>
              {errors.attachements && (
                <ErrorMsg msg={errors.attachements.message} />
              )}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={updateLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {updateLoading ? (
                <>
                  <BtnSpinner />
                  <span className="ml-2">Updating</span>
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </UniversalModal>

      {/* Delete Portfolio */}
      <UniversalModal isModal={isDeleteModal} setIsModal={setIsDeleteModal}>
        <p className="text-xl sm:text-2xl font-semibold">
          Are you sure you want to delete this portfolio?
        </p>
        <br />
        <p>
          This action will delete &quot;{project_name}&quot; from all of your
          profiles. Are you sure to want to delete this portfolio project?
        </p>

        <div className="flex gap-5 sm:gap-10 mt-8 sm:mt-20">
          <button
            onClick={() => setIsDeleteModal(false)}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            No, I don&apos;t want to Delete
          </button>
          <button
            disabled={isLoading}
            onClick={handleDeletePortfolio}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <BtnSpinner />
                <span className="ml-2">Deleting..</span>
              </>
            ) : (
              "Yes, I want to Delete"
            )}
          </button>
        </div>
      </UniversalModal>

      {/* View Portfolio Details */}
      <UniversalModal isModal={isDetails} setIsModal={setIsDetails} size="4xl">
        <p
          className={`text-2xl sm:text-4xl font-semibold pb-3 px-5 -mx-6 ${
            isScrolled && "border-b shadow"
          }`}
        >
          {project_name}
        </p>
        <div
          onScroll={(e) => {
            setIsScrolled(e.target.scrollTop !== 0);
          }}
          className={`overflow-y-scroll h-[600px] bg-white}`}
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::WebkitScrollbar": {
              display: "none",
            },
          }}
        >
          <div className="rounded-lg overflow-hidden relative">
            <Swiper
              slidesPerView={1}
              freeMode={true}
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
            >
              {attachements?.length &&
                attachements?.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img src={img} className="w-full h-fit" />
                  </SwiperSlide>
                ))}
            </Swiper>
            <>
              <button
                ref={prevRef}
                className="absolute top-1/2 left-0 z-20 bg-green-100 rounded-full shadow -mt-4"
              >
                <IoArrowBack className="text-4xl p-2 text-green-500" />
              </button>
              <button
                ref={nextRef}
                className="absolute top-1/2 right-0 z-20 bg-green-100 rounded-full shadow -mt-4"
              >
                <IoArrowForwardSharp className="text-4xl p-2 text-green-500" />
              </button>
            </>
          </div>
          <div className="flex gap-3 mt-5 flex-wrap">
            {technologies?.map((item) => (
              <span
                key={item}
                className="py-1 px-3 h-fit bg-slate-100 rounded-md"
              >
                {item}
              </span>
            ))}
          </div>{" "}
          <div>
            <p className="mt-8 font-semibold text-lg">Description:</p>
            {showFullDescription ? (
              <>{project_description}</>
            ) : (
              <>
                {project_description.length > 100 ? (
                  <>
                    {project_description.slice(0, 100)}{" "}
                    <button
                      className="text-blue-500 cursor-pointer"
                      onClick={toggleDescription}
                    >
                      See more
                    </button>
                  </>
                ) : (
                  <>{project_description}</>
                )}
              </>
            )}
          </div>
        </div>
      </UniversalModal>
    </>
  );
};

export default PortfolioCard;
