import React from "react";


import AgencyTitle from "./AgencyTitle";

const AgencyPortfolio = () => {
  return (
    <div className="w-full">
      <AgencyTitle>Projects</AgencyTitle>
      <div className="mt-[20px]">
        <Image
          src="./images/404not-added.png"
          className="m-[auto]"
        ></img>
        <span className="font-semibold text-center">
          You haven&apos;t added your project!
        </span>
        <span className="text-base text-center">

        </span>
      </div>
    </div>
  );
};

export default AgencyPortfolio;
