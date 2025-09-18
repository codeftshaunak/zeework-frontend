"use client";

import { useEffect, useState } from "react";
import { useLocation } from "next/navigation";
import { getCategories } from "../../../helpers/APIs/freelancerApis";
import MarketplaceHeader from "../MarketHeader/MarketHeader";
import LatestGig from "../LatestGigs/LatestGig";
import RecommendedGigs from "../Recommended/RecommendedGigs";
import { getSearchGigs } from "../../../helpers/APIs/gigApis";
import SearchingGigs from "../SearchingGigs/SearchingGigs";
import Pagination from "../../utils/Pagination/Pagination";

const MarketplaceBody = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchingGigs, setSearchingGigs] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [page, setPage] = useState(1);
  const pathname = usePathname();

  const totalPages = searchingGigs?.totalPages || 0;

  const getCategory = async () => {
    const { body, code } = await getCategories();

    if (code === 200)
      setCategoryOptions(
        body?.map((item) => ({
          value: item._id,
          label: item.category_name,
        }))
      );
  };

  useEffect(() => {
    getCategory();
  }, []);

  // Parse URL parameters from the location object
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categories = searchParams.get("category")
      ? searchParams.get("category").split(",")
      : [];
    const skills = searchParams.get("tech")
      ? searchParams.get("tech").split(",")
      : [];
    const minPrice = searchParams.get("min");
    const maxPrice = searchParams.get("max");
    const searchText = searchParams.get("searchText");

    const query = {
      page,
      categories,
      skills,
      minPrice,
      maxPrice,
      searchText,
    };
    if (
      categories.length ||
      skills.length ||
      minPrice ||
      maxPrice ||
      searchText
    ) {
      setIsSearch(true);
    }
    getSearchingGigs(query);
  }, [location.search, page]);

  // find searching gigs
  const getSearchingGigs = async (query) => {
    setIsLoadingSearch(true);

    try {
      const { code, body } = await getSearchGigs(query);
      if (code === 200) {
        setSearchingGigs(body);
      } else {
        setSearchingGigs([]);
      }
    } catch (error) {
      console.error(error);
      setSearchingGigs([]);
    }
    setIsLoadingSearch(false);
  };

  return (
    <>
      <h1 className="mb-0 text-2xl border-b-2 border-gray-200 flex lg:hidden">
        Market Place
      </h1>

      <MarketplaceHeader
        category={categoryOptions}
        isLoading={isLoadingSearch}
        refresh={getSearchingGigs}
        route={"/marketplace?"}
      />
      {isSearch && (
        <div className="bg-neutral-100 p-5 rounded-md w-full">
          <SearchingGigs gigs={searchingGigs} isLoading={isLoadingSearch} />

          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      )}
      <LatestGig />
      <RecommendedGigs />
    </>
  );
};

export default MarketplaceBody;
