import { Box, VStack } from "@chakra-ui/react";
import AgencyLeftbar from "./AgencyLeftbar";
import AgencyMembers from "./AgencyMembers";
import AgencyRightBar from "./AgencyRightBar";

const AgencyBody = ({ agency, setAgency }) => {
  return (
    <AgencyBodyLayout>
      <VStack width={"full"}>
        <Box
          display={{ lg: "flex" }}
          width={"95%"}
          paddingY={"20px"}
          position={"relative"}
        >
          <AgencyLeftbar agency={agency} setAgency={setAgency} />
          <AgencyRightBar agency={agency} setAgency={setAgency} />
        </Box>
        <Box display={{ lg: "flex" }}
          width={"95%"}
          paddingY={"20px"}
          position={"relative"}>
          <AgencyMembers setAgency={setAgency} />
        </Box>
      </VStack>
    </AgencyBodyLayout>
  );
};

//  agency body layout
export const AgencyBodyLayout = ({ children }) => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      className="shadow-sm border p-4 bg-white"
    >
      {children}
    </Box>
  );
};

export default AgencyBody;
