import { Button, Text, VStack, Avatar } from "@chakra-ui/react";

const DefaultClientProfileCard = () => {
  return (
    <VStack
      color="var(--primarytext)"
      gap={"5"}
      height={"280px"}
      background={"white"}
      border={"1px solid #DFDFDF"}
      borderRadius={"10px"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"0.5rem 1rem"}
      className="max-md:!w-full"
    >
      <Avatar name="Dummy" size="xl" />
      <VStack gap={"0"}>
        <Text fontSize="1.2rem" marginBottom={"2"} fontWeight={"bold"}>
          Dummy
        </Text>
        <Text px={10} marginBottom={"0"} textAlign={"center"} fontSize={"sm"}>
          No Role
        </Text>
      </VStack>
      <VStack gap={"0"} w="100%">
        <Button colorScheme="primary" size="sm" w={"100%"}>
          Message
        </Button>
      </VStack>
    </VStack>
  );
};

export default DefaultClientProfileCard;
