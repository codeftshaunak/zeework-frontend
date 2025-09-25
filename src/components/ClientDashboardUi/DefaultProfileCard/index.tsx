import React from "react";
import { Avatar } from "@/components/ui/migration-helpers";


const DefaultClientProfileCard: React.FC = () => {
  return (
    <div className="h-[280px] border rounded justify-center items-center p-[0.5rem 1rem] max-md:!w-full flex flex-col p-5" style={{background: "white"}}>
      <Avatar name="Dummy" size="xl" />
      <div className="flex flex-col">
        <span className="mb-[2] font-bold">
          Dummy
        </span>
        <span className="mb-[0] text-sm text-center">
          No Role
        </span>
      </div>
      <div className="flex flex-col gap-0 w-full">
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
          Message
        </button>
      </div>
    </div>
  );
};

export default DefaultClientProfileCard;
