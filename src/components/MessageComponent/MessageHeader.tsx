import React from "react";

import { useRouter } from "next/navigation";

interface MessageHeaderProps {
  receiverDetails?: any;
  contractDetails?: any;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ receiverDetails, contractDetails }) => {
  const profileImage =
    receiverDetails?.agency_profileImage || receiverDetails?.profile_image;
  const name =
    receiverDetails?.agency_name ||
    `${receiverDetails?.firstName} ${receiverDetails?.lastName}`;
  const title =
    contractDetails?.title ||
    receiverDetails?.professional_role ||
    receiverDetails?.businessName;

  const router = useRouter();
  console.log(receiverDetails);
  return (
    <div className="flex border-b border-gray-400"}>
      <Avatar
        src={profileImage}
        size="md"
        round="20px"
        marginRight="20px"
        name={name}
      >
        <AvatarBadge`}
          boxSize="0.8em"
          left={-2}
          top={0}
        />
      </Avatar>
      <div className="flex flexDir="column">
        <span
          onClick={() =>
            router.push(
              `/profile/${
                receiverDetails?.agency_name
                  ? `a/${receiverDetails?._id}`
                  : `f/${receiverDetails?.user_id}`
              }`
            )
          }
          marginBottom="0"
          _hover={{ color: "primary.600" }}
        >
          {name}
        </span>
        <span>
          {title}
        </span>
      </div>
    </div>
  );
};

export default MessageHeader;
