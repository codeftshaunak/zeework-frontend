
"use client";
import React from "react";

import { useEffect, useState } from "react";
import GigCards from "../GigCards/GigCards";
import { getSearchGigs } from "../../../helpers/APIs/gigApis";

import { useRouter } from "next/navigation";

const Marketing = () => {
  const [gigs, setGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const getAllGigs = async (page = 1) => {
    try {
      setIsLoading(true);
      const { code, body } = await getSearchGigs({
        categories: "65a89e292a1e1295cacac5c2",
        page,
        limit: 10,
      });
      if (code === 200) {
        setGigs(body.gigs);
        setTotalPages(body.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllGigs(currentPage);
  }, [currentPage]);

  return (
    <div className="bg-papaya-whip p-5 rounded-md">
      <h1 className="text-3xl font-semibold text-center md:text-left capitalize">
        Marketing
      </h1>
      <div className="text-center py-4">
        <div>
          <GigCards gigs={gigs?.slice(0, 6)} isLoading={false} />
        </div>
      </div>
      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        onClick={() =>
          router.push(
            "/marketplace/search?type=marketing&category=65a89e292a1e1295cacac5c2"
          )
        }
        isDisabled={isLoading}
      >
        See More
      </button>
    </div>
  );
};

export default Marketing;
