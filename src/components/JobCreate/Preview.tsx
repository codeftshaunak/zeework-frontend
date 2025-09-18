import React from "react";
import { useFormState } from "../../contexts/FormContext";

const Preview = () => {
  const { formState } = useFormState();

  return (
    <div className="w-[310px] h-[124px] flex-col justify-start items-start gap-2 inline-flex">
      {formState.title ? (
        <div className="flex items-center w-full">
          <div className="text-gray-700 text-base font-semibold font-['SF Pro Text'] leading-normal">
            {formState.title}
          </div>
          <div className="ml-auto">
            <div className="w-7 h-7 mr-3 justify-start items-start inline-flex">
              <div className="w-7 h-7 p-1 bg-white rounded-md shadow border border-gray-300 justify-center items-center gap-2.5 flex">
                <div className="w-4 h-4 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <g id="16/Pencil">
                      <path
                        id="Path"
                        d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Path_2"
                        d="M9 4.33301L11.6667 6.99967"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-7 h-7 justify-start items-start inline-flex">
              <div className="w-7 h-7 p-1 bg-white rounded-md shadow border border-gray-300 justify-center items-center gap-2.5 flex">
                <div className="w-4 h-4 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <g id="16/Trash">
                      <path
                        id="Path"
                        d="M9.33333 7.33301V11.333"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Path_2"
                        d="M6.66634 7.33301V11.333"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Path_3"
                        d="M2.66699 4.66634H13.3337"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Path_4"
                        d="M3.33301 4.66699L3.99967 12.667C3.99967 13.4034 4.59663 14.0003 5.33301 14.0003H10.6663C11.4027 14.0003 11.9997 13.4034 11.9997 12.667L12.6663 4.66699"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Path_5"
                        d="M6 4.66667V2.66667C6 2.29848 6.29848 2 6.66667 2H9.33333C9.70152 2 10 2.29848 10 2.66667V4.66667"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {formState?.description ? (
        <div className="w-[310px] my-2 text-gray-700 text-sm font-normal font-['SF Pro Text'] leading-tight" dangerouslySetInnerHTML={{ __html: formState?.description }}>
          {/* {formState?.description} */}
        </div>
      ) : null}
      {formState?.amount ? (
        <div className="w-[310px] text-gray-700 text-sm font-normal font-['SF Pro Text'] leading-tight">
          ${formState?.amount}
        </div>
      ) : null}

      {formState?.experience ? (
        <div className="flex items-center w-full mt-5">
          <div className="text-gray-700 text-base font-semibold font-['SF Pro Text'] leading-normal">
            {formState?.experience}
          </div>
          <div className="ml-auto">
            <div className="w-7 h-7 justify-start items-start inline-flex">
              <div className="w-7 h-7 p-1 bg-white rounded-md shadow border border-gray-300 justify-center items-center gap-2.5 flex">
                <div className="w-4 h-4 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <g id="16/Pencil">
                      <path
                        id="Path"
                        d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Path_2"
                        d="M9 4.33301L11.6667 6.99967"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {formState.duration ? (
        <div className="flex items-center w-full mt-5">
          <div className="text-gray-700 text-base font-semibold font-['SF Pro Text'] leading-normal">
            {formState?.duration}
          </div>
          <div className="ml-auto">
            <div className="w-7 h-7 justify-start items-start inline-flex">
              <div className="w-7 h-7 p-1 bg-white rounded-md shadow border border-gray-300 justify-center items-center gap-2.5 flex">
                <div className="w-4 h-4 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <g id="16/Pencil">
                      <path
                        id="Path"
                        d="M2.66699 13.3332H5.33366L12.3337 6.33321C13.07 5.59683 13.07 4.40292 12.3337 3.66654C11.5973 2.93016 10.4034 2.93016 9.66699 3.66654L2.66699 10.6665V13.3332"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Path_2"
                        d="M9 4.33301L11.6667 6.99967"
                        stroke="#6B7280"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Preview;
