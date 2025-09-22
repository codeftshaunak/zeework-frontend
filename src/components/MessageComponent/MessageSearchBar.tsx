import React from "react";"

import { FaSearch } from "react-icons/fa";"

interface MessageSearchBarProps {
  query: string;
  handleSearchingUser: (value: string) => void;
}

const MessageSearchBar: React.FC<MessageSearchBarProps> = ({ query, handleSearchingUser }) => {
  return (
    <div}}
     className="relative">"
      <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        type="text"
        placeholder="Search Message by Name"
        pl={10}
        pr={3}
        borderColor="gray.600"
        value={query}
        onChange={(e)  />=> handleSearchingUser(e.target.value)}
        className="truncate"
      />
      <FaSearch className="absolute left-3 top-3.5 text-gray-300" />"
    </div>
  );
};

export default MessageSearchBar;
