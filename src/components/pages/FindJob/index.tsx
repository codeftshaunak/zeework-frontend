"use client";

import React, { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { AllJobs, SearchJobPage } from "../../FindJobUi";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export const FindJob = () => {
  const role = useSelector((state) => state.auth.role);
  const router = useRouter();

  useEffect(() => {
    if (role == 1) {
      /* empty */
    } else if (role == 2) {
      router.push("/client-dashboard");
    } else {
      router.push("/login");
    }
  }, [role, router]);

  return (
    <HomeLayout>
      {role == 1 && (
        <div className="flex flex-col w-full justify-center p-0">
          <AllJobs />
        </div>
      )}
    </HomeLayout>
  );
};

export const SearchPage = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <HomeLayout>
      <div className="flex flex-col p-0 w-full">
        <SearchJobPage isFreelancer={role === "1"} />
      </div>
    </HomeLayout>
  );
};
