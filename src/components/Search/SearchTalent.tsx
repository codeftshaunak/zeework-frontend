
"use client";
import React from "react";

/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  HStack,
  Input,
  Text,
  VStack,
  Avatar,
  RadioGroup,
  Stack,
  SkeletonText,
  StackDivider,
} from "@/components/ui/migration-helpers";
import { BiSearchAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import TalentCard from "./TalentCard";
import { useCallback, useEffect, useState } from "react";
import {
  getCategories,
  getFreelancers,
  getSkills,
  getSubCategory,
} from "../../helpers/APIs/freelancerApis";
import Select from "react-select";
import TimerDownloadCard from "../Common/TimerDownloadCard";
import talentBanner from "../../assets/banner/search-talent-banner.jpg";
import { CiFilter } from "react-icons/ci";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoMdRefreshCircle } from "react-icons/io";
import Pagination from "../utils/Pagination/Pagination";
import useUserActivityListener from "../../hooks/useUserActivityListener";
import { useRouter } from "next/navigation";

export const Talents = () => {
  const profile = useSelector((state: any) => state.profile);
  const router = useRouter();

  const { name, profile_image, professional_role, user_id } =
    profile.profile || [];
  return (
    <div>
      <div className="py-6 px-8 flex">
        <div className="w-[75%]">
          <div className="flex justify-between">
            <div
              transition="0.3s ease-in-out"
              className="p-[1rem 0.5rem] flex flex-row items-center border w-full rounded justify-start cursor-pointer"
              _hover={{
                borderColor: "#22c55e",
              }}
            >
              <img
                src="/images/dashboard/zeework_proposals.png"
                alt="proposals"
              />
              <div
                onClick={() => {
                  router.push("/search-job?page=1");
                }}
              >
                <div className="text-sm font-semibold">Find A Job</div>
                <div className="text-sm text-gray-300">
                  Search & apply to your next
                </div>
              </div>
            </div>
            <div
              transition="0.3s ease-in-out"
              className="p-[1rem 0.5rem] flex flex-row items-center border w-full rounded justify-start cursor-pointer"
              _hover={{
                borderColor: "#22c55e",
              }}
            >
              {" "}
              <img src="/images/dashboard/zeework_stats.png" alt="proposals" />
              <div>
                <div className="text-sm font-semibold">My Stats</div>
                <div className="text-sm text-gray-300">
                  Check your earnings & time spent working
                </div>
              </div>
            </div>
            <div
              transition="0.3s ease-in-out"
              className="p-[1rem 0.5rem] flex flex-row items-center border w-full rounded justify-start cursor-pointer"
              _hover={{
                borderColor: "#22c55e",
              }}
            >
              {" "}
              <img src="/images/dashboard/zeework_jobs.png" alt="proposals" />
              <div>
                <div className="text-sm font-semibold">My Jobs</div>
                <div className="text-sm text-gray-300">
                  View your active jobs & proposals
                </div>
              </div>
            </div>
          </div>
          <div className="text-xl font-semibold mt-4 capitalize">
            Here are jobs for you
          </div>
          <div className="flex gap-6 px-6 mt-4">
            <div className="text-sm font-medium text-primary border-b-2 border-primary p-2">
              Most Recent Jobs
            </div>
            {/* <div className="text-sm font-medium text-primary border-b-2 border-primary p-2">Best Matches</div> */}
            {/* <div className="text-sm font-medium text-gray-300 p-2">Most Recent Jobs</div> */}
          </div>
          {/* <div className="border border-tertiary rounded-2xl overflow-auto">
            <JobCard jobs={leatestJob} />
          </div> */}
          <div className="text-center p-5">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">
              See More
            </button>
          </div>
        </div>
        <div className="w-[25%] pl-6">
          <div className="h-[296px] border border-tertiary rounded-2xl">
            <div className="flex flex-col items-center gap-1 pt-6 pb-4 border-b border-tertiary">
              {profile_image == null ? (
                <Avatar name={name} />
              ) : (
                <img
                  src={profile_image}
                  alt="avatar"
                  className="h-[90px] w-[90px] rounded-full border-4 border-tertiary"
                />
              )}
              <div className="text-2xl font-medium cursor-pointer capitalize">
                {name}
              </div>
              <div className="text-sm text-gray-300">{professional_role}</div>
              <div className="flex items-center">
                <div className="star-filled"></div>
                <div className="star-filled"></div>
                <div className="star-filled"></div>
                <div className="star-filled"></div>
                <div className="star-filled"></div>
                <div className="text-sm font-medium">5.0 of 4 Reviews</div>
              </div>
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-400">Complete your Profile</div>
              <div className="flex gap-4 items-center mt-3">
                <div className="w-[80%] h-[5px] bg-green-600 rounded-2xl"></div>
                <div className="text-xs font-semibold">100%</div>
              </div>
            </div>
          </div>
          <TimerDownloadCard />
        </div>
      </div>
    </div>
  );
};

export const SearchTalents = () => {
  const getSearchTermFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("squery") || "";
  };
  const [page, setPage] = useState(1);
  const [skills, setSkills] = useState([]);
  const [freelancerData, setFreelancerData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(getSearchTermFromURL());
  const [hourlyRateMin, setHourlyRateMin] = useState(null);
  const [hourlyRateMax, setHourlyRateMax] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [categorySkills, setCategorySkills] = useState([]);
  const [hourlyRateStep, setHourlyRateStep] = useState("1");
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  // pagination details
  const totalPages = Math.ceil(freelancerData?.totalLength / 20);

  const profile = useSelector((state: any) => state.profile);

  // search function
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchText = form.searchText.value;
    setSearchText(searchText);
  };

  // update user activity status
  useUserActivityListener((data) => {
    if (data) {
      setFreelancerData((prev) => ({
        ...prev,
        data: prev.data.map((user) =>
          user.user_id === data.user.user_id
            ? { ...user, activity: data.status }
            : user
        ),
      }));
    }
  });

  // Define fetchFreelancers function and also more
  const fetchFreelancers = useCallback(async () => {
    setLoading(true);
    // Construct URLSearchParams
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", page); // set page number
    if (skills.length > 0) queryParams.set("skills", skills.join(","));
    else queryParams.delete("skills");
    if (searchText) queryParams.set("squery", searchText);
    else queryParams.delete("squery");
    if (hourlyRateMin) queryParams.set("hourlyRateMin", hourlyRateMin);
    else queryParams.delete("hourlyRateMin");
    if (hourlyRateMax) queryParams.set("hourlyRateMax", hourlyRateMax);
    else queryParams.delete("hourlyRateMax");
    if (selectedCategories) queryParams.set("category", selectedCategories);
    else queryParams.delete("category");
    if (selectedSubCategory)
      queryParams.set("subCategory", selectedSubCategory);
    else queryParams.delete("subCategory");

    // Update the URL without navigating
    const newUrl = `?${queryParams.toString()}`;
    window.history.replaceState({}, "", newUrl);

    try {
      if (
        page ||
        skills?.length ||
        searchText ||
        hourlyRateMin ||
        hourlyRateMax ||
        selectedCategories ||
        selectedSubCategory?.length
      ) {
        const { body, code } = await getFreelancers(
          page,
          skills,
          searchText,
          hourlyRateMin,
          hourlyRateMax,
          selectedCategories,
          selectedSubCategory
        );

        if (code === 200) setFreelancerData(body);
      }
    } catch (error) {
      console.error("Error fetching freelancer data:", error);
    }
    setLoading(false);
  }, [
    skills,
    searchText,
    hourlyRateMin,
    hourlyRateMax,
    selectedSubCategory,
    selectedCategories,
  ]);

  // Fetch freelancers whenever dependencies change
  useEffect(() => {
    fetchFreelancers();
  }, [fetchFreelancers, page]);

  // This effect will reset page to 1 when any filter except page changes
  useEffect(() => {
    setPage(1);
  }, [
    skills,
    searchText,
    hourlyRateMin,
    hourlyRateMax,
    selectedCategories,
    selectedSubCategory,
  ]);

  // Calling Category ApI
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { body, code } = await getCategories();
        if (code === 200) setCategoryData(body);
      } catch (error) {
        console.error("Error fetching freelancer data:", error);
      }
    };
    fetchCategory();
  }, []);

  // ===== get subcategory
  useEffect(() => {
    const fetchSubCategory = async () => {
      if (!selectedCategories) return;
      try {
        const { body, code } = await getSubCategory(selectedCategories);
        if (code === 200) setSubCategory(body);
      } catch (error) {
        console.error("Error fetching subcategory data:", error);
      }
    };
    fetchSubCategory();
  }, [selectedCategories]);

  // calling skills API
  useEffect(() => {
    const fetchSkills = async () => {
      if (!selectedCategories) return;
      try {
        const { body, code } = await getSkills(selectedCategories);
        if (code === 200) setCategorySkills(body);
      } catch (error) {
        console.error("Error fetching freelancer data:", error);
      }
    };
    fetchSkills();
  }, [selectedCategories]);

  const handleHourlyRateChange = (value) => {
    switch (value) {
      case "1":
        setHourlyRateMin(null);
        setHourlyRateMax(null);
        break;
      case "2":
        setHourlyRateMin(10);
        setHourlyRateMax(30);
        break;
      case "3":
        setHourlyRateMin(30);
        setHourlyRateMax(50);
        break;
      case "4":
        setHourlyRateMin(50);
        setHourlyRateMax(100);
        break;
      case "5":
        setHourlyRateMin(100);
        setHourlyRateMax(null);
        break;
      default:
        break;
    }
  };

  // category function
  const handleCategoryChange = (value) => {
    if (selectedCategories !== value) {
      setSelectedCategories(value);
      setSelectedSubCategory(null);
    }
  };

  // handel subcategory
  const handleSubCategoryChange = (value) => {
    setSelectedSubCategory(value);
  };

  const handleResetFilters = () => {
    setHourlyRateMin(null);
    setHourlyRateMax(null);
    setSelectedCategories(null);
    setSelectedSubCategory(null);
    setSearchText("");
    setHourlyRateStep("1");
    setPage(1);
  };

  return (
    <div className="w-full mx-auto">
      <div className="py-6 flex w-full">
        <div className="w-[40%] max-xl:hidden">
          {/* filtering items */}
          <div className="bg-white w-[90%] flex flex-col mt-[1rem] items-start p-5">
            <div className="flex flex-row items-center justify-between w-full">
              <span
               className="text-2xl font-medium">
                Filters
              </span>

              <IoMdRefreshCircle
                className={`text-2xl sm:text-4xl text-slate-500 hover:text-slate-400 active:text-slate-500 cursor-pointer ${
                  loading && "animate-spin cursor-not-allowed"
                }`}
                onClick={() => {
                  if (!loading) handleResetFilters();
                }}
              />
            </div>
            <div className="flex flex-col items-start justify-start">
              <span className="font-semibold">Category</span>
              <div className="flex flex-col p-[0_0.5rem_0] items-start">
                <RadioGroup.Root defaultValue="2">
                  <div className="flex flex-col space-y-2">
                    {categoryData?.map((category) => (
                      <div key={category._id} className="flex flex-col space-y-2">
                        <RadioGroup.Item 
                          value={category._id} 
                          checked={selectedCategories === category._id} 
                          onClick={() => handleCategoryChange(category?._id)}
                        >
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText>{category?.category_name}</RadioGroup.ItemText>
                        </RadioGroup.Item>
                        {selectedCategories === category?._id && subCategory.length > 0 && (
                          <div className="flex flex-col space-y-2 pl-5">
                              <Select
                                className="w-full"
                                isMulti
                                options={subCategory.map((sub) => ({
                                  value: sub._id,
                                  label: sub.sub_category_name,
                                }))}
                                onChange={(selectedOptions) =>
                                  handleSubCategoryChange(selectedOptions)
                                }
                              />
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </RadioGroup.Root>
              </div>
            </div>

            <div className="flex flex-col items-start justify-start w-full">
              <span className="font-semibold">Hourly Rate</span>
              <RadioGroup.Root
                padding="0 0.5rem 0"
                value={hourlyRateStep}
                mt={1}
                onValueChange={(value) => {
                  setHourlyRateStep(value);
                  handleHourlyRateChange(value);
                }}
              >
                <div className="flex flex-col space-y-4">
                  <RadioGroup.Item value="1">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>Any hourly rate</RadioGroup.ItemText>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="2">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>$10 - 30$</RadioGroup.ItemText>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="3">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>$30 - 50$</RadioGroup.ItemText>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="4">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>$50 - 100$</RadioGroup.ItemText>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="5">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>$100 & above</RadioGroup.ItemText>
                  </RadioGroup.Item>
                </div>
              </RadioGroup.Root>
            </div>
          </div>
        </div>
        <div className="w-full mt-4">
          <div className="border border-[var(--bordersecondary)] rounded-2xl mb-4 overflow-hidden">
            <img src={talentBanner} />
          </div>
          <div className="text-2xl font-semibold mb-4">
            Find Your Perfect Freelancer
          </div>

          <form onSubmit={handleSearch}>
            <div className="flex flex-row items-center className="w-full justify-space-evenly mx-[auto] mb-[0.9rem]"
            >
              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                name="searchText"
                placeholder="Search for freelancer..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // Handle form submission
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setShowFilter(!showFilter);
                }}
                className="xl:hidden"
              >
                <div
                  backgroundColor="white"
                  className="text-var(--primarycolor) font-800 text-1.5rem border p-[5px 10px] rounded cursor-pointer"
                  transition="0.3s ease-in-out"
                  _hover={{
                    backgroundColor: "var(--primarycolor)",
                    color: "#fff",
                  }}
                >
                  <CiFilter />
                </div>
              </button>
              <button type="submit">
                <div
                  backgroundColor={"var(--primarycolor)"}
                  className="text-white font-800 text-1.5rem border p-[5px 10px] rounded cursor-pointer"
                  transition="0.3s ease-in-out"
                  _hover={{
                    backgroundColor: "#fff",
                    color: "#000",
                  }}
                >
                  <BiSearchAlt />
                </div>
              </button>
            </div>
          </form>
          <div
            className={`w-full xl:hidden ${
              showFilter === true ? "" : "hidden"
            }`}
          >
            {/* filtering items */}
            <divmt-[1rem] items-start"
              className="bg-white w-full"
             
             className="flex flex-col className= p-5">
              <div className="flex flex-row items-center className="justify-between w-full">
                <span
                  paddingBottom="0rem"
                 className="text-2xl font-medium">
                  Filters
                </span>

                <IoMdRefreshCircle
                  className={`text-2xl sm:text-4xl text-slate-500 hover:text-slate-400 active:text-slate-500 cursor-pointer ${
                    loading && "animate-spin cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (!loading) handleResetFilters();
                  }}
                />
              </div>
              <div className="flex flex-col className="items-flex-start justify-flex-start">
                <span className="font-semibold">Category</span>
                <div className="flex flex-col className="p-[0 0.5rem 0] items-flex-start">
                  <RadioGroup.Root defaultValue="2">
                    <div className="flex spacing={2} direction="column">
                      {categoryData?.map((category) => (
                        <div className="flex flex-col key={category._id} spacing={2} > <RadioGroup.Item value={category._id} checked={selectedCategories === category?._id} onClick={() => handleCategoryChange(category?._id)} > <RadioGroup.ItemHiddenInput /> <RadioGroup.ItemIndicator /> <RadioGroup.ItemText>{category?.category_name}</RadioGroup.ItemText> </RadioGroup.Item> {selectedCategories === category?._id && subCategory.length > 0 && ( <div className="flex flex-col
                                spacing={2}
                                paddingLeft={5}"
                                direction="column"
                              >
                                <Select
                                  className="w-full"
                                  isMulti
                                  options={subCategory.map((sub) => ({
                                    value: sub._id,
                                    label: sub.sub_category_name,
                                  }))}
                                  onChange={(selectedOptions) =>
                                    handleSubCategoryChange(selectedOptions)
                                  }
                                />
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </RadioGroup.Root>
                </div>
              </div>

              <divitems-flex-start justify-flex-start"
               className="flex flex-col className= w-full">
                <span className="font-semibold">Hourly Rate</span>
                <RadioGroup.Root
                  padding="0 0.5rem 0"
                  defaultValue="1"
                  mt={1}
                  onValueChange={(value) => handleHourlyRateChange(value)}
                >
                  <div className="flex spacing={4} direction="column">
                    <RadioGroup.Item value="1">
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>Any hourly rate</RadioGroup.ItemText>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="2">
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>$10 - 30$</RadioGroup.ItemText>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="3">
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>$30 - 50$</RadioGroup.ItemText>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="4">
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>$50 - 100$</RadioGroup.ItemText>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="5">
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>$100 & above</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  </div>
                </RadioGroup.Root>
              </div>
            </div>
          </div>
          <div className="mt-10 w-[100%]">
            <div className="flex flex-col divider={<div className="flexDivider borderColor="gray.200" />}
              spacing={4}
              
              borderColor="gray.200"
              paddingY={5}
              paddingX={10}
            >
              {loading ? (
                [1, 2, 3].map((item) => (
                  <div key={item} paddingY={7}>
                    <SkeletonText
                      noOfLines={4}
                      spacing="4"
                      skeletonHeight="2"
                      startColor="gray.100"
                      endColor="gray.300"
                    />
                  </div>
                ))
              ) : freelancerData?.data?.length ? (
                freelancerData.data
                  ?.filter(
                    (item) => item?.user_id !== profile?.profile?.user_id
                  )
                  .map((freelancer) => (
                    <TalentCard key={freelancer._id} freelancer={freelancer} />
                  ))
              ) : (
                <h1 className="text-3xl text-gray-300 text-center">
                  Not Found{" "}
                </h1>
              )}
            </div>

            {/* Pagination */}
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};