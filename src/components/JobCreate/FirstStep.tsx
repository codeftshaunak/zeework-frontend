"use client";"

import { yupResolver } from "@hookform/resolvers/yup";"
import { useEffect, useState } from "react";"
import { Controller, useForm } from "react-hook-form";"
import { BiX } from "react-icons/bi";"
import { useFormState } from "../../contexts/FormContext";"
import { firstStepSchema } from "../../schemas/job-create-schema";"
import dynamic from "next/dynamic";"
import "react-quill/dist/quill.snow.css";"

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {"
  ssr: false,
  loading: () => <div className="h-32 bg-gray-100 rounded border animate-pulse" />"
});
import { getCategories, getSkills } from "../../helpers/APIs/freelancerApis";"
import Select from "react-select/creatable";"
import { MultiValue, SingleValue } from "react-select";"
import { FaCloudUploadAlt } from "react-icons/fa";"
import QuillToolbar, {
  formats,
  modules,
} from "../utils/QuillToolbar/QuillToolbar";"
import ErrorMsg from "../utils/Error/ErrorMsg";"

import { customSelectStyles } from "../utils/Select/index";"

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
  const [description, setDescription] = useState("");"
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
        :[],
      skills: defaultSkills?.map((item) => item.value),
    },
  });

  // on form submit assign values to the context and go to next step
  const onSubmit = (v: FormData) => {
    insertToFormState(v);
    setStep(2);
  };

  const getCategorySkills = async () => {
    try {
      if (!categories?.list) {
        const { body, code } = await getCategories();
        if (code === 200)
          setCategories({
            ...categories,
            list: body?.map((item: unknown) => ({
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
            body?.map((item: unknown) => ({
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
    if (defaultValues) setDescription(defaultValues?.description || "");"
  }, [defaultValues]);

  useEffect(() => {
    getCategorySkills();
  }, [categories]);

  // if there any values in form state context then push this to the form
  useEffect(() => {
    const values: Partial<FormData> = {};
    if (formState?.title) values.title = formState.title;
    if (formState?.description) values.description = formState.description;
    if (formState?.categories) values.categories = formState.categories;
    if (formState?.skills) values.skills = formState.skills;
    if (formState?.job_type) values.job_type = `${formState.job_type}`;`
    if (formState?.amount) values.amount = formState.amount;
    if (formState?.file) values.file = formState.file;

    reset(values);
  }, [formState]);

  const removeTrailingEmptyTags = (html: string) => {
    return html.replace(
      /(<p(?: class="ql-align-justify")?\s*>\s*<br\s*\/?>\s*<\/p>\s*)+$/,"
      ""
    );
  };

  return (
    <form
      className="w-full md:w-[530px] min-h-[716px] flex-col justify-start items-start gap-9 inline-flex mb-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="w-max-[440px] text-black text-3xl font-medium leading-9">"
          Let&apos;s start with a strong title.
        </div>
        <div className="w-max-[530px] mt-2 text-gray-700 font-normal leading-tight">"
          Forget the old rules. You can have the best people. Right now. Right
          here.
        </div>
      </div>

      {/* TITLE FIELD */}
      <div className="w-full">"
        <div className="w-full md:w-[530px] text-gray-700 font-medium leading-tight mb-2">"
          Title
        </div>
        <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm rounded-md"
         
          borderColor={"var(--bordersecondary)"}"
          _placeholder={{ color: "gray.500" }}"
          placeholder="Write work title..."
          type="text"

              setValue("description", cleanedValue);"
              setDescription(value);
              trigger("description");"
            }}
            className="h-64 [&>*]:rounded-b-md bg-white quill-border"
            modules={modules}
            formats={formats}

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
        <div className="text-neutral-500 mt-3 font-medium leading-tight">"

}

export default FirstStep;
