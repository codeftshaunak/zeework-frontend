"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "@/lib/toast";
import {
  RiDeleteBin2Fill,
  RiEdit2Fill,
  RiInformationFill,
} from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import UniversalModal from "../Modals/UniversalModal";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { FaCloudUploadAlt, FaStar } from "react-icons/fa";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnSpinner from "../Skeletons/BtnSpinner";
import ErrorMsg from "../utils/Error/ErrorMsg";
import { IoMdClose } from "react-icons/io";
import { getSkills } from "../../helpers/APIs/freelancerApis";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAgencyProject,
  uploadSingleImage,
} from "../../helpers/APIs/agencyApis";
import { agencyData } from "../../redux/authSlice/profileSlice";
import { compressImageToWebP } from "../../helpers/manageImages/imageCompressed";

// TypeScript interfaces
interface ProjectInfo {
  project_name: string;
  project_images: string[];
  project_description: string;
  technologies: string[];
  _id: string;
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
  project_images: ImageFile[];
}

interface ProjectCardProps {
  info: ProjectInfo;
  setIsDeleteAgencyId: (id: string) => void;
  isPrivate: boolean;
  skills: any;
}

interface RootState {
  profile: {
    agency: {
      agency_services: {
        category: Array<{ _id: string }>;
      };
    };
  };
}

const validationSchema = Yup.object().shape({
  project_name: Yup.string().required("Project Name is required"),
  project_description: Yup.string().required("Project Description is required"),
  technologies: Yup.array().min(1, "At least one technology is required"),
  project_images: Yup.array()
    .min(1, "At least one image is required")
    .required("Image is required"),
});

const ProjectCard: React.FC<ProjectCardProps> = ({ info, setIsDeleteAgencyId, isPrivate, skills }) => {
  const {
    project_name,
    project_images,
    project_description,
    technologies,
    _id,
  } = info || {};
  const [isHover, setIsHover] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [skillList, setSkillList] = useState<SkillOption[]>([]);
  const agency_services = useSelector(
    (state: RootState) => state.profile.agency.agency_services
  );

  const dispatch = useDispatch();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    getValues,
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
      project_images: project_images?.map((i) => ({ preview: i })) || [],
    },
  });

  const selectedImages = getValues().project_images || [];

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files);
    const newImages = [
      ...selectedImages,
      { file: files[0], preview: URL.createObjectURL(files[0]) },
    ].slice(0, 3);

    setValue("project_images", newImages, { shouldValidate: true });
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setValue("project_images", updatedImages, {
      shouldValidate: true,
    });
  };

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
    setIsLoading(true);
    try {
      const imagesUrl = await uploadImages();
      const updatedProject = {
        ...data,
        technologies: data.technologies.map((item) => item.label),
        project_images: [
          ...selectedImages.filter((i) => !i.file).map((i) => i.preview),
          ...imagesUrl,
        ],
      };

      const { code, msg, body, message } = await updateAgencyProject({
        project_id: _id,
        project: updatedProject,
      });

      if (code === 200) dispatch(agencyData({ agency: body }));

      toast.default(code ? msg : message);
    } catch (error) {
      console.error(error);
    }
    setIsModal(false);
    setIsLoading(false);
  };

  const getAllSkills = async () => {
    try {
      const skillsPromises = agency_services?.category?.map((c: { _id: string }) =>
        getSkills(c._id)
      );
      const skillsResponses = await Promise.all(skillsPromises);
      const skills = skillsResponses?.flatMap(({ code, body }: any) => {
        if (code === 200) {
          return body?.map((item: any) => ({
            label: item.skill_name,
            value: item.skill_name,
          }));
        }
        return [];
      }).filter(Boolean);

      setSkillList(skills);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!skillList?.length) getAllSkills();
  }, []);

  return (
    <>
      <div className="w-full p-3 border rounded-md -z-0">
        <div
          className="h-40 sm:h-48 w-full bg-cover rounded-md relative transition duration-300 overflow-hidden"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <img
            src={project_images?.[0]}
            alt=""
            className="h-40 sm:h-48 w-full bg-cover object-cover rounded-md"
          />
          {isHover && (
            <div className="h-40 sm:h-48 w-full absolute top-0 left-0 bg-black/30 transition duration-300">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2">
                <div
                  className="w-10 h-10 bg-white flex items-center justify-center rounded cursor-pointer hover:border-2 hover:border-[var(--primarycolor)] hover:text-[var(--primarycolor)] transition-all duration-300"
                  onClick={() => {
                    setModalType("details");
                    setIsModal(true);
                  }}
                >
                  <RiInformationFill />
                </div>
                {!isPrivate && (
                  <>
                    <div
                      className="w-10 h-10 bg-white flex items-center justify-center rounded cursor-pointer hover:border-2 hover:border-[var(--primarycolor)] hover:text-[var(--primarycolor)] transition-all duration-300"
                      onClick={() => {
                        reset({
                          project_name: project_name || "",
                          project_description: project_description || "",
                          technologies:
                            technologies?.map((item) => ({
                              label: item,
                              value: item,
                            })) || [],
                          project_images:
                            project_images?.map((i) => ({ preview: i })) || [],
                        });
                        setModalType("update");
                        setIsModal(true);
                      }}
                    >
                      <RiEdit2Fill />
                    </div>
                    <div
                      className="w-10 h-10 bg-white flex items-center justify-center rounded cursor-pointer hover:border-2 hover:border-[var(--primarycolor)] hover:text-[var(--primarycolor)] transition-all duration-300"
                      onClick={() => setIsDeleteAgencyId(_id)}
                    >
                      <RiDeleteBin2Fill />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <h4 className="text-lg sm:text-xl font-semibold capitalize text-gray-800 mt-1 sm:h-12">
          {project_name.slice(0, 50)}
        </h4>
      </div>

      {/* View Project Details */}
      {modalType === "details" && (
        <UniversalModal isModal={isModal} setIsModal={setIsModal} size="4xl">
          <p
            className={`text-2xl sm:text-4xl font-semibold pb-3 px-5 -mx-6 ${
              isScrolled && "border-b shadow"
            }`}
          >
            {project_name}
          </p>
          <div
            onScroll={(e: React.UIEvent<HTMLDivElement>) => {
              setIsScrolled((e.target as HTMLDivElement).scrollTop !== 0);
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
                {project_images?.length &&
                  project_images?.map((img, idx) => (
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
            </div>
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
              {showFullDescription && (
                <button
                  className="text-blue-500 cursor-pointer"
                  onClick={toggleDescription}
                >
                  See less
                </button>
              )}
            </div>
          </div>
        </UniversalModal>
      )}

      {/* Update Project Modal */}
      {modalType === "update" && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          title="Update Project"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col">
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[14px] font-[500] text-[#374151] mb-2">
                    Project Name
                  </p>
                  <div>
                    <input
                      type="text"
                      className="w-full py-1.5 px-2 outline-none text-[14px] text-[#000] font-[400] border border-[var(--bordersecondary)] rounded-md"
                      placeholder="Project Name"
                      {...register("project_name")}
                    />
                    {errors.project_name && (
                      <ErrorMsg msg={errors.project_name.message as string} />
                    )}
                  </div>
                  <br />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[14px] font-[500] text-[#374151] mb-2">
                    Project Description
                  </p>
                  <div>
                    <textarea
                      type="text"
                      className="w-full py-1.5 px-2 outline-none text-[14px] text-[#000] font-[400] border border-[var(--bordersecondary)] rounded-md"
                      placeholder="Description"
                      {...register("project_description")}
                      rows={3}
                    />
                    {errors.project_description && (
                      <ErrorMsg
                        msg={errors.project_description.message as string}
                        className="-mt-1"
                      />
                    )}
                  </div>
                  <br />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[14px] font-[500] text-[#374151] mb-2">
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
                          options={skillList}
                          isMulti
                          value={field.value || []}
                        />
                      )}
                    />
                    {errors.technologies && (
                      <ErrorMsg msg={errors.technologies.message as string} />
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-[2px] mt-6">
                    <p className="text-[14px] font-[500] text-[#374151] mb-2">
                      Media
                    </p>
                    <div className="w-[100%] p-[12px] outline-none border-[1px] border-[var(--bordersecondary)] rounded-md flex">
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
                                {selectedImages?.length > 0
                                  ? "Add More"
                                  : "Add"}
                              </span>
                            </div>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.project_images && (
                    <ErrorMsg msg={errors.project_images.message as string} />
                  )}
                </div>
              </div>
            </div>
            <div className="text-right mt-10">
              <button
                disabled={isLoading}
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <BtnSpinner />
                    <span className="ml-2">Submit</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </UniversalModal>
      )}
    </>
  );
};

export default ProjectCard;
