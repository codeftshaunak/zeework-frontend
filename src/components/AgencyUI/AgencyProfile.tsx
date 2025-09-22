
"use client";
import React from "react";


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agencyData } from "../../redux/authSlice/profileSlice";
import AgencyProfileSkeleton from "../Skeletons/AgencyProfileSkeleton";
import AgencyBody from "./AgencyBody";
import AgencyProfileHeader from "./AgencyProfileHeader";

const AgencyProfile = () => {
  const [agency, setAgency] = useState({});
  const dispatch = useDispatch();
  const agencyProfile = useSelector((state: unknown) => state.profile.agency);

  useEffect(() => {
    if (agency._id) dispatch(agencyData({ agency: agency }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agency]);

  return (
    <div className="flex flex-col w-full">
      {!agencyProfile?._id ? (
        <AgencyProfileSkeleton />
      ) : (
        <>
          <AgencyProfileHeader agency={agencyProfile} setAgency={setAgency} />
          <AgencyBody agency={agencyProfile} setAgency={setAgency} />
        </>
      )}
    </div>
  );
};

export default AgencyProfile;
