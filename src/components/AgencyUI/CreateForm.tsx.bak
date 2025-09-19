import { toaster } from "@/lib/providers";
"use client";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  HStack,
  Box,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
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
        toaster.create({
          title: "Agency Profile Created Successfully.",
          type: "success",
          duration: 3000,
        });
        getUserDetails();

        router.push(-1);
      } else {
        toaster.create({
          title: msg,
          type: "warning",
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <HStack width={"100%"} margin={"auto"} alignItems={"center"}>
      <Box
        width={["100%", "100%", "90%", "60%"]}
        margin={"auto"}
        borderRadius={"15px"}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full shadow p-5 sm:p-9 rounded-lg bg-white"
        >
          <Box mb={5}>
            <Text fontSize={["md", "xl"]} mb={2}>Agency Name</Text>
            <Input
              {...register("agency_name", {
                required: "Agency Name is required",
              })}
              placeholder="ZeeWork"
              fontSize={["1rem", "1.1rem"]}
            />

            {errors.agency_name && (
              <ErrorMsg msg={errors.agency_name.message} />
            )}
          </Box>
          <Box mb={5}>
            <Text fontSize={["md", "xl"]} mb={2}>Agency Overview</Text>
            <Textarea
              {...register("agency_overview", {
                required: "Agency Overview is required",
              })}
              fontSize={["1rem", "1.1rem"]}
              placeholder="This is an agency with highly creating value. We provide services to people who need to start there business."
            />

            {errors.agency_overview && (
              <ErrorMsg msg={errors.agency_overview.message} />
            )}
          </Box>
          <Box mb={5}>
            <Text fontSize={["md", "xl"]} mb={2}>Agency Tagline</Text>
            <Input
              {...register("agency_tagline", {
                required: "Agency Tagline is required",
              })}
              fontSize={["1rem", "1.1rem"]}
              placeholder="We are working for create impact on the world"
            />

            {errors.agency_tagline && (
              <ErrorMsg msg={errors.agency_tagline.message} />
            )}
          </Box>
          <Box mb={5}>
            <Text fontSize={["md", "xl"]} mb={2}>Agency Location</Text>
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
          </Box>
          <Box mb={5}>
            <Text fontSize={["md", "xl"]} mb={2}>Services Category</Text>
            <Select
              {...register("agency_services.category", {
                required: "Services Category is required",
              })}
              isMulti
              closeMenuOnSelect={false}
              placeholder="Select Your Category"
              options={category}
              onChange={(data) => {
                const newData = data?.map((d) => ({
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
          </Box>

          <Box mb={5}>
            <Text fontSize={["md", "xl"]} mb={2}>Services Sub-Category</Text>
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
                const newData = data?.map((d) => ({
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
          </Box>

          <Box textAlign={"right"}>
            <Button
              isLoading={loading}
              loadingText="Submit"
              colorScheme="primary"
              type="submit"
              spinner={<BtnSpinner />}
              marginTop={3}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </HStack>
  );
};

export default CreateForm;
