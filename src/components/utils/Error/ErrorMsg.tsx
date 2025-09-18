import { Text } from "@chakra-ui/react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import PropTypes from "prop-types";

const ErrorMsg = ({ msg, className }) => {
  if (!msg) return;
  return (
    <Text
      textColor={"red"}
      display={"flex"}
      gap={0.5}
      fontSize={"small"}
      className={className}
      lineHeight="12px"
      mt={"3px"}
    >
      <HiOutlineInformationCircle className="min-h-[13px] min-w-[13px]" />
      {msg}
    </Text>
  );
};

ErrorMsg.propTypes = {
  msg: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ErrorMsg;
