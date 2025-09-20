"use client";
import React, { useEffect, useState } from "react";
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
  const { agency_services, agency_skills } = agency || {};
  const { category, subCategory } = agency_services || {};

  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [categories, setCategories] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillsIsLoading, setSkillsIsLoading] = useState(false);

  const [isModal, setIsModal] = useState(false);
  const [modalType, setIsModalType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subCLoading, setSubCLoading] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors },
    control,
    reset,
  } = useForm();

  useEffect(() => {
    getCategoryList();
    existingService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categoryList) getSubCategoryList(categoryList);
  }, [categoryList]);

  useEffect(() => {
    if (modalType === "Skills") getAllSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalType]);

  const handleUpdate = (type: string) => {
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
      <div className="flex flex-col">
        {/* Services Header */}
        <div className="flex flex-row items-center mt-4 mb-2">
          <span className="font-semibold">Services</span>
          <div
            className="flex items-center justify-center w-5 h-5 ml-2 transition border rounded cursor-pointer hover:border-primary hover:text-primary"
            onClick={() => handleUpdate("Services")}
          >
            {agency_services ? <RiEdit2Fill /> : <FiPlus />}
          </div>
        </div>

        {/* Services List */}
        <div>
          <div className="flex flex-wrap gap-2">
            {category?.map((i) => (
              <span
                key={i._id}
                className="flex items-center gap-1 px-4 py-1 bg-[#E7F2EB] rounded text-sm"
              >
                <AiOutlineBorderlessTable /> {i.category_name}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {subCategory?.map((d, i) => (
              <span key={i} className="px-4 py-1 bg-[#E7F2EB] rounded text-sm">
                {d.sub_category_name}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Header */}
        <div className="flex flex-row items-center mt-4 mb-2">
          <span className="font-semibold">Skills</span>
          <div
            className="flex items-center justify-center w-5 h-5 ml-2 transition border rounded cursor-pointer hover:border-primary hover:text-primary"
            onClick={() => handleUpdate("Skills")}
          >
            {agency_skills?.length ? <RiEdit2Fill /> : <FiPlus />}
          </div>
        </div>

        {/* Skills List */}
        <div className="flex flex-wrap gap-2">
          {agency_skills?.map((item) => (
            <span
              key={item}
              className="px-4 py-1 bg-[#E7F2EB] rounded text-sm capitalize"
            >
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
                      const matchedSubCategories = subCategoryList.filter(
                        (subCategory) =>
                          newData.some(
                            (category) =>
                              category._id === subCategory.category_id
                          )
                      );
                      setCategoryList(data);
                      setValue("agency_services.category", newData);
                      setSubCategories([]);
                      setValue(
                        "agency_services.subCategory",
                        matchedSubCategories
                      );
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
                      setValue("agency_services.subCategory", newData);
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
                        setSkillList(val);
                        onChange(val.map((c) => c.value));
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

            <div className="mt-10 text-right">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors border rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                {isLoading ? <BtnSpinner /> : "Update"}
              </button>
            </div>
          </form>
        </UniversalModal>
      )}
    </>
  );
};

export default AgencyServices;
