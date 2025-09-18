/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const LoadingSpinner26 = ({ color = "#EF4444", fill = "#FECACA", className }) => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="17"
      viewBox="0 0 16 17"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4390_10526)">
        <path
          clipRule="evenodd"
          d="M8 14.875C11.3137 14.875 14 12.1887 14 8.875C14 5.56129 11.3137 2.875 8 2.875C4.68629 2.875 2 5.56129 2 8.875C2 12.1887 4.68629 14.875 8 14.875ZM8 16.875C12.4183 16.875 16 13.2933 16 8.875C16 4.45672 12.4183 0.875 8 0.875C3.58172 0.875 0 4.45672 0 8.875C0 13.2933 3.58172 16.875 8 16.875Z"
          fill={color}
          fillRule="evenodd"
        />
        <path
          d="M8 16.875C6.31134 16.875 4.66599 16.3407 3.29955 15.3485C1.93312 14.3563 0.915688 12.9572 0.392952 11.3515C-0.129783 9.74574 -0.131011 8.0158 0.389446 6.40934C0.909903 4.80289 1.92535 3.40232 3.29037 2.40821L4.45794 4.01139C3.43132 4.75906 2.66761 5.81241 2.27618 7.0206C1.88475 8.2288 1.88567 9.52987 2.27882 10.7375C2.67196 11.9452 3.43716 12.9974 4.46484 13.7436C5.49253 14.4898 6.72998 14.8917 8 14.8917V16.875Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_4390_10526">
          <rect fill="white" height="16" transform="translate(0 0.875)" width="16" />
        </clipPath>
      </defs>
    </svg>
  );
};
