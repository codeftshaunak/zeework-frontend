"use client";

import { useSelector } from "react-redux";
import ClientReport from "../../ClientReports/ClientReport";
import Report from "../../Reports/Reports";
import HomeLayout from "../../Layouts/HomeLayout";

const Reports = () => {
  const role = useSelector((state) => state?.auth?.role);

  return (
    <>
      <HomeLayout>{role == 2 ? <ClientReport /> : <Report />}</HomeLayout>
    </>
  );
};

export default Reports;
