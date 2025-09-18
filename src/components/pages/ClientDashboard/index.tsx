"use client";

import React from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import ClientDashboardComponent from "../../ClientDashboardUi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const ClientDashBoard = () => {
  const role = useSelector((state) => state.auth.role);
  const router = useRouter();
  return (
    <>
      <HomeLayout>
        {role == 2 ? <ClientDashboardComponent /> : router.push("/find-job")}
      </HomeLayout>
    </>
  );
};

export default ClientDashBoard;
