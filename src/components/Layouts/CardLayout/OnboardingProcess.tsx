
"use client";
import React from "react";


import UserCard from "../../UserCard";

interface OnboardingProcessProps {
  gap?: string | number;
  width?: string;
  children: React.ReactNode;
}

const OnboardingProcess: React.FC<OnboardingProcessProps> = (props) => {
  return (
    <div className="flex flex-row items-center justify-around relative mt-[5%]">
      {props.children}
      <div className="flex flex-row items-center border p-[1.5rem_1.3rem] rounded bg-white max-lg:!hidden">
        <UserCard />
      </div>
    </div>
  );
};

export default OnboardingProcess;