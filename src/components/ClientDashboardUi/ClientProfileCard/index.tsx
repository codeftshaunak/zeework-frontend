import React from "react";
import { Avatar } from "@/components/ui/migration-helpers";
import { useRouter } from "next/navigation";

const ClientProfileCard = ({ data }) => {
  const { freelancerDetails, freelancer_id } = data;
  const router = useRouter();

  const sliceName = (fullName) => {
    const parts = fullName?.split(" ");
    const firstName = parts?.[0];
    const lastName = parts?.length > 1 ? parts[parts.length - 1][0] : "";
    return firstName + " " + lastName;
  };

  return (
    <div 
      className="flex flex-col w-[270px] border rounded justify-between items-center p-[1rem] max-md:!w-full"
      style={{ background: "white" }}
    >
      <div className="flex flex-col"> <div className="relative">
          <Avatar
            src={freelancerDetails?.profile_image}
            name={freelancerDetails?.name}
            size="xl"
          />
          <div
            className={`absolute border-4 border-white rounded-full w-3 h-3 -left-1 top-0 ${
              freelancerDetails?.activity === "online" ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        </div>
        <div className="flex flex-col gap-0">
          <span
            className="capitalize"
          >
            {sliceName(freelancerDetails?.name) + "."}
          </span>
          <span>
            {data?.contract_title}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-0 w-full">
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          onClick={() =>
            router.replace(`/message/${freelancer_id}?contract_ref=${data._id}`)
          }
        >
          Message
        </button>
      </div>
    </div>
  );
};

export default ClientProfileCard;
