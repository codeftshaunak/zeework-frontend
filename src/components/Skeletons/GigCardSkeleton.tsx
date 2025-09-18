import React from "react";

const GigCardSkeleton = () => {
  return (
    <div>
      <div className="rounded-lg h-[350px] p-4 border border-slate-200 bg-white flex flex-col justify-between w-full cursor-pointer animate-pulse">
        <div className="w-full h-40 bg-slate-200 rounded"></div>
        <div className="pt-4 border-t">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
            <div className="ml-2 mb-2 w-24 h-6 bg-slate-200 rounded"></div>
          </div>
          <div className="text-left mt-2">
            <div className="w-full h-6 bg-slate-200 rounded mb-2"></div>
            <div className="w-3/4 h-6 bg-slate-200 rounded"></div>
          </div>
          <div className="flex flex-col justify-start items-start mt-2">
            <div className="w-1/2 h-4 bg-slate-200 rounded mb-2"></div>
            <div className="w-1/3 h-6 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigCardSkeleton;
