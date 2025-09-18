import { Dialog, Portal, CloseButton, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionContent = motion(Box);

import React from "react";

interface UniversalModalProps {
  isModal: boolean;
  setIsModal: (open: boolean) => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  size?: "2xl" | "xl" | "lg" | "md";
  isCloseBtn?: boolean;
}

const UniversalModal: React.FC<UniversalModalProps> = ({
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
    <Dialog.Root
      open={isModal}
      onOpenChange={(details) => setIsModal(details.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <MotionContent
            as={Dialog.Content}
            paddingY={4}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            maxWidth={
              size === "2xl"
                ? "672px"
                : size === "xl"
                ? "576px"
                : size === "lg"
                ? "512px"
                : "448px"
            }
          >
            {title && (
              <Dialog.Header
                paddingTop={0}
                marginBottom={0}
                className="capitalize"
              >
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            {isCloseBtn && (
              <Box position="absolute" top={4} right={4}>
                <CloseButton onClick={handleClose} className="mt-1" />
              </Box>
            )}
            <Dialog.Body>{children}</Dialog.Body>
          </MotionContent>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default UniversalModal;
