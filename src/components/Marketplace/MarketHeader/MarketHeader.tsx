
"use client";
import React from "react";

import { useState } from "react";

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
    <div className="flex flex-row items-center className="w-full justify-between items-start mt-[10px]"
      marginBottom={5}
    >
      <SearchFilter
        categoryOptions={category}
        loading={isLoading}
        setText={setSearchText}
        route={route}
        routeCategory={routeCategory}
      />
      <div className="hidden lg:flex justify-between flex-wrap gap-3">
        <div className="flex flex-row items-center border border-tertiary overflow-hidden"
         
         
         
         
        >
          <Image
            src="/images/marketplace.png"
            className="w-[100%] object-cover h-[360px]"
          />
        </div>

        <div className="flex flex-col> <div className="w-full flex gap-2 items-center rounded-md">
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Find your perfect gig ..."
              paddingLeft="1rem"
              value={searchText}
              onChange={handleSearchTextChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button type="button" className="lg:hidden">
              <div
               
               
               
               
               
                backgroundColor="white"
               
                transition="0.3s ease-in-out"
                _hover={{
                  backgroundColor: "var(--primarycolor)",
                  color: "#fff",
                }}
               className="cursor-pointer">
                <CiFilter />
              </div>
            </button>
            <div
             
             
             
             
             
              backgroundColor="var(--primarycolor)"
             
              transition="0.3s ease-in-out"
              _hover={{
                backgroundColor: "#fff",
                color: "#000",
              }}
              onClick={handleSearch}
             className="cursor-pointer">
              <BiSearchAlt />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
