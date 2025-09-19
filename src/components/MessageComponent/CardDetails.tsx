import { Box, Text } from "@/components/ui/migration-helpers";
import { useRouter } from "next/navigation";

interface CardDetailsProps {
  message?: any;
  user_id?: string;
  role?: number;
}

const CardDetails: React.FC<CardDetailsProps> = ({ message, user_id, role }) => {
  const { title, type, job_type, amount, url, position } =
    message?.card_details || {};
  const router = useRouter();

  return (
    <>
      <Box
        bgColor={"gray.50"}
        rounded={8}
        paddingX={5}
        paddingY={3}
        gap={"10px"}
        width={{ base: "100%", md: "350px" }}
        className="shadow text-left"
      >
        <Text className="capitalize text-sm font-bold">
          {type?.replace(/_/g, " ")}
        </Text>
        <Box className="border-l-2 border-green-500 pl-2 mt-1 gap-5">
          {title && (
            <Text fontSize={"0.9rem"} fontWeight={"600"}>
              Title: {title}
            </Text>
          )}
          {position && (
            <Text fontSize={"0.8rem"} fontWeight={"600"}>
              Position: {position}
            </Text>
          )}
          {job_type && (
            <Text className="capitalize" fontSize={"0.8rem"}>
              Type: {job_type}
            </Text>
          )}
          {job_type &&
            amount &&
            (job_type ? (
              <Text fontSize={"0.8rem"} fontWeight={"600"}>
                {job_type === "fixed"
                  ? `Budget: $${amount}`
                  : `Hourly Rate: $${amount}`}
              </Text>
            ) : (
              <Text fontSize={"0.8rem"} fontWeight={"600"}>
                Price: ${amount}
              </Text>
            ))}
        </Box>
        {url && (
          <Text
            cursor={"pointer"}
            className="font-medium text-green-500 ml-1 w-fit tracking-wide text-sm"
            mt={1}
            onClick={() =>
              role == 1
                ? url?.agency
                  ? message.sender_id === user_id
                    ? router.push(url.agency)
                    : router.push(url.freelancer)
                  : router.push(url.freelancer)
                : url?.client && router.push(url.client)
            }
          >
            Details
          </Text>
        )}
      </Box>
    </>
  );
};

export default CardDetails;
