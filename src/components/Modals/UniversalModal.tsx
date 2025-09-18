import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionModalContent = motion(ModalContent);

const UniversalModal = ({
  isModal,
  setIsModal,
  title,
  children,
  size = "2xl",
  isCloseBtn = true,
}) => {
  const handleClose = () => {
    setIsModal(false);
  };

  return (
    <Modal
      isOpen={isModal}
      onClose={handleClose}
      closeOnOverlayClick={false}
      isCentered
      size={size}
    >
      <ModalOverlay />
      <MotionModalContent
        paddingY={4}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {title && (
          <ModalHeader paddingTop={0} marginBottom={0} className="capitalize">
            {title}
          </ModalHeader>
        )}
        {isCloseBtn && <ModalCloseButton className="mt-1" />}
        <ModalBody>{children}</ModalBody>
      </MotionModalContent>
    </Modal>
  );
};

export default UniversalModal;
