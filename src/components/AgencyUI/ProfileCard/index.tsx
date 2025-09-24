import React from "react";


const AgencyProfileCard = ({ data }) => {
  return (
    <div className="flex flex-col gap-5">
      {/* {data?.profile_image ? (
                <Image
                    src="./images/button.png"
                    alt="user"
                />
            ) : (
                <Avatar name={data?.name} size="xl" />
            )} */}
      <Image
        src="./images/add_button.png"
        alt="user"
        w="80px"
      />
      {/*
            <div className="flex flex-col>
                <span className="mb-[2] font-bold">
                    {data?.name}
                </span>
                <span className="mb-[0] text-sm text-center">
                    {data?.professional_role}
                </span>
            </div> */}
      <div  className="flex flex-col w-full gap-0">
        <button className="inline-flex items-center justify-center rounded-md  font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-sm w-full bg-[#22C35E]"
        >
          Add Team Member
        </button>
      </div>
    </div>
  );
};

export default AgencyProfileCard;
