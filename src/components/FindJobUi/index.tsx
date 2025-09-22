"use client";
import { Checkbox } from "@chakra-ui/react";
importfrom "next/image";
import React from "react";

/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useState } from "react";
import { getAllJobs, getJobs } from "../../helpers/APIs/jobApis";
import JobCard from "./JobCard";
import { useRouter, usePathname } from "next/navigation";
import {
  Checkbox
  RadioGroup
} from "@/components/ui/migration-helpers";
import Select from "react-select";
import { BiSearchAlt, BiXCircle } from "react-icons/bi";
import UserProfileCard from "./UserCard";
import AgencyUserCard from "./AgencyUserCard";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { getCategories } from "../../helpers/APIs/freelancerApis";
import { useDispatch, useSelector } from "react-redux";
import Greetings from "../Common/Greetings";
import TimerDownloadCard from "../Common/TimerDownloadCard";
import Banner from "../Banners/Banner";
import { CiFilter } from "react-icons/ci";
import { setFindWorkData } from "../../redux/pagesSlice/pagesSlice";
import { IoMdRefreshCircle } from "react-icons/io";
import Pagination from "../utils/Pagination/Pagination";

// Types
interface Job {
  _id: string;
  title: string;
  // Add other job properties as needed
}

interface Category {
  _id: string;
  category_name: string;
}

interface CategoryOption {
  value: string;
  label: string;
}

interface JobsData {
  data?: Job[];
  totalLength?: number;
}

interface FilterProps {
  handleContractTypeChange: (contractTypeValue: string) => void;
  handleExperienceChange: (experienceLevel: string) => void;
  handleCategoryChange: (value: CategoryOption[]) => void;
  categoryOptions: CategoryOption[];
  category: CategoryOption[];
  handleHourlyRateChange: (value: string) => void;
  handleFixedRateChange: (value: string) => void;
  hourlyRateShow: boolean;
  fixedRateShow: boolean;
  setPaymentType: (type: string) => void;
  paymentType: string;
  setPage: (page: number) => void;
  isLoading: boolean;
  experience: string[];
  handleResetFilters: () => void;
}

export { default as ModernAllJobs } from "./ModernAllJobs";
export { default as ModernSearchPage } from "./ModernSearchPage";
export { default as ModernJobCard } from "./ModernJobCard";

export 
    const router = useRouter();
  const { hasAgency, activeAgency } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getAllJobList = async () => {
    setIsLoading(true);
    try {
      const response = await getAllJobs();

      if (response?.length) {
        dispatch(setFindWorkData({ jobsList: response }));
      }
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!jobs?.length) getAllJobList();
  }, []);

  return (
    <div className="w-full max-w-[1400px]">
      <div className="flex justify-center w-full py-6">
        <div className="w-full lg:w-[75%]">
          <Banner />
          <Greetings />
          <div className="hidden gap-5 mt-4 md:grid md:grid-cols-3">
            <div className="flex items-center justify-start col-span-1 gap-2 px-5 py-4 transition bg-white border cursor-pointer max-xl:flex-wrap rounded-xl hover:border-green-500">
              <img
                src="/images/dashboard/zeework_proposals.png"
                alt="proposals"
              />
              <div
                onClick={() => {
                  router.push("/search-job?page=1");
                }}
              >
                <div className="font-semibold text-md">Find A Job</div>
                <div className="text-sm text-gray-300">
                  Search & apply to your next
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start col-span-1 gap-2 px-5 py-4 transition bg-white border cursor-pointer max-xl:flex-wrap rounded-xl hover:border-green-500">
              <img src="/images/dashboard/zeework_stats.png" alt="proposals" />
              <div
                onClick={() => {
                  router.push("/my-stats");
                }}
              >
                <div className="font-semibold text-md">My Stats</div>
                <div className="text-sm text-gray-300">
                  Check your earnings & time spent working
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start col-span-1 gap-2 px-5 py-4 transition bg-white border cursor-pointer max-xl:flex-wrap rounded-xl hover:border-green-500">
              <img src="/images/dashboard/zeework_jobs.png" alt="proposals" />
              <div
                onClick={() => {
                  router.push("/my-jobs");
                }}
              >
                <div className="font-semibold text-md">My Jobs</div>
                <div className="text-sm text-gray-300">
                  View your active jobs & proposals
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:hidden">
            <div className="flex flex-row items-center justify-start w-full p-4 transition-all duration-300 bg-white border rounded cursor-pointer hover:border-green-500">
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
            <div className="flex flex-row items-center justify-start w-full p-4 transition-all duration-300 bg-white border rounded cursor-pointer hover:border-green-500">
              {" "}
              <img src="/images/dashboard/zeework_stats.png" alt="proposals" />
              <div
                onClick={() => {
                  router.push("/my-stats");
                }}
              >
                <div className="text-sm font-semibold">My Stats</div>
                <div className="text-sm text-gray-300">
                  Check your earnings & time spent working
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start w-full p-4 transition-all duration-300 bg-white border rounded cursor-pointer hover:border-green-500">
              {" "}
              <img src="/images/dashboard/zeework_jobs.png" alt="proposals" />
              <div
                onClick={() => {
                  router.push("/my-jobs");


};

export 
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams?.get("searchTerm") || ""
  );

  const [category, setCategory] = useState<CategoryOption[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [contractType, setContractType] = useState<string[]>([]);
  const { hasAgency, activeAgency } = useContext(CurrentUserContext);
  const profile = useSelector((state: unknown) => state.profile);

  const [jobsData, setJobsData] = useState<JobsData>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showHighlightedSearchTerm, setShowHighlightedSearchTerm] =
    useState(false);
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);

  const [hourlyRateMin, setHourlyRateMin] = useState<number | null>(null);
  const [hourlyRateMax, setHourlyRateMax] = useState<number | null>(null);

  const [hourlyRateShow, setHourlyRateShow] = useState(false);
  const [fixedRateShow, setFixedRateShow] = useState(false);
  const [sQueryValue, setSQueryValue] = useState<string | null>(null);
  const [fixedRateMin, setFixedRateMin] = useState<number | null>(null);
  const [fixedRateMax, setFixRateMax] = useState<number | null>(null);
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);

  // pagination details
  const totalPages = Math.ceil((jobsData?.totalLength || 0) / 20);
  const [page, setPage] = useState(1);
  const [paymentType, setPaymentType] = useState("none");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("searchTerm");
    setSQueryValue(searchTerm);
    setSearchTerm(searchTerm || "");
  }, [location.search]);

  // Handle Category
  const getCategory = async () => {
    const { body, code } = await getCategories();
    if (code === 200)
      setCategoryOptions(
        body?.map((item: Category) => ({
          value: item._id,
          label: item.category_name,
        })) || []
      );
  };
  useEffect(() => {
    getCategory();
  }, []);

  // lessen url every changes
  const searchWithFilters = useCallback(async (params: unknown) => {
    if (!params) return;

    try {
      setLoading(true);
      const queryParams = new URLSearchParams(window.location.search);

      // Append page in URL parameters
      if (params?.page) {
        queryParams.set("page", params.page.toString());
      } else {
        queryParams.set("page", "1");
      }

      // Append category to URL parameters
      if (params?.category?.length) {
        queryParams.set(
          "category",
          params.category.map((cat: CategoryOption) => cat.value).join(",")
        );
      } else {
        queryParams.delete("category");
      }

      // Append payment type to URL parameters
      if (params.paymentType !== "none") {
        queryParams.set("payment", params.paymentType);
      } else {
        queryParams.delete("payment");
      }

      // Append experience to URL parameters
      if (params?.experience?.length) {
        queryParams.set("experience", params.experience.join(","));
      } else {
        queryParams.delete("experience");
      }

      // Append contractType to URL parameters
      if (params?.contractType?.length) {
        queryParams.set("contractType", params.contractType.join(","));
      } else {
        queryParams.delete("contractType");
      }

      // Append searchTerm to URL parameters if it's provided
      if (params?.searchTerm) {
        queryParams.set("searchTerm", params.searchTerm);
      } else {
        queryParams.delete("searchTerm");
      }

      // Create the new URL with the updated parameters
      const newUrl = `/search-job?${queryParams.toString()}`;

      // Replace the current URL without navigating
      window.history.replaceState({}, "", newUrl);

      // Extract payload values from URL parameters
      const experience = queryParams.has("experience")
        ? queryParams.get("experience")?.split(",") || []
        : [];
      const contractType = queryParams.has("contractType")
        ? queryParams.get("contractType")?.split(",") || []
        : [];
      const searchTerm = queryParams.get("searchTerm");
      const payment = queryParams.get("payment");

      // Fetch jobs using the updated parameters
      const jobs = await getJobs(
        params.page,
        params.category,
        searchTerm || undefined,
        experience,
        contractType,
        params.hourlyRateMin,
        params.hourlyRateMax,
        params.fixedRateMin,
        params.fixedRateMax,
        payment || undefined
      );

      // Update state with fetched jobs
      setJobsData(jobs);
      setShowHighlightedSearchTerm(true);
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchWithFilters({
      category,
      experience,
      contractType,
      hourlyRateMin,
      hourlyRateMax,
      fixedRateMin,
      fixedRateMax,
      paymentType,
    });
  }, [
    category,
    experience,
    contractType,
    hourlyRateMin,
    hourlyRateMax,
    fixedRateMin,
    fixedRateMax,
    paymentType,
  ]);

  useEffect(() => {
    if (page !== 1)
      searchWithFilters({
        page,
        category,
        experience,
        contractType,
        hourlyRateMin,
        hourlyRateMax,
        fixedRateMin,
        fixedRateMax,
        paymentType,
      });
  }, [page]);

  const handleCategoryChange = (value: CategoryOption[]) => {
    setCategory(value);
    setPage(1);
  };

  const handleExperienceChange = (experienceLevel: string) => {
    setExperience((prev) => {
      const updatedExperience = prev.includes(experienceLevel)
        ? prev.filter((level) => level !== experienceLevel)
        : [...prev, experienceLevel];
      setPage(1);
      return updatedExperience;
    });
  };

  // handle Contract type
  const handleContractTypeChange = (contractTypeValue: string) => {
    if (contractTypeValue === "fixed") {
      setFixedRateShow(!fixedRateShow);
      if (fixedRateShow) (setFixedRateMin(null), setFixRateMax(null));
    } else if (contractTypeValue === "hourly") {
      setHourlyRateShow(!hourlyRateShow);
      if (hourlyRateShow) (setHourlyRateMin(null), setHourlyRateMax(null));
    }

    // Update contract type and navigate with filters
    setContractType((prev) => {
      const updatedContractType = prev.includes(contractTypeValue)
        ? prev.filter((type) => type !== contractTypeValue)
        : [...prev, contractTypeValue];
      setPage(1);
      return updatedContractType;
    });
  };

  const handleHourlyRateChange = (value: string) => {
    // Update hourly rate values
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
    setPage(1);
  };

  const handleFixedRateChange = (value: string) => {
    // Update fixed rate values
    switch (value) {
      case "1":
        setFixedRateMin(null);
        setFixRateMax(null);
        break;
      case "2":
        setFixedRateMin(100);
        setFixRateMax(300);
        break;
      case "3":
        setFixedRateMin(300);
        setFixRateMax(500);
        break;
      case "4":
        setFixedRateMin(500);
        setFixRateMax(1000);
        break;
      case "5":
        setFixedRateMin(1000);
        setFixRateMax(null);
        break;
      default:
        break;
    }
    setPage(1);
  };

      setShowHighlightedSearchTerm(false);
    router.push("/search-job", { replace: true });
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setShowHighlightedSearchTerm(false);
    setCategory([]);
    setExperience([]);
    setContractType([]);
    setPage(1);
    setFixRateMax(null);
    setFixedRateMin(null);
    setHourlyRateMin(null);
    setHourlyRateMax(null);
    setHourlyRateShow(false);
    setFixedRateShow(false);
    setPaymentType("none");
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex w-full py-6">
        <div className="w-[40%] pr-6 max-lg:hidden">

                  setShowHighlightedSearchTerm(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    searchWithFilters({ searchTerm: e.target.value });

              }}
              className="lg:hidden"
            >
              <div className="text-var(--primarycolor) font-800 text-1.5rem border p-[5px 10px] rounded cursor-pointer transition-colors duration-300 hover:bg-var(--primarycolor) hover:text-white">
                <CiFilter />
              </div>
            </button>
            <div
              className="bg-var(--primarycolor) text-white font-800 text-1.5rem border p-[5px 10px] rounded cursor-pointer transition-colors duration-300 hover:bg-white hover:text-black"
              onClick={() =>
                searchWithFilters({
                  searchTerm: searchTerm,
                })
              }
            >
              <BiSearchAlt />
            </div>
          </div>
          <div className={`lg:hidden ${showFilter ? "" : "hidden"}`}>
            <Filter
              handleCategoryChange={handleCategoryChange}
              handleContractTypeChange={handleContractTypeChange}
              handleExperienceChange={handleExperienceChange}
              categoryOptions={categoryOptions}
              setCategory={setCategory}
              setCategoryOptions={setCategoryOptions}
              category={category}
              handleHourlyRateChange={handleHourlyRateChange}
              handleFixedRateChange={handleFixedRateChange}
              hourlyRateShow={hourlyRateShow}
              fixedRateShow={fixedRateShow}
              setPaymentType={setPaymentType}
              setPage={setPage}
              isLoading={loading}
              handleResetFilters={handleResetFilters}
              experience={experience}
              paymentType={paymentType}
            />
          </div>
          <div className="mt-2 text-xl font-semibold">Latest Job Posts</div>
          <div className="overflow-auto w-[100%]">
            <JobCard
              isLoading={loading}
              jobs={loading ? [] : jobsData?.data || []}
              searchTerm={searchTerm}
              showHighlightedSearchTerm={showHighlightedSearchTerm}
            />

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

export const Filter: React.FC<FilterProps> = ({
  handleContractTypeChange,
  handleExperienceChange,
  handleCategoryChange,
  categoryOptions,
  category,
  handleHourlyRateChange,
  handleFixedRateChange,
  hourlyRateShow,
  fixedRateShow,
  setPaymentType,
  paymentType,
  setPage,
  isLoading,
  experience,
  handleResetFilters,
}) => {
  return (
    <div className="flex items-start justify-center p-5">
      <div className="w-full lg:w-[350px] bg-white p-7 rounded-2xl">
        <div className="flex flex-row items-center justify-between">
          <span className="text-2xl font-medium">Filters</span>

          <IoMdRefreshCircle
            className={`text-2xl sm:text-4xl text-slate-500 hover:text-slate-400 active:text-slate-500 cursor-pointer ${

              setPaymentType(newValue);
              setPage(1);
            }}
            isChecked={paymentType === "verified"}
          >
            Payment Verified
          </Checkbox>
        </div>
      </div>
    </div>
  );
};
