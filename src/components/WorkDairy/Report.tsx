import Image from "next/image";
import { Box, Button, HStack, Text, VStack } from '@/components/ui/migration-helpers';
import React from 'react';
import { FaCircleDot } from 'react-icons/fa6';
import { GrAdd } from 'react-icons/gr';

const Report = () => {
    return (
        <VStack  w="90%">
            <HStack>
                <img alt="" src='./images/user.jpeg' className="w-[70px] h-[70px] rounded-full object-cover" />
                <Box>
                    <Text className="text-2xl font-semibold">Shahzaib Y.</Text>
                    <Text>Lahore, Pakistan - 9:00 pm local time</Text>
                </Box>
            </HStack>
            <VStack  className="w-full">
                <Text className="text-2xl font-medium">
                    Data Cleaning
                </Text>
                <HStack>
                    <Text>Overview</Text>
                    <Text>Worksheet</Text>
                    <Text>Messages</Text>
                    <Text>Details</Text>
                </HStack>
            </VStack>
            <HStack className="w-full">
                <VStack className="w-full">
                    <VStack className="w-full p-4 border border-gray-300">
                        <HStack className="justify-between w-full">
                            <Text w="90px" className="flex items-center justify-between text-xl font-medium">To-dos {<FaCircleDot color='#0EA5E9' />}</Text>
                            <button className="w-[90px] flex justify-between"><><GrAdd /> New</></button>
                        </HStack>
                    </VStack>
                    <HStack className="border border-gray-300"></HStack>
                </VStack>
                <VStack className="w-full border border-gray-300">

                </VStack>
            </HStack>
        </VStack>
    )
}

export default Report
