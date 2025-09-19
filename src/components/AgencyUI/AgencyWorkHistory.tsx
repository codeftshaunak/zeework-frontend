import React from "react";

import AgencyTitle from "./AgencyTitle";

const AgencyWorkHistory = () => {
  return (
    <div className="w-full">
      <AgencyTitle noAdded={true}>Work History</AgencyTitle>
      <div className="mt-[20px]">
        <Image
          src="/images/project.png"}
          className="m-[auto]"
        ></img>
        <span}
         className="mt-[2rem] font-semibold text-center">
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
