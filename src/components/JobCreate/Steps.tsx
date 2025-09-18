import React from "react";

function Step({ step, description, active, finalStep, complete, setStep }) {
  return (
    <div className="flex relative mb-[55px]">
      <div
        onClick={() => setStep(step)}
        className={`w-8 h-8 rounded-full border-2 ${
          active ? "border-outline-active" : "border-fg-disabled"
        } ${
          complete ? "border-outline-active bg-outline-active" : ""
        } flex justify-center items-center`}
      >
        {active && <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
        {complete && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g id="Icons/24px/Check">
              <path
                id="Path"
                d="M5 12L10 17L20 7"
                stroke="white"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        )}
      </div>
      <div className="ml-2">
        <div className=" text-green-600 text-sm font-medium font-['SF Pro Text'] leading-tight">
          Step {step}
        </div>
        <div className="text-gray-700 text-sm font-medium font-['SF Pro Text'] leading-tight">
          {description}
        </div>
      </div>
      {!finalStep && (
        <div
          className={`h-[58px] w-0.5 absolute top-8 left-[15px] ${
            complete ? "bg-outline-active" : "bg-gray-300"
          }`}
        />
      )}
    </div>
  );
}

const Steps = ({ step, setStep }) => {
  return (
    <div className="w-[169px] h-[261px] flex-col justify-start items-start inline-flex">
      <Step
        step={1}
        description={"Basic Information"}
        complete={step > 1}
        active={step === 1}
        setStep={() => (step > 1 ? setStep(1) : () => {})}
      />
      <Step
        step={2}
        description={"Experience"}
        complete={step > 2}
        active={step === 2}
        setStep={() => (step > 2 ? setStep(2) : () => {})}
      />
      <Step
        step={3}
        description={"Scope of your Work"}
        finalStep
        complete={step > 3}
        active={step === 3}
        setStep={() => (step > 3 ? setStep(3) : () => {})}
      />
    </div>
  );
};

export default Steps;
