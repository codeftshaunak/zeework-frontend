
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

export 
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

      const skillPromises = categoryIds.map((id) => getSkills(id));

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

    router.push(`${route}${queryString}`, { replace: true });
  }, [selectedCategories, selectedPrice, selectedSkills, router]);

  const resetSearching = () => {
    if (!routeCategory) setSelectedCategories([]);
    setSelectedSkills([]);
    setSelectedPrice("");
    setText("");

  };

  return (
    <div className="w-full lg:w-[450px] bg-white px-7 py-5 rounded-2xl border border-[var(--bordersecondary)]">
      <div className="flex flex-row items-center justify-between">
        <span className="text-2xl font-medium pb-0">
          Filters
        </span>

        <IoMdRefreshCircle
          className={`text-2xl sm:text-4xl text-slate-500 hover:text-slate-400 active:text-slate-500 cursor-pointer ${


};
