"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { InputGroup, InputLeftElement } from "@/components/ui/migration-helpers";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiX } from "react-icons/bi";
import { useFormState } from "../../contexts/FormContext";
import { firstStepSchema } from "../../schemas/job-create-schema";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-100 rounded border animate-pulse" />
});
import { getCategories, getSkills } from "../../helpers/APIs/freelancerApis";
import Select from "react-select/creatable";
import { MultiValue, SingleValue } from "react-select";
import { FaCloudUploadAlt } from "react-icons/fa";
import QuillToolbar, {
  formats,
  modules,
} from "../utils/QuillToolbar/QuillToolbar";
import ErrorMsg from "../utils/Error/ErrorMsg";

import { customSelectStyles } from "../utils/Select/index";

interface SkillOption {
  value: string;
  label: string;
}

interface CategoryOption {
  _id: string;
  value: string;
  label: string;
}

interface CategoriesState {
  list?: CategoryOption[];
  selectedId?: string;
}

interface FormData {
  title: string;
  description: string;
  categories: CategoryOption[];
  skills: string[];
  job_type: string;
  amount: string;
  file?: File | null;
}

interface FirstStepProps {
  setStep: (step: number) => void;
  defaultValues?: Partial<FormData> & {
    categories?: CategoryOption[];
    skills?: SkillOption[];
  };
}

function FirstStep({ setStep, defaultValues }: FirstStepProps) {
  const { insertToFormState, formState } = useFormState();
  const [categories, setCategories] = useState<CategoriesState>({});
  const [skillsOption, setSkillsOption] = useState<SkillOption[]>([]);
  const [description, setDescription] = useState("");
  const defaultSkills = defaultValues?.skills?.map((item: SkillOption) => ({
    value: item.value || item.label,
    label: item.label || item.value,
  }));

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(firstStepSchema),
    defaultValues: {
      ...defaultValues,
      categories: defaultValues
        ? [
            {
              _id: defaultValues?.categories?.[0]?._id,
              value: defaultValues?.categories?.[0]?.value,
              label: defaultValues?.categories?.[0]?.value,
            },
          ]
        : [],
      skills: defaultSkills?.map((item) => item.value),
    },
  });

  // on form submit assign values to the context and go to next step
  const onSubmit = (v: FormData) => {
    insertToFormState(v as any);
    setStep(2);
  };

  const getCategorySkills = async () => {
    try {
      if (!categories?.list) {
        const { body, code } = await getCategories();
        if (code === 200)
          setCategories({
            ...categories,
            list: body?.map((item: any) => ({
              value: item.category_name,
              label: item.category_name,
              _id: item._id,
            })),
          });
      }
      if (categories?.selectedId || defaultValues?.categories?.[0]) {
        const { body, code } = await getSkills(
          categories.selectedId || defaultValues?.categories?.[0]?._id,
          ""
        );
        if (code === 200)
          setSkillsOption(
            body?.map((item: any) => ({
              value: item.skill_name,
              label: item.skill_name,
            }))
          );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // set quill value in form
  useEffect(() => {
    if (defaultValues) setDescription(defaultValues?.description || "");
  }, [defaultValues]);

  useEffect(() => {
    getCategorySkills();
  }, [categories]);

  // if there any values in form state context then push this to the form
  useEffect(() => {
    const values: Partial<FormData> = {};
    if ((formState as any)?.title) values.title = (formState as any).title;
    if ((formState as any)?.description) values.description = (formState as any).description;
    if ((formState as any)?.categories) values.categories = (formState as any).categories;
    if ((formState as any)?.skills) values.skills = (formState as any).skills;
    if ((formState as any)?.job_type) values.job_type = `${(formState as any).job_type}`;
    if ((formState as any)?.amount) values.amount = (formState as any).amount;
    if ((formState as any)?.file) values.file = (formState as any).file;

    reset(values);
  }, [formState]);

  const removeTrailingEmptyTags = (html: string) => {
    return html.replace(
      /(<p(?: class="ql-align-justify")?\s*>\s*<br\s*\/?>\s*<\/p>\s*)+$/,
      ""
    );
  };

  return (
    <form
      className="w-full md:w-[530px] min-h-[716px] flex-col justify-start items-start gap-9 inline-flex mb-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="w-max-[440px] text-black text-3xl font-medium leading-9">
          Let&apos;s start with a strong title.
        </div>
        <div className="w-max-[530px] mt-2 text-gray-700 font-normal leading-tight">
          Forget the old rules. You can have the best people. Right now. Right
          here.
        </div>
      </div>

      {/* TITLE FIELD */}
      <div className="w-full">
        <div className="w-full md:w-[530px] text-gray-700 font-medium leading-tight mb-2">
          Title
        </div>
        <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm rounded-md"
         
          borderColor={"var(--bordersecondary)"}
          _placeholder={{ color: "gray.500" }}
          placeholder="Write work title..."
          type="text"
          {...register("title")}
        />
        {errors?.title && <ErrorMsg msg={errors.title.message} />}
      </div>

      {/* DESCRIPTION FIELD */}
      <div className="w-full">
        <div className="w-full md:w-[530px] text-gray-700 font-medium leading-tight mb-2">
          Description
        </div>
        <div className="w-full">
          <QuillToolbar />
          <ReactQuill
            theme="snow"
            value={description}
            onChange={(value: any) => {
              const cleanedValue = removeTrailingEmptyTags(value);
              setValue("description", cleanedValue);
              setDescription(value);
              trigger("description");
            }}
            className="h-64 [&>*]:rounded-b-md bg-white quill-border"
            modules={modules}
            formats={formats}
          />
        </div>

        {errors?.description && <ErrorMsg msg={errors.description.message} />}
      </div>

      {/* TAGS FIELD */}
      <div className="w-full">
        <div className="w-full md:w-[530px] text-gray-700 font-medium leading-tight mb-2">
          Job Category
        </div>

        <Controller
          control={control}
          name="categories"
          render={({ field: { ref, onChange } }) => (
            <Select
              ref={ref}
              onChange={(val: any) => {
                if (val) {
                  onChange([
                    { _id: val._id, value: val.value, label: val.label },
                  ]);
                  setCategories({ ...categories, selectedId: val._id });
                }
              }}
              options={categories?.list}
              defaultValue={{
                _id: defaultValues?.categories?.[0]?._id,
                value: defaultValues?.categories?.[0]?.value,
                label: defaultValues?.categories?.[0]?.value,
              }}
              className="h-10"
            />
          )}
        />

        {errors?.categories && <ErrorMsg msg={errors.categories.message} />}
      </div>

      {/* SKILLS FIELD */}
      <div className="w-full">
        <div className="w-full md:w-[530px] text-gray-700 font-medium leading-tight mb-2">
          Add Skills
        </div>

        <Controller
          control={control}
          name="skills"
          render={({ field: { ref, onChange } }) => (
            <Select
              closeMenuOnSelect={false}
              ref={ref}
              options={skillsOption}
              onChange={(val: MultiValue<SkillOption>) => onChange(val.map((c) => c.value))}
              isMulti
              defaultValue={defaultSkills}
              isLoading={!skillsOption?.length}
              styles={customSelectStyles}
              menuPlacement="auto"
            />
          )}
        />
        {errors?.skills && <ErrorMsg msg={errors.skills.message} />}
      </div>

      {/* BUDGET FIELD */}
      <div className="w-full">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <input
              {...register("job_type")}
              id="default-radio-1"
              type="radio"
              value={"fixed"}
              checked={defaultValues && defaultValues?.job_type === "fixed"}
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor="default-radio-1"
              className="ml-2 font-medium text-gray-900"
            >
              Fixed Budget
            </label>
          </div>
          <div className="flex items-center ml-3">
            <input
              {...register("job_type")}
              id="default-radio-2"
              type="radio"
              value={"hourly"}
              checked={defaultValues && defaultValues?.job_type === "hourly"}
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor="default-radio-2"
              className="ml-2 font-medium text-gray-900"
            >
              Hourly
            </label>
          </div>
        </div>
        {errors?.job_type && <ErrorMsg msg={errors.job_type.message} />}
      </div>

      {/* AMOUNT FIELD */}
      <div className="w-full">
        <div className="w-full md:w-[530px] text-gray-700 font-medium leading-tight mb-2">
          Add Amount
        </div>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
          >
            $
          </InputLeftElement>
          <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm rounded-md"
            borderColor={"var(--bordersecondary)"}
            _placeholder={{ color: "gray.500" }}
            type="number"
            placeholder="400"
            {...register("amount")}
          />
        </InputGroup>
        {errors?.amount && <ErrorMsg msg={errors.amount.message} />}
      </div>

      {/* FILE FIELD */}
      <div className="w-full">
        <Controller
          control={control}
          name={"file" as any}
          render={({ field: { value, onChange, ...field } }) => {
            return (
              <div className="flex items-center justify-between w-full">
                <label className="flex items-center" id="file">
                  <div
                    className={`w-24 h-10 border border-green-400 rounded cursor-pointer bg-green-100 hover:bg-green-200 flex flex-col items-center justify-center text-center`}
                  >
                    <span>
                      <FaCloudUploadAlt className="text-2xl text-center" />
                    </span>
                  </div>
                  <div className="text-center ml-3 text-green-600 text-base font-medium leading-normal flex items-center gap-1">
                    {(value as File)?.name || "Add Attachment"}{" "}
                  </div>
                  <input
                    {...field}
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={(e) => {
                      onChange(e.target.files?.[0] || null);
                    }}
                  />
                </label>
                {value ? (
                  <BiX
                    onClick={() => onChange(undefined)}
                    className="h-5 w-5 bg-red-50/10 rounded-full cursor-pointer backdrop-blur backdrop-filter bg-red-50 hover:bg-red-100 text-red-500"
                  />
                ) : null}
                {/* Delete Added File */}
              </div>
            );
          }}
        />
        <div className="text-neutral-500 mt-3 font-medium leading-tight">
          Max size 100 MB
        </div>
        {(errors as any)?.file && <ErrorMsg msg={(errors as any).file.message} />}
      </div>

      <button
        className="h-9 flex-col justify-start items-start gap-2.5 inline-flex"
        type="submit"
      >
        <div className="self-stretch h-9 px-3 py-2 bg-green-500 rounded-md shadow justify-center items-center gap-1 inline-flex">
          <div className="text-center text-white font-medium leading-tight">
            Save & Continue
          </div>
        </div>
      </button>
    </form>
  );
}

export default FirstStep;
