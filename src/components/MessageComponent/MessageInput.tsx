
import { BsSendFill } from "react-icons/bs";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="h-20 bg-gray-100 rounded border animate-pulse" />
});

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
    <div
      className="mx-auto md:px-2.5 justify-between rounded flex flex-row items-center w-full"
    >
      <ReactQuill
        theme="snow"
        value={message}
        onChange={setMessage}
        className="h-[50px] w-full [&>*]:rounded-md overflow-y-auto"
        modules={modules}
      />
      <div className="flex flex-col"
       
       
       
        className={`border-gray-200 ${
          isLoading || msgLength
            ? "bg-green-500 cursor-pointer"
            : "bg-slate-100 cursor-not-allowed"
        }`}
        onClick={() => {
          if (!isLoading && msgLength) handleSendMessage();
        }}
      >
        {isLoading ? (
          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          <BsSendFill className={message && "text-white"} />
        )}
      </div>
    </div>
  );
};

export default MessageInput;
