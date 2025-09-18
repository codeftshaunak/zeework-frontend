/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const LoadingSpinner31 = ({ color = "#374151", fill = "#E5E7EB", className }) => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="21"
      viewBox="0 0 20 21"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M10 16.5C13.3137 16.5 16 13.8137 16 10.5C16 7.18629 13.3137 4.5 10 4.5C6.68629 4.5 4 7.18629 4 10.5C4 13.8137 6.68629 16.5 10 16.5ZM10 18.5C14.4183 18.5 18 14.9183 18 10.5C18 6.08172 14.4183 2.5 10 2.5C5.58172 2.5 2 6.08172 2 10.5C2 14.9183 5.58172 18.5 10 18.5Z"
        fill={color}
        fillRule="evenodd"
      />
      <path
        d="M10 18.5C8.31134 18.5 6.66599 17.9657 5.29955 16.9735C3.93312 15.9813 2.91569 14.5822 2.39295 12.9765C1.87022 11.3707 1.86899 9.6408 2.38945 8.03434C2.9099 6.42789 3.92535 5.02732 5.29037 4.03321L6.45794 5.63639C5.43132 6.38406 4.66761 7.43741 4.27618 8.6456C3.88475 9.8538 3.88567 11.1549 4.27882 12.3625C4.67196 13.5702 5.43716 14.6224 6.46484 15.3686C7.49253 16.1148 8.72998 16.5167 10 16.5167V18.5Z"
        fill={fill}
      />
    </svg>
  );
};
