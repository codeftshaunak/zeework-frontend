import { Button } from "@chakra-ui/react";
import { useNavigate } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { TiRefresh } from "react-icons/ti";

const DataNotAvailable = ({ onRefresh }) => {
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
        <Button
          colorScheme="primary"
          variant={"outline"}
          leftIcon={<TiRefresh className="text-2xl" />}
          onClick={handleRefresh}
          width={"full"}
        >
          Refresh Page
        </Button>
        <Button
          colorScheme="primary"
          leftIcon={<GoHomeFill />}
          onClick={handleGoToHome}
          width={"full"}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default DataNotAvailable;
