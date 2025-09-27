
"use client";
import React from "react";

import {
  Box,
  HStack,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "../../ui/migration-helpers";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { getSkills } from "../../../helpers/APIs/freelancerApis";
import { IoMdRefreshCircle } from "react-icons/io";

export const SearchFilter = ({
  categoryOptions,
  loading,
  setText,
  route,
  routeCategory,
}) => {
  const [skillsOption, setSkillsOption] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    routeCategory
      ? categoryOptions.filter((i) => i.value === routeCategory)
      : []
  );
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const findSkills = async (categories) => {
    setIsLoading(true);
    try {
      const categoryIds = categories.map((category) => category.value);

      const skillPromises = categoryIds.map((id) => getSkills(id, null));

      const skillResponses = await Promise.all(skillPromises);

      const allSkills = skillResponses.flatMap(({ code, body }) => {
        if (code === 200) {
          return body.map((item) => ({
            value: item._id,
            label: item.skill_name,
          }));
        }
        return [];
      });

      setSkillsOption(allSkills);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setSkillsOption([]);
    setSelectedSkills([]);

    if (selectedCategories.length > 0) findSkills(selectedCategories);
  }, [selectedCategories]);

  useEffect(() => {
    const queryParams = [];
    const searchParams = new URLSearchParams(location.search);
    const searchText = decodeURIComponent(searchParams.get("searchText"));

    if (searchText !== "null") {
      queryParams.push(`searchText=${searchText}`);
    }

    if (selectedCategories.length > 0) {
      const categoriesQuery = selectedCategories
        .map((category) => category.value)
        .join(",");
      queryParams.push(`category=${categoriesQuery}`);
    }

    if (selectedSkills?.length > 0) {
      const skillsQuery = selectedSkills.map((skill) => skill.label).join(",");
      queryParams.push(`tech=${skillsQuery}`);
    }

    if (selectedPrice) {
      const priceRange = selectedPrice.split("-");
      const minPrice = priceRange[0];
      const maxPrice = priceRange[1] || "";
      queryParams.push(`min=${minPrice}`);
      if (maxPrice) {
        queryParams.push(`max=${maxPrice}`);
      }
    }

    const queryString = queryParams.join("&");

    router.push(`${route}${queryString}`, );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, selectedPrice, selectedSkills, router]);

  const resetSearching = () => {
    if (!routeCategory) setSelectedCategories([]);
    setSelectedSkills([]);
    setSelectedPrice("");
    setText("");

    router.replace(
      `${route}${routeCategory && `category=${selectedCategories?.[0].value}`}`,
    );
  };

  return (
    <div className="w-full lg:w-[450px] bg-white px-7 py-5 rounded-2xl border border-[var(--bordersecondary)]">
      <div className="flex flex-row items-center justify-between">
        <span className="text-2xl font-medium pb-0">
          Filters
        </span>

        <IoMdRefreshCircle
          className={`text-2xl sm:text-4xl text-slate-500 hover:text-slate-400 active:text-slate-500 cursor-pointer ${
            loading && "animate-spin cursor-not-allowed"
          }`}
          onClick={() => {
            if (!loading) resetSearching();
          }}
        />
      </div>
      {!routeCategory && (
        <div className="mt-[10px] flex flex-col items-start w-full">
          <span className="font-semibold">
            Category
          </span>
          <Select
            placeholder="Select Your Category"
            className="w-full"
            closeMenuOnSelect={false}
            isMulti={true}
            options={categoryOptions}
            onChange={(value: any) => setSelectedCategories(value)}
            value={selectedCategories}
          />
        </div>
      )}
      <div className="mt-[10px] flex flex-col items-start w-full">
        <span className="font-semibold">
          Technology
        </span>
        <Select
          placeholder="Select Your Technology"
          className="w-full"
          isMulti={true}
          isDisabled={!skillsOption?.length}
          closeMenuOnSelect={false}
          options={skillsOption}
          onChange={(value: any) => setSelectedSkills([...value])}
          value={selectedSkills}
          
        />
      </div>
      <div className="flex flex-col items-start justify-start mt-5"
      >
        <span className="font-semibold">
          Price Range
        </span>
        <div className="flex flex-col items-start max-lg:!flex-row gap-4 max-[540px]:!flex-col"
        >
          <div className="min-w-max flex flex-col">
            <div className="flex flex-col items-start justify-start ml-5 w-full">
              <RadioGroup.Root
                colorScheme="primary"
                value={selectedPrice}
                onValueChange={(value) => setSelectedPrice(value)}
              >
                <div className="flex flex-col gap-2">
                  <RadioGroup.Item value="">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>Any Price Range</RadioGroup.ItemText>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="10-100">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>$10 - $100</RadioGroup.ItemText>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="100-500">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>$100 - $500</RadioGroup.ItemText>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="500-">
                    <RadioGroup.ItemHiddenInput />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>$500 - $1000 or above</RadioGroup.ItemText>
                  </RadioGroup.Item>
                </div>
              </RadioGroup.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
