import { VStack } from "@chakra-ui/react";
import AgencyOverview from "./AgencyOverview";
import AgencyProjects from "./AgencyPorjects";
import AgencyServices from "./AgencyServices";
import AgencyWorkHistory from "./AgencyWorkHistory";

const AgencyLeftbar = ({ agency, setAgency }) => {
  const { agency_overview } = agency || {};
  return (
    <VStack
      alignItems={"flex-start"}
      width={{ base: "100%", lg: "70%" }}
      marginRight={{ lg: 5 }}
      gap={"5"}
      borderRight={{ base: "none", lg: "0.1px solid gray" }}
    >
      <AgencyOverview overview={agency_overview} setAgency={setAgency} />
      <br />
      <AgencyServices agency={agency} setAgency={setAgency} />
      <br />
      <AgencyProjects setAgency={setAgency} agency={agency} />
      <br />
      <AgencyWorkHistory setAgency={setAgency} />
      <br />
    </VStack>
  );
};

export default AgencyLeftbar;
