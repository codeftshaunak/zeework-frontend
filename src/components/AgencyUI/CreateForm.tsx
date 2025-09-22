
"use client";
import React from "react";
import { toast } from "@/lib/toast";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  HStack,
  Box,
  Input,
  Textarea,
  Button,
} from "@/components/ui/migration-helpers";
import { getCategories, getCountries } from "../../helpers/APIs/freelancerApis";
import { getSubCategory } from "../../helpers/APIs/freelancerApis";
import { createAgency } from "../../helpers/APIs/agencyApis";
import { useRouter } from "next/navigation";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import BtnSpinner from "../Skeletons/BtnSpinner";
import Select from "react-select";
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

        router.push(-1);
      } else {
        toast.warning(msg);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-row items-center className="w-full m-[auto] items-center">
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


                setValue("agency_services.category", newData),
                  setValue("agency_services.subCategory", ""),
                  setSubCategories([]),
                  trigger("agency_services.category");

                setValue("agency_services.subCategory", newData),
                  trigger("agency_services.subCategory");

};

export default CreateForm;
