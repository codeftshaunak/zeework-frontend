import { Button, Text, HStack } from "@chakra-ui/react";
import { MainButtonRounded } from "../Button/MainButton";
import UniversalModal from "../Modals/UniversalModal";

const ConfirmModalCommon = ({
  openModal,
  setOpenModal,
  title,
  handleSubmit,
  isLoading,
}) => {
  return (
    <UniversalModal isModal={openModal} setIsModal={setOpenModal}>
      <Text
        textAlign={"center"}
        fontSize={"1.4rem"}
        margin={"1rem 0"}
        fontWeight={"600"}
      >
        Are You Sure You Want To {title}?
      </Text>
      <HStack justifyContent={"center"} marginTop={"2rem"}>
        <Button
          backgroundColor={"white"}
          color={"var(--primarytextcolor)"}
          _hover={{}}
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </Button>
        <MainButtonRounded
          isLoading={isLoading?.isLoading}
          onClick={() => handleSubmit()}
          className={"m-0"}
        >
          Submit
        </MainButtonRounded>
        {/* <Button
          borderRadius={"25px"}
          border={"1px solid var(--primarycolor)"}
          color={"var(--secondarycolor)"}
          backgroundColor={"var(--primarytextcolor)"}
          _hover={{
            color: "var(--primarytextcolor)",
            backgroundColor: "var(--secondarycolor)",
          }}
          onClick={() => handleSubmit()}
        >
          Submit
        </Button> */}
      </HStack>
    </UniversalModal>
  );
};

export default ConfirmModalCommon;
