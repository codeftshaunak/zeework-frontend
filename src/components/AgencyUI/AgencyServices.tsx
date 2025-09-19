
"use client";
import React from "react";

import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
} from "@/components/ui/migration-helpers";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineBorderlessTable } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { RiEdit2Fill } from "react-icons/ri";
import Select from "react-select/creatable";
import { updateAgencyProfile } from "../../helpers/APIs/agencyApis";
import {
  getCategories,
  getSkills,
  getSubCategory,
} from "../../helpers/APIs/freelancerApis";
import UniversalModal from "../Modals/UniversalModal";
import BtnSpinner from "../Skeletons/BtnSpinner";
import ErrorMsg from "../utils/Error/ErrorMsg";

const AgencyServices = ({ agency, setAgency }) => {
  // Destructure services and skills from agency
  const { agency_services, agency_skills } = agency || {};
  const { category, subCategory } = agency_services || {};

  // State variables for category, sub-category, and skills lists
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [categories, setCategories] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillsIsLoading, setSkillsIsLoading] = useState(false);

  // Modal state variables
  const [isModal, setIsModal] = useState(false);
  const [modalType, setIsModalType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subCLoading, setSubCLoading] = useState(false);

  // React Hook Form setup
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors },
    control,
    reset,
  } = useForm();

  // Fetch categories and sub-categories
  useEffect(() => {
    getCategoryList();
    existingService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categoryList) getSubCategoryList(categoryList);
  }, [categoryList]);

  // Fetch skills based on modal type
  useEffect(() => {
    if (modalType === "Skills") getAllSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalType]);

  // Handle opening the modal and setting default values
  const handleUpdate = (type) => {
    setIsModal(true);
    setIsModalType(type);

    if (type === "Services") {
      existingService();
      const cData = categoryList?.map((d) => ({
        _id: d._id,
        category_name: d.category_name,
      }));

      const sData = subCategoryList?.map((d) => ({
        _id: d._id,
        sub_category_name: d.sub_category_name,
      }));

      reset({
        agency_services: {
          category: cData,
          subCategory: sData,
        },
      });
    } else {
      const skills = agency_skills?.map((i) => ({ label: i, value: i }));
      setSkillList(skills);
      reset({ agency_skills });
    }
  };

  // Fetch category list
  const getCategoryList = async () => {
    try {
      const { body, code } = await getCategories();
      if (code === 200)
        setCategories(
          body?.map((c) => ({
            ...c,
            label: c.category_name,
            value: c.category_name,
          }))
        );
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch sub-category list based on selected categories
  const getSubCategoryList = async (categories) => {
    setSubCLoading(true);
    try {
      const subCategoryPromises = categories.map((c) => getSubCategory(c._id));

      const subCategoryResponses = await Promise.all(subCategoryPromises);

      const allSubCategory = subCategoryResponses?.flatMap(({ code, body }) => {
        if (code === 200) {
          return body?.map((c) => ({
            ...c,
            label: c.sub_category_name,
            value: c.sub_category_name,
          }));
        }
      });

      setSubCategories(allSubCategory);
    } catch (error) {
      console.log(error);
    }
    setSubCLoading(false);
  };

  // Initialize existing service data
  const existingService = () => {
    setCategoryList(
      category?.map((i) => ({
        ...i,
        label: i.category_name,
        value: i.category_name,
      }))
    );
    setSubCategoryList(
      subCategory?.map((i) => ({
        ...i,
        label: i.sub_category_name,
        value: i.sub_category_name,
      }))
    );
  };

  // Fetch skills data
  const getAllSkills = async () => {
    if (modalType === "Skills") {
      setSkillsIsLoading(true);
      try {
        const skillsPromises = category?.map((c) => getSkills(c._id, c._id));
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
      setSkillsIsLoading(false);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const { body, code } = await updateAgencyProfile(data);

      if (code === 200) setAgency(body);
    } catch (error) {
      console.log(error);
    }
    setIsModal(false);
    setIsLoading(false);
    reset();
  };

  return (
    <>
      <div className="flex flex-col"}}
      >
        <div className="flex flex-row items-center className="mb-[0.5rem] mt-[1rem]">
          <span}
           className="mb-[0] font-semibold">
            Services
          </span>
          <div className="className= flex flex-col backgroundColor= cursor-pointer"rounded w-[20px] border h-[20px] items-center justify-center"
            transition="0.6s ease-in-out"
            _hover={{
              border: "2px solid var(--primarycolor)",
              backgroundColor: "transparent",
              color: "var(--primarycolor)",
            }}
            onClick={() => handleUpdate("Services")}
          >
            {agency_services ? <RiEdit2Fill /> : <FiPlus />}
          </div>
        </div>

        <div>
          <div className="flex gap-2 flex-wrap">
            {category?.map((i) => (
              <span
                key={i._id}
                paddingX="15px"
                paddingY="4px"
                backgroundColor="#E7F2EB"
                className="items-center rounded flex"
              >
                <AiOutlineBorderlessTable /> {i.category_name}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap mt-4">
            {subCategory?.map((d, i) => (
              <span
                key={i}
                paddingX="15px"
                paddingY="4px"
                backgroundColor="#E7F2EB" className="rounded"
              >
                {d.sub_category_name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-row items-center className="mb-[0.5rem] mt-[1rem]">
          <span}
           className="mb-[0] font-semibold">
            Skills
          </span>
          <div className="className= flex flex-col backgroundColor= cursor-pointer"rounded w-[20px] border h-[20px] items-center justify-center"
            transition="0.6s ease-in-out"
            _hover={{
              border: "2px solid var(--primarycolor)",
              backgroundColor: "transparent",
              color: "var(--primarycolor)",
            }}
            onClick={() => handleUpdate("Skills")}
          >
            {agency_skills?.length ? (
              <RiEdit2Fill />
            ) : (
              <FiPlus />
            )}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {agency_skills?.map((item) => (
            <span
              key={item}
              paddingX="15px"
              paddingY="4px"
              backgroundColor="#E7F2EB"
             className="rounded capitalize">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Update Agency Service Modal */}
      {isModal && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={`Update ${modalType}`}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Update services */}
            {modalType === "Services" && (
              <>
                <div>
                  <span className="text-lg">Category</span>
                  <Select
                    {...register("agency_services.category", {
                      required: "Services Category is required",
                    })}
                    isMulti
                    closeMenuOnSelect={false}
                    placeholder="Select Your Category"
                    options={categories}
                    value={categoryList}
                    onChange={(data) => {
                      const newData = data?.map((d) => ({
                        _id: d._id,
                        category_name: d.category_name,
                      }));
                      // Match category _id with subCategory _id
                      const matchedSubCategories = subCategoryList.filter(
                        (subCategory) =>
                          newData.some(
                            (category) =>
                              category._id === subCategory.category_id
                          )
                      );
                      setCategoryList(data);
                      setValue("agency_services.category", newData),
                        setSubCategories([]),
                        setValue(
                          "agency_services.subCategory",
                          matchedSubCategories
                        ),
                        setSubCategoryList(matchedSubCategories);
                      trigger("agency_services.category");
                    }}
                  />
                  {errors.agency_services?.category && (
                    <ErrorMsg msg={errors.agency_services?.category.message} />
                  )}
                </div>

                <div>
                  <span className="text-lg">Sub Category</span>
                  <Select
                    {...register("agency_services.subCategory", {
                      required: "Services Sub-Category is required",
                    })}
                    isMulti
                    closeMenuOnSelect={false}
                    placeholder="Select Your Sub Category"
                    options={subCategories}
                    value={subCategoryList}
                    isDisabled={!categoryList?.length}
                    isLoading={subCLoading}
                    onChange={(data) => {
                      setSubCategoryList(data);
                      const newData = data?.map((d) => ({
                        category_id: d.category_id,
                        sub_category_name: d.sub_category_name,
                      }));
                      setValue("agency_services.subCategory", newData),
                        trigger("agency_services.subCategory");
                    }}
                  />
                  {errors.agency_services?.subCategory && (
                    <ErrorMsg
                      msg={errors.agency_services?.subCategory.message}
                    />
                  )}
                </div>
              </>
            )}
            {/* Update skills */}
            {modalType === "Skills" && (
              <div>
                <Controller
                  control={control}
                  name="agency_skills"
                  rules={{ required: "Skills are required" }}
                  render={({ field: { onChange, ref } }) => (
                    <Select
                      inputRef={ref}
                      closeMenuOnSelect={false}
                      onChange={(val) => {
                        setSkillList(val), onChange(val.map((c) => c.value));
                      }}
                      options={skills}
                      value={skillList}
                      isMulti
                      isLoading={skillsIsLoading}
                    />
                  )}
                />
                {errors.agency_skills && (
                  <ErrorMsg msg={errors.agency_skills.message} />
                )}
              </div>
            )}
            <div className="text-right mt-10">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                isLoading={isLoading}
                loadingText="Updating"
                type="submit"
                spinner={<BtnSpinner />}
              >
                Update
              </button>
            </div>
          </form>
        </UniversalModal>
      )}
    </>
  );
};

export default AgencyServices;
