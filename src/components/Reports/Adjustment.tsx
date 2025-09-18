import {
  HStack,
  Card,
  Text,
  Box,
  Button,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "next/navigation";
const data = [
  {
    id: 0,
    title: "Applications Sent",
    number: 20,
  },
  {
    id: 4,
    title: "Invitations Received",
    number: 20,
  },
  {
    id: 1,
    title: "Jobs Completed",
    number: 20,
  },
  {
    id: 2,
    title: "Total Hours Worked",
    number: 20,
  },
  {
    id: 3,
    title: "Gross Earnings",
    number: 20,
  },
];
const Adjustment = () => {
  const router = useRouter();

  return (
    <div className="relative">
      <h2 className="mt-10 mb-8 text-[25px] font-semibold">
        Further Information
      </h2>
      <div className="relative h-[25rem]">
        <HStack spacing="4" height={"100%"} className="max-sm:!hidden">
          {data.map((data, index) => (
            <Card
              key={index}
              width="400px"
              backgroundColor="#F0FDF4"
              height="10rem"
              alignItems="center"
              justifyContent="center"
            >
              <p className="font-semibold text-4xl mb-2">{data.number}</p>
              <p className="font-semibold text-lg capitalize">{data.title}</p>
            </Card>
          ))}
        </HStack>

        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="100"
          background="rgba(255, 255, 255, 0.8)"
          backdropFilter="blur(10px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height={"max-content"}
          padding={"2rem 0"}
          borderRadius={"10px"}
          border={"1px solid #D1D5DA"}
        >
          <VStack spacing="4" width={"60%"} className="max-md:!w-[80%]">
            <Image src="./images/zeework_logo.png" width={"250px"} />
            <Text fontSize="2xl" fontWeight="bold">
              Welcome to ZeeWork!
            </Text>
            <Text>
              We&apos;re excited to have you be a part of our brand new launch!
            </Text>
            <Text>
              Detailed reporting is coming shortly in further updates with the
              site. For anything you may require immediately for accounting
              purposes or otherwise, please feel free to ping our support
              department for a swift response.
            </Text>
            <Button
              color="var(--secondarycolor)"
              backgroundColor={"var(--primarycolor)"}
              borderRadius={"20px"}
              width={"150px"}
              _hover={{
                color: "var(--primarytext)",
                backgroundColor: "var(--secondarycolor)",
                border: "1px solid var(--primarytextcolor)",
              }}
              onClick={() => router.push("/help")}
            >
              Get In Touch
            </Button>
          </VStack>
        </Box>
      </div>
    </div>
  );
};

export default Adjustment;
