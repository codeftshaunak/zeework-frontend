import { Avatar } from "@chakra-ui/react";
import React from "react";


const DefaultClientProfileCard: React.FC = () => {
  return (
    <div
      className="h-[280px] border rounded justify-center items-center p-[0.5rem 1rem] max-md:!w-full"
      background="white"
     
     className="flex flex-col p-5">
      <Avatar name="Dummy" size="xl" />
      <div className="flex flex-col>
        <span className="mb-[2] font-bold">
          Dummy
        </span>
        <span className="mb-[0] text-sm text-center">
          No Role
        </span>
      </div>
      <div0" className="flex flex-col gap= w-full">
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
          Message
        </button>
      </div>
    </div>
  );
};

export default DefaultClientProfileCard;
