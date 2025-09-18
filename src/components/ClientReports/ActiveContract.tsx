"use client";

import {
  Button,
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
import { useState } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { useNavigate } from "next/navigation";
import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";

const ActiveContract = ({ contractList, loading }) => {
  const [hidden, setHidden] = useState(false);
  const router = useRouter();

  return (
    <div className="my-3 space-y-4">
      {loading ? (
        <HorizontalCardSkeleton />
      ) : contractList?.length > 0 ? (
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
                    fontSize={"0.8rem"}
                    textAlign={"center"}
                    className={`capitalize max-lg:${hidden ? "" : "hidden"}`}
                  >
                    Date
                  </Th>
                  <Th
                    fontSize={"0.8rem"}
                    textAlign={"center"}
                    className={`capitalize max-lg:${hidden ? "hidden" : ""}`}
                  >
                    Contract Title
                  </Th>
                  <Th
                    fontSize={"0.8rem"}
                    textAlign={"center"}
                    className={`capitalize max-lg:${hidden ? "" : "hidden"}`}
                  >
                    Job Type
                  </Th>
                  <Th
                    fontSize={"0.8rem"}
                    textAlign={"center"}
                    className={`capitalize max-lg:${hidden ? "" : "hidden"}`}
                  >
                    Hiring Budget
                  </Th>
                  <Th
                    fontSize={"0.8rem"}
                    textAlign={"center"}
                    className={`capitalize max-lg:${hidden ? "" : "hidden"}`}
                  >
                    Details
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {contractList?.map((item, index) => {
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
                        className={`text-[1rem] max-[480px]:text-[0.8rem] max-lg:${hidden ? "" : "hidden"
                          }`}
                        textAlign={"center"}
                      >
                        {formattedDate}
                      </Td>
                      <Td
                        className={`max-lg:!w-[100%] flex-row max-lg:${!hidden ? "" : "hidden"
                          }`}
                      >
                        <div className="font-medium capitalize text-center">
                          <Text className="max-[420px]:block hidden">
                            {item?.contract_title?.slice(0, 15)}
                            {item?.contract_title?.length >= 15 ? "..." : ""}
                          </Text>
                          <Text className="text-[1rem] sm:hidden max-[420px]:hidden ">
                            {item?.contract_title?.slice(0, 25)}
                            {item?.contract_title?.length >= 25 ? "..." : ""}
                          </Text>
                          <Text className="max-sm:hidden block text-[1rem]">
                            {item?.contract_title}
                          </Text>
                        </div>
                      </Td>
                      <Td
                        height={"2rem"}
                        className={`max-lg:${hidden ? "" : "hidden"}`}
                        textAlign={"center"}
                      >
                        <Text className="capitalize">{item?.job_type}</Text>
                      </Td>
                      <Td
                        height={"2rem"}
                        className={`text-[1rem] max-lg:${hidden ? "" : "hidden"
                          }`}
                        textAlign={"center"}
                      >
                        <Text className="capitalize text-lg font-semibold">
                          $
                          {item?.job_type === "fixed" ? (
                            item?.budget
                          ) : (
                            <>
                              {item.hourly_rate}
                              <sub className="font-normal">/hr</sub>
                            </>
                          )}
                        </Text>
                      </Td>
                      <Td
                        height={"2rem"}
                        className={`text-[1rem] max-lg:${hidden ? "" : "hidden"
                          }`}
                        textAlign={"center"}
                      >
                        <Button
                          colorScheme="primary"
                          rounded="full"
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/contract/${item._id}`)}
                        >
                          Details
                        </Button>
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
          <Text fontSize="1.2rem" textTransform="capitalize" fontWeight="600" className="text-center">
            You haven&apos;t any active contracts.
          </Text>
        </VStack>
      )}
    </div>
  );
};

export default ActiveContract;
