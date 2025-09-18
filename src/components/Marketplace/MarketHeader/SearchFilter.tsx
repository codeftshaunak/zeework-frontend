import {
  Box,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "next/navigation";
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
  }, [selectedCategories, selectedPrice, selectedSkills, navigate]);

  const resetSearching = () => {
    if (!routeCategory) setSelectedCategories([]);
    setSelectedSkills([]);
    setSelectedPrice("");
    setText("");

    router.push(
      `${route}${routeCategory && `category=${selectedCategories?.[0].value}`}`,
      {
        replace: true,
      }
    );
  };

  return (
    <Box className="w-full lg:w-[450px] bg-white px-7 py-5 rounded-2xl border border-[var(--bordersecondary)]">
      <HStack justifyContent={"space-between"}>
        <Text fontWeight={"500"} fontSize={"1.5rem"} paddingBottom={"0rem"}>
          Filters
        </Text>

        <IoMdRefreshCircle
          className={`text-2xl sm:text-4xl text-slate-500 hover:text-slate-400 active:text-slate-500 cursor-pointer ${
            loading && "animate-spin cursor-not-allowed"
          }`}
          onClick={() => {
            if (!loading) resetSearching();
          }}
        />
      </HStack>
      {!routeCategory && (
        <VStack alignItems={"flex-start"} w={"full"} marginTop={"10px"}>
          <Text fontWeight={"600"} mb={1}>
            Category
          </Text>
          <Select
            placeholder="Select Your Category"
            className="w-full"
            closeMenuOnSelect={false}
            isMulti={true}
            options={categoryOptions}
            onChange={(value) => setSelectedCategories(value)}
            value={selectedCategories}
          />
        </VStack>
      )}
      <VStack alignItems={"flex-start"} w={"full"} marginTop={"10px"}>
        <Text fontWeight={"600"} mb={1}>
          Technology
        </Text>
        <Select
          placeholder="Select Your Technology"
          className="w-full"
          isMulti={true}
          isDisabled={!skillsOption?.length}
          closeMenuOnSelect={false}
          options={skillsOption}
          onChange={(value) => setSelectedSkills(value)}
          value={selectedSkills}
          isLoading={isLoading}
        />
      </VStack>
      <VStack
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        marginTop={5}
      >
        <Text fontWeight={"600"} mb={1}>
          Price Range
        </Text>
        <VStack
          alignItems={"flex-start"}
          className="max-lg:!flex-row gap-4 max-[540px]:!flex-col"
        >
          <div className="min-w-max flex flex-col">
            <VStack
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              w={"full"}
              marginLeft={5}
            >
              <RadioGroup
                colorScheme="primary"
                value={selectedPrice}
                onChange={(value) => setSelectedPrice(value)}
              >
                <Stack spacing={2} direction="column">
                  <Radio colorScheme="green" value="">
                    Any Price Range
                  </Radio>
                  <Radio colorScheme="green" value="10-100">
                    $10 - $100
                  </Radio>
                  <Radio colorScheme="green" value="100-500">
                    $100 - $500
                  </Radio>
                  <Radio colorScheme="green" value="500-">
                    $500 - $1000 or above
                  </Radio>
                </Stack>
              </RadioGroup>
            </VStack>
          </div>
        </VStack>
      </VStack>
    </Box>
  );
};
