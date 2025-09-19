import { HStack, Text, Box, VStack } from "@chakra-ui/react";
import { MdLocationPin } from "react-icons/md";
import Title from "./Title";
const RightSide = ({ details }) => {
  const {
    agency_hourlyRate,
    agency_officeLocation,
    agency_size,
    agency_foundedYear,
    agency_language,
    agency_totalJob,
  } = details || {};

  return (
    <>
      <VStack
        width={{ base: "full", md: "250px", xl: "300px" }}
        alignItems={"flex-start"}
        justifyContent={"right"}
        marginX={{ xl: "auto" }}
        marginTop={{ base: 10, lg: 0 }}
      >
        <Text fontSize={"1.3rem"} fontWeight={"600"}>
          Agency Activity
        </Text>
        <Box position={"relative"} mb={"1rem"}>
          <Text marginBottom={"0.5rem"} fontSize={"1rem"} fontWeight={"500"}>
            Hourly Rate
          </Text>
          <Text fontSize={"1.3rem"} marginBottom={"0.5rem"} fontWeight={"600"}>
            ${agency_hourlyRate}
          </Text>
        </Box>

        <Box position={"relative"} mb={"1rem"}>
          <Text fontSize={"1.3rem"} fontWeight={"600"} marginBottom={"0.51rem"}>
            Total Completed Job
          </Text>
          <Text fontSize={"1.3rem"} fontWeight={"600"}>
            {agency_totalJob}
          </Text>
        </Box>

        <Box position={"relative"} mb={{ base: "0.8rem", md: "2rem" }}>
          <HStack marginBottom={"0.5rem"} marginTop={"1rem"}>
            <Text fontSize={"1.3rem"} fontWeight={"600"} marginBottom={"0"}>
              Office Location
            </Text>
          </HStack>

          <Box>
            {!!agency_officeLocation?.country && (
              <HStack>
                <MdLocationPin fontSize={"1.2rem"} />
                <Text>
                  {agency_officeLocation?.street},{" "}
                  {agency_officeLocation?.state}
                </Text>
              </HStack>
            )}
          </Box>
        </Box>

        <VStack gap={"10px"} alignItems={"flex-start"}>
          <Text fontSize={"1.3rem"} fontWeight={"600"} marginBottom={"0.51rem"}>
            Company Information
          </Text>

          <VStack gap={"10px"} alignItems={"flex-start"}>
            <HStack alignItems={"start"}>
              {agency_size && (
                <Box marginBottom={"1rem"} marginLeft={"0.57rem"}>
                  <Text
                    fontSize={"1rem"}
                    fontWeight={"500"}
                    marginBottom={"0.5rem"}
                  >
                    Agency Size:
                  </Text>
                  <Text>{agency_size}</Text>
                </Box>
              )}
            </HStack>
            <HStack alignItems={"start"}>
              {agency_foundedYear && (
                <Box marginBottom={"1rem"} marginLeft={"0.57rem"}>
                  <Text
                    fontSize={"1rem"}
                    fontWeight={"500"}
                    marginBottom={"0.5rem"}
                  >
                    Agency Founded:
                  </Text>
                  <Text>{agency_foundedYear}</Text>
                </Box>
              )}
            </HStack>
            <HStack alignItems={"start"}>
              <Box>
                {/* {agency_focus?.length(
                  <Box marginBottom={"1rem"}>
                    <Title size={"sm"}>Agency Focus:</Title>
                    <ul className="flex gap-1 flex-wrap mt-1">
                      {agency_focus.map((item, index) => (
                        <li key={index} className="border px-2 rounded-full">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Box>
                )} */}
              </Box>
            </HStack>
            <HStack alignItems={"start"}>
              {agency_language && (
                <Box marginBottom={"1rem"} marginLeft={"0.56rem"}>
                  <Title size={"sm"}>Language:</Title>
                  <Text>{agency_language}</Text>
                </Box>
              )}
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </>
  );
};

export default RightSide;
