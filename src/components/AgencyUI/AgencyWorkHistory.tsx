"use client";

import React from "react";
import Image from "next/image";
import AgencyTitle from "./AgencyTitle";

const AgencyWorkHistory = ({setAgency}: any) => {
  return (
    <div className="w-full">
      <AgencyTitle noAdded={true}>Work History</AgencyTitle>

      <div className="flex flex-col items-center mt-5">
        <Image
          src="/images/project.png"
          alt="Project placeholder"
          width={200}
          height={200}
          className="mx-auto"
        />

        <span className="mt-8 font-semibold text-center">
          You haven&apos;t completed any jobs yet.
        </span>

        <span className="text-base text-center">
          Complete your first project.
        </span>
      </div>
    </div>
  );
};

export default AgencyWorkHistory;
