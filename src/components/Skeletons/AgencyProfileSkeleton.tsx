import React from "react";


const AgencyProfileSkeleton: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="animate-pulse">
        <div className="py-2 w-full">
          <div className="h-[106px] p-8 border border-[var(--bordersecondary)] mb-4 my-auto bg-white">
            <div className="space-y-2">
              <div className="animate-pulse bg-gray-200 h-4 rounded w-full"></div>
              <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4"></div>
            </div>
          </div>

          <div className="w-full hidden min-[992px]:flex justify-between border border-[var(--bordersecondary)] bg-white">
            <div className="h-96 w-[68%] p-8">
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
            <div className="w-[30%] h-96 p-8">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyProfileSkeleton;
