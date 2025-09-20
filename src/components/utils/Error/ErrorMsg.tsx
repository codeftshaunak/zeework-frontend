import { HiOutlineInformationCircle } from "react-icons/hi";
import { cn } from "@/lib/utils";

interface ErrorMsgProps {
  msg: string;
  className?: string;
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({ msg, className }) => {
  if (!msg) return null;

  return (
    <span
      className={cn(
        "flex items-center gap-0.5 text-sm text-red-500 leading-3 mt-0.5",
        className
      )}
    >
      <HiOutlineInformationCircle className="min-h-[13px] min-w-[13px]" />
      {msg}
    </span>
  );
};

export default ErrorMsg;
