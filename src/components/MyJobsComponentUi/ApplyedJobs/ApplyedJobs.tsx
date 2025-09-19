
"use client";
import React from "react";

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Stack,
  Tr,
  VStack,
  Text,
  Button,
  Box,
} from "@/components/ui/migration-helpers";
import { Link, useRouter } from "next/navigation";
import HorizontalCardSkeleton from "../../Skeletons/HorizontalCardSkeleton";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { useState } from "react";

const ApplyedJobs = ({ applyJobs, loading }) => {
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const reversedApplyJobs = applyJobs?.slice()?.reverse();
  return (
    <div className="my-3 space-y-4">
      <h2 className="mt-8 mb-4 text-2xl font-medium">My Applications</h2>

      {loading ? (
        <HorizontalCardSkeleton />
      ) : applyJobs?.length > 0 ? (
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
                  <Th
                    className={`capitalize max-lg:${hidden ? "hidden" : ""}`}
                  >
                    Name
                  </Th>
                  <Th
                    className={`capitalize max-lg:${hidden ? "" : "hidden"}`}
                  >
                    Status
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {reversedApplyJobs?.map((item, index) => {
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
                        className={`text-[1.1rem] max-[480px]:text-[0.8rem] max-lg:${
                          hidden ? "" : "hidden"
                        }`}
                      >
                        {formattedDate}
                      </Td>
                      <Td
                        className={`max-lg:!w-[100%] flex-row max-lg:${
                          !hidden ? "" : "hidden"
                        }`}
                      >
                        <div className="text-[#22C35E] text-lg font-medium capitalize text-center">
                          <Link
                            to={`/find-job/${item?._id}`}
                            className="max-[420px]:block hidden"
                          >
                            {item?.title.slice(0, 15)}
                            {item?.title?.length >= 15 ? "..." : ""}
                          </Link>
                          <Link
                            to={`/find-job/${item?._id}`}
                            className="sm:hidden max-[420px]:hidden"
                          >
                            {item?.title.slice(0, 25)}
                            {item?.title?.length >= 25 ? "..." : ""}
                          </Link>
                          <Link
                            to={`/find-job/${item?._id}`}
                            className="max-sm:hidden block"
                          >
                            {item?.title}
                          </Link>
                        </div>
                      </Td>
                      <Td
                        className={`text-[1.1rem] max-lg:${
                          hidden ? "" : "hidden"
                        }`}
                      >
                        <div
                          className="h-[2rem] flex items-center justify-center font-400 text-white p-[20px 0px] rounded w-[150px] text-center m-[auto] max-[480px]:!w-[100px] max-[360px]:!w-[80px]"
                          backgroundColor={"var(--primarytextcolor)"}
                         
                        >
                          {"Applied"}
                        </div>
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
          <span
           
           
           
            className="mb-[0.4em]"
          >
            You haven&apos;t applied to any job.
          </span>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            backgroundColor="var(--primarycolor)"
            _hover={{
              border: "1px solid var(--primarycolor)",
              backgroundColor: "white",
              color: "black",
            }}
            onClick={() => {
              router.push("/find-job");
            }}
          >
            Visit For New Opportunities
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplyedJobs;
