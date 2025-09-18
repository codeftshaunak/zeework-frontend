import { SkeletonText } from "@chakra-ui/react";

const AgencyProfileSkeleton = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="animate-pulse">
        <div className="py-2 w-full">
          <div className="h-[106px] p-8 border border-[var(--bordersecondary)] mb-4 my-auto bg-white">
            <SkeletonText
              noOfLines={2}
              spacing="4"
              skeletonHeight="2"
              startColor="gray.100"
              endColor="gray.300"
            />
          </div>

          <div className="w-full hidden min-[992px]:flex justify-between border border-[var(--bordersecondary)] bg-white">
            <div className="h-96 w-[68%] p-8">
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
                startColor="gray.100"
                endColor="gray.300"
              />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
                marginTop={10}
                startColor="gray.100"
                endColor="gray.300"
              />
            </div>
            <div className="w-[30%] h-96 p-8">
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
                startColor="gray.100"
                endColor="gray.300"
              />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
                marginTop={10}
                startColor="gray.100"
                endColor="gray.300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyProfileSkeleton;
