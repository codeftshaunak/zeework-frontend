"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Search,
  Filter,
  X,
  RefreshCw,
} from "lucide-react";
import { getJobs } from "../../helpers/APIs/jobApis";
import { getCategories } from "../../helpers/APIs/freelancerApis";
import ModernJobCard from "./ModernJobCard";
import UserProfileCard from "./UserCard";
import AgencyUserCard from "./AgencyUserCard";
import TimerDownloadCard from "../Common/TimerDownloadCard";
import { cn } from "@/lib/utils";
import Select from "react-select";
import { useSelector } from "react-redux";
import { CurrentUserContext } from "../../contexts/CurrentUser";

// Types
interface Category {
  _id: string;
  category_name: string;
}

interface CategoryOption {
  value: string;
  label: string;
}

interface JobsData {
  data?: any[];
  totalLength?: number;
}

const ModernSearchPage = ({ isFreelancer }: { isFreelancer: boolean }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<CategoryOption[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [contractType, setContractType] = useState<string[]>([]);
  const [jobsData, setJobsData] = useState<JobsData>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showHighlightedSearchTerm, setShowHighlightedSearchTerm] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { hasAgency, activeAgency } = useContext(CurrentUserContext);
  const profile = useSelector((state: any) => state.profile);

  // Payment and rate filters
  const [paymentType, setPaymentType] = useState("none");

  // Pagination
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil((jobsData?.totalLength || 0) / 20);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("searchTerm");
    setSearchTerm(searchTerm || "");
  }, []);

  // Get categories
  const getCategory = async () => {
    const { body, code } = await getCategories();
    if (code === 200) {
      setCategoryOptions(
        body?.map((item: Category) => ({
          value: item._id,
          label: item.category_name,
        })) || []
      );
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  // Search with filters
  const searchWithFilters = useCallback(async (params: any) => {
    if (!params) return;

    try {
      setLoading(true);

      // Update URL parameters
      const queryParams = new URLSearchParams(window.location.search);

      if (params?.page) {
        queryParams.set("page", params.page.toString());
      } else {
        queryParams.set("page", "1");
      }

      if (params?.category?.length) {
        queryParams.set(
          "category",
          params.category.map((cat: CategoryOption) => cat.value).join(",")
        );
      } else {
        queryParams.delete("category");
      }

      if (params.paymentType !== "none") {
        queryParams.set("payment", params.paymentType);
      } else {
        queryParams.delete("payment");
      }

      if (params?.experience?.length) {
        queryParams.set("experience", params.experience.join(","));
      } else {
        queryParams.delete("experience");
      }

      if (params?.contractType?.length) {
        queryParams.set("contractType", params.contractType.join(","));
      } else {
        queryParams.delete("contractType");
      }

      if (params?.searchTerm) {
        queryParams.set("searchTerm", params.searchTerm);
      } else {
        queryParams.delete("searchTerm");
      }

      const newUrl = `/search-job?${queryParams.toString()}`;
      window.history.replaceState({}, "", newUrl);

      // Fetch jobs
      const jobs = await getJobs(
        params.page,
        params.category,
        params?.searchTerm || undefined,
        params?.experience || [],
        params?.contractType || [],
        null, // hourlyRateMin
        null, // hourlyRateMax
        null, // fixedRateMin
        null, // fixedRateMax
        params.paymentType !== "none" ? params.paymentType : undefined
      );

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
      page: 1,
      category,
      experience,
      contractType,
      paymentType,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, experience, contractType, paymentType]);

  const handleSearch = () => {
    searchWithFilters({
      searchTerm,
      page: 1,
      category,
      experience,
      contractType,
      paymentType,
    });
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowHighlightedSearchTerm(false);
    router.push("/search-job");
  };

  const resetFilters = () => {
    setSearchTerm("");
    setShowHighlightedSearchTerm(false);
    setCategory([]);
    setExperience([]);
    setContractType([]);
    setPage(1);
    setPaymentType("none");
  };

  const handleExperienceChange = (level: string, checked: boolean) => {
    if (checked) {
      setExperience([...experience, level]);
    } else {
      setExperience(experience.filter(exp => exp !== level));
    }
    setPage(1);
  };

  const handleContractTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setContractType([...contractType, type]);
    } else {
      setContractType(contractType.filter(ct => ct !== type));
    }
    setPage(1);
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex w-full py-6">
        <div className="w-[40%] pr-6 max-lg:hidden">
          {!profile?.agency?.isError && isFreelancer && (
            <div className="mb-6">
              {hasAgency && activeAgency ? (
                <>
                  <AgencyUserCard />
                  <br />
                  <UserProfileCard />
                </>
              ) : (
                <>
                  <UserProfileCard />
                  <br />
                  <AgencyUserCard />
                </>
              )}
            </div>
          )}

          <div className="flex items-start justify-center p-5">
            <div className="w-full lg:w-[350px] bg-white p-7 rounded-2xl">
              <div className="flex flex-row items-center justify-between">
                <span className="text-2xl font-medium">Filters</span>
                <RefreshCw
                  className={`text-2xl sm:text-4xl text-slate-500 hover:text-slate-400 active:text-slate-500 cursor-pointer ${
                    loading && "animate-spin cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (!loading) resetFilters();
                  }}
                />
              </div>
              <div className="space-y-6 mt-5">
                {/* Categories */}
                <div className="flex flex-col items-start w-full my-5">
                  <span className="font-semibold">Category</span>
                  <Select
                    placeholder="Select Your Category"
                    className="w-full"
                    isMulti
                    closeMenuOnSelect={true}
                    options={categoryOptions}
                    onChange={(selected) => setCategory(selected as CategoryOption[])}
                    value={category}
                  />
                </div>

                {/* Experience Level */}
                <div className="flex flex-col items-start justify-start my-6">
                  <span className="font-semibold">Experience Required</span>
                  <div className="flex flex-col items-start">
                    {["Entry", "Intermediate", "Expert"].map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={level}
                          checked={experience.includes(level)}
                          onCheckedChange={(checked) =>
                            handleExperienceChange(level, checked as boolean)
                          }
                        />
                        <Label htmlFor={level} className="text-sm text-gray-700">
                          {level}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contract Type */}
                <div className="flex flex-col items-start justify-start my-6">
                  <span className="font-semibold">Contract Type</span>
                  <div className="flex flex-col items-start">
                    {[
                      { value: "hourly", label: "Hourly Rate" },
                      { value: "fixed", label: "Fixed Price" }
                    ].map((type) => (
                      <div key={type.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.value}
                          checked={contractType.includes(type.value)}
                          onCheckedChange={(checked) =>
                            handleContractTypeChange(type.value, checked as boolean)
                          }
                        />
                        <Label htmlFor={type.value} className="text-sm text-gray-700">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client Info */}
                <div className="flex flex-col items-start justify-start my-6">
                  <span className="font-semibold">Client Info</span>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={paymentType === "verified"}
                      onCheckedChange={(checked) =>
                        setPaymentType(checked ? "verified" : "none")
                      }
                    />
                    <Label htmlFor="verified" className="text-sm text-gray-700">
                      Payment Verified
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TimerDownloadCard />
        </div>

        <div className="w-full">
          <div className="flex flex-row items-center w-full justify-space-evenly mb-[0.9rem] rounded border border-tertiary overflow-hidden">
            <Image src="/images/zeework_banner_bizzzy.jpg" alt="banner" width={800} height={200} className="w-full h-auto" />
          </div>
          <div className="mb-4 text-xl font-semibold">
            Search For Your Next Job
          </div>
          <div className="flex flex-row items-center w-full justify-space-evenly mx-[auto] mb-[0.9rem]">
            <div className="w-full flex gap-2 bg-white items-center border-[#D1D5DA] border rounded-md">
              <input
                className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background !border-0"
                placeholder="Search for open positions..."
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowHighlightedSearchTerm(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    searchWithFilters({ searchTerm: (e.target as HTMLInputElement).value });
                }}
                value={searchTerm}
              />
              {searchTerm && (
                <X
                  className="text-var(--primarycolor) z-50 mx-2 text-1.5rem cursor-pointer"
                  onClick={clearSearch}
                />
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setShowFilters(!showFilters);
              }}
              className="lg:hidden"
            >
              <div className="text-var(--primarycolor) font-800 text-1.5rem border p-[5px 10px] rounded cursor-pointer transition-colors duration-300 hover:bg-var(--primarycolor) hover:text-white">
                <Filter />
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
              <Search />
            </div>
          </div>
          <div className={`lg:hidden ${showFilters ? "" : "hidden"}`}>
            {/* Mobile filters would go here */}
          </div>
          <div className="mt-2 text-xl font-semibold">Latest Job Posts</div>
          <div className="overflow-auto w-[100%]">
            <ModernJobCard
              isLoading={loading}
              jobs={loading ? [] : jobsData?.data || []}
              searchTerm={searchTerm}
              showHighlightedSearchTerm={showHighlightedSearchTerm}
            />

            {/* Simple Pagination */}
            {totalPages > 1 && !loading && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  className="px-4 py-2 border rounded disabled:opacity-50"
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                >
                  Previous
                </button>
                <span className="px-4 py-2">Page {page} of {totalPages}</span>
                <button
                  className="px-4 py-2 border rounded disabled:opacity-50"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernSearchPage;