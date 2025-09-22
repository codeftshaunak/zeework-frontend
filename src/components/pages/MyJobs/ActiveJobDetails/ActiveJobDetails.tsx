"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import HomeLayout from "../../../Layouts/HomeLayout";
import ActiveJobDetailsComponent from "../../../components/MyJobsComponentUi/ActiveJobDetailsComponent";

const EndContract = () => {
  const role = useSelector((state) => state.auth.role);
  
  return (
    <>
      <HomeLayout>{<ActiveJobDetailsComponent />}</HomeLayout>
    </>
  );
};

export default EndContract;
