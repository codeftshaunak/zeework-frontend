"use client";

import React, { useState } from "react";

const DataListData = [
  {
    id: 1,
    date: "Oct 01 , 2022-sep 18, 2023",
  },
  {
    id: 2,
    date: "Oct 02 , 2022-sep 18, 2023",
  },
  {
    id: 3,
    date: "Oct 03 , 2022-sep 18, 2023",
  },
  {
    id: 4,
    date: "Oct 04 , 2022-sep 18, 2023",
  },

  {
    id: 5,
    date: "Oct 05 , 2022-sep 18, 2023",
  },
];

function TransactionHistory() {
  const [selectedDate, setSelectedDate] = useState(
    "Oct 01 , 2022-sep 18, 2023"
  );
  const [toggle, setToggle] = useState(false);
  const selectedDateHandler = (value) => {
    setSelectedDate(value);
    setToggle(false);
  };
  return (
    <>
      <div className="max-w-[1300px] mx-auto w-full pt-7 lg:px-5 px-0">
        <div className="w-full">
          <h2 className="text-xl font-semibold leading-7 lg:mb-[60px] mb-8 text-gray-400">
            Transaction History
          </h2>
          <div className="border rounded-[10px] mb-6">
            <div className="w-full h-[60px] flex justify-start items-center px-2.5 border-b">
              <p className="text-xl font-medium leading-7 text-gray-400">
                Balance: <span className="text-primary">$50.00</span>
              </p>
            </div>
            <div className="px-5 py-5 min-h-[122px]">
              <p className="text-sm text-gray-400 font-medium mb-1">
                Statement Period
              </p>

              {/* select box */}
              <div className="lg:w-[380px] w-full  relative">

}

export default TransactionHistory;
