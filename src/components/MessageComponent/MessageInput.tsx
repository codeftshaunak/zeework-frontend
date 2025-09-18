import { HStack, VStack, Spinner } from "@chakra-ui/react";
import { BsSendFill } from "react-icons/bs";
import ReactQuill from "react-quill";

const MessageInput = ({
  message,
  setMessage,
  isLoading,
  handleSendMessage,
}) => {
  const modules = {
    toolbar: false,
  };

  const stripHtml = (html) => {
    let div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const msgLength = stripHtml(message).length;

  return (
    <HStack
      width="100%"
      margin="auto"
      padding={{ md: "0 10px" }}
      justifyContent="space-between"
      className="rounded"
    >
      <ReactQuill
        theme="snow"
        value={message}
        onChange={setMessage}
        className="h-[50px] w-full [&>*]:rounded-md overflow-y-auto"
        modules={modules}
      />
      <VStack
        height={"45px"}
        width="60px"
        alignItems="center"
        justifyContent="center"
        borderRadius="5px"
        borderColor="ButtonFace"
        className={
          isLoading || msgLength
            ? "bg-green-500 cursor-pointer"
            : "bg-slate-100 cursor-not-allowed"
        }
        onClick={() => {
          if (!isLoading && msgLength) handleSendMessage();
        }}
      >
        {isLoading ? (
          <Spinner color="white" />
        ) : (
          <BsSendFill fontSize="15px" className={message && "text-white"} />
        )}
      </VStack>
    </HStack>
  );
};

export default MessageInput;
