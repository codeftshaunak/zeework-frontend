import {
  Box,
  Divider,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
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
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <VStack width={"90%"} gap={"10"} alignItems={"start"} p={"2rem 0"}>
      <HStack justifyContent={"space-between"} width={"full"}>
        <Text fontWeight={"600"} fontSize={"3xl"}>
          Work diary
        </Text>
        <CTAButton
          text={"Request Manual Time"}
          size={"0.8rem"}
          bg={"#22C55E"}
          color={"#fff"}
          p={"0.5rem 1rem"}
          fontWeight={"500"}
        />
      </HStack>
      <VStack
        width={"full"}
        gap={"10"}
        position={"relative"}
        border={"1px solid #DFDFDF"}
        padding={"2rem 2rem"}
        borderRadius={"10px"}
      >
        <HStack justifyContent={"space-between"} width={"full"}>
          <Select options={options} styles={customStyles} />
          <Box width={"243px"}>
            <Datepicker
              inputClassName="relative pl-2 pr-8 py-2 border border-gray-300 rounded-md w-60" // You can use w-40 or any other width className that suits your needs.
              primaryColor="yellow"
              value={value}
              onChange={handleValueChange}
              showShortcuts={true}
            />
          </Box>
        </HStack>
        <HStack justifyContent={"space-between"} width={"full"}>
          <HStack>
            <Text fontWeight={"600"} fontSize={"1.3rem"}>
              Total:
            </Text>
            <Text fontWeight={"600"} fontSize={"1.3rem"}>
              0:10 hrs
            </Text>
            <Text fontSize={"1rem"} fontWeight={"800"}>
              {<AiOutlineReload color="#22C35E" fontWeight={"800"} />}
            </Text>
            <ActiveIcon />
            <Text fontSize={"0.9rem"} fontWeight={"light"}>
              Tracked (0:10 hrs)
            </Text>
          </HStack>
          <Select options={options_hr} styles={customStyles_hr} />
        </HStack>
        <Divider></Divider>
        <HStack width={"full"} justifyContent={"space-between"}>
          <HStack>
            <ActiveIcon />
            <Text fontWeight={"600"} fontSize={"1.3rem"}>
              7:00 PM - 8:00 PM (1:00 hrs)
            </Text>
          </HStack>
          <Text fontSize={"1.4rem"}>{<CiCircleMore />}</Text>
        </HStack>
        <Text
          fontSize={"0.9rem"}
          fontWeight={"light"}
          float={"left"}
          width={"full"}
        >
          Working On Mobile Responsiveness
        </Text>
        <HStack justifyContent={"start"} width={"full"} flexWrap={"wrap"}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => {
            return (
              <VStack alignItems={"start"} key={item}>
                <Image
                  src="https://i.ibb.co/tmNpfvL/Screenshot-2023-10-30-at-11-16-14-PM.png"
                  style={customStyles_img}
                />
                <HStack>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                    <Box
                      key={number}
                      width={"11px"}
                      height={"5px"}
                      backgroundColor={"#22C35E"}
                    ></Box>
                  ))}
                </HStack>
              </VStack>
            );
          })}
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Workdairy;
