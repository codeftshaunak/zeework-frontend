
import React from "react";

import { Link } from "next/navigation";


const JobDetailsSkeleton = ({ hideNavigation }) => {
  return (
    <div className="w-full">
      <div className="py-2 w-full">
        {!hideNavigation && (
          <div className="flex gap-2 py-6">
            <Link to="/">
              <img src="/icons/home.svg" alt="home" />
            </Link>
            <img src="/icons/chevron-right.svg" alt="arrow right" />
          </div>
        )}
        <div className="h-[106px] rounded-2xl p-5 sm:p-8 border mb-4 my-auto bg-white">
          <SkeletonText
            noOfLines={2}
            spacing="4"
            skeletonHeight="2"
            startColor="gray.100"
            endColor="gray.300"
          />
        </div>

        <div className="w-full flex max-[1023px]:flex-col flex-row justify-between">
          <div className="h-96 max-[1023px]:w-full w-[68%] p-5 sm:p-8 border rounded-2xl bg-white">
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
          <div className="max-[1023px]:hidden w-[30%] lg h-96 border rounded-2xl p-5 sm:p-8 bg-white">
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
  );
};

export default JobDetailsSkeleton;
