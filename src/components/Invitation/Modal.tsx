import { useState } from "react";
import { Button } from "@chakra-ui/react";
import BtnSpinner from "../Skeletons/BtnSpinner";
import UniversalModal from "../Modals/UniversalModal";

const Modal = ({
  openModal,
  setOpenModal,
  acceptInvite,
  offer,
  isLoading: loaders,
}) => {
  const [messages, setMessage] = useState("");
  const { isLoading, statusValue } = loaders || {};

  const HandleTextValue = (e) => {
    setMessage(e.target.value);
  };

  return (
    <UniversalModal
      isModal={openModal}
      setIsModal={setOpenModal}
      title={"Enter your message to client"}
    >
      <div className="my-5">
        <textarea
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter your message..."
          rows="4"
          value={messages}
          onChange={HandleTextValue}
        />
        <p className="text-red-500 text-sm">
          {!messages && "Messages is required"}
        </p>
      </div>

      <div className="flex justify-end gap-5 mt-2">
        <Button
          onClick={() => setOpenModal(false)}
          colorScheme="primary"
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          loadingText={offer ? "Accept Offer" : "Accept Interview"}
          colorScheme="primary"
          type="submit"
          spinner={<BtnSpinner />}
          onClick={() => {
            if (messages) acceptInvite(messages);
          }}
        >
          {offer ? "Accept Offer" : "Accept Interview"}
        </Button>
      </div>
    </UniversalModal>
  );
};

export default Modal;
