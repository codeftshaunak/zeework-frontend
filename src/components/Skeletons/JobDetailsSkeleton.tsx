import React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Home } from "lucide-react";

interface JobDetailsSkeletonProps {
  hideNavigation?: boolean;
}

const JobDetailsSkeleton = ({ hideNavigation }: JobDetailsSkeletonProps) => {
  return (
    <>
      <div className="w-full mx-auto">
        <div className="flex w-full py-6">
          <div className="w-full">
            {!hideNavigation && (
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <Link
                  href="/"
                  className="hover:text-green-600 transition-colors duration-200"
                >
                  <Home className="h-4 w-4" />
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Skeleton className="w-12 h-4" />
                <ChevronRight className="h-4 w-4" />
                <Skeleton className="w-24 h-4" />
              </nav>
            )}

            {/* Main Job Header Card Skeleton */}
            <div className="bg-white border border-gray-200/60 rounded-lg p-8 mb-8 shadow-sm">
              <div className="flex justify-between items-start gap-8">
                <div className="flex-1">
                  <div className="mb-6">
                    <Skeleton className="w-3/4 h-8 mb-3" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-4 h-4 rounded-full" />
                      <Skeleton className="w-32 h-4" />
                    </div>
                  </div>

                  <div className="flex items-center gap-8 mb-6">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div>
                        <Skeleton className="w-16 h-6 mb-1" />
                        <Skeleton className="w-12 h-4" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div>
                        <Skeleton className="w-20 h-4 mb-1" />
                        <Skeleton className="w-16 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Skeleton className="w-32 h-12 rounded-md" />
                  <Skeleton className="w-24 h-8 rounded-md" />
                </div>
              </div>
            </div>

            {/* Main Content Layout Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {/* Left Column - Main Content Skeleton */}
              <div className="lg:col-span-3 xl:col-span-4">
                {/* Job Description Skeleton */}
                <div className="bg-white border border-gray-200/60 rounded-lg mb-8 shadow-sm">
                  <div className="p-8">
                    <Skeleton className="w-40 h-6 mb-6" />
                    <div className="space-y-3">
                      <Skeleton className="w-full h-4" />
                      <Skeleton className="w-11/12 h-4" />
                      <Skeleton className="w-5/6 h-4" />
                      <Skeleton className="w-full h-4" />
                      <Skeleton className="w-4/5 h-4" />
                    </div>
                  </div>
                </div>

                {/* Client History Skeleton */}
                <div className="bg-white border border-gray-200/60 rounded-lg shadow-sm">
                  <div className="p-8">
                    <Skeleton className="w-48 h-6 mb-6" />
                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="border border-gray-200/60 rounded-lg p-5"
                        >
                          <Skeleton className="w-2/3 h-5 mb-3" />
                          <div className="flex items-center justify-between">
                            <Skeleton className="w-20 h-6 rounded-full" />
                            <Skeleton className="w-16 h-5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Client Info Skeleton */}
              <div className="space-y-8">
                {/* About the Client Skeleton */}
                <div className="bg-white border border-gray-200/60 rounded-lg shadow-sm">
                  <div className="p-8">
                    <Skeleton className="w-32 h-6 mb-6" />

                    {/* Payment Verification Skeleton */}
                    <div className="flex items-center gap-3 mb-6">
                      <Skeleton className="w-32 h-8 rounded-lg" />
                    </div>

                    {/* Reviews Skeleton */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Skeleton className="w-24 h-4" />
                        <Skeleton className="w-8 h-5" />
                      </div>
                      <Skeleton className="w-20 h-4" />
                    </div>

                    {/* Location Skeleton */}
                    <div className="flex items-center gap-3 mb-6">
                      <Skeleton className="w-8 h-8 rounded-lg" />
                      <Skeleton className="w-24 h-4" />
                    </div>

                    {/* Stats Skeleton */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <Skeleton className="w-8 h-6 mb-1" />
                          <Skeleton className="w-16 h-4" />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <Skeleton className="w-10 h-6 mb-1" />
                          <Skeleton className="w-12 h-4" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <Skeleton className="w-12 h-6 mb-1" />
                          <Skeleton className="w-16 h-4" />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <Skeleton className="w-6 h-6 mb-1" />
                          <Skeleton className="w-14 h-4" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <Skeleton className="w-4 h-6 mb-1" />
                          <Skeleton className="w-10 h-4" />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <Skeleton className="w-8 h-6 mb-1" />
                          <Skeleton className="w-8 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share Job Skeleton */}
                <div className="bg-white border border-gray-200/60 rounded-lg shadow-sm">
                  <div className="p-8">
                    <Skeleton className="w-16 h-5 mb-4" />
                    <Skeleton className="w-full h-12 rounded-lg mb-4" />
                    <Skeleton className="w-full h-8 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailsSkeleton;
