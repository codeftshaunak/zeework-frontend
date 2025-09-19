import { Avatar } from "../ui/Avatar";
import { HStack, VStack, Box, Flex, Skeleton } from "@chakra-ui/react";

export const MessageUsersSkeleton = () => {
  return (
    <div>
      <Flex
        className="h-[90px] w-full border rounded-2xl bg-white mt-[2rem] cursor-pointer opacity-50"
        cursor={"not-allowed"}
        alignItems={"center"}
      >
        <Flex
          align="center"
          alignItems={"center"}
          justify="between"
          py={2}
          px={4}
        >
          <Box width="85px">
            <Avatar size="md" round="20px" />
          </Box>
          <Box
            width="full"
            marginLeft={4}
            display={{ base: "none", xl: "block" }}
          >
            <Skeleton width="100px" height={3}></Skeleton>
            <Skeleton width="120px" height={2} marginTop={3}></Skeleton>
            <Skeleton width={18} height={2} marginTop={2}></Skeleton>
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};

export const MessageBodySkeleton = () => {
  return (
    <Box
      width="100%"
      px={"20px"}
      py={"1rem"}
      borderRadius={"15px"}
      position={"relative"}
      height={"80%"}
      overflow={"hidden"}
      className="border shadow-sm bg-white"
      cursor={"not-allowed"}
    >
      <Flex
        borderBottom="1px"
        borderColor="gray.400"
        h="60px"
        py={2}
        gap={3}
        alignItems={"center"}
      >
        <Avatar size="md" round="20px" />
        <Flex flexDir="column">
          <Skeleton width={16} height={3}></Skeleton>
          <Skeleton width={40} height={2} marginTop={3}></Skeleton>
        </Flex>
      </Flex>

      <VStack
        alignItems={"start"}
        width={"100%"}
        height={"100%"}
        position={"relative"}
      >
        <Box
          height={"69vh"}
          overflowY={"auto"}
          width={"100%"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"flex-start"}
          gap={5}
        >
          <HStack marginTop={2}>
            <Avatar size="sm" round="20px" opacity={"0.5"} />
            <Flex flexDir="column" gap={2}>
              <Skeleton height={3} width={"100px"} rounded={"sm"}></Skeleton>
              <Skeleton
                width={{ base: "200px", md: "450px" }}
                height={2}
                rounded={"sm"}
              ></Skeleton>
            </Flex>
          </HStack>
          <HStack marginLeft={"auto"}>
            <VStack justifyContent={"end"} alignItems={"end"}>
              <Skeleton height={3} width={"100px"} rounded={"sm"}></Skeleton>
              <Skeleton
                width={{ base: "200px", md: "450px" }}
                height={2}
                rounded={"sm"}
              ></Skeleton>
            </VStack>
            <Avatar size="sm" round="20px" opacity={"0.5"} />
          </HStack>
          <HStack alignItems={"start"} marginTop={2}>
            <Avatar size="sm" round="20px" opacity={"0.5"} />
            <Flex flexDir="column" gap={2}>
              <Skeleton height={3} width={"100px"} rounded={"sm"}></Skeleton>
              <Skeleton
                width={{ base: "200px", md: "450px" }}
                height={2}
                rounded={"sm"}
              ></Skeleton>
            </Flex>
          </HStack>
          <HStack marginLeft={"auto"}>
            <VStack justifyContent={"end"} alignItems={"end"}>
              <Skeleton height={3} width={"100px"} rounded={"sm"}></Skeleton>
              <Skeleton
                width={{ base: "200px", md: "450px" }}
                height={2}
                rounded={"sm"}
              ></Skeleton>
            </VStack>
            <Avatar size="sm" round="20px" opacity={"0.5"} />
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};
