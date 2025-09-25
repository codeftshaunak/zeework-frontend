
"use client";
import React from "react";

import { useState } from "react";

import { BiSearchAlt } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";

import { SearchFilter } from "./SearchFilter";
import { Image } from "@/components/ui/migration-helpers";
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
    <div className="flex flex-row items-center w-full justify-between items-start mt-[10px] mb-5"
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

        <div className="flex flex-col">
          <div className="w-full flex gap-2 items-center rounded-md">
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-4"
              placeholder="Find your perfect gig ..."
              value={searchText}
              onChange={handleSearchTextChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button type="button" className="lg:hidden">
              <div className="cursor-pointer bg-white transition-all duration-300 ease-in-out hover:bg-green-500 hover:text-white p-2 rounded">
                <CiFilter />
              </div>
            </button>
            <div
              onClick={handleSearch}
              className="cursor-pointer bg-green-500 text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black p-2 rounded">
              <BiSearchAlt />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
