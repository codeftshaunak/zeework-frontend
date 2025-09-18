import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {
  differenceInCalendarWeeks,
  format,
  getISOWeek,
  getYear,
  startOfWeek,
} from "date-fns";
import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";

const JobTimeSheet = ({ data, isLoading }) => {
  const weeks = data?.data || [];

  const getCurrentWeek = () => {
    const today = new Date();
    return getISOWeek(today);
  };

  // const formatTimeInHours = (min) => {
  //   console.log(min / 60);
  //   const hours = min / 60;
  //   return hours.toFixed(2); // Keeps two decimal places
  // };

  function formatTimeInHours(minutes) {
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

  // const calculatedMinutes = (milliseconds = 0) => {
  //   return Number((milliseconds / (1000 * 60)).toFixed());
  // };

  const currentWeekNumber = getCurrentWeek();

  const getWeekLabel = (weekStartDate, weekNumber) => {
    const currentDate = new Date(weekStartDate);
    const monthName = format(currentDate, "MMM");
    const year = getYear(currentDate);
    const monthWeekNumber =
      differenceInCalendarWeeks(
        currentDate,
        startOfWeek(currentDate, { weekStartsOn: 1 })
      ) + 1;

    const weekSuffix = (num) => {
      if (num === 1) return "1st";
      if (num === 2) return "2nd";
      if (num === 3) return "3rd";
      return `${num}th`;
    };

    if (weekNumber === currentWeekNumber) {
      return `Current Week of ${monthName}`;
    }

    return `${weekSuffix(monthWeekNumber)} Week of ${monthName}, ${year}`;
  };

  const lastWeek = weeks.length > 0 ? weeks[weeks.length - 1] : null;
  const lastWeekTime = lastWeek ? lastWeek.total_time || 0 : 0;

  const totalEarning = (lastWeekTime * data?.details?.hourly_rate) / 60;

  return (
    <div className="w-full h-max bg-white p-5 sm:p-8 rounded-xl border border-[var(--bordersecondary)]">
      {isLoading ? (
        <HorizontalCardSkeleton />
      ) : (
        <div className="mb-3">
          {lastWeek ? (
            <Box overflowX={"auto"}>
              <Table variant="simple">
                <Thead textAlign="center">
                  <Tr>
                    <Th fontSize="1rem" textColor="black" mb="1.5rem">
                      Week Number
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
                </Thead>
                <Tbody>
                  <Tr>
                    <Td className="text-[#22C35E]">
                      {getWeekLabel(
                        lastWeek.date_time[0].date,
                        lastWeek.week_number
                      )}
                    </Td>
                    {lastWeek?.date_time?.map((date, idx) => {
                      return (
                        <Td key={idx} textAlign="center">
                          {formatTimeInHours(date.time)}
                        </Td>
                      );
                    })}
                    <Td textAlign="center">
                      {formatTimeInHours(lastWeekTime)}
                    </Td>
                    <Td textAlign="center" fontWeight="semibold">
                      ${data?.details?.hourly_rate}
                      <sub className="font-normal">/hr</sub>
                    </Td>
                    <Td textAlign="center">${totalEarning.toFixed(2)}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          ) : (
            <div>No data available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobTimeSheet;
