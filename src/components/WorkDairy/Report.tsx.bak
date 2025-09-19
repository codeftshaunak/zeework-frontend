import { Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaCircleDot } from 'react-icons/fa6';
import { GrAdd } from 'react-icons/gr';

const Report = () => {
    return (
        <VStack alignItems={"start"} width={"90%"}>
            <HStack>
                <Image src='./images/user.jpeg' width="70px" borderRadius="50%" />
                <Box>
                    <Text fontWeight={"600"} fontSize={"1.5rem"}>Shahzaib Y.</Text>
                    <Text>Lahore, Pakistan - 9:00 pm local time</Text>
                </Box>
            </HStack>
            <VStack alignItems={"left"} width={"full"}>
                <Text fontSize={"1.5rem"} fontWeight={"500"}>
                    Data Cleaning
                </Text>
                <HStack>
                    <Text>Overview</Text>
                    <Text>Worksheet</Text>
                    <Text>Messages</Text>
                    <Text>Details</Text>
                </HStack>
            </VStack>
            <HStack width={"full"}>
                <VStack width={"full"}>
                    <VStack border={"1px solid #DFDFDF"} width={"full"} padding={"0.7rem 1rem"} borderRadius={"10px"}>
                        <HStack width={"full"} justifyContent={'space-between'}>
                            <Text display={'flex'} alignItems={"center"} justifyContent={"space-between"} fontSize={"1.2rem"} fontWeight={"500"} width={"90px"}>To-dos {<FaCircleDot color='#0EA5E9' />}</Text>
                            <Button border={"1px solid #22C55E"} width={"90px"} bg={"#fff"} display="flex" justifyContent="space-between" borderRadius="50px" color="#000"><><GrAdd /> New</></Button>
                        </HStack>
                    </VStack>
                    <HStack border={"1px solid #DFDFDF"}></HStack>
                </VStack>
                <VStack border={"1px solid #DFDFDF"} width={"full"}>

                </VStack>
            </HStack>
        </VStack>
    )
}

export default Report
