"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import OnboardingProcess from "../../Layouts/CardLayout/OnboardingProcess";
import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@/components/ui/migration-helpers";
import { toast } from "@/lib/toast";
import Select from "react-select";
import makeAnimated from "react-select/animated";
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
import BtnSpinner from "../../Skeletons/BtnSpinner";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-100 rounded border animate-pulse" />
});
import QuillToolbar, {
  formats,
  modules,
} from "../../utils/QuillToolbar/QuillToolbar";
import { color } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  onboardingClientSchema,
  onboardingFreelancerSchema,
} from "../../../schemas/onboarding-schema";
import ErrorMsg from "../../utils/Error/ErrorMsg";

const animatedComponents = makeAnimated();

const getSchema = (page, role) => {
  if (role == 1) {
    if (page == 2) return onboardingFreelancerSchema.category;
    if (page == 3) return onboardingFreelancerSchema.info;
    if (page == 4) return onboardingFreelancerSchema.skills;
  } else if (role == 2) {
    return onboardingClientSchema;
  }
};

const Process = () => {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const [userDetails, setUserDetails] = useState([]);
  const [options, setOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state);
  const role = state.auth.role;
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [subCategoryOption, setSubCategoryOption] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [description, setDescription] = useState("");
  const { getUserDetails } = useContext(CurrentUserContext);
  const userName = sessionStorage.getItem("userName");

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(getSchema(page, role)),
  });

  const onSubmit = async (body) => {
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

          const delay = (ms) =>
            new Promise((resolve) => setTimeout(resolve, ms));
          await delay(1500);
          setSelectedOptions([]);
          router.push("/find-job");
          setPage(0);
        }

        setSelectedOptions([]);
        setSelectedSubCategory([]);
      } else if (code === 200 && role == 2) {
        await getUserDetails();

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await delay(1500);
        router.push("/client-dashboard");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
  const handleSelectChange = (selectedValues) => {
    if (role == 1 && page == 2) {
      if (selectedValues?.length > 3) return;
      setSelectedOptions(selectedValues || []);
      setSelectedCategory(selectedValues[selectedValues?.length - 1]?._id);
    } else {
      setSelectedOptions(selectedValues || []);
    }
  };

  // get category list
  const getCategory = async () => {
    const { code, body } = await getCategories();
    if (code === 200)
      setOptions(
        body?.map((item) => ({
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
        // Maintain a set to store unique _id values
        const uniqueIds = new Set(subCategoryOption.map((item) => item._id));

        // Filter out items with duplicate _id values and add only unique items
        const uniqueItems = body.filter((item) => !uniqueIds.has(item._id));

        // Update subCategoryOption with unique items
        setSubCategoryOption((prev) => [
          ...prev,
          ...uniqueItems.map((item) => ({
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
  const getCategorySkills = async (categoryIds) => {
    try {
      const validCategoryIds = categoryIds.filter((category) => category._id);

      const promises = validCategoryIds?.map(async ({ _id }) => {
        try {
          const { body, code } = await getSkills(_id);
          if (code === 200) {
            return body.map((item) => ({
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
      const newSkillOptions = results.flat();

      setSkillOptions(newSkillOptions);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    if (userDetails.categories?.length > 0 && page === 4) {
      getCategorySkills(userDetails?.categories);
    }
  }, [userDetails, page]);

  useEffect(() => {
    getSubCategoryData();
  }, [selectedCategory]);

  useEffect(() => {
    getUserInformation();
  }, [page]);

  useEffect(() => {
    getCategory();
  }, []);

  const removeTrailingEmptyTags = (html) => {
    const cleanedHtml = html.replace(
      /(<p(?: class="ql-align-justify")?\s*>\s*<br\s*\/?>\s*<\/p>\s*)+$/,
      ""
    );
    return cleanedHtml;
  };

  return (
    <OnboardingProcess gap={5}>
      <>
        {/* Welcome Page */}
        {(page === 0 || page === 1) && (
          <div className="flex flex-col"
           
          >
            <div>
              <span
               
               
                className="max-[480px]:!text-center"
              >
                Hey {userName && userName.split(" ").slice(0, 1)?.[0] + "."}{" "}
                Ready for your next big opportunity?
              </span>
            </div>
            <div className="flex flex-row items-center w-full justify-evenly">
              {/* <TbUser /> */}
              <span>
                Join the worlds newest Freelance platform dedicated to building
                the Future of Work. On ZeeWork, we’re excited to give you
                everything you need to build the business and career of your
                dreams. <br />
                <br /> We’re committed to providing a best-in-class user
                experience for all clients and freelancers. Let’s build the
                future, together!
              </span>
            </div>
            {/* <div className="flex flex-row items-center> <TbClick /> <span> Apply for open roles or list services for clients to buy </span> </div> */} {/* <div className="flex flex-row items-center>
              <TbReceipt />
              <span>
                Get paid safely and know we’re there to help
              </span>
            </div> */}
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              transition="0.3s ease-in-out"
              _hover={{
                backgroundColor: "var(--primarysoftbg)",
                color: "var(--primarytext)",
              }}
              onClick={() => setPage(2)}
            >
              Get Started
            </button>
          </div>
        )}

        {/* Role Wise Onboarding Processing Pages */}
        {page !== 0 && page !== 1 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {(role == 1 && (
              <>
                {page === 2 && (
                  <div className="flex flex-col max-[480px]:!text-center"
                   
                   
                    paddingBottom="40px"
                  >
                    <span>
                      How would you like to tell us about yourself?
                    </span>

                    <div>
                      <span>
                        We need to get a sense of your education, experience and
                        categories. It’s quickest to import your information,
                        you can edit it before your profile goes live.
                      </span>
                    </div>

                    <div className="flex flex-col lg:w-[400px] w-full items-start"
                    >
                      <span className="font-medium">
                        Select Category
                      </span>
                      <Select
                        placeholder="Select Your Category"
                        closeMenuOnSelect={selectedOptions?.length === 2}
                        components={animatedComponents}
                        options={options}
                        onChange={(e) => {
                          handleSelectChange(e);
                          setValue(
                            "categories",
                            e.map((option) => ({
                              value: option.value,
                              _id: option._id,
                            })) || []
                          );
                          trigger("categories");
                        }}
                        value={selectedOptions}
                        isOptionSelected={selectedOptions?.length <= 3}
                        className="w-full"
                        isMulti
                        isLoading={!options?.length}
                      />
                      {errors.category && (
                        <ErrorMsg msg={errors.category.message} />
                      )}
                    </div>
                    <div className="flex flex-col lg:w-[400px] w-full items-start"
                    >
                      <span className="font-medium">
                        Select a Sub Category
                      </span>
                      <Select
                        placeholder="Select Your Sub Category"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={subCategoryOption}
                        onChange={(e) => {
                          setSelectedSubCategory(e);
                          setValue(
                            "sub_categories",
                            e.map((option) => ({
                              value: option.value,
                              _id: option._id,
                            })) || []
                          );
                          trigger("sub_categories");
                        }}
                        value={selectedSubCategory}
                        className="w-full"
                        isLoading={!subCategoryOption?.length}
                      />
                      {errors.sub_categories && (
                        <ErrorMsg msg={errors.sub_categories.message} />
                      )}
                    </div>
                  </div>
                )}
                {page === 3 && (
                  <div className="flex flex-col max-[480px]:!text-center"
                   
                   
                    paddingBottom="40px"
                  >
                    <span>
                      How would you like to tell us about yourself?
                    </span>
                    <div>
                      <span>
                        We need to get a sense of your education, experience and
                        categories. It’s quickest to import your information,
                        you can edit it before your profile goes live.
                      </span>
                    </div>
                    <div className="flex flex-col w-full items-start">
                      <span className="font-medium">
                        {"Your Professional Role"}
                      </span>
                      <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm w-full"
                        placeholder="Professional Virtual Assistant"
                        _placeholder={{ color: "gray.500" }}
                        borderColor={"var(--bordersecondary)"}
                       
                        onChange={(e) => {
                          setValue("professional_role", e.target.value);
                          trigger("professional_role");
                        }}
                      />
                      {errors.professional_role && (
                        <ErrorMsg msg={errors.professional_role.message} />
                      )}
                    </div>
                    <div className="flex flex-col w-full items-start">
                      <span className="font-medium">
                        {"Your Hourly Rate"}
                      </span>
                      <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm w-full"
                        placeholder="$ Your Hourly Rate"
                        borderColor={"var(--bordersecondary)"}
                        _placeholder={{ color: "gray.500" }}
                       
                        type="number"
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? null
                              : Number(e.target.value);
                          setValue("hourly_rate", value);
                          trigger("hourly_rate");
                        }}
                      />
                      {errors.hourly_rate && (
                        <ErrorMsg msg={errors.hourly_rate.message} />
                      )}
                    </div>

                    <div className="flex flex-col w-full items-start">
                      <span className="font-medium">
                        {"Profile Overview"}
                      </span>

                      <div className="bg-white w-full">
                        <QuillToolbar />
                        <ReactQuill
                          theme="snow"
                          value={description}
                          onChange={(value) => {
                            const cleanedValue = removeTrailingEmptyTags(value);
                            setDescription(value);
                            setValue("description", cleanedValue);
                            trigger("description");
                          }}
                          className="h-64 [&>*]:rounded-b-md"
                          modules={modules}
                          formats={formats}
                        />
                      </div>
                      {errors.description && (
                        <ErrorMsg msg={errors.description.message} />
                      )}
                    </div>
                  </div>
                )}
                {page === 4 && (
                  <div className="flex flex-col max-[480px]:!text-center"
                   
                   
                  >
                    <div>
                      <span>
                        Tell us more about your Skills.
                      </span>
                    </div>
                    <div>
                      <span>
                        We need to get a sense of your skills, experience and
                        categories. It’s quickest to import your information,
                        you can edit it before your profile goes live.
                      </span>
                    </div>
                    <div className="mb-10">
                      <Select
                        placeholder="Select Your Skills"
                        className="lg:w-[400px] w-full"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={skillOptions}
                        onChange={(e) => {
                          handleSelectChange(e);
                          setValue(
                            "skills",
                            e.map((option) => option.value) || []
                          );
                          trigger("skills");
                        }}
                        value={selectedOptions}
                        isLoading={!skillOptions?.length}
                      />
                      {errors.skills && (
                        <ErrorMsg msg={errors.skills.message} />
                      )}
                    </div>
                  </div>
                )}
              </>
            )) || (
              <>
                {role == 2 && page == 2 && (
                  <div className="flex flex-col"
                   
                  >
                    <span>
                      How would you like to tell us about yourself?
                    </span>

                    <div className="flex flex-col w-full items-start">
                      <span className="font-medium">
                        {"Write Your Business Name"}
                      </span>
                      <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm w-full"
                        placeholder="Write Your Business Name"
                        _placeholder={{ color: "gray.500" }}
                        borderColor={"var(--bordersecondary)"}
                       
                        accept="image/*"
                        onChange={(e) => {
                          setValue("business_name", e.target.value);
                          trigger("business_name");
                        }}
                      />
                      {errors.business_name && (
                        <ErrorMsg msg={errors.business_name.message} />
                      )}
                    </div>

                    <div className="flex flex-col w-full items-start">
                      <span className="font-medium">
                        {"Write Your Business Details"}
                      </span>
                      <spanarea
                        placeholder="Write Your Business Details"
                        _placeholder={{ color: "gray.500" }}
                        borderColor={"var(--bordersecondary)"}
                        style={{ resize: "none" }}
                        rows={5}
                        onChange={(e) => {
                          setValue("brief_description", e.target.value);
                          trigger("brief_description");
                        }}
                      />
                      {errors.brief_description && (
                        <ErrorMsg msg={errors.brief_description.message} />
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
            <button 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground max-sm:w-full mb-10"
              isLoading={isLoading}
              loadingText="Save & Continue"
              transition="0.3s ease-in-out"
              _hover={{
                backgroundColor: "var(--primarysoftbg)",
                color: "var(--primarytext)",
              }}
              type="submit"
              spinner={<BtnSpinner />}
            >
              Save & Continue
            </button>
          </form>
        )}
      </>
    </OnboardingProcess>
  );
};

export default Process;
