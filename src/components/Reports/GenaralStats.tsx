import React from "react";

import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";

const GenaralStats = ({ stats, isLoading= false }) => {
  return (
    <div>
      <h2 className="mt-10 mb-8 text-[25px] font-semibold">General Stats</h2>
      <div className="flex flex-row items-center max-md:!flex-col max-lg:!flex-wrap max-lg:!justify-center"
        justify="space-between"
      >
        {isLoading ? (
          <HorizontalCardSkeleton />
        ) : (
          stats?.map((data, index) => (
            <div
              key={index}
              className="items-center rounded max-md:!w-full p-4 border hover:border-green-500 transition-all"
              style={{boxShadow: "none"}}
            >
              <p className="font-semibold text-4xl mb-5">{data.number}</p>
              <p className="text-lg capitalize">{data.title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GenaralStats;
