"use client";

import React, { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { AllJobs, SearchJobPage } from "../../FindJobUi";
import { VStack } from "@chakra-ui/react";
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
  }, [role, navigate]);

  return (
    <HomeLayout>
      {role == 1 && (
        <VStack
          padding={"0"}
          bg="#F6F7F9"
          width={"full"}
          justifyContent={"center"}
        >
          <AllJobs />
        </VStack>
      )}
    </HomeLayout>
  );
};

export const SearchPage = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <HomeLayout>
      <VStack padding={"0"} width={"full"}>
        <SearchJobPage isFreelancer={!!role === 1} />
      </VStack>
    </HomeLayout>
  );
};
