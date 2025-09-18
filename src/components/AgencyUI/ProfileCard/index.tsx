import { Button, Image, Text, VStack, Avatar } from "@chakra-ui/react";
const AgencyProfileCard = ({ data }) => {
  return (
    <VStack color="var(--primarytext)" gap={"5"}>
      {/* {data?.profile_image ? (
                <Image
                    src="./images/button.png"
                    alt="user"
                    width="80px"
                    borderRadius="full"
                />
            ) : (
                <Avatar name={data?.name} size="xl" />
            )} */}
      <Image
        src="./images/add_button.png"
        alt="user"
        width="80px"
        borderRadius="full"
      />
      {/*
            <VStack gap={"0"}>
                <Text fontSize="1.2rem" marginBottom={"2"} fontWeight={"bold"}>
                    {data?.name}
                </Text>
                <Text px={10} marginBottom={"0"} textAlign={"center"} fontSize={"sm"}>
                    {data?.professional_role}
                </Text>
            </VStack> */}
      <VStack gap={"0"} w="100%">
        <Button
          colorScheme="22C35E"
          bg={"#22C35E"}
          color={"#fff"}
          size="sm"
          fontSize={"sm"}
          w={"100%"}
        >
          Add Team Member
        </Button>
      </VStack>
    </VStack>
  );
};

export default AgencyProfileCard;
