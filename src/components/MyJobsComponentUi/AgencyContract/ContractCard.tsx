import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "next/navigation";

const ContractCard = ({ job }) => {
  const { _id, job_type, contract_title, hourly_rate, budget, status } =
    job || [];
  const router = useRouter();
  return (
    <div>
      {" "}
      <VStack
        className="border p-4 m-2 rounded lg:max-w-[380px] lg:h-[200px] md:h-[180px] md:max-w-[360px] max-w-[520px] h-[240px] my-auto mx-auto relative bg-white border-[var(--bordersecondary)] relative"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        alignItems={"center"}
        justifyContent={"center"}
        cursor={"pointer"}
        onClick={() => {
          router.push(`/assigned-contract/${_id}`, { state: { job } });
        }}
        _hover={{
          border: "1px solid var(--primarycolor)",
        }}
      >
        <span
          className={`${
            status === "task_submitted"
              ? "bg-amber-200 border-amber-500"
              : "bg-green-300 border-green-500"
          } rounded-full border px-3 font-medium absolute top-5 right-5`}
        >
          {status === "task_submitted" ? "Task Submited" : "Active"}
        </span>
        <Flex flexFlow={"column"} alignItems="center" justifyContent="center">
          <Image src="./images/active_job.png" width={"50px"} height={"50px"} />
        </Flex>
        <Box textAlign="center" my={2}>
          <Link
            to={`/assigned-contract/${_id}`}
            className="text-[1.2rem] font-bold capitalize"
          >
            {contract_title?.length > 20
              ? contract_title.slice(0, 20) + "..."
              : contract_title}
          </Link>

          <VStack
            justifyContent={"space-around"}
            width={"200px"}
            margin={"auto"}
            gap={"1px"}
          >
            <Text
              fontSize="1rem"
              color="gray.700"
              fontWeight={"600"}
              marginBottom={"0"}
            >
              Job Type:{" "}
              {job_type == "fixed"
                ? "Fixed"
                : job_type == "hourly"
                ? "Hourly"
                : ""}
            </Text>
            <Text fontSize="1rem" color="gray.700" fontWeight={"600"}>
              {job_type === "fixed"
                ? `Budget: $${budget}`
                : `Rate/Hr: $${hourly_rate}`}
            </Text>
          </VStack>
        </Box>
        {/* <Box position={"absolute"} fontWeight={"600"} backgroundColor={"var(--primarycolor)"} padding={"1px 8px"} color={"white"} top={"10px"} borderRadius={"5px"} right={"10px"}>
      <Text>{experience}</Text>
    </Box> */}
      </VStack>
    </div>
  );
};

export default ContractCard;
