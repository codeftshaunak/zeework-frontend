import {
  Box,
  Input,
  Spinner,
  Text,
  Textarea,
  useToast,
  VStack
} from "@chakra-ui/react";
import React, { useState } from "react";

const SubmitModal = ({
  setOpenModal,
  acceptInvite,
  jobDetails,
  loadingSubmit,
  setLoadingSubmit,
}) => {
  const [messages, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();

  const handleTextValue = (e) => {
    setMessage(e.target.value);
    setErrorMessage(""); // Clear error message when the user starts typing
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage(""); // Clear error message when the user selects a file
  };

  return (
    <VStack>
      <Box className="fixed inset-0 flex items-center justify-center z-50">
        <Box className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></Box>

        <Box className="modal-container bg-white w-8/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <Box className="modal-content py-4 text-left px-6">
            <Box className="flex justify-between items-center pb-3 border-b">
              <Text className="text-xl font-bold capitalize text-center w-full">
                Submit your work for payment
              </Text>
            </Box>

            <br />
            <p className="text-md">
              {`Use the form to request approval for the work you've completed.
              Your payment will be released upon approval.`}
            </p>

            <VStack
              className="my-5"
              justifyContent={"flex-start"}
              alignItems={"start"}
              width={"100%"}
            >
              <Box width={"100%"} marginBottom={"0.5rem"}>
                <Text
                  fontWeight={"bold"}
                  textAlign={"left"}
                  pl={"0.2rem"}
                  fontSize={"1.1rem"}
                >
                  Project Name
                </Text>
                <Text textAlign={"left"} pl={"0.2rem"} fontSize={"1.1rem"}>
                  {jobDetails?.title}
                </Text>
              </Box>

              <Box width={"100%"} marginBottom={"0.5rem"}>
                <Text
                  fontWeight={"bold"}
                  textAlign={"left"}
                  pl={"0.2rem"}
                  fontSize={"1.1rem"}
                >
                  Project Amount
                </Text>
                <Text textAlign={"left"} pl={"0.2rem"} fontSize={"1.1rem"}>
                  ${jobDetails?.amount}
                </Text>
              </Box>

              <Box width={"100%"} marginBottom={"0.5rem"}>
                <Text
                  fontWeight={"bold"}
                  textAlign={"left"}
                  pl={"0.2rem"}
                  fontSize={"1.1rem"}
                >
                  Your Message To Client
                </Text>
                <Textarea
                  placeholder="Enter your message..."
                  size="md"
                  value={messages}
                  onChange={handleTextValue}
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="md"
                  p={2}
                />
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
              </Box>

              <Box width={"100%"} marginBottom={"0.5rem"}>
                <Text
                  fontWeight={"bold"}
                  textAlign={"left"}
                  pl={"0.2rem"}
                  fontSize={"1.1rem"}
                  marginBottom={"0.5rem"}
                >
                  Upload File
                </Text>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  backgroundColor={"white"}
                  paddingTop={"0.3rem"}
                  accept=".pdf,.doc,.docx,.txt,.jpeg,.jpg,.png"
                />
              </Box>
            </VStack>

            <Box className="flex justify-end pt-2 border-t">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 mx-4 bg-white border border-black rounded-lg text-black hover:bg-[#F0FDF4]"
              >
                Cancel
              </button>
              <button
                className="px-4 bg-fg-brand py-2 rounded-lg text-white hover:bg-fg-brand"
                onClick={() => acceptInvite({ messages, file })}
              >
                {loadingSubmit ? <Spinner /> : "Submit Your Work"}
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
    </VStack>
  );
};

export default SubmitModal;
