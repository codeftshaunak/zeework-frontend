import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAgencyById } from "../../../helpers/APIs/agencyApis";
import { Box, VStack } from "@chakra-ui/react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import TopSide from "./TopSide";
import AgencyProfileSkeleton from "../../Skeletons/AgencyProfileSkeleton";
import DataNotAvailable from "../../DataNotAvailable/DataNotAvailable";

const ViewAgencyProfile = () => {
  const [agencyDetails, setAgencyDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const getAgencyDetails = async () => {
    try {
      const { code, body } = await getAgencyById(id);
      if (code === 200) setAgencyDetails(body);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAgencyDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <AgencyProfileSkeleton />
      ) : agencyDetails?.agency_name ? (
        <VStack width={"full"}>
          <TopSide details={agencyDetails} />
          <Box
            display={{ lg: "flex" }}
            width={"100%"}
            paddingY={"20px"}
            position={"relative"}
            className="shadow-sm border p-4 bg-white mt-2 lg:px-10"
          >
            <LeftSide details={agencyDetails} />
            <RightSide details={agencyDetails} />
          </Box>
        </VStack>
      ) : (
        <DataNotAvailable onRefresh={getAgencyDetails} />
      )}
    </>
  );
};

export default ViewAgencyProfile;
