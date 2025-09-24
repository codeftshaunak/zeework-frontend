import React from "react";

import { MainButtonRounded } from "../Button/MainButton";
import UniversalModal from "../Modals/UniversalModal";

interface ConfirmModalCommonProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  title: string;
  handleSubmit: () => void;
  isLoading?: { isLoading: boolean };
}

const ConfirmModalCommon: React.FC<ConfirmModalCommonProps> = ({
  openModal,
  setOpenModal,
  title,
  handleSubmit,
  isLoading,
}) => {
  return (
    <UniversalModal isModal={openModal} setIsModal={setOpenModal}>
      <span
       className="m-[1rem 0] text-2xl font-semibold text-center">
        Are You Sure You Want To {title}?
      </span>
      <div className="flex flex-row items-center justify-center mt-[2rem]">
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground bg-white"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </button>
        <MainButtonRounded
          isLoading={isLoading?.isLoading}
          onClick={() => handleSubmit()}
          className="m-0"
        >
          Submit
        </MainButtonRounded>
        {/* <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded"
          backgroundColor={"var(--primarytextcolor)"}
          _hover={{
            color: "var(--primarytextcolor)",
            backgroundColor: "var(--secondarycolor)",
          }}
          onClick={() => handleSubmit()}
        >
          Submit
        </button> */}
      </div>
    </UniversalModal>
  );
};

export default ConfirmModalCommon;
