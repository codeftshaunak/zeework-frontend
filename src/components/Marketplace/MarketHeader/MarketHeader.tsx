"use client";

import { useState } from "react";
import { Box, HStack, Image, Input, VStack } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";

import { SearchFilter } from "./SearchFilter";
import { useRouter } from "next/navigation";

const MarketplaceHeader = ({ category, isLoading, route, routeCategory }) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams(location.search);
    if (searchText.trim() !== "") {
      queryParams.set("searchText", searchText);
    } else {
      queryParams.delete("searchText");
    }
    const newUrl = `${window.pathname}?${queryParams.toString()}`;
    router.push(newUrl);
  };

  return (
    <HStack
      width={"full"}
      justifyContent={"space-between"}
      alignItems={"start"}
      marginTop={"10px"}
      marginBottom={5}
      gap={5}
    >
      <SearchFilter
        categoryOptions={category}
        loading={isLoading}
        setText={setSearchText}
        route={route}
        routeCategory={routeCategory}
      />
      <div className="hidden lg:flex justify-between flex-wrap gap-3">
        <HStack
          width="100%"
          justifyContent="space-evenly"
          borderRadius="0.75rem"
          className="border border-tertiary overflow-hidden"
        >
          <Image
            src="/images/marketplace.png"
            className="w-[100%] object-cover h-[360px]"
          />
        </HStack>

        <VStack width="100%" justifyContent="space-evenly" marginX="auto">
          <div className="w-full flex gap-2 items-center rounded-md">
            <Input
              placeholder="Find your perfect gig ..."
              bgColor="white"
              height="50px"
              paddingLeft="1rem"
              fontSize="1.2rem"
              value={searchText}
              onChange={handleSearchTextChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button type="button" className="lg:hidden">
              <Box
                fontWeight="800"
                fontSize="1.5rem"
                border="1px solid var(--primarycolor)"
                padding="5px 10px"
                borderRadius="5px"
                backgroundColor="white"
                cursor="pointer"
                color="var(--primarycolor)"
                transition="0.3s ease-in-out"
                _hover={{
                  backgroundColor: "var(--primarycolor)",
                  color: "#fff",
                }}
              >
                <CiFilter />
              </Box>
            </button>
            <Box
              fontWeight="800"
              fontSize="1.8rem"
              border="1px solid var(--primarycolor)"
              padding="8px 15px"
              borderRadius="5px"
              backgroundColor="var(--primarycolor)"
              cursor="pointer"
              color="white"
              transition="0.3s ease-in-out"
              _hover={{
                backgroundColor: "#fff",
                color: "#000",
              }}
              onClick={handleSearch}
            >
              <BiSearchAlt />
            </Box>
          </div>
        </VStack>
      </div>
    </HStack>
  );
};

export default MarketplaceHeader;
