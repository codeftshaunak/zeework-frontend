import React from "react";
import {
  Box,
  Card,
  CardBody,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@/components/ui/migration-helpers";
// import { utcToZonedTime } from 'date-fns-tz';
import { getISOWeek, startOfISOWeek } from "date-fns";
import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";
import { useRouter } from "next/navigation";

const Timesheet = ({ activeJobs, isLoading }) => {
  const router = useRouter();

  function formatTime(minutes) {
    // Calculate hours and remaining minutes
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;

    // Format the time string
    let timeString = "";
    if (hours > 0 || remainingMinutes > 0) {
      timeString += hours < 10 ? "0" + hours : hours;
      timeString += ":";
      timeString +=
        remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;
    } else {
      timeString += "0";
    }

    return timeString;
  }

  // function calculatedMinutes(milliseconds = 0) {
  //   let totalMinutes = milliseconds / (1000 * 60);

  //   return Number(totalMinutes?.toFixed());
  // }

  const now = new Date();
  const utcDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );

  // Calculate the start of the ISO week in UTC
  const startOfWeek = startOfISOWeek(utcDate);

  // Get the ISO week number
  const week_number = getISOWeek(startOfWeek);

  return (
    <div className="mb-3">
      <div className="md:flex mt-3 justify-between">
        <h2 className="mt-8 mb-8 text-[25px] font-semibold">
          Current Work Sheet
        </h2>
      </div>
      {isLoading ? (
        <HorizontalCardSkeleton />
      ) : (
        <div className="mb-3">
          <Card>
            <CardBody
              paddingY="2.5rem"
              overflowX="auto"
              minHeight="200px"
              className="items-center"
            >
              {activeJobs?.length ? (
                <div overflowX="auto" className="w-full">
                  <Table variant="simple">
                    <Thead>
                      <Tr maxWidth="100%">
                        <Th
                          textColor="black"
                          className="mb-[1.5rem]"
                        >
                          Hourly Contracts
                        </Th>
                        <Th>Mon</Th>
                        <Th>Tue</Th>
                        <Th>Wed</Th>
                        <Th>Thu</Th>
                        <Th>Fri</Th>
                        <Th>Sat</Th>
                        <Th>Sun</Th>
                        <Th>Hours</Th>
                        <Th>Rate</Th>
                        <Th>Amount</Th>
                      </Tr>
                      <br />
                    </Thead>
                    <Tbody>
                      {/* {activeJobs &&
                    activeJobs?.map((contract, index) => {
                      const this_week = contract?.data && contract?.data?.filter(
                        (item) => item.week_number === week_number
                      );
                      const date_time = this_week?.[0]?.date_time;
                      const this_week_time =
                        this_week && this_week?.[0]?.total_time;

                      const total_earning =
                        this_week_time *
                        (contract.details.hourly_rate / 60);

                      return (
                        <Tr key={index}>
                          <Td className="text-[#22C35E]">
                            {contract.details?.contract_title?.length > 30
                              ? contract.details?.contract_title?.slice(
                                0,
                                30
                              ) + ".."
                              : contract.details?.contract_title}
                          </Td>
                          {date_time?.length
                            ? date_time?.map((date, index) => (
                              <Td key={index}>
                                {formatTime(date.time)}
                              </Td>
                            ))
                            : [1, 2, 3, 4, 5, 6, 7]?.map((date, index) => (
                              <Td key={index}>
                                0
                              </Td>
                            ))}
                          <Td>
                            {formatTime(this_week?.[0]?.total_time)}
                          </Td>
                          <Td>
                            ${contract.details?.hourly_rate}
                            <sub className="font-normal">/hr</sub>
                          </Td>
                          <Td>
                            ${total_earning?.toFixed(2) || 0}
                          </Td>
                        </Tr>
                      );
                    })} */}
                      {activeJobs &&
                        activeJobs.map((contract, index) => {
                          const this_week = Array.isArray(contract?.data)
                            ? contract.data.filter(
                                (item) => item.week_number === week_number
                              )
                            : [];

                          const date_time = this_week?.[0]?.date_time || [];
                          const this_week_time =
                            this_week?.[0]?.total_time || 0;

                          const total_earning =
                            this_week_time *
                            (contract.details.hourly_rate / 60);

                          return (
                            <Tr key={index}>
                              <Td
                                className="text-[#22C35E] cursor-pointer"
                                onClick={() =>
                                  router.push(
                                    `/active-job/submit/${contract?.details?.offer_id}`
                                  )
                                }
                              >
                                {contract.details?.contract_title?.length > 30
                                  ? contract.details?.contract_title.slice(
                                      0,
                                      30
                                    ) + ".."
                                  : contract.details?.contract_title}
                              </Td>
                              {date_time.length
                                ? date_time.map((date, index) => (
                                    <Td key={index}>
                                      {formatTime(date.time)}
                                    </Td>
                                  ))
                                : [1, 2, 3, 4, 5, 6, 7].map((_, index) => (
                                    <Td key={index}>
                                      0
                                    </Td>
                                  ))}
                              <Td>
                                {formatTime(this_week_time)}
                              </Td>
                              <Td>
                                ${contract.details?.hourly_rate}
                                <sub className="font-normal">/hr</sub>
                              </Td>
                              <Td>
                                ${total_earning.toFixed(2) || 0}
                              </Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center capitalize font-bold">
                  You haven&apos;t got any hourly contract jobs!
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Timesheet;
