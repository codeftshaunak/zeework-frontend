"use client";"

import React, { useState } from "react";"

import SmoothMotion from "../utils/Animation/SmoothMotion";"
// import { BsChevronRight } from "react-icons/bs";"
const DataListData = [
  {
    id: 1,
    date: "Oct 01 , 2022-sep 18, 2023","
  },
  {
    id: 2,
    date: "Oct 02 , 2022-sep 18, 2023","
  },
  {
    id: 3,
    date: "Oct 03 , 2022-sep 18, 2023","
  },
  {
    id: 4,
    date: "Oct 04 , 2022-sep 18, 2023","
  },
  {
    id: 5,
    date: "Oct 05 , 2022-sep 18, 2023","
  },
];

const BillingEarning = () => {
  const [active setActiveTab] = useState(0);
  const [userActive setUserActiveTab] = useState(0);
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
      <div className="max-w-[1280px] pt-[56px] mx-auto px-5">"
        <div className="lg:mb-8">"
          <h2 className="text-2xl font-semibold leading-8">"
            Billing & Earning
          </h2>
          <p className="text-sm text-gray-300">"
            Seeking a talented UX/UI designer to refine and optimize our
            existing platform&apos;s user experience and visuals. Previous
            experience preferred. Share your{" "}"
          </p>
        </div>
        <Tabs.Root variant="unstyled">"
          <Tabs.List className="w-full">"
            <div className="main-tab-wrapper relative lg:mb-[30px] mb-6 w-full">"
              <div className="flex space-x-[26px] relative z-10">"
                <Tabs.Trigger
                  onClick={() => setActiveTab(0)}
                  type="button"
                  className={` font-medium text-lg py-3 border-b-4  ${`
                    activeTab === 0
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-300"
                  }`}`
                >
                  Billing & Earning
                </Tabs.Trigger>
                <Tabs.Trigger
                  onClick={() => setActiveTab(1)}
                  type="button"
                  className={` font-medium text-lg py-3 border-b-4  ${`
                    activeTab === 1
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-300"
                  }`}`
                >
                  Lifetime billed
                </Tabs.Trigger>
              </div>
              <div className="w-full h-[1px] bg-[#E0E0E0] absolute left-0 bottom-[1.5px]"></div>"
            </div>
          </Tabs.List>
          <SmoothMotion key={activeTab}>
            {" "}"
            <Tabs.Content>
              <Tabs.Content>
                <div className="tab-body">"
                  <div className="flex lg:flex-row flex-col space-y-5 lg:space-y-0 lg:justify-between lg:items-end mb-10">"
                    <div>
                      <p className="text-sm text-gray-300 font-medium mb-1">"
                        Date
                      </p>

                      {/* select box */}
                      <div className="lg:w-[380px] w-full  relative">"

};

export default BillingEarning;
