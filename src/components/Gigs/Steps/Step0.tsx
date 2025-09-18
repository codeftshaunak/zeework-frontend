"use client";

import { Input, InputGroup, InputLeftElement, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import * as yup from "yup";
import { GigCreateLayout } from "../GigCreate";
import { getAllDetailsOfUser } from "../../../helpers/APIs/userApis";
import {
  getCategories,
  getSkills,
  getSubCategory,
} from "../../../helpers/APIs/freelancerApis";
import { Skeleton } from "@chakra-ui/react";

// validation schema
const schema = yup.object().shape({
  title: yup.string().label("Title").min(40).max(90).required(),
  category: yup
    .object()
    .shape({
      value: yup.string().label("Category").required(),
      label: yup.string().label("Category").required(),
    })
    .label("Category")
    .required(),
  sub_category: yup
    .object()
    .shape({
      value: yup.string().label("Sub category").required(),
      label: yup.string().label("Sub category").required(),
    })
    .label("Sub Category")
    .required(),
  skills: yup
    .array(
      yup.object().shape({
        value: yup.string().label("Skill").required(),
        label: yup.string().label("Skill").required(),
      })
    )
    .label("Skills")
    .min(1)
    .required(),
  // Define validation rules for other fields if needed
});

// default values for the step
const defaultValues = {
  title: "",
  category: {},
  sub_category: {},
  skills: [],
};
const Step0 = ({ submitCallback, onBack, afterSubmit, formValues, isEdit }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState(null);
  const [subCategoryOptions, setSubCategoryOptions] = useState(null);
  const [skillOptions, setSkillOptions] = useState([]);
  const [isSkillsLoading, setIsSkillsLoading] = useState(false);
  const [isSubCategoryLoading, setIsSubCategoryLoading] = useState(false);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, control, reset, formState } = methods;

  // form submit operations
  const onSubmit = (values) => {
    submitCallback(values); // this will update the parent state
    afterSubmit(); // this will perform task after updating the state
  };

  // load state
  useEffect(() => {
    const changes = {};

    Object.keys(defaultValues).map((key) => {
      const value = formValues?.[key];
      changes[key] = value === undefined ? defaultValues[key] : value;
    });

    reset(changes);
  }, [formValues]);

  // Get All Category of freelancer
  const allCategory = async () => {
    try {
      // const resp = await getAllDetailsOfUser();
      const resp = await getCategories();
      setCategoryOptions(
        resp?.body?.map((item) => ({
          value: item.category_name,
          label: item.category_name,
          category_id: item._id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // get all sub category of freelancer
  const allSubCategory = async () => {
    if (categoryId || formState?.defaultValues.category?.category_id) {
      setSubCategoryOptions([]);
      setIsSubCategoryLoading(true);
      try {
        const { body, code } = await getSubCategory(
          categoryId || formState?.defaultValues.category?.category_id
        );

        if (code === 200)
          setSubCategoryOptions(
            body?.map((item) => ({
              value: item.sub_category_name,
              label: item.sub_category_name,
              category_id: item.category_id,
              _id: item._id,
            }))
          );
      } catch (error) {
        console.log(error);
      }
      setIsSubCategoryLoading(false);
    }
  };

  // get all skills of freelancer
  const allSkills = async () => {
    setSkillOptions([]);
    setIsSkillsLoading(true);
    try {
      const { body, code } = await getSkills(categoryId, subCategoryId);
      if (code === 200)
        setSkillOptions(
          body?.map((item) => ({
            value: item.skill_name,
            label: item.skill_name,
          }))
        );
    } catch (error) {
      console.log(error);
    }
    setIsSkillsLoading(false);
  };

  useEffect(() => {
    if (!categoryOptions) {
      allCategory();
    }

    allSubCategory();
  }, [categoryId, formState?.defaultValues.category?.category_id]);

  useEffect(() => {
    if (categoryId && subCategoryId) {
      allSkills();
    }
  }, [categoryId, subCategoryId]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GigCreateLayout title={"Gig Overview"} onBackward={onBack}>
          <VStack alignItems={"start"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Title
            </label>
            <p>
              Tell client what you are going to deliver and how it&apos;ll
              benefits them.
            </p>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Skeleton
                    isLoaded={isEdit ? !!formValues?.title : true}
                    width={"full"}
                    startColor="gray.100"
                    endColor="gray.300"
                  >
                    <InputGroup
                      bgColor={"white"}
                      borderColor={"var(--bordersecondary)"}
                    >
                      <InputLeftElement
                        pointerEvents="none"
                        width={"fit-content"}
                        paddingLeft={2}
                      >
                        I will
                      </InputLeftElement>
                      <Input {...field} paddingLeft={"45px"} />
                    </InputGroup>
                  </Skeleton>
                  {fieldState.error && (
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </VStack>
          <VStack alignItems={"start"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Category
            </label>
            <p>
              Select a category that will be easy for others to find your gig.
            </p>
            <Controller
              name="category"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <Skeleton
                      isLoaded={isEdit ? !!formValues?.title : true}
                      width={"full"}
                      startColor="gray.100"
                      endColor="gray.300"
                    >
                      <CreatableSelect
                        className="w-full"
                        {...field}
                        options={categoryOptions}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setCategoryId(selectedOption.category_id);
                        }}
                        // isValidNewOption={(inputValue, selectOptions) =>
                        //   inputValue.trim() !== "" &&
                        //   !selectOptions.find(
                        //     (option) => option.label === inputValue
                        //   )
                        // }
                        isLoading={!categoryOptions?.length}
                      />
                    </Skeleton>

                    {fieldState.error && (
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {fieldState.error?.message ||
                          fieldState.error?.label?.message ||
                          fieldState.error?.value?.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </VStack>
          <VStack alignItems={"start"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Sub Category
            </label>
            <p>Select the sub category that matches your skills.</p>
            <Controller
              name="sub_category"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Skeleton
                    isLoaded={isEdit ? !!formValues?.title : true}
                    width={"full"}
                    startColor="gray.100"
                    endColor="gray.300"
                  >
                    <CreatableSelect
                      className="w-full"
                      {...field}
                      options={subCategoryOptions}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setSubCategoryId(selectedOption._id);
                      }}
                      isDisabled={
                        !isSubCategoryLoading && !subCategoryOptions?.length
                      }
                      isLoading={isSubCategoryLoading}
                    />
                  </Skeleton>

                  {fieldState.error && (
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {fieldState.error?.message ||
                        fieldState.error?.label?.message ||
                        fieldState.error?.value?.message}
                    </p>
                  )}
                </>
              )}
            />
          </VStack>
          <VStack alignItems={"start"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Skills
            </label>
            <p>Add skills relevant to your gig.</p>
            <Controller
              name="skills"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Skeleton
                    isLoaded={isEdit ? !!formValues?.title : true}
                    width={"full"}
                    startColor="gray.100"
                    endColor="gray.300"
                  >
                    <CreatableSelect
                      className="w-full"
                      isMulti
                      {...field}
                      options={skillOptions}
                      closeMenuOnSelect={false}
                      isDisabled={!isSkillsLoading && !skillOptions.length}
                      isLoading={isSkillsLoading}
                    />
                  </Skeleton>

                  {fieldState.error && (
                    <p style={{ color: "red", marginTop: "5px" }}>
                      {fieldState.error?.message ||
                        fieldState.error?.label?.message ||
                        fieldState.error?.value?.message}
                    </p>
                  )}
                </>
              )}
            />
          </VStack>
        </GigCreateLayout>
      </form>
    </FormProvider>
  );
};

export default Step0;
