import React from "react";

import { useRouter } from "next/navigation";

const MessageUserList = ({
  users,
  contractRef,
  id,
  setQuery,
  handleOnClose,
}) => {
  const router = useRouter();

  return (
    <div
      overflowY="auto"
      maxH="90vh"
      pb={20}
      scrollBehavior="smooth"
      css={{
        "&::WebkitScrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {users.map((user) => {
        const userId = user?.user_details?.agency_name
          ? user?.user_details?._id
          : user?.user_details?.user_id;
        const isActive =
          user?.contract_details?.contract_ref === contractRef && userId === id;
        const name = user?.user_details?.agency_name
          ? user?.user_details?.agency_name
          : `${user?.user_details?.firstName} ${user?.user_details?.lastName}`;
        const photo = user?.user_details?.agency_profileImage
          ? user?.user_details?.agency_profileImage
          : user?.user_details?.profile_image;

        return (
          <div
            key={user?.contract_details?.contract_ref}
            className={`relative h-[90px] w-full border rounded-2xl mt-[1rem] flex items-center cursor-pointer ${
              isActive ? "border-primary bg-green-100" : "bg-white"
            }`}
            onClick={() => {
              router.push(
                `/message/${userId}?contract_ref=${user?.contract_details?.contract_ref}`,
                { replace: true }
              );
              setQuery("");
              if (handleOnClose) handleOnClose();
            }}
          >
            <div className="flex justify="between">
              <div className="w-[85px]">
                <Avatar
                  size="md"
                  round="20px"
                  name={name}
                  src={photo}
                >
                  <AvatarBadge`}
                    boxSize="0.8em"
                    left={-2}
                    top={0}
                  />
                </Avatar>
              </div>
              <div>
                <div className="flex flex-row items-center> <span> {name} {user?.user_details?.businessName && ` | ${user?.user_details?.businessName}`} </span> </div> <span> {user?.contract_details?.title ? user?.contract_details?.title?.slice(0, 20) :"Unavailable contract"}
                </span>
              </div>
            </div>
            {user?.contract_details?.contract_ref && !user?.isRead && (
              <div
                top={4}
                right={4}
               
               className="absolute"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageUserList;
