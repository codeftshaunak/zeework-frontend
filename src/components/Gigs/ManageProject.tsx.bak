import React from "react";
import { Text, VStack, Box, Button, HStack } from "@chakra-ui/react";
import GigStatus from "./GigStatus";
import { useRouter } from "next/navigation";

const ManageProject = () => {
  const router = useRouter();
  return (
    <VStack width={"100%"}>
      <HStack justifyContent={"space-between"} width={"100%"}>
        <Text fontWeight={"500"} fontSize={"20px"} color={"black"}>
          Your Gigs
        </Text>
        <Button
          className="mt-3 border"
          backgroundColor={"white"}
          height={"34px"}
          fontWeight={"400"}
          borderRadius={"25px"}
          border={"2px solid  var(--primarytextcolor)"}
          transition={"0.3s ease-in-out"}
          _hover={{
            color: "white",
            backgroundColor: "var(--primarytextcolor)",
          }}
          zIndex={0}
          onClick={() => router.push("/freelancer/gig/create")}
        >
          Create A New Gig
        </Button>
      </HStack>
      <HStack
        width={"100%"}
        marginTop={"1rem"}
        border={"1px solid #d8d8d8"}
        borderRadius={"5px"}
        bg={"white"}
      >
        <GigStatus />
      </HStack>
    </VStack>
  );
};

export default ManageProject;
