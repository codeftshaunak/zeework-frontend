import React from "react";

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
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

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
            <div overflowX="auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-black text-left p-2 border">
                      Week Number
                    </th>
                    <th className="text-left p-2 border">Mon</th>
                    <th className="text-left p-2 border">Tue</th>
                    <th className="text-left p-2 border">Wed</th>
                    <th className="text-left p-2 border">Thu</th>
                    <th className="text-left p-2 border">Fri</th>
                    <th className="text-left p-2 border">Sat</th>
                    <th className="text-left p-2 border">Sun</th>
                    <th className="text-left p-2 border">Hours</th>
                    <th className="text-left p-2 border">Rate</th>
                    <th className="text-left p-2 border">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-[#22C35E] p-2 border">
                      {getWeekLabel(
                        lastWeek.date_time[0].date,
                        lastWeek.week_number
                      )}
                    </Td>
                    {lastWeek?.date_time?.map((date, idx) => {
                      return (
                        <td key={idx} className="p-2 border">
                          {formatTimeInHours(date.time)}
                        </td>
                      );
                    })}
                    <td className="p-2 border">
                      {formatTimeInHours(lastWeekTime)}
                    </td>
                    <td className="p-2 border">
                      ${data?.details?.hourly_rate}
                      <sub className="font-normal">/hr</sub>
                    </td>
                    <td className="p-2 border">${totalEarning.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div>No data available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobTimeSheet;
