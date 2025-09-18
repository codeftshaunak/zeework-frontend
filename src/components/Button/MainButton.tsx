import BtnSpinner from "../Skeletons/BtnSpinner";
import PropTypes from "prop-types";

export const MainButtonRounded = ({
  children,
  onClick,
  noRounded,
  variant = "solid",
  isDisable = false,
  isLoading = false,
  className,
  type = "button",
}) => {
  const buttonStyles = {
    borderRadius: noRounded ? "5px" : "50px",
  };
  const disabled = isDisable || isLoading;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`text-center font-semibold py-[6px] px-6 border transition duration-700 flex items-center justify-center ${
        disabled
          ? "bg-green-200 cursor-not-allowed"
          : `${
              variant === "outline"
                ? "bg-white text-[var(--primarycolor)] hover:bg-[var(--primarycolor)] hover:text-white"
                : "hover:bg-white text-white hover:text-[var(--primarycolor)] bg-[var(--primarycolor)]"
            } `
      } ${className}`}
      style={buttonStyles}
      onClick={onClick}
    >
      {isLoading && <BtnSpinner />} {children}
    </button>
  );
};

MainButtonRounded.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  noRounded: PropTypes.bool,
  variant: PropTypes.oneOf(["solid", "outline"]),
  isDisable: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(["reset", "button", "submit"]),
};

// export const MainButtonTranparentRounded = ({
//   children,
//   onClick,
//   noRounded,
// }) => {
//   const buttonStyles = {
//     borderRadius: noRounded ? "5px" : "50px",
//   };

//   return (
//     <button
//       className="text-center font-semibold py-[6px] px-5 m-auto border transition duration-700 bg-white text-[var(--primarycolor)] hover:bg-[var(--primarycolor)] hover:text-white"
//       onClick={onClick}
//       style={buttonStyles}
//     >
//       {children}
//     </button>
//   );
// };
