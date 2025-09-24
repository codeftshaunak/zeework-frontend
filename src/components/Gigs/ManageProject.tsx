import React from "react";

import GigStatus from "./GigStatus";
import { useRouter } from "next/navigation";

const ManageProject = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full">
        <span className="font-medium text-black">
          Your Gigs
        </span>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground mt-3 border rounded"
          backgroundColor="white"
          transition="0.3s ease-in-out"
          _hover={{
            color: "white",
            backgroundColor: "var(--primarytextcolor)",
          }}
          zIndex={0}
          onClick={() => router.push("/freelancer/gig/create")}
        >
          Create A New Gig
        </button>
      </div>
      <div className="flex flex-row items-center w-full mt-[1rem] border rounded bg-white"
      >
        <GigStatus />
      </div>
    </div>
  );
};

export default ManageProject;
