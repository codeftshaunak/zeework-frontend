"use client";

import { useContext, useEffect, useState } from "react";
import OnboardingLayout from "../../onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { Select } from "@/components/ui/select";
import { toast } from "@/lib/toast";
import {
  getAllDetailsOfUser,
  updateFreelancerProfile,
} from "../../../helpers/APIs/userApis";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  getCategories,
  getSkills,
  getSubCategory,
} from "../../../helpers/APIs/freelancerApis";
import { CurrentUserContext } from "../../../contexts/CurrentUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  onboardingClientSchema,
  onboardingFreelancerSchema,
} from "../../../schemas/onboarding-schema";
import { cn } from "@/lib/utils";
import { User, Briefcase, Star, DollarSign, Clock, MapPin } from "lucide-react";

interface Country {
  name: string;
  label: string;
  value: string;
}

const getSchema = (page: number, role: number) => {
  if (role == 1) {
    if (page == 2) return onboardingFreelancerSchema.category;
    if (page == 3) return onboardingFreelancerSchema.info;
    if (page == 4) return onboardingFreelancerSchema.skills;
  } else if (role == 2) {
    return onboardingClientSchema;
  }
};

const ModernProcess = () => {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<unknown>([]);
  const [options, setOptions] = useState<MultiSelectOption[]>([]);
  const [skillOptions, setSkillOptions] = useState<MultiSelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state: unknown) => state);
  const role = state.auth.role;
  const [selectedSubCategory, setSelectedSubCategory] = useState<MultiSelectOption[]>([]);
  const [subCategoryOption, setSubCategoryOption] = useState<MultiSelectOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<MultiSelectOption[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<MultiSelectOption[]>([]);
  const [description, setDescription] = useState("");
  const { getUserDetails } = useContext(CurrentUserContext);
  const userName = sessionStorage.getItem("userName");

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(getSchema(page, role)),
  });

  const onSubmit = async (body: unknown) => {
    setIsLoading(true);
    try {
      const { code, msg } = await updateFreelancerProfile(body);
      toast.default(msg);

      if (code === 200 && role == 1) {
        reset();
        if (page === 2) {
          setPage(3);
        } else if (page === 3) {
          setPage(4);
        } else if (page === 4) {
          await getUserDetails();
          const delay = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));
          await delay(1500);
          setSelectedOptions([]);
          router.push("/find-job");
          setPage(0);
        }
        setSelectedOptions([]);
        setSelectedSubCategory([]);
        // Don't clear selectedSkills here - they should persist for the current step
      } else if (code === 200 && role == 2) {
        await getUserDetails();
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        await delay(1500);
        router.push("/client-dashboard");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // get user information
  const getUserInformation = async () => {
    try {
      const res = await getAllDetailsOfUser();
      if (res.code === 401 || res.msg === "Unauthorized") {
        router.push("/login");
      }
      const data = res?.body;
      setUserDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  // handle category and skills
  const handleSelectChange = (selectedValues: MultiSelectOption[]) => {
    setSelectedOptions(selectedValues || []);
    if (role == 1 && page == 2) {
      setSelectedCategory(selectedValues[selectedValues?.length - 1]?._id || null);
    }
  };

  // get category list
  const getCategory = async () => {
    const { code, body } = await getCategories();
    if (code === 200)
      setOptions(
        body?.map((item: unknown) => ({
          value: item.category_name,
          label: item.category_name,
          _id: item._id,
        }))
      );
  };

  // get sub category list
  const getSubCategoryData = async () => {
    if (!selectedCategory) return;
    try {
      const { body, code } = await getSubCategory(selectedCategory);

      if (code === 200) {
        const uniqueIds = new Set(subCategoryOption.map((item) => item._id));
        const uniqueItems = body.filter((item: unknown) => !uniqueIds.has(item._id));

        setSubCategoryOption((prev) => [
          ...prev,
          ...uniqueItems.map((item: unknown) => ({
            value: item.sub_category_name,
            label: item.sub_category_name,
            _id: item._id,
          })),
        ]);
      } else {
        setSubCategoryOption([]);
      }
    } catch (error) {
      setSubCategoryOption([]);
    }
  };

  // get skills options category wise
  const getCategorySkills = async (categoryIds: unknown[]) => {
    try {
      const validCategoryIds = categoryIds.filter((category) => category._id);

      if (validCategoryIds.length === 0) {
        setSkillOptions([]);
        return;
      }

      const promises = validCategoryIds?.map(async ({ _id }) => {
        try {
          const { body, code } = await getSkills(_id);
          if (code === 200) {
            return body.map((item: unknown) => ({
              value: item?.skill_name,
              label: item?.skill_name,
              category_id: item?.category_id,
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
      const allSkills = results.flat();

      // Remove duplicates based on _id
      const uniqueSkills = allSkills.filter((skill, index, self) =>
        index === self.findIndex(s => s._id === skill._id)
      );

      setSkillOptions(uniqueSkills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkillOptions([]);
    }
  };

  useEffect(() => {
    if (page === 4) {
      // Load skills based on selected categories, not userDetails
      if (selectedOptions.length > 0) {
        getCategorySkills(selectedOptions);
      } else {
        // If no categories selected, try to get from userDetails
        if (userDetails.categories?.length > 0) {
          getCategorySkills(userDetails?.categories);
        } else {
          setSkillOptions([]);
        }
      }
    }
  }, [page, selectedOptions, userDetails]);

  useEffect(() => {
    getSubCategoryData();
  }, [selectedCategory]);

  useEffect(() => {
    getUserInformation();
  }, [page]);

  useEffect(() => {
    getCategory();
  }, []);

  // Welcome step
  const renderWelcomeStep = () => (
    <OnboardingLayout
      currentStep={1}
      totalSteps={role === 1 ? 4 : 2}
      title={`Welcome to ZeeWork, ${userName?.split(" ")[0] || "there"}!`}
      description="Ready to take your next big step?"
      onNext={() => setPage(2)}
      canGoBack={false}
      nextText="Get Started"
    >
      <div className="text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
          <User className="h-10 w-10 text-white" />
        </div>

        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            Join the world&apos;s newest freelance platform dedicated to building
            the Future of Work. On ZeeWork, we&apos;re excited to give you
            everything you need to build the business and career of your dreams.
          </p>

          <p className="text-gray-600">
            We&apos;re committed to providing a best-in-class user experience for all
            clients and freelancers. Let&apos;s build the future, together!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="text-center p-4">
            <Briefcase className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Find Great Work</h3>
            <p className="text-sm text-gray-600">Apply for projects that match your skills</p>
          </div>
          <div className="text-center p-4">
            <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Build Your Reputation</h3>
            <p className="text-sm text-gray-600">Get reviews and grow your profile</p>
          </div>
          <div className="text-center p-4">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Get Paid Safely</h3>
            <p className="text-sm text-gray-600">Secure payments and support</p>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  )

  // Freelancer Categories Step
  const renderCategoriesStep = () => (
    <OnboardingLayout
      currentStep={2}
      totalSteps={4}
      title="Choose Your Categories"
      description="Select up to 3 categories that best represent your skills"
      onNext={handleSubmit(onSubmit)}
      onBack={() => setPage(1)}
      isLoading={isLoading}
      nextText="Continue"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-base font-semibold text-gray-900">
            Your Expertise Categories
          </label>
          <p className="text-gray-600 text-sm">
            We need to get a sense of your education, experience and categories.
            This helps us match you with the right projects.
          </p>

          <MultiSelect
            options={options}
            selected={selectedOptions}
            onChange={(selected) => {
              handleSelectChange(selected);
              setValue(
                "categories",
                selected.map((option) => ({
                  value: option.value,
                  _id: option._id,
                }))
              );
              trigger("categories");
            }}
            placeholder="Select your categories..."
            error={errors.categories?.message}

                setValue(
                  "sub_categories",
                  selected.map((option) => ({
                    value: option.value,
                    _id: option._id,
                  }))
                );
                trigger("sub_categories");
              }}
              placeholder="Select your sub categories..."
              error={errors.sub_categories?.message}
            />
          </div>
        )}
      </div>
    </OnboardingLayout>
  )

  // Freelancer Info Step
  const renderInfoStep = () => (
    <OnboardingLayout
      currentStep={3}
      totalSteps={4}
      title="Tell Us About Yourself"
      description="Share your professional background and rates"
      onNext={handleSubmit(onSubmit)}
      onBack={() => setPage(2)}
      isLoading={isLoading}
      nextText="Continue"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-base font-semibold text-gray-900">
            Professional Title
          </label>
          <Input
            {...register("professional_role")}
            placeholder="e.g., Full Stack Developer, UI/UX Designer"
            className="h-12 text-base"

              setValue("description", e.target.value);

              console.log("Selected skills:", selected);
              setSelectedSkills(selected);

              const formData = selected.map((option) => ({
                value: option.value,
                _id: option._id,
              }));
              console.log("Setting form value to:", formData);

              setValue("skills", formData);
              trigger("skills").then((result) => {
                console.log("Validation result:", result);
              });
            }}
            placeholder="Select your skills..."
            searchable={true}
            emptyMessage="No skills available. Please select categories in the previous step."
            error={errors.skills?.message}
          />
        </div>
      </div>
    </OnboardingLayout>
  )

  // Client Info Step
  };

export default ModernProcess;