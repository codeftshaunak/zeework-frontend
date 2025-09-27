"use client";

import {
  Box,
  Divider,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@/components/ui/migration-helpers";
import React, { useState } from "react";
import CTAButton from "../CTAButton";
import Select from "react-select";
import Datepicker from "react-tailwindcss-datepicker";
import { BiRefresh } from "react-icons/bi";
import { AiOutlineReload } from "react-icons/ai";
import { ActiveIcon } from "../CTAButton/ActiveIcon";
import { CiCircleMore } from "react-icons/ci";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const options_hr = [
  { value: "utc/12hr", label: "UTC/12 hr" },
  { value: "utc/12hr2", label: "UTC/12 hr4" },
  { value: "utc/12hr1", label: "UTC/12 hr" },
];

const customStyles = {
  control: (base) => ({
    ...base,
    width: 400,
  }),
};
const customStyles_img = {
  width: "180px",
};
const customStyles_hr = {
  control: (base) => ({
    ...base,
    width: 180,
  }),
};

const Workdairy = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(11)),
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col items-start w-[90%]">
      <div className="flex flex-row items-center justify-between w-full">
        <span className="font-semibold">
          Work diary
        </span>
        <CTAButton
          text="Request Manual Time"
          size="0.8rem"
          p="0.5rem 1rem"
        />
      </div>
      <div className="flex flex-col relative border p-[2rem] rounded w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <Select options={options} styles={customStyles} />
          <div className="w-[243px]">
            <Datepicker
              inputClassName="relative pl-2 pr-8 py-2 border border-gray-300 rounded-md w-60" // You can use w-40 or any other width className that suits your needs.
              primaryColor="yellow"
              value={value}
              onChange={handleValueChange}
              showShortcuts={true}
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center gap-2">
            <span className="font-semibold">
              Total:
            </span>
            <span className="font-semibold">
              0:10 hrs
            </span>
            <span className="text-base font-extrabold">
              {<AiOutlineReload />}
            </span>
            <ActiveIcon />
            <span className="text-sm">
              Tracked (0:10 hrs)
            </span>
          </div>
          <Select options={options_hr} styles={customStyles_hr} />
        </div>
        <Divider></Divider>
        <div className="flex flex-row items-center w-full justify-between">
          <div className="flex flex-row items-center gap-2">
            <ActiveIcon />
            <span className="font-semibold">
              7:00 PM - 8:00 PM (1:00 hrs)
            </span>
          </div>
          <span className="text-2xl">{<CiCircleMore />}</span>
        </div>
        <span className="w-full text-sm float-left">
          Working On Mobile Responsiveness
        </span>
        <div className="flex flex-row items-center justify-start w-full flex-wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => {
            return (
              <div className="flex flex-col items-start" key={item}>
                <img
                  src="https://i.ibb.co/tmNpfvL/Screenshot-2023-10-30-at-11-16-14-PM.png"
                  style={customStyles_img}
                  alt="screenshot"
                />
                <div className="flex flex-row items-center gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                    <div
                      key={number}
                      className="w-[11px] h-[5px]"
                      style={{ backgroundColor: "#22C35E" }}
                    ></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Workdairy;
