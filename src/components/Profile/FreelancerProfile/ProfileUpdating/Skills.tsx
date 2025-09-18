import { Button, useToast } from "@chakra-ui/react";
import Select from "react-select";
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

const Skills = ({ setIsModal }) => {
  const userProfileInfo = useSelector((state: any) => state.profile.profile);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const animatedComponents = makeAnimated();
  const [options, setOptions] = useState(null);
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
  const getCategorySkills = async (categoryIds) => {
    try {
      if (!categoryIds) {
        console.error("No category IDs provided.");
        return;
      }

      const validCategoryIds = categoryIds.filter((category) => category._id);
      const promises = validCategoryIds.map(async ({ _id }) => {
        try {
          const { body, code } = await getSkills(_id);
          if (code === 200) {
            return body?.map((item) => ({
              value: item?.skill_name,
              label: item?.skill_name,
              _id: item?._id,
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
      const newSkillOptions = results.flat();

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
      setValue(
        "skills",
        userProfileInfo.skills.map((skill) => ({ value: skill, label: skill }))
      );
    }
  }, [userProfileInfo]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const selectedCategories = data.skills.map((skill) => skill.value);

      const response = await updateFreelancerProfile({
        skills: selectedCategories,
      });

      if (response.code == 405) {
        toast({
          title: response.msg,
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setIsModal(false);
      } else if (response.code === 200) {
        toast({
          title: "Skills Added Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
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
                    onChange={(selected) => {
                      field.onChange(selected);
                      setValue("skills", selected);
                      trigger("skills");
                    }}
                    value={field.value}
                  />
                )}
              />
              {errors.skills && <ErrorMsg msg={errors.skills.message} />}
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-5 w-full">
            <Button
              isLoading={isLoading}
              loadingText="Updating"
              colorScheme="primary"
              type="submit"
              fontSize={"0.9rem"}
              spinner={<BtnSpinner />}
            >
              Update
            </Button>
          </div>
        </form>
      </>
    </div>
  );
};

export default Skills;
