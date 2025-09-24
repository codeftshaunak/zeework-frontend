import React from "react";

const ReviewProposalSkeleton = () => {
  return (
    <div className="w-full px-5">
      <div className="space-y-2 mt-4">
        <div className="animate-pulse bg-gray-200 h-4 rounded w-full"></div>
        <div className="animate-pulse bg-gray-200 h-4 rounded w-5/6"></div>
        <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4"></div>
        <div className="animate-pulse bg-gray-200 h-4 rounded w-4/5"></div>
      </div>
      <div className="space-y-2 mt-10">
        <div className="animate-pulse bg-gray-200 h-4 rounded w-full"></div>
        <div className="animate-pulse bg-gray-200 h-4 rounded w-5/6"></div>
        <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4"></div>
        <div className="animate-pulse bg-gray-200 h-4 rounded w-4/5"></div>
      </div>
    </div>
  );
};

export default ReviewProposalSkeleton;
