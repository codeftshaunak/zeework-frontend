import { Card, HStack } from "@chakra-ui/react";
import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";

const GenaralStats = ({ stats, isLoading }) => {
  return (
    <div>
      <h2 className="mt-10 mb-8 text-[25px] font-semibold">General Stats</h2>
      <HStack
        className="max-md:!flex-col max-lg:!flex-wrap max-lg:!justify-center"
        justify={"space-between"}
      >
        {isLoading ? (
          <HorizontalCardSkeleton />
        ) : (
          stats?.map((data, index) => (
            <Card
              key={index}
              width={"260px"}
              height={"10rem"}
              cursor={"pointer"}
              alignItems={"center"}
              justifyContent={"center"}
              boxShadow={"0"}
              border={"1px solid #D1D5DA"}
              borderRadius={"10px"}
              _hover={{
                border: "1px solid var(--primarycolor)",
                transition: "0.3s ease-in-out",
              }}
              className="max-md:!w-full"
            >
              <p className="font-semibold text-4xl mb-5">{data.number}</p>
              <p className="text-lg capitalize">{data.title}</p>
            </Card>
          ))
        )}
      </HStack>
    </div>
  );
};

export default GenaralStats;
