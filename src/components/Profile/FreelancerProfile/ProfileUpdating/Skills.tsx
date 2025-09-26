"use client";

import { toast } from "@/lib/toast";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileData } from "../../../../redux/authSlice/profileSlice";
import BtnSpinner from "../../../Skeletons/BtnSpinner";
import { updateFreelancerProfile } from "../../../../helpers/APIs/userApis";
import ErrorMsg from "../../../utils/Error/ErrorMsg";
import { getSkills } from "../../../../helpers/APIs/freelancerApis";
import { skillsSchema } from "../../../../schemas/freelancer-profile-schema";

// TypeScript interfaces
interface SkillsProps {
  setIsModal: (isOpen: boolean) => void;
}

interface SkillOption {
  label: string;
  value: string;
}

interface FormData {
  skills: SkillOption[];
}

interface RootState {
  profile: {
    profile: {
      categories: any[];
      skills: Array<string | { value: string; _id?: string; label?: string }>;
    };
  };
}

const Skills: React.FC<SkillsProps> = ({ setIsModal }) => {
  const userProfileInfo = useSelector((state: RootState) => state.profile.profile);
  const [isLoading, setIsLoading] = useState(false);
  const animatedComponents = makeAnimated();
  const [options, setOptions] = useState<SkillOption[] | null>(null);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(skillsSchema),
    defaultValues: {
      skills: [],
    },
  });

  // Get skills of profile categories
  const getCategorySkills = async (categoryIds: any[]) => {
    try {
      if (!categoryIds) {
        console.error("No category IDs provided.");
        return;
      }

      const validCategoryIds = categoryIds.filter((category) => category._id);
      const promises = validCategoryIds.map(async ({ _id }) => {
        try {
          const { body, code } = await getSkills(_id, null);
          if (code === 200) {
            return body?.map((item) => ({
              value: item?.skill_name,
              label: item?.skill_name,
            }));
          } else {
            return [];
          }
        } catch (error) {
          console.error(`Error fetching skills for category ID ${_id}:`, error);
          return [];
        }
      });

      const results = await Promise.all(promises);
      const newSkillOptions = results.flat().filter(option =>
        option &&
        typeof option.value === 'string' &&
        typeof option.label === 'string'
      );

      setOptions(newSkillOptions);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
    setOptionsLoading(false);
  };

  useEffect(() => {
    if (userProfileInfo?.categories) {
      getCategorySkills(userProfileInfo.categories);
    }
    if (userProfileInfo?.skills) {
      const formattedSkills = userProfileInfo.skills.map((skill) => {
        if (typeof skill === 'string') {
          return { value: skill, label: skill };
        } else if (typeof skill === 'object' && typeof skill === "string" ? skill : (skill as any)?.value || skill) {
          return { value: typeof skill === "string" ? skill : (skill as any)?.value || skill, label: skill.label || typeof skill === "string" ? skill : (skill as any)?.value || skill };
        } else {
          console.warn('Invalid skill format:', skill);
          return null;
        }
      }).filter(Boolean) as SkillOption[];

      setValue("skills", formattedSkills);
    }
  }, [userProfileInfo]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const selectedCategories = data.skills.map((skill) => typeof skill === "string" ? skill : (skill as any)?.value || skill);

      const response = await updateFreelancerProfile({
        skills: selectedCategories,
      });

      if (response.code == 405) {
        toast.warning(response.msg);
        setIsModal(false);
      } else if (response.code === 200) {
        toast.success("Skills Added Successfully");
        dispatch(
          profileData({
            profile: response?.body,
          })
        );
        setIsModal(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col">
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    isDisabled={optionsLoading}
                    isLoading={optionsLoading}
                    options={options}
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      menu: (base) => ({ ...base, zIndex: 9999 }),
                      control: (base) => ({
                        ...base,
                        minHeight: '42px',
                        borderColor: '#d1d5db',
                        '&:hover': {
                          borderColor: '#9ca3af'
                        }
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: '#f0fdf4',
                        border: '1px solid #bbf7d0'
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: '#166534'
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: '#166534',
                        '&:hover': {
                          backgroundColor: '#dc2626',
                          color: 'white'
                        }
                      })
                    }}
                    onChange={(selected) => {
                      // Ensure selected values are properly formatted
                      const cleanSelected = Array.isArray(selected)
                        ? selected.map(item => ({
                            value: typeof item === 'string' ? item : item?.value || '',
                            label: typeof item === 'string' ? item : item?.label || item?.value || ''
                          }))
                        : [];

                      field.onChange(cleanSelected);
                      setValue("skills", cleanSelected);
                      trigger("skills");
                    }}
                    value={Array.isArray(field.value) ? field.value.filter(item =>
                      item && typeof item.value === 'string' && typeof item.label === 'string'
                    ) : []}
                  />
                )}
              />
              {errors.skills && <ErrorMsg msg={errors.skills.message || ''} />}
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-5 w-full">
            <Button
              variant="gradient"
              disabled={isLoading}
              type="submit"
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <BtnSpinner />
                  Updating Skills...
                </>
              ) : (
                "Update Skills"
              )}
            </Button>
          </div>
        </form>
      </>
    </div>
  );
};

export default Skills;
