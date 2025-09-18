"use client";

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Stack,
  Tr,
  VStack,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { Link, useNavigate } from "next/navigation";
import HorizontalCardSkeleton from "../../Skeletons/HorizontalCardSkeleton";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { useState } from "react";

const ApplyedJobs = ({ applyJobs, loading }) => {
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const reversedApplyJobs = applyJobs?.slice()?.reverse();
  return (
    <div className="my-3 space-y-4">
      <h2 className="mt-8 mb-4 text-2xl font-medium">My Applications</h2>

      {loading ? (
        <HorizontalCardSkeleton />
      ) : applyJobs?.length > 0 ? (
        <div className="m-auto w-[100%] border border-[var(--bordersecondary)] px-5 py-9 rounded-lg bg-white">
          <TableContainer>
            <div
              className="text-[#22C35E] text-lg font-medium lg:hidden"
              onClick={() => {
                setHidden(!hidden);
              }}
            >
              <PiDotsThreeOutlineFill />
            </div>
            <Table
              variant="simple"
              justifyContent={"center"}
              width={"100%"}
              margin={"auto"}
              alignItems={"center"}
              textAlign={"center"}
            >
              <Thead justifyContent={"center"} textAlign={"center"}>
                <Tr textAlign={"center"}>
                  <Th
                    fontSize={"1rem"}
                    textAlign={"center"}
                    className={`capitalize max-lg:${hidden ? "" : "hidden"}`}
                  >
                    Date
                  </Th>
                  <Th
                    fontSize={"1rem"}
                    textAlign={"center"}
                    className={`capitalize max-lg:${hidden ? "hidden" : ""}`}
                  >
                    Name
                  </Th>
                  <Th
                    fontSize={"1rem"}
                    textAlign={"center"}
                    className={`capitalize max-lg:${hidden ? "" : "hidden"}`}
                  >
                    Status
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {reversedApplyJobs?.map((item, index) => {
                  const { created_at } = item || [];
                  const dateObject = new Date(created_at);
                  const formattedDate = dateObject.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <Tr
                      key={index}
                      alignItems={"center"}
                      className={item === null ? "!hidden" : ""}
                    >
                      <Td
                        className={`text-[1.1rem] max-[480px]:text-[0.8rem] max-lg:${
                          hidden ? "" : "hidden"
                        }`}
                        textAlign={"center"}
                        width={"33%"}
                      >
                        {formattedDate}
                      </Td>
                      <Td
                        width={"33%"}
                        className={`max-lg:!w-[100%] flex-row max-lg:${
                          !hidden ? "" : "hidden"
                        }`}
                      >
                        <div className="text-[#22C35E] text-lg font-medium capitalize text-center">
                          <Link
                            to={`/find-job/${item?._id}`}
                            className="max-[420px]:block hidden"
                          >
                            {item?.title.slice(0, 15)}
                            {item?.title?.length >= 15 ? "..." : ""}
                          </Link>
                          <Link
                            to={`/find-job/${item?._id}`}
                            className="sm:hidden max-[420px]:hidden"
                          >
                            {item?.title.slice(0, 25)}
                            {item?.title?.length >= 25 ? "..." : ""}
                          </Link>
                          <Link
                            to={`/find-job/${item?._id}`}
                            className="max-sm:hidden block "
                          >
                            {item?.title}
                          </Link>
                        </div>
                      </Td>
                      <Td
                        height={"2rem"}
                        className={`text-[1.1rem] max-lg:${
                          hidden ? "" : "hidden"
                        }`}
                        textAlign={"center"}
                        width={"33%"}
                      >
                        <Box
                          height={"2rem"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          backgroundColor={"var(--primarytextcolor)"}
                          fontWeight={"400"}
                          color={"white"}
                          padding={"20px 0px"}
                          borderRadius={"20px"}
                          width={"150px"}
                          textAlign={"center"}
                          margin={"auto"}
                          className="max-[480px]:!w-[100px] max-[360px]:!w-[80px]"
                        >
                          {"Applied"}
                        </Box>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <VStack
          alignItems="center"
          justifyContent="center"
          border="0.1px solid var(--bordersecondary)"
          height="10rem"
          rounded={"lg"}
          bgColor={"white"}
        >
          <Text
            fontSize="1.2rem"
            textTransform="capitalize"
            fontWeight="600"
            marginBottom={"0.4em"}
          >
            You haven&apos;t applied to any job.
          </Text>
          <Button
            borderRadius="25px"
            fontWeight="500"
            backgroundColor="var(--primarycolor)"
            color="white"
            _hover={{
              border: "1px solid var(--primarycolor)",
              backgroundColor: "white",
              color: "black",
            }}
            onClick={() => {
              router.push("/find-job");
            }}
          >
            Visit For New Opportunities
          </Button>
        </VStack>
      )}
    </div>
  );
};

export default ApplyedJobs;
