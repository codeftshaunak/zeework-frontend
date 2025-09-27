
"use client";
import { toast } from "@/lib/toast";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { createAgency } from "../../helpers/APIs/agencyApis";
import { getCategories, getCountries, getSubCategory } from "../../helpers/APIs/freelancerApis";
import BtnSpinner from "../Skeletons/BtnSpinner";
import ErrorMsg from "../utils/Error/ErrorMsg";

const CreateForm = () => {
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();
  const { getUserDetails } = useContext(CurrentUserContext);
  const selectedCategory = watch("agency_services.category");
  const [countries, setCountries] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [subCLoading, setSubCLoading] = useState(false);
  const router = useRouter();

  const getCountriesList = async () => {
    try {
      const { code, body } = await getCountries();
      if (code === 200)
        setCountries(
          body?.map((country) => ({
            ...country,
            label: country.name,
            value: country.name,
          }))
        );
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryList = async () => {
    try {
      const { body, code } = await getCategories();
      if (code === 200)
        setCategory(
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

  useEffect(() => {
    getCountriesList();
    getCategoryList();
  }, []);

  useEffect(() => {
    if (selectedCategory) getSubCategoryList(selectedCategory);
  }, [selectedCategory]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const { code, msg } = await createAgency(data);
      if (code === 200) {
        toast.success("Agency Profile Created Successfully.");
        getUserDetails();

        router.back();
      } else {
        toast.warning(msg);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-row items-center w-full m-[auto]">
      <div
        className="m-[auto] rounded"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full shadow p-5 sm:p-9 rounded-lg bg-white"
        >
          <div>
            <span>Agency Name</span>
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...register("agency_name", {
                required: "Agency Name is required",
              })}
              placeholder="ZeeWork"
            />

            {errors.agency_name && (
              <ErrorMsg msg={errors.agency_name.message} />
            )}
          </div>
          <div>
            <span>Agency Overview</span>
            <textarea
              {...register("agency_overview", {
                required: "Agency Overview is required",
              })}
              placeholder="This is an agency with highly creating value. We provide services to people who need to start there business."
            />

            {errors.agency_overview && (
              <ErrorMsg msg={errors.agency_overview.message} />
            )}
          </div>
          <div>
            <span>Agency Tagline</span>
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...register("agency_tagline", {
                required: "Agency Tagline is required",
              })}
              placeholder="We are working for create impact on the world"
            />

            {errors.agency_tagline && (
              <ErrorMsg msg={errors.agency_tagline.message} />
            )}
          </div>
          <div>
            <span>Agency Location</span>
            <Select
              {...register("agency_location", {
                required: "Agency Location is required",
              })}
              placeholder="Select Location"
              options={countries}
              onChange={(data) => {
                setValue("agency_location", data), trigger("agency_location");
              }}
            />

            {errors.agency_location && (
              <ErrorMsg msg={errors.agency_location.message} />
            )}
          </div>
          <div>
            <span>Services Category</span>
            <Select
              {...register("agency_services.category", {
                required: "Services Category is required",
              })}
              isMulti
              closeMenuOnSelect={false}
              placeholder="Select Your Category"
              options={category}
              onChange={(data: any) => {
                const newData = (data as any[])?.map((d: any) => ({
                  _id: d._id,
                  category_name: d.category_name,
                }));
                setValue("agency_services.category", newData),
                  setValue("agency_services.subCategory", ""),
                  setSubCategories([]),
                  trigger("agency_services.category");
              }}
            />

            {errors.agency_services?.category && (
              <ErrorMsg msg={errors.agency_services?.category.message} />
            )}
          </div>

          <div>
            <span>Services Sub-Category</span>
            <Select
              {...register("agency_services.subCategory", {
                required: "Services Sub-Category is required",
              })}
              isMulti
              closeMenuOnSelect={false}
              placeholder="Select Your Sub Category"
              options={subCategories}
              isDisabled={!selectedCategory?.length}
              isLoading={subCLoading}
              onChange={(data) => {
                const newData = (data as any[])?.map((d: any) => ({
                  category_id: d.category_id,
                  sub_category_name: d.sub_category_name,
                }));
                setValue("agency_services.subCategory", newData),
                  trigger("agency_services.subCategory");
              }}
            />

            {errors.agency_services?.subCategory && (
              <ErrorMsg msg={errors.agency_services?.subCategory.message} />
            )}
          </div>

          <div className="text-right">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              isLoading={loading}
              loadingText="Submit"
              type="submit"
              spinner={<BtnSpinner />}
              marginTop={3}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
