import React from "react";

import { useRouter } from "next/navigation";

interface SearchedUsersProps {
  filteredUser: any[];
  query: string;
  setFilteredUser: (users: any[]) => void;
  setQuery: (query: string) => void;
  handleOnClose?: () => void;
}

const SearchedUsers: React.FC<SearchedUsersProps> = ({
  filteredUser,
  query,
  setFilteredUser,
  setQuery,
  handleOnClose,
}) => {
  const router = useRouter();

  return (
    <div>
      <span className="text-lg font-semibold">Searched Users</span>
      <div
        overflowY="auto"
       
        borderColor="gray.200"
       
       
        maxHeight="md:300px"
        sx={{
          "&::WebkitScrollbar": {
            width: "8px",
            borderRadius: "8px",
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          "&::WebkitScrollbar-thumb": {
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
            borderRadius: "8px",
          },
        }}
      >
        {!filteredUser?.length && query?.length > 0 && (
          <span>Doesn&apos;t Matched</span>
        )}
        {filteredUser.map((user) => {
          const name = user?.user_details?.agency_name
            ? user?.user_details?.agency_name
            : `${user?.user_details?.firstName} ${user?.user_details?.lastName}`;
          const photo = user?.user_details?.agency_profileImage
            ? user?.user_details?.agency_profileImage
            : user?.user_details?.profile_image;

          return (
            <div
              key={user?.contract_details?.contract_ref}
              className="relative w-full border rounded-2xl bg-gray-100 cursor-pointer flex items-center"
              onClick={() => {
                router.push(
                  `/message/${
                    user?.user_details?.agency_name
                      ? user?.user_details?._id
                      : user?.user_details?.user_id
                  }?contract_ref=${user?.contract_details?.contract_ref}`,
                  { replace: true }
                );
                setFilteredUser([]);
                setQuery("");
                if (handleOnClose) handleOnClose();
              }}
            >
              <div className="flex justify="between">
                <div>
                  <Avatar src={photo} size="md" round="20px" name={name}>
                    <AvatarBadge`}
                      boxSize="0.8em"
                      left={-2}
                      top={0}
                    />
                  </Avatar>
                </div>
                <div>
                  <div className="flex flex-row items-center> <span> {name} {user?.user_details?.businessName && ` | ${user?.user_details?.businessName}`} </span> </div> <span> {user?.contract_details?.title?.slice(0, 20)} </span> </div> </div> {user?.contract_details?.contract_ref && !user?.isRead && ( <div top={4} right={4} className="absolute"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchedUsers;
