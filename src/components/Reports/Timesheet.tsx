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
} from "@chakra-ui/react";
// import { utcToZonedTime } from 'date-fns-tz';
import { getISOWeek, startOfISOWeek } from "date-fns";
import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";
import { useNavigate } from "next/navigation";

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
              paddingY={"2.5rem"}
              overflowX={"auto"}
              minHeight={"200px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {activeJobs?.length ? (
                <Box overflowX={"auto"} width={"100%"}>
                  <Table variant="simple">
                    <Thead textAlign={"center"}>
                      <Tr maxWidth={"100%"} textAlign={"center"}>
                        <Th
                          fontSize={"1rem"}
                          textColor={"black"}
                          marginBottom={"1.5rem"}
                        >
                          Hourly Contracts
                        </Th>
                        <Th textAlign="center">Mon</Th>
                        <Th textAlign="center">Tue</Th>
                        <Th textAlign="center">Wed</Th>
                        <Th textAlign="center">Thu</Th>
                        <Th textAlign="center">Fri</Th>
                        <Th textAlign="center">Sat</Th>
                        <Th textAlign="center">Sun</Th>
                        <Th textAlign="center">Hours</Th>
                        <Th textAlign="center">Rate</Th>
                        <Th textAlign="center">Amount</Th>
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
                              <Td key={index} textAlign="center">
                                {formatTime(date.time)}
                              </Td>
                            ))
                            : [1, 2, 3, 4, 5, 6, 7]?.map((date, index) => (
                              <Td key={index} textAlign="center">
                                0
                              </Td>
                            ))}
                          <Td textAlign="center">
                            {formatTime(this_week?.[0]?.total_time)}
                          </Td>
                          <Td textAlign={"center"} fontWeight={"semibold"}>
                            ${contract.details?.hourly_rate}
                            <sub className="font-normal">/hr</sub>
                          </Td>
                          <Td textAlign="center" fontWeight={"semibold"}>
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
                                    <Td key={index} textAlign="center">
                                      {formatTime(date.time)}
                                    </Td>
                                  ))
                                : [1, 2, 3, 4, 5, 6, 7].map((_, index) => (
                                    <Td key={index} textAlign="center">
                                      0
                                    </Td>
                                  ))}
                              <Td textAlign="center">
                                {formatTime(this_week_time)}
                              </Td>
                              <Td textAlign={"center"} fontWeight={"semibold"}>
                                ${contract.details?.hourly_rate}
                                <sub className="font-normal">/hr</sub>
                              </Td>
                              <Td textAlign="center" fontWeight={"semibold"}>
                                ${total_earning.toFixed(2) || 0}
                              </Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                </Box>
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
