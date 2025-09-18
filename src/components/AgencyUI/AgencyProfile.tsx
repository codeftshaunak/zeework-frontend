import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agencyData } from "../../redux/authSlice/profileSlice";
import AgencyProfileSkeleton from "../Skeletons/AgencyProfileSkeleton";
import AgencyBody from "./AgencyBody";
import AgencyProfileHeader from "./AgencyProfileHeader";

const AgencyProfile = () => {
  const [agency, setAgency] = useState({});
  const dispatch = useDispatch();
  const agencyProfile = useSelector((state: any) => state.profile.agency);

  useEffect(() => {
    if (agency._id) dispatch(agencyData({ agency: agency }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agency]);

  return (
    <VStack width={"100%"}>
      {!agencyProfile?._id ? (
        <AgencyProfileSkeleton />
      ) : (
        <>
          <AgencyProfileHeader agency={agencyProfile} setAgency={setAgency} />
          <AgencyBody agency={agencyProfile} setAgency={setAgency} />
        </>
      )}
    </VStack>
  );
};

export default AgencyProfile;
