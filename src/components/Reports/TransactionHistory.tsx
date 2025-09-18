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
                              onClick={() => selectedDateHandler(item.date)}
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
          </div>
          <div className="flex space-x-5 items-center mb-6">
            <a
              href="#"
              download
              className="bg-primary text-white leading-5 px-2.5 py-[6px] rounded-md inline"
            >
              Download Invoices
            </a>
            <a
              href="#"
              download
              className="bg-transparent border hover:bg-primary hover:text-white transition duration-300 ease-in-out border-primary text-primary leading-5 px-2.5 py-[6px] rounded-md inline"
            >
              Download CSV
            </a>
          </div>
          <div className="border rounded-[10px] overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className=" w-full py-3 border-b">
                  <td className="text-xl font-medium text-gray-400 min-w-[150px]">
                    <p className="py-6 px-4">Date</p>
                  </td>
                  <td className="text-xl font-medium text-gray-400 min-w-[150px]">
                    <p className="py-6 px-4">Type</p>
                  </td>
                  <td className="text-xl font-medium text-gray-400 min-w-[150px]">
                    <p className="py-6 px-4">Description</p>
                  </td>
                  <td className="text-xl font-medium text-gray-400 min-w-[150px]">
                    <p className="py-6 px-4">Client</p>
                  </td>
                  <td className="text-xl font-medium text-gray-400 min-w-[150px]">
                    <p className="py-6 px-4">Amount </p>
                  </td>
                  <td className="text-xl font-medium text-gray-400 min-w-[150px]">
                    <p className="py-6 px-4">Ref ID</p>
                  </td>
                </tr>
                <tr className=" w-full py-3 border-b">
                  <td className="text-sm  text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">Sep 27 , 2023</p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">Service Fee</p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">
                      Service Fee for Hourly-ref id 6242265
                    </p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">Seanie-Company Acc</p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">($1.40) </p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 lg:px-4">62113456</p>
                  </td>
                </tr>
                <tr className=" w-full py-3 border-b">
                  <td className="text-sm  text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">Sep 27 , 2023</p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">Service Fee</p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">
                      Service Fee for Hourly-ref id 6242265
                    </p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">Seanie-Company Acc</p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">($1.40) </p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 lg:px-4">62113456</p>
                  </td>
                </tr>
                <tr className=" w-full py-3 border-b">
                  <td className="text-sm  text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">Sep 27 , 2023</p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">Service Fee</p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">
                      Service Fee for Hourly-ref id 6242265
                    </p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">Seanie-Company Acc</p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">($1.40) </p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 lg:px-4">62113456</p>
                  </td>
                </tr>
                <tr className=" w-full py-3 border-b">
                  <td className="text-sm  text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">Sep 27 , 2023</p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">Service Fee</p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">
                      Service Fee for Hourly-ref id 6242265
                    </p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">Seanie-Company Acc</p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 px-4">($1.40) </p>
                  </td>
                  <td className="text-sm text-gray-400">
                    <p className="lg:py-4 py-1.5 lg:px-4">62113456</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionHistory;
