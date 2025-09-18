"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import HomeLayout from "../../Layouts/HomeLayout";
import MyJobsComponentUi from "../../MyJobsComponentUi";

const MyJobPage = () => {
  const role = useSelector((state) => state.auth.role);
  const router = useRouter();

  return (
    <>
      <HomeLayout>
        {role == 1 ? <MyJobsComponentUi /> : router.push("/find-job")}
      </HomeLayout>
    </>
  );
};

export default MyJobPage;
