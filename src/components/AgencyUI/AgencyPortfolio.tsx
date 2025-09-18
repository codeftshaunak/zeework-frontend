
import { Box, Image, Text } from "@chakra-ui/react";
import AgencyTitle from "./AgencyTitle";

const AgencyPortfolio = () => {
  return (
    <Box width={"100%"}>
      <AgencyTitle>Projects</AgencyTitle>
      <Box marginTop={"20px"}>
        <Image
          src="./images/404not-added.png"
          width={"150px"}
          display={"block"}
          margin={"auto"}
        ></Image>
        <Text fontSize={"1.3rem"} textAlign={"center"} fontWeight={"600"}>
          You haven&apos;t added your project!
        </Text>
        <Text fontSize={"1rem"} textAlign={"center"}>

        </Text>
      </Box>
    </Box>
  );
};

export default AgencyPortfolio;
