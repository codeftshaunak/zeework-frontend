import { Button, Text, VStack, Avatar, AvatarBadge } from "@chakra-ui/react";
import { useNavigate } from "next/navigation";

const ClientProfileCard = ({ data }) => {
  const { freelancerDetails, freelancer_id } = data;
  const router = useRouter();

  const sliceName = (fullName) => {
    let parts = fullName?.split(" ");
    let firstName = parts?.[0];
    let lastName = parts?.length > 1 ? parts[parts.length - 1][0] : "";
    return firstName + " " + lastName;
  };

  return (
    <VStack
      color="var(--primarytext)"
      background={"white"}
      width={"270px"}
      gap={5}
      border={"1px solid #DFDFDF"}
      borderRadius={"10px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={"1rem"}
      className="max-md:!w-full"
    >
      <VStack>
        <Avatar
          src={freelancerDetails?.profile_image}
          name={freelancerDetails?.name}
          size="xl"
        >
          <AvatarBadge
            border="4px solid white"
            bg={`${
              freelancerDetails?.activity === "online" ? "green" : "gray.300"
            }`}
            boxSize="0.6em"
            left={-1}
            top={0}
          />
        </Avatar>
        <VStack gap={"0"}>
          <Text
            fontSize="1.2rem"
            fontWeight={"bold"}
            marginBottom={"0"}
            textTransform={"capitalize"}
          >
            {sliceName(freelancerDetails?.name) + "."}
          </Text>
          <Text marginBottom={"0"} textAlign={"center"} fontSize={"sm"}>
            {data?.contract_title}
          </Text>
        </VStack>
      </VStack>
      <VStack gap={"0"} w="100%">
        <Button
          colorScheme="primary"
          size="sm"
          w={"100%"}
          onClick={() =>
            router.push(`/message/${freelancer_id}?contract_ref=${data._id}`, {
              replace: true,
            })
          }
        >
          Message
        </Button>
      </VStack>
    </VStack>
  );
};

export default ClientProfileCard;
