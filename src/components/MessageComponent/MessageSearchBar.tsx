import { Box, Input } from "@/components/ui/migration-helpers";
import { FaSearch } from "react-icons/fa";

interface MessageSearchBarProps {
  query: string;
  handleSearchingUser: (value: string) => void;
}

const MessageSearchBar: React.FC<MessageSearchBarProps> = ({ query, handleSearchingUser }) => {
  return (
    <Box
      position="relative"
      mb={{ md: 2 }}
      width={{ base: "77vw", md: "auto" }}
    >
      <Input
        type="text"
        placeholder="Search Message by Name"
        w="full"
        pl={10}
        pr={3}
        border="1px"
        borderColor="gray.600"
        rounded="xl"
        value={query}
        onChange={(e) => handleSearchingUser(e.target.value)}
        className="truncate"
      />
      <FaSearch className="absolute left-3 top-3.5 text-gray-300" />
    </Box>
  );
};

export default MessageSearchBar;
