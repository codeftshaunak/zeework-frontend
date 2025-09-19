import { useRouter } from "next/navigation";
import { Avatar } from "../ui/Avatar";
import { Button, Stack, Box, AvatarBadge } from "@chakra-ui/react";
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
        <div className="w-full space-y-2 ">
          <div className="flex justify-between items-center">
            <div className="flex gap-5 items-center">
              <Avatar
                src={freelancer_details?.[0]?.profile_image}
                name={
                  freelancer_details?.[0]?.firstName +
                  " " +
                  freelancer_details?.[0]?.lastName
                }
                border={"1px solid var(--primarycolor)"}
              >
                <AvatarBadge boxSize="1em" bg="green.500" />{" "}
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
                  <Stack
                    spacing={4}
                    direction="row"
                    align="center"
                    flexWrap={"wrap"}
                  >
                    {freelancer_details?.[0]?.skills?.length &&
                      freelancer_details?.[0]?.skills?.map((skill, idx) => (
                        <Box
                          key={idx}
                          size="sm"
                          bgColor={"gray.200"}
                          paddingX={5}
                          borderRadius={"10px"}
                        >
                          {skill}
                        </Box>
                      ))}
                  </Stack>
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
              <Button
                colorScheme="primary"
                size={"md"}
                paddingX={5}
                variant={"outline"}
                onClick={() => router.push(`/profile/f/${receiver_id}`)}
              >
                Profile
              </Button>
              <Button
                colorScheme="primary"
                size={"md"}
                paddingX={5}
                onClick={() => router.push(`/message/${receiver_id}`)}
              >
                Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitedFreelancerCard;
