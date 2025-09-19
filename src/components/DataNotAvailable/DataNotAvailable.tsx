import React from "react";
import { useRouter } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { TiRefresh } from "react-icons/ti";

interface DataNotAvailableProps {
  onRefresh?: () => void;
}

const DataNotAvailable: React.FC<DataNotAvailableProps> = ({ onRefresh }) => {
  const router = useRouter();

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  const handleGoToHome = () => {
    router.push("/");
  };

  return (
    <div className="grid justify-center mt-10 sm:w-fit mx-auto rounded-md">
      <img
        src="/icons/cloud.png"
        className="w-20 h-auto mx-auto opacity-60"
        alt="Cloud icon"
      />
      <p className="text-lg font-semibold text-gray-700 mb-4">
        Sorry, the data you are looking for is currently not available!
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center mt-5 sm:mt-10">
        <button
          onClick={handleRefresh}
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-green-600 bg-white border border-green-600 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          <TiRefresh className="text-2xl mr-2" />
          Refresh Page
        </button>
        <button
          onClick={handleGoToHome}
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          <GoHomeFill className="mr-2" />
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default DataNotAvailable;
