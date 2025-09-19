"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useState } from "react";
import { getAllJobs, getJobs } from "../../helpers/APIs/jobApis";
import JobCard from "./JobCard";
import { useRouter, usePathname } from "next/navigation";
import {
  Box,
  Checkbox,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import Select from "react-select";
import { BiSearchAlt, BiXCircle } from "react-icons/bi";
import UserProfileCard from "./UserCard";
import AgencyUserCard from "./AgencyUserCard";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { getCategories } from "../../helpers/APIs/freelancerApis";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Greetings from "../Common/Greetings";
import TimerDownloadCard from "../Common/TimerDownloadCard";
import Banner from "../Banners/Banner";
import { CiFilter } from "react-icons/ci";
import { parseISO } from "date-fns";
import { setFindWorkData } from "../../redux/pagesSlice/pagesSlice";
import { IoMdRefreshCircle } from "react-icons/io";
import Pagination from "../utils/Pagination/Pagination";

// const TopItem = ({ title, image, subTitle, redirect }) => {
//   const router = useRouter();

//   return (
//     <HStack
//       border={"1px solid #D1D5DA"}
//       width={"32%"}
//       borderRadius={"10px"}
//       justifyContent={"center"}
//       cursor={"pointer"}
//       transition={"0.3s ease-in-out"}
//       padding={"1rem 0.5rem"}
//       _hover={{
//         borderColor: "#22c55e",
//       }}
//       backgroundColor={"#ffff"}
//     >
//       {" "}
//       <img src={image} alt="proposals" />
//       <div
//         onClick={() => {
//           router.push(`/${redirect}`);
//         }}
//       >
//         <div className="text-sm font-semibold">{title}</div>
//         <div className="text-sm text-gray-300">{subTitle}</div>
//       </div>
//     </HStack>
//   );
// };

export const AllJobs = () => {
  const jobs = useSelector((state: any) => state.pages.findWork.jobsList);
  const latestJobs = jobs?.slice(0, 4);
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
    <div className="w-full max-w-[1200px]">
      <div className="w-full py-6 flex justify-center">
        <div className="w-full lg:w-[75%]">
          <Banner />
          <Greetings />
          <div className="hidden md:grid md:grid-cols-3 gap-5 mt-4">
            <div className="max-xl:flex-wrap col-span-1 flex gap-2 items-center justify-start border rounded-xl hover:border-green-500 px-5 py-4 cursor-pointer transition bg-white">
              <img
                src="/images/dashboard/zeework_proposals.png"
                alt="proposals"
              />
              <div
                onClick={() => {
                  router.push("/search-job?page=1");
                }}
              >
                <div className="text-md font-semibold">Find A Job</div>
                <div className="text-sm text-gray-300">
                  Search & apply to your next
                </div>
              </div>
            </div>
            <div className="max-xl:flex-wrap col-span-1 flex gap-2 items-center justify-start border rounded-xl hover:border-green-500 px-5 py-4 cursor-pointer transition bg-white">
              <img src="/images/dashboard/zeework_stats.png" alt="proposals" />
              <div
                onClick={() => {
                  router.push("/my-stats");
                }}
              >
                <div className="text-md font-semibold">My Stats</div>
                <div className="text-sm text-gray-300">
                  Check your earnings & time spent working
                </div>
              </div>
            </div>
            <div className="max-xl:flex-wrap col-span-1 flex gap-2 items-center justify-start border rounded-xl hover:border-green-500 px-5 py-4 cursor-pointer transition bg-white">
              <img src="/images/dashboard/zeework_jobs.png" alt="proposals" />
              <div
                onClick={() => {
                  router.push("/my-jobs");
                }}
              >
                <div className="text-md font-semibold">My Jobs</div>
                <div className="text-sm text-gray-300">
                  View your active jobs & proposals
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:hidden">
            <HStack
              border={"1px solid #D1D5DA"}
              width={"100%"}
              borderRadius={"10px"}
              justifyContent={"left"}
              cursor={"pointer"}
              transition={"0.3s ease-in-out"}
              padding={"1rem 0.5rem"}
              background={"white"}
              _hover={{
                borderColor: "#22c55e",
              }}
            >
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
            </HStack>
            <HStack
              border={"1px solid #D1D5DA"}
              width={"100%"}
              borderRadius={"10px"}
              justifyContent={"left"}
              cursor={"pointer"}
              transition={"0.3s ease-in-out"}
              padding={"1rem 0.5rem"}
              background={"white"}
              _hover={{
                borderColor: "#22c55e",
              }}
            >
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
            </HStack>
            <HStack
              border={"1px solid #D1D5DA"}
              width={"100%"}
              borderRadius={"10px"}
              justifyContent={"left"}
              cursor={"pointer"}
              transition={"0.3s ease-in-out"}
              padding={"1rem 0.5rem"}
              background={"white"}
              _hover={{
                borderColor: "#22c55e",
              }}
            >
              {" "}
              <img src="/images/dashboard/zeework_jobs.png" alt="proposals" />
              <div
                onClick={() => {
                  router.push("/my-jobs");
                }}
              >
                <div className="text-sm font-semibold">My Jobs</div>
                <div className="text-sm text-gray-300">
                  View your active jobs & proposals
                </div>
              </div>
            </HStack>
          </div>

          <div className="flex justify-between items-center gap-2 mt-3">
            <p className="text-xl font-bold capitalize">Latest Job Postings</p>
            <IoMdRefreshCircle
              className={`text-2xl sm:text-3xl text-primary hover:text-green-400 active:text-primary cursor-pointer ${
                isLoading && "animate-spin cursor-not-allowed"
              }`}
              onClick={() => {
                if (!isLoading) getAllJobList();
              }}
            />
          </div>
          <div className="w-full">
            <JobCard isLoading={isLoading} jobs={latestJobs} />
          </div>
          {latestJobs?.length > 0 && (
            <div className="mx-auto mt-4">
              <button
                className="bg-[#E7F2EB] text-[#22C55E] border-2 w-[130px] m-auto border-[#22C55E] px-4 py-2 rounded-md flex items-center gap-2"
                onClick={() => router.push("/search-job")}
              >
                See More{" "}
                <img
                  src="/images/dashboard/zeework_button-drop.png"
                  className="pt-1"
                />
              </button>
            </div>
          )}
        </div>
        <div className="pl-6 hidden lg:block">
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
          <TimerDownloadCard />
        </div>
      </div>
    </div>
  );
};

export const SearchJobPage = ({ isFreelancer }) => {
  const pathname = usePathname();
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams?.get("searchTerm") || ""
  );

  const [category, setCategory] = useState(null);
  const [experience, setExperience] = useState([]);
  const [contractType, setContractType] = useState([]);
  const { hasAgency, activeAgency } = useContext(CurrentUserContext);
  const profile = useSelector((state: any) => state.profile);

  const [jobsData, setJobsData] = useState({});
  const [loading, setLoading] = useState();
  const [showHighlightedSearchTerm, setShowHighlightedSearchTerm] =
    useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [hourlyRateMin, setHourlyRateMin] = useState(null);
  const [hourlyRateMax, setHourlyRateMax] = useState(null);

  const [hourlyRateShow, setHourlyRateShow] = useState(false);
  const [fixedRateShow, setFixedRateShow] = useState(false);
  const [sQueryValue, setSQueryValue] = useState(null);
  const [fixedRateMin, setFixedRateMin] = useState(null);
  const [fixedRateMax, setFixRateMax] = useState(null);
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);

  // pagination details
  const totalPages = Math.ceil(jobsData?.totalLength / 20);
  const [page, setPage] = useState(1);
  const [paymentType, setPaymentType] = useState("none");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const searchTerm = searchParams.get("searchTerm");
    setSQueryValue(searchTerm);
    setSearchTerm(searchTerm);
    // If sQueryValue is not null, call handleSearch with sQueryValue
    // if (searchTerm !== null) {
    //   handleSearchWithSQuery(searchTerm);
    // }
  }, [location.search]);

  // Handle Category
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

  // lessen url every changes
  const searchWithFilters = useCallback(async (params) => {
    if (!params) return;

    try {
      setLoading(true);
      const queryParams = new URLSearchParams(window.location.search);

      // Append page in URL parameters
      if (params?.page) {
        queryParams.set("page", params.page);
      } else {
        queryParams.set("page", 1);
      }

      // Append category to URL parameters
      if (params?.category?.length) {
        queryParams.set(
          "category",
          params.category.map((cat) => cat.value).join(",")
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
        ? queryParams.get("experience").split(",")
        : null;
      const contractType = queryParams.has("contractType")
        ? queryParams.get("contractType").split(",")
        : null;
      const searchTerm = queryParams.has("searchTerm")
        ? queryParams.get("searchTerm")
        : null;
      const payment = queryParams.has("payment")
        ? queryParams.get("payment")
        : null;

      // Fetch jobs using the updated parameters
      const jobs = await getJobs(
        params.page,
        params.category,
        searchTerm,
        experience,
        contractType,
        params.hourlyRateMin,
        params.hourlyRateMax,
        params.fixedRateMin,
        params.fixedRateMax,
        payment
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

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleExperienceChange = (experienceLevel) => {
    setExperience((prev) => {
      const updatedExperience = prev.includes(experienceLevel)
        ? prev.filter((level) => level !== experienceLevel)
        : [...prev, experienceLevel];
      setPage(1);
      return updatedExperience;
    });
    // searchWithFilters({ experience: experience })
  };

  // handle Contract type
  const handleContractTypeChange = (contractTypeValue) => {
    if (contractTypeValue === "fixed") {
      setFixedRateShow(!fixedRateShow);
      if (fixedRateShow) setFixedRateMin(null), setFixRateMax(null);
    } else if (contractTypeValue === "hourly") {
      setHourlyRateShow(!hourlyRateShow);
      if (hourlyRateShow) setHourlyRateMin(null), setHourlyRateMax(null);
    }

    // Update contract type and navigate with filters
    setContractType((prev) => {
      const updatedContractType = prev.includes(contractTypeValue)
        ? prev.filter((type) => type !== contractTypeValue)
        : [...prev, contractTypeValue];
      // searchWithFilters();
      setPage(1);
      return updatedContractType;
    });
  };

  const handleHourlyRateChange = (value) => {
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

  const handleFixedRateChange = (value) => {
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

  const clearSearch = () => {
    setSearchTerm("");
    // fetchJobs();
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
      <div className="py-6 flex w-full">
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
          <TimerDownloadCard />
        </div>
        <div className="w-full">
          <HStack
            width={"100%"}
            justifyContent={"space-evenly"}
            marginBottom={"0.9rem"}
            borderRadius={"0.75rem"}
            className="border border-tertiary overflow-hidden"
          >
            <Image src="/images/zeework_banner_bizzzy.jpg" />
          </HStack>
          <div className="text-xl font-semibold mb-4">
            Search For Your Next Job
          </div>
          <HStack
            width={"100%"}
            justifyContent={"space-evenly"}
            marginX={"auto"}
            marginBottom={"0.9rem"}
          >
            <div className="w-full flex gap-2 bg-white items-center border-[#D1D5DA] border rounded-md">
              <Input
                placeholder="Search for open positions..."
                bgColor={"white"}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowHighlightedSearchTerm(false); // or false, depending on your logic
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    searchWithFilters({ searchTerm: e.target.value });
                }}
                value={searchTerm}
                className="!border-0"
              />
              {searchTerm && (
                <Box
                  as={BiXCircle}
                  fontSize={"1.5rem"}
                  cursor={"pointer"}
                  color={"var(--primarycolor)"}
                  transition={"0.3s ease-in-out"}
                  onClick={clearSearch}
                  className="z-50 mx-2"
                />
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setShowFilter(!showFilter);
              }}
              className="lg:hidden"
            >
              <Box
                fontWeight={"800"}
                fontSize={"1.5rem"}
                border={"1px solid var(--primarycolor)"}
                padding={"5px 10px"}
                borderRadius={"5px"}
                backgroundColor={"white"}
                cursor={"pointer"}
                color={"var(--primarycolor)"}
                transition={"0.3s ease-in-out"}
                _hover={{
                  backgroundColor: "var(--primarycolor)",
                  color: "#fff",
                }}
              >
                <CiFilter />
              </Box>
            </button>
            <Box
              fontWeight={"800"}
              fontSize={"1.5rem"}
              border={"1px solid var(--primarycolor)"}
              padding={"5px 10px"}
              borderRadius={"5px"}
              backgroundColor={"var(--primarycolor)"}
              cursor={"pointer"}
              color={"white"}
              transition={"0.3s ease-in-out"}
              _hover={{
                backgroundColor: "#fff",
                color: "#000",
              }}
              onClick={() =>
                searchWithFilters({
                  searchTerm: searchTerm,
                })
              }
            >
              <BiSearchAlt />
            </Box>
          </HStack>
          <div className={`lg:hidden ${showFilter === true ? "" : "hidden"}`}>
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
          <div className="text-xl font-semibold mt-2">Latest Job Posts</div>
          <div className="overflow-auto w-[100%]">
            <JobCard
              isLoading={loading}
              jobs={loading ? [] : jobsData?.data}
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

export const Filter = ({
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
    <Box
      alignItems={"start"}
      gap={"5"}
      display={"flex"}
      justifyContent={"center"}
    >
      <Box className="w-full lg:w-[350px] bg-white p-7 rounded-2xl">
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"500"} fontSize={"1.5rem"} paddingBottom={"0rem"}>
            Filters
          </Text>

          <IoMdRefreshCircle
            className={`text-2xl sm:text-4xl text-slate-500 hover:text-slate-400 active:text-slate-500 cursor-pointer ${
              isLoading && "animate-spin cursor-not-allowed"
            }`}
            onClick={() => {
              if (!isLoading) handleResetFilters();
            }}
          />
        </HStack>
        <VStack alignItems={"flex-start"} w={"full"} marginY={5}>
          <Text fontWeight={"600"}>Category</Text>
          <Select
            placeholder="Select Your Category"
            className="w-full"
            isMulti
            closeMenuOnSelect={true}
            options={categoryOptions}
            onChange={handleCategoryChange}
            value={category}
          />
        </VStack>
        <VStack
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          marginY={6}
        >
          <Text fontWeight={"600"}>Experience Required</Text>
          <VStack alignItems={"flex-start"}>
            <Checkbox
              colorScheme="primary"
              onChange={() => handleExperienceChange("Entry")}
              isChecked={experience?.includes("Entry")}
            >
              Entry Level
            </Checkbox>
            <Checkbox
              colorScheme="primary"
              onChange={() => handleExperienceChange("Intermediate")}
              isChecked={experience?.includes("Intermediate")}
            >
              Intermediate
            </Checkbox>
            <Checkbox
              colorScheme="primary"
              onChange={() => handleExperienceChange("Expert")}
              isChecked={experience?.includes("Expert")}
            >
              Expert
            </Checkbox>
          </VStack>
        </VStack>
        <VStack
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          marginY={6}
        >
          <Text fontWeight={"600"}>Contract Type</Text>
          <VStack
            alignItems={"flex-start"}
            className="max-lg:!flex-row gap-4 max-[540px]:!flex-col"
          >
            <div className="min-w-max flex flex-col">
              <Checkbox
                colorScheme="primary"
                onChange={() => handleContractTypeChange("hourly")}
                isChecked={hourlyRateShow}
              >
                Hourly Rate
              </Checkbox>
              {hourlyRateShow && (
                <VStack
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                  w={"full"}
                  marginLeft={5}
                >
                  <RadioGroup.Root
                    colorPalette="green"
                    defaultValue="1"
                    onValueChange={(details) => handleHourlyRateChange(details.value)}
                  >
                    <Stack spacing={4} direction="column">
                      <RadioGroup.Item value="1">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>Any hourly rate</RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="2">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>$10 - 30$</RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="3">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>$30 - 50$</RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="4">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>$50 - 100$</RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="5">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>$100 & above</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    </Stack>
                  </RadioGroup.Root>
                </VStack>
              )}
            </div>
            <div>
              <Checkbox
                colorScheme="primary"
                onChange={() => handleContractTypeChange("fixed")}
                isChecked={fixedRateShow}
              >
                Fixed Price
              </Checkbox>
              {fixedRateShow && (
                <VStack
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                  w={"full"}
                  marginLeft={5}
                >
                  <RadioGroup.Root
                    colorScheme="primary"
                    defaultValue="1"
                    onValueChange={(value) => handleFixedRateChange(value)}
                  >
                    <Stack spacing={4} direction="column">
                      <RadioGroup.Item value="1">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>Any rate</RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="2">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>$100 - 300$</RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="3">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>$300 - 500$</RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="4">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>$500 - 1000$</RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item value="5">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>$1000 & above</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    </Stack>
                  </RadioGroup.Root>
                </VStack>
              )}
            </div>
          </VStack>
        </VStack>
        <VStack
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          marginY={6}
        >
          <Text fontWeight={"600"}>Client Info</Text>
          <Checkbox
            colorScheme="primary"
            onChange={(e) => {
              const newValue = e.target.checked ? "verified" : "none";
              setPaymentType(newValue);
              setPage(1);
            }}
            isChecked={paymentType === "verified"}
          >
            Payment Verified
          </Checkbox>
        </VStack>
      </Box>
    </Box>
  );
};
