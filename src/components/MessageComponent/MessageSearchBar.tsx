import React from "react";

import { FaSearch } from "react-icons/fa";

interface MessageSearchBarProps {
  query: string;
  handleSearchingUser: (value: string) => void;
}

const MessageSearchBar: React.FC<MessageSearchBarProps> = ({ query, handleSearchingUser }) => {
  return (
    <div
      className="relative">
      <input
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm truncate pl-10 pr-3 border-gray-600"
        type="text"
        placeholder="Search Message by Name"
        value={query}
        onChange={(e) => handleSearchingUser(e.target.value)}
      />
      <FaSearch className="absolute left-3 top-3.5 text-gray-300" />
    </div>
  );
};

export default MessageSearchBar;
