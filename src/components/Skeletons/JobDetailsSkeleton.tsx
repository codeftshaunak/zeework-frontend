import React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const JobDetailsSkeleton = ({ hideNavigation }) => {
  return (
    <div className="w-full">
      <div className="w-full py-2">
        {!hideNavigation && (
          <div className="flex items-center gap-2 py-6">
            <Link href="/">
              <img src="/icons/home.svg" alt="home" className="w-5 h-5" />
            </Link>
            <img
              src="/icons/chevron-right.svg"
              alt="arrow right"
              className="w-4 h-4"
            />
          </div>
        )}
        <div className="h-[106px] rounded-2xl p-5 sm:p-8 border mb-4 my-auto bg-white">
          <div className="space-y-4">
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        </div>

        <div className="flex flex-row justify-between w-full gap-4 max-lg:flex-col">
          <div className="h-96 max-lg:w-full w-[68%] p-5 sm:p-8 border rounded-2xl bg-white">
            <div className="space-y-4">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-5/6 h-4" />
              <Skeleton className="w-4/5 h-4" />
              <Skeleton className="w-full h-4" />
            </div>
            <div className="mt-10 space-y-4">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-5/6 h-4" />
              <Skeleton className="w-4/5 h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          </div>
          <div className="max-lg:hidden w-[30%] h-96 border rounded-2xl p-5 sm:p-8 bg-white">
            <div className="space-y-4">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-5/6 h-4" />
              <Skeleton className="w-4/5 h-4" />
              <Skeleton className="w-full h-4" />
            </div>
            <div className="mt-10 space-y-4">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-5/6 h-4" />
              <Skeleton className="w-4/5 h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSkeleton;
