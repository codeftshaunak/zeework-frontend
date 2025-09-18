"use client";

import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import SmoothMotion from "../utils/Animation/SmoothMotion";
// import { BsChevronRight } from "react-icons/bs";
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

const BillingEarning = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [userActiveTab, setUserActiveTab] = useState(0);
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
      <div className="max-w-[1280px] pt-[56px] mx-auto px-5">
        <div className="lg:mb-8">
          <h2 className="text-2xl font-semibold leading-8">
            Billing & Earning
          </h2>
          <p className="text-sm text-gray-300">
            Seeking a talented UX/UI designer to refine and optimize our
            existing platform&apos;s user experience and visuals. Previous
            experience preferred. Share your{" "}
          </p>
        </div>
        <Tabs variant="unstyled">
          <TabList className="w-full">
            <div className="main-tab-wrapper relative lg:mb-[30px] mb-6 w-full">
              <div className="flex space-x-[26px] relative z-10">
                <Tab
                  onClick={() => setActiveTab(0)}
                  type="button"
                  className={` font-medium text-lg py-3 border-b-4  ${
                    activeTab === 0
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-300"
                  }`}
                >
                  Billing & Earning
                </Tab>
                <Tab
                  onClick={() => setActiveTab(1)}
                  type="button"
                  className={` font-medium text-lg py-3 border-b-4  ${
                    activeTab === 1
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-300"
                  }`}
                >
                  Lifetime billed
                </Tab>
              </div>
              <div className="w-full h-[1px] bg-[#E0E0E0] absolute left-0 bottom-[1.5px]"></div>
            </div>
          </TabList>
          <SmoothMotion key={activeTab}>
            {" "}
            <TabPanels>
              <TabPanel>
                <div className="tab-body">
                  <div className="flex lg:flex-row flex-col space-y-5 lg:space-y-0 lg:justify-between lg:items-end mb-10">
                    <div>
                      <p className="text-sm text-gray-300 font-medium mb-1">
                        Date
                      </p>

                      {/* select box */}
                      <div className="lg:w-[380px] w-full  relative">
                        {/* click away hidden button */}
                        {toggle && (
                          <div
                            onClick={() => setToggle(!toggle)}
                            className="w-full h-full fixed left-0 top-0 z-10"
                          ></div>
                        )}
                        <button
                          onClick={() => setToggle(!toggle)}
                          type="button"
                          className="border h-8 rounded w-full flex justify-between items-center px-3 py-0.5 relative z-20 bg-white"
                        >
                          <div className="flex space-x-2 items-center">
                            <span>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="3.33301"
                                  y="4.16675"
                                  width="13.3333"
                                  height="13.3333"
                                  rx="1.33333"
                                  stroke="#6B7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.16699 12.4999H10.0003"
                                  stroke="#6B7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.99967 12.5V15"
                                  stroke="#6B7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M3.33301 9.16667H16.6663"
                                  stroke="#6B7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13.3337 2.5V5.83333"
                                  stroke="#6B7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6.66667 2.5V5.83333"
                                  stroke="#6B7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className="text-gray-200 text-sm">
                              {selectedDate}
                            </span>
                          </div>
                          <span>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 7.5L10 12.5L15 7.5"
                                stroke="#6B7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                        {toggle && (
                          <>
                            <div className="min-h-[200px]  py-0.5 bg-white border rounded absolute left-0 -bottom-[205px] w-full z-20">
                              <ul className="">
                                {DataListData &&
                                  DataListData?.length > 0 &&
                                  DataListData.map((item, i) => (
                                    <li
                                      onClick={() =>
                                        selectedDateHandler(item.date)
                                      }
                                      key={i}
                                      className="text-gray-200 text-sm py-2 px-3 flex space-x-2 cursor-pointer hover:bg-primary hover:text-white transition duration-300 ease-in-out"
                                    >
                                      <span>
                                        {" "}
                                        <svg
                                          width="20"
                                          height="20"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <rect
                                            x="3.33301"
                                            y="4.16675"
                                            width="13.3333"
                                            height="13.3333"
                                            rx="1.33333"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M9.16699 12.4999H10.0003"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M9.99967 12.5V15"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M3.33301 9.16667H16.6663"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M13.3337 2.5V5.83333"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M6.66667 2.5V5.83333"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                      <span>{item.date}</span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <a
                        href="#"
                        download
                        className="bg-primary text-white leading-5 px-2.5 py-[6px] rounded-md inline"
                      >
                        Download CSV
                      </a>
                    </div>
                  </div>
                  <Tabs variant="unstyled">
                    <div className="w-full border rounded-[10px]  flex lg:flex-row flex-col min-h-[561px]">
                      <TabList>
                        <div className="lg:w-[250px] w-full py-10 px-6 flex lg:flex-col lg:items-start lg:border-r lg:space-y-3 space-x-3 lg:space-x-0 flex-wrap lg:flex-nowrap">
                          <Tab
                            onClick={() => setUserActiveTab(0)}
                            className={`hover:bg-primary  hover:text-white leading-5 px-2.5 py-[6px] rounded-md hover:font-normal font-medium transition duration-300 ease-in-out ${
                              userActiveTab === 0
                                ? "bg-primary text-white"
                                : " bg-transparent text-gray-300"
                            }`}
                          >
                            Anthony Media Group
                          </Tab>
                          <Tab
                            onClick={() => setUserActiveTab(1)}
                            className={`hover:bg-primary hover:text-white leading-5 px-2.5 py-[6px] rounded-md hover:font-normal font-medium transition duration-300 ease-in-out ${
                              userActiveTab === 1
                                ? "bg-primary text-white"
                                : " bg-transparent text-gray-300"
                            }`}
                          >
                            Benji Hochberg
                          </Tab>
                          <Tab
                            onClick={() => setUserActiveTab(2)}
                            className={`hover:bg-primary  hover:text-white leading-5 px-2.5 py-[6px] rounded-md hover:font-normal font-medium transition duration-300 ease-in-out ${
                              userActiveTab === 2
                                ? "bg-primary text-white"
                                : " bg-transparent text-gray-300"
                            }`}
                          >
                            Eduardo Manetas
                          </Tab>
                          <Tab
                            onClick={() => setUserActiveTab(3)}
                            className={`hover:bg-primary  hover:text-white leading-5 px-2.5 py-[6px] rounded-md hover:font-normal font-medium transition duration-300 ease-in-out ${
                              userActiveTab === 3
                                ? "bg-primary text-white"
                                : " bg-transparent text-gray-300"
                            }`}
                          >
                            Izhar Ali
                          </Tab>
                          <Tab
                            onClick={() => setUserActiveTab(4)}
                            className={`hover:bg-primary  hover:text-white leading-5 px-2.5 py-[6px] rounded-md hover:font-normal font-medium transition duration-300 ease-in-out ${
                              userActiveTab === 4
                                ? "bg-primary text-white"
                                : " bg-transparent text-gray-300"
                            }`}
                          >
                            Majid Tahir
                          </Tab>
                        </div>
                      </TabList>
                      <SmoothMotion key={userActiveTab}>
                        <TabPanels>
                          <TabPanel p={0}>
                            <div className="flex-1 lg:px-6 lg:py-[30px]">
                              <div className="tab-body-wrapper ">
                                <div className="border rounded-[10px] overflow-hidden">
                                  <div className="bg-gray-50 p-5 ">
                                    <p className="text-xl leading-7 font-medium text-gray-400 mb-3">
                                      Your Earning After Zeework Fees & Taxes
                                    </p>
                                    <p className="text-base font-medium text-gray-400 mb-5">
                                      $35.00
                                    </p>
                                    <hr className="h-[1px] w-full mb-8" />
                                    <ul className="flex flex-col space-y-6">
                                      <li className="flex justify-between items-center text-gray-400">
                                        <span className="font-medium text-xl">
                                          Total billed:
                                        </span>
                                        <span className="font-semibold text-sm">
                                          $35.00
                                        </span>
                                      </li>
                                      <li className="flex justify-between items-center text-gray-400">
                                        <span className="font-medium text-xl">
                                          Total Fees:
                                        </span>
                                        <span className="font-semibold text-sm">
                                          ($35.00)
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div>
                                  <table className="w-full">
                                    <tbody>
                                      <tr className="grid grid-cols-5 gap-5 w-full py-3 border-b px-6 lg:px-0">
                                        <td className="text-base font-medium text-gray-400 col-span-3">
                                          Job Name
                                        </td>
                                        <td className="text-base font-medium text-gray-400 col-span-1">
                                          Fee
                                        </td>
                                        <td className="text-base font-medium text-gray-400 col-span-1">
                                          Billed
                                        </td>
                                      </tr>
                                      <tr className="grid grid-cols-5 gap-5 w-full py-3 border-b last:border-none px-6 lg:px-0">
                                        <td className="text-sm font-medium text-gray-200 col-span-3">
                                          Web Designer (Figma)
                                        </td>
                                        <td className="text-base font-medium text-gray-400 col-span-1">
                                          $35.50
                                        </td>
                                        <td className="text-base font-medium text-gray-400 col-span-1">
                                          $35.00
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </TabPanel>
                          <TabPanel>something</TabPanel>
                          <TabPanel>something</TabPanel>
                          <TabPanel>something</TabPanel>
                          <TabPanel>something</TabPanel>
                        </TabPanels>
                      </SmoothMotion>
                    </div>
                  </Tabs>
                </div>
              </TabPanel>
              <TabPanel>Life Time</TabPanel>
            </TabPanels>
          </SmoothMotion>
        </Tabs>
      </div>
    </>
  );
};

export default BillingEarning;
