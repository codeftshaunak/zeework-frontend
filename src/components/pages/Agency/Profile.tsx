"use client";

// import React from "react";
// import { useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
// import AgencyProfile from "../../AgencyProfile/AgencyProfile";
import AgencyProfile from "../../AgencyUI/AgencyProfile";

const AgencyProfilePage = () => {
  // const profile = useSelector((state) => state.profile);

  return (
    <HomeLayout>
      <AgencyProfile />
    </HomeLayout>
  );
};

export default AgencyProfilePage;
