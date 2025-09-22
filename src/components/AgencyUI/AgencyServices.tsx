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

  const getCategoryList = async () => {
    try {
      const { body, code } = await getCategories();
      if (code === 200) {
        setCategories(
          body?.map((c) => ({
            ...c,
            label: c.category_name,
            value: c.category_name,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSubCategoryList = async () => {
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
        return [];
      });

      setSubCategories(allSubCategory || []);
    } catch (error) {
      console.log(error);
    }
  };

  const existingService = () => {
    if (agency_services?.category?.length) {
      const cData = category?.map((i) => ({
        _id: i._id,
        category_name: i.category_name,
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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { body, code } = await updateAgencyProfile(data);
      if (code === 200) {
        setAgency(body);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setIsModal(false);
    reset();
  };

  useEffect(() => {
    getCategoryList();
    existingService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      getSubCategoryList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  return (
    <>
      <div>
        <div className="flex flex-row items-center mt-4 mb-2">
          <span className="font-semibold text-lg">Services</span>
          <div
            className="flex items-center justify-center w-5 h-5 ml-2 transition duration-300 border rounded cursor-pointer hover:border-primary hover:bg-transparent hover:text-primary"
            onClick={() => {
              setIsModalType("Services");
              setIsModal(true);
            }}
          >
            <RiEdit2Fill />
          </div>
        </div>

        <div className="space-y-2">
          {agency_services?.category?.length ? (
            <div>
              <p className="font-medium">Categories:</p>
              <div className="flex flex-wrap gap-2">
                {agency_services.category.map((cat, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                  >
                    {cat.category_name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {agency_skills?.length ? (
            <div>
              <p className="font-medium">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {agency_skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {!agency_services?.category?.length && !agency_skills?.length && (
            <p className="text-gray-500">No services specified</p>
          )}
        </div>
      </div>

      {isModal && (
        <UniversalModal
          isOpen={isModal}
          onClose={() => setIsModal(false)}
          title="Update Services"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Services & Skills
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Configure your agency's service categories and skills
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Categories</label>
                  <Controller
                    name="agency_services.category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={categories}
                        className="w-full"
                        placeholder="Select categories..."
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Skills</label>
                  <Controller
                    name="agency_skills"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        isCreatable
                        options={skills}
                        className="w-full"
                        placeholder="Select or create skills..."
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? <BtnSpinner /> : "Update Services"}
              </button>
            </div>
          </form>
        </UniversalModal>
      )}
    </>
  );
};

export default AgencyServices;