import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { agencyReports } from "../../helpers/APIs/agencyApis";
import { freelancerReports } from "../../helpers/APIs/freelancerApis";
import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";

const data = [
  {
    id: 0,
    title: "Applications Sent",
    number: 20,
  },
  {
    id: 4,
    title: "Invitations Received",
    number: 20,
  },
  {
    id: 1,
    title: "Jobs Completed",
    number: 20,
  },
  {
    id: 2,
    title: "Total Hours Worked",
    number: 20,
  },
  {
    id: 3,
    title: "Gross Earnings",
    number: 20,
  },
];

const Status = () => {
  const [report, setReport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["activeagency"]);
  const activeAgency = cookies.activeagency;

  const getReport = async () => {
    setIsLoading(true);
    try {
      const { code, body } = activeAgency
        ? await agencyReports()
        : await freelancerReports();
      if (code === 200) setReport(body);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const { balance, stats } = report || [];

  useEffect(() => {
    getReport();
  }, []);

  return (
    <div className="w-full pb-24">
      <h2 className="mt-8 mb-8  text-[25px] font-semibold">
        Earnings Overview
      </h2>

      {isLoading ? (
        <HorizontalCardSkeleton />
      ) : (
        <HStack justifyContent={"space-between"}>
          <VStack
            width={"400px"}
            height={"10rem"}
            backgroundColor={"#ffff"}
            border={"1px solid #D1D5DA"}
            borderRadius={"10px"}
            cursor={"pointer"}
            alignItems={"center"}
            justifyContent={"center"}
            _hover={{
              border: "1px solid var(--primarycolor)",
              transition: "0.3s ease-in-out",
            }}
          >
            <p className="font-semibold text-4xl">
              ${balance?.progress?.toFixed(2)}
            </p>
            <p className="text-lg capitalize">Work In Progress</p>
          </VStack>

          <VStack
            width={"400px"}
            height={"10rem"}
            backgroundColor={"#ffff"}
            border={"1px solid #D1D5DA"}
            borderRadius={"10px"}
            cursor={"pointer"}
            alignItems={"center"}
            justifyContent={"center"}
            _hover={{
              border: "1px solid var(--primarycolor)",
              transition: "0.3s ease-in-out",
            }}
          >
            <p className="font-semibold text-4xl">
              ${balance?.review?.toFixed(2)}
            </p>
            <p className="text-xl capitalize">In review</p>
          </VStack>

          <VStack
            width={"400px"}
            height={"10rem"}
            backgroundColor={"#ffff"}
            border={"1px solid #D1D5DA"}
            borderRadius={"10px"}
            cursor={"pointer"}
            alignItems={"center"}
            justifyContent={"center"}
            _hover={{
              border: "1px solid var(--primarycolor)",
              transition: "0.3s ease-in-out",
            }}
          >
            <p className="font-semibold text-4xl">
              ${balance?.available?.toFixed(2)}
            </p>
            <p className="text-lg">Available</p>
          </VStack>
        </HStack>
      )}

      <div className="my-3">
        <div className="md:flex my-3 justify-between">
          <h2 className="mt-10 mb-8 text-[25px] font-semibold">
            Current WorkSheet
          </h2>
          {/* <p className="font-semibold text-[#22C35E]">
          When will I get paid?
        </p> */}
        </div>
        {/* table */}
        <div className="my-3">
          <Card>
            <CardBody paddingY={"2.5rem"}>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr maxWidth={"100%"}>
                      <Th
                        fontSize={"1.2rem"}
                        textColor={"black"}
                        marginBottom={"1.5rem"}
                      >
                        Hourly Contracts
                      </Th>
                      <Th>Mon</Th>
                      <Th>Tue</Th>
                      <Th>Tue</Th>
                      <Th>Tue</Th>
                      <Th>Tue</Th>
                      <Th>Tue</Th>
                      <Th>Tue</Th>
                      <Th isNumeric>Hours</Th>
                      <Th isNumeric>Rate</Th>
                      <Th isNumeric>Amount</Th>
                    </Tr>
                    <br />
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td className="text-[#22C35E]">
                        Netsome Gmbh - UI Designer for mobile application
                      </Td>
                      <Td>-</Td>
                      <Td>-</Td>
                      <Td isNumeric>-</Td>
                      <Td isNumeric></Td>
                      <Td isNumeric></Td>
                    </Tr>
                    <Tr>
                      <Td className="text-[#22C35E]">
                        Optimum- UX/UI Designer With Service Design for Startups
                      </Td>
                      <Td>-</Td>
                      <Td isNumeric>-</Td>
                      <Td isNumeric>-</Td>
                      <Td isNumeric>-</Td>
                      <Td isNumeric>-</Td>
                      <Td isNumeric>-</Td>
                      <Td isNumeric>-</Td>
                      <Td isNumeric>-</Td>
                      <Td isNumeric>-</Td>
                      <Td isNumeric>-</Td>
                    </Tr>
                    <Tr>
                      <Td isNumeric></Td>
                      <Td isNumeric></Td>
                      <Td isNumeric></Td>
                      <Td isNumeric></Td>
                      <Td isNumeric></Td>
                      <Td isNumeric></Td>
                      <Td isNumeric></Td>
                      <Td isNumeric></Td>
                      <Td isNumeric>0.00</Td>
                      <Td isNumeric>$5.00/hr</Td>
                      <Td isNumeric>$5.00/hr</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </div>
      </div>

      <h2 className="mt-10 mb-8 text-[25px] font-semibold">General Stats</h2>
      <HStack justify={"space-between"}>
        {isLoading ? (
          <HorizontalCardSkeleton />
        ) : (
          stats?.map((data, index) => (
            <Card
              key={index}
              width={"220px"}
              height={"10rem"}
              cursor={"pointer"}
              alignItems={"center"}
              justifyContent={"center"}
              boxShadow={"0"}
              border={"1px solid #D1D5DA"}
              borderRadius={"10px"}
              _hover={{
                border: "1px solid var(--primarycolor)",
                transition: "0.3s ease-in-out",
              }}
            >
              <p className="font-semibold text-4xl">{data.number}</p>
              <p className="text-lg capitalize">{data.title}</p>
            </Card>
          ))
        )}
      </HStack>

      <OthersPayment />
    </div>
  );
};

export const OthersPayment = () => {
  return (
    <div className="relative">
      <h2 className="mt-10 mb-8 text-[25px] font-semibold">
        Further Information
      </h2>
      <div className="relative h-[25rem] border">
        <HStack spacing="4" height={"100%"}>
          {data.map((data) => (
            <Card
              key={data.id}
              width="400px"
              backgroundColor="#F0FDF4"
              height="10rem"
              alignItems="center"
              justifyContent="center"
            >
              <p className="font-semibold text-4xl mb-2">{data.number}</p>
              <p className="font-semibold text-lg capitalize">{data.title}</p>
            </Card>
          ))}
        </HStack>

        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="100"
          background="rgba(255, 255, 255, 0.8)"
          backdropFilter="blur(10px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <VStack spacing="4" width={"700px"}>
            <Image src="./images/zeework_logo.png" width={"250px"} />
            <Text fontSize="2xl" fontWeight="bold">
              Welcome to ZeeWork!
            </Text>
            <Text>
              We&apos;re excited to have you be a part of our brand new launch!
            </Text>
            <Text>
              Detailed reporting is coming shortly in further updates with the
              site. For anything you may require immediately for accounting
              purposes or otherwise, please feel free to ping our support
              department for a swift response.
            </Text>
            <Button
              color="var(--secondarycolor)"
              backgroundColor={"var(--primarycolor)"}
              borderRadius={"20px"}
              width={"150px"}
              _hover={{
                color: "var(--primarytext)",
                backgroundColor: "var(--secondarycolor)",
                border: "1px solid var(--primarytextcolor)",
              }}
            >
              Get In Touch
            </Button>
          </VStack>
        </Box>
      </div>
    </div>
  );
};

export default Status;
