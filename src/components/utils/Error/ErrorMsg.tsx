import { HiOutlineInformationCircle } from "react-icons/hi";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const ErrorMsg = ({ msg, className }) => {
  if (!msg) return;
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

ErrorMsg.propTypes = {
  msg: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ErrorMsg;
