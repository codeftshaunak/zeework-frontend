import React from "react";
import { useRouter } from "next/navigation";

import { IoLocation } from "react-icons/io5";

const InvitedFreelancerCard = ({ profile }) => {
  const router = useRouter();

  const { freelancer_details, receiver_id } = profile;
  return (
    <div className="shadow rounded-lg px-5">
      <div className="flex gap-8 py-8">
        {/* <div className="w-[200px] h-[150px]">
          <img
            src="https://c.animaapp.com/LZ3BWujk/img/rectangle-26-1@2x.png"
            alt=""
          />
        </div> */}
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-5 items-center">
              <Avatar
                src={freelancer_details?.[0]?.profile_image}
                name={
                  freelancer_details?.[0]?.firstName +
                  " " +
                  freelancer_details?.[0]?.lastName
                }
              >
                <AvatarBadge boxSize="1em" />{" "}
              </Avatar>

              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-fg-brand">
                  {freelancer_details?.[0]?.firstName}{" "}
                  {freelancer_details?.[0]?.lastName}
                </h2>
                <div className="text-md font-medium text-[#6B7280] flex gap-5">
                  <p>{freelancer_details?.[0]?.professional_role} </p>
                  {"      "}
                  <p className="text-sm font-medium bg-[var(--primarycolor)] text-white pt-0.5 px-4 rounded-xl">
                    ${freelancer_details?.[0]?.hourly_rate}/hr
                  </p>
                </div>

                <div className="flex items-center justify-between gap-5">
                  <div className="flex spacing={4}"
                    direction="row"
                    
                    flexWrap="wrap"
                  >
                    {freelancer_details?.[0]?.skills?.length &&
                      freelancer_details?.[0]?.skills?.map((skill, idx) => (
                        <div
                          key={idx}
                          paddingX={5} className="rounded bg-gray.200"
                        >
                          {skill}
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-sm">
                    <IoLocation />
                    {freelancer_details?.[0]?.location}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                paddingX={5}
                onClick={() => router.push(`/profile/f/${receiver_id}`)}
              >
                Profile
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                paddingX={5}
                onClick={() => router.push(`/message/${receiver_id}`)}
              >
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitedFreelancerCard;
