"use client";

import { useEffect, useState } from "react";
import { useLocation } from "next/navigation";
import { getSearchGigs } from "../../../helpers/APIs/gigApis";
import { getCategories } from "../../../helpers/APIs/freelancerApis";
import MarketplaceHeader from "../MarketHeader/MarketHeader";
import SearchingGigs from "../SearchingGigs/SearchingGigs";
import Pagination from "../../utils/Pagination/Pagination";
import GigCardSkeleton from "../../Skeletons/GigCardSkeleton";
import HorizontalCardSkeleton from "../../Skeletons/HorizontalCardSkeleton";

const SearchedMarketplace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchingGigs, setSearchingGigs] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [page, setPage] = useState(1);
  const pathname = usePathname();
  const queryParams = new URLSearchParams(location.search);
  const newUrl = `${window.pathname}`;
  const type = queryParams.get("type");
  const category =
    type === "client_choice" || type === "random"
      ? null
      : queryParams.get("category");

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
    setIsLoading(false);
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
    const type = searchParams.get("type");

    const query = {
      page,
      type,
      categories,
      skills,
      minPrice,
      maxPrice,
      searchText,
    };

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

  const getHeadingText = () => {
    if (type === "client_choice") {
      return "Services That People Loved For Superb Work And Delivery";
    } else if (type === "marketing") {
      return "Marketing";
    } else if (type === "technology") {
      return "Technology";
    } else if (type === "random") {
      return "Random";
    }
  };

  return (
    <div className="pb-10 w-full">
      {isLoading ? (
        <div className="mt-10">
          <HorizontalCardSkeleton className="border-slate-200" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full mt-10">
            {[1, 2, 3].map((i) => (
              <GigCardSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <MarketplaceHeader
            category={categoryOptions}
            isLoading={isLoadingSearch}
            refresh={getSearchingGigs}
            route={`${newUrl}?type=${type}&`}
            routeCategory={category}
          />

          <SearchingGigs
            gigs={searchingGigs}
            isLoading={isLoadingSearch}
            headText={getHeadingText()}
          />

          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default SearchedMarketplace;
