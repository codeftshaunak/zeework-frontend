
"use client";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import React from "react";

import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack
} from "@/components/ui/migration-helpers";
import { useEffect, useState } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getCompletedJobs } from "../../helpers/APIs/clientApis";
import { setStatsData } from "../../redux/pagesSlice/pagesSlice";
import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";

const CompletedJobs = () => {
  const [hidden, setHidden] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { activeJobs } = useSelector((state: unknown) => state.pages.myStats);
  const dispatch = useDispatch();

  const getJobList = async () => {
    setIsLoading(true);
    try {
      const { code, body } = await getCompletedJobs();

      if (code === 200) dispatch(setStatsData({ activeJobs: body }));
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!activeJobs?.length) getJobList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-3 space-y-4">
      {isLoading ? (
        <HorizontalCardSkeleton />
      ) : activeJobs?.length > 0 ? (
        <div className="m-auto w-[100%] border border-[var(--bordersecondary)] px-5 py-9 rounded-lg bg-white">
          <TableContainer>
            <div
              className="text-[#22C35E] text-lg font-medium lg:hidden"
              onClick={() => {
                setHidden(!hidden);
              }}
            >
              <PiDotsThreeOutlineFill />
            </div>
            <Table
              variant="simple"
              className="w-full m-[auto] items-center"
            >
              <Thead>
                <Tr>
                  <Th
                    className={`capitalize max-lg:${hidden ? "" : "hidden"}`}
                  >
                    Date
                  </Th>
                  {/* <Th
                    className={`capitalize max-lg:${hidden ? "hidden" : ""}`}
                  >
                    Job Title
                  </Th> */}
                  <Th
                    className={`capitalize max-lg:${hidden ? "hidden" : ""}`}
                  >
                    Contract Title
                  </Th>
                  <Th
                    className={`capitalize max-lg:${hidden ? "" : "hidden"}`}
                  >
                    Job Type
                  </Th>
                  <Th
                    className={`capitalize max-lg:${hidden ? "" : "hidden"}`}
                  >
                    Hiring Budget
                  </Th>
                  <Th
                    className={`capitalize max-lg:${hidden ? "" : "hidden"}`}
                  >
                    Details
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {activeJobs?.map((item, index) => {
                  const { created_at } = item || [];
                  const dateObject = new Date(created_at);
                  const formattedDate = dateObject.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <Tr
                      key={index}
                      className="items-center"
                      className={item === null ? "!hidden" : ""}
                    >
                      <Td
                        className={`text-[1rem] max-[480px]:text-[0.8rem] max-lg:${hidden ? "" : "hidden"
                          }`}
                      >
                        {formattedDate}
                      </Td>
                      {/* <Td
                        className={`max-lg:!w-[100%] flex-row max-lg:${!hidden ? "" : "hidden"
                          }`}
                      >
                        <div className="text-[#22C35E] text-[1rem] font-medium capitalize text-center">
                          <span className="max-[420px]:block hidden">
                            {item?.job_title?.slice(0, 15)}
                            {item?.job_title?.length >= 15 ? "..." : ""}
                          </span>
                          <span className="sm:hidden max-[420px]:hidden">
                            {item?.job_title?.slice(0, 25)}
                            {item?.job_title?.length >= 25 ? "..." : ""}
                          </span>
                          <span className="max-sm:hidden block">
                            {item?.job_title}
                          </span>
                        </div>
                      </Td> */}
                      <Td
                        className={`max-lg:!w-[100%] flex-row max-lg:${!hidden ? "" : "hidden"
                          }`}
                      >
                        <div className="font-medium capitalize text-center">
                          <span className="max-[420px]:block hidden">
                            {item?.contract_title?.slice(0, 15)}
                            {item?.contract_title?.length >= 15 ? "..." : ""}
                          </span>
                          <span className="text-[1rem] sm:hidden max-[420px]:hidden">
                            {item?.contract_title?.slice(0, 25)}
                            {item?.contract_title?.length >= 25 ? "..." : ""}
                          </span>
                          <span className="max-sm:hidden block text-[1rem]">
                            {item?.contract_title}
                          </span>
                        </div>
                      </Td>
                      <Td
                        className={`max-lg:${hidden ? "" : "hidden"}`}
                      >
                        <span className="capitalize">{item?.job_type}</span>
                      </Td>
                      <Td
                        className={`text-[1rem] max-lg:${hidden ? "" : "hidden"
                          }`}
                      >
                        <span className="capitalize text-lg font-semibold">
                          $
                          {item?.job_type === "fixed" ? (
                            item?.budget
                          ) : (
                            <>
                              {item.hourly_rate}
                              <sub className="font-normal">/hr</sub>
                            </>
                          )}
                        </span>
                      </Td>
                      <Td
                        className={`text-[1rem] max-lg:${hidden ? "" : "hidden"
                          }`}
                      >
                        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                          onClick={() => router.push(`/contract/${item._id}`)}
                        >
                          Details
                        </button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div
          className="bg-white flex flex-col rounded-lg"
        >
          <span className="text-center">
            You haven&apos;t any completed jobs.
          </span>
        </div>
      )}
    </div>
  );
};

export default CompletedJobs;
