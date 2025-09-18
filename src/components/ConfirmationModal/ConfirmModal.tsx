import { Button, Text, Image, HStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "next/navigation";
import { endJobContract } from "../../helpers/APIs/jobApis";
import { useState } from "react";
import BtnSpinner from "../Skeletons/BtnSpinner";
import UniversalModal from "../Modals/UniversalModal";

const ConfirmModal = ({
  openModal,
  setOpenModal,
  job_id,
  receiverDetails,
  jobDetails,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleEndContract = async () => {
    setIsLoading(true);
    try {
      const { code, msg } = await endJobContract({
        job_id: jobDetails?.job_id,
        user_id: receiverDetails?.user_id,
      });
      toast({
        title: msg,
        status: code === 200 ? "success" : "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      if (code === 200)
        router.push(`/submit-review/${job_id}`, {
          state: {
            jobDetails: jobDetails,
            receiverDetails: receiverDetails,
          },
        });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  return (
    <UniversalModal isModal={openModal} setIsModal={setOpenModal}>
      {/* <Text fontWeight={"600"} fontSize={"1.4rem"} margin={"1rem 0"}>
        Share Your Feedback
      </Text> */}
      <Image
        src="/images/zeework_end_contract.png"
        width={"200px"}
        margin={"auto"}
      />
      <Text
        textAlign={"center"}
        fontSize={"1.4rem"}
        margin={"1rem 0"}
        fontWeight={"600"}
      >
        Are you sure you want to end this contract?
      </Text>
      <HStack justifyContent={"right"} marginTop={"2rem"}>
        <Button
          backgroundColor={"white"}
          color={"var(--primarytextcolor)"}
          _hover={{}}
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          loadingText="End Contract"
          colorScheme="primary"
          rounded="full"
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
