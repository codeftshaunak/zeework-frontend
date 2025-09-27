"use client";

import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { endJobContract } from "../../helpers/APIs/jobApis";
import { useState } from "react";
import BtnSpinner from "../Skeletons/BtnSpinner";
import UniversalModal from "../Modals/UniversalModal";
import { Image, Text, HStack, Button } from "@/components/ui/migration-helpers";

const ConfirmModal = ({
  openModal,
  setOpenModal,
  job_id,
  receiverDetails,
  jobDetails,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEndContract = async () => {
    setIsLoading(true);
    try {
      const { code, msg } = await endJobContract({
        job_id: jobDetails?.job_id,
        user_id: receiverDetails?.user_id,
      });
      toast.default(msg);
      if (code === 200)
        router.push(`/submit-review/${job_id}`);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  return (
    <UniversalModal isModal={openModal} setIsModal={setOpenModal}>
      {/* <Text className="m-[1rem 0] text-2xl font-semibold">
        Share Your Feedback
      </Text> */}
      <Image
        src="/images/zeework_end_contract.png"
        className="m-[auto]"
        alt="end contract"
        width={200}
        height={200}
      />
      <Text
        className="m-[1rem 0] text-center text-2xl font-semibold"
      >
        Are you sure you want to end this contract?
      </Text>
      <HStack className="mt-[2rem]">
        <Button
          backgroundColor="white"
          _hover={{}}
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </Button>
        <Button
          
          loadingText="End Contract"
          spinner={<BtnSpinner />}
          onClick={handleEndContract}
        >
          End Contract
        </Button>
      </HStack>
    </UniversalModal>
  );
};

export default ConfirmModal;
