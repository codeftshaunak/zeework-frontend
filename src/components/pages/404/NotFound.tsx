"use client";

import { Box, Center, Heading, Link, Text, VStack } from "@/components/ui/migration-helpers";
import { Link as ReactLink } from "react-router";

const NotFound: React.FC = () => {
  return (
    <VStack bg="#C1C1C1" height={"100vh"}>
      <Center height={"100%"}>
        <Box w="full" maxW="xl" textAlign="center">
          <Box
            bg="url(./images/404-1.svg)"
            bgSize="cover"
            h={400}
            bgPos="center"
          >
            <Heading fontSize="6xl" color="white">
              404
            </Heading>
          </Box>

          <Box mt={2}>
            <Heading as="h3" fontSize="6xl">
              {`Looks like you're lost`}
            </Heading>

            <Text>The page you are looking for is not available!</Text>

            <Link as={ReactLink} to="/" color="white" textDecoration="none">
              <Box
                display="inline-block"
                px={4}
                py={2}
                bgColor="#39ac31"
                color="white"
                mt={4}
                _hover={{ bgColor: "#307525" }}
              >
                Go to Home
              </Box>
            </Link>
          </Box>
        </Box>
      </Center>
    </VStack>
  );
};

export default NotFound;
