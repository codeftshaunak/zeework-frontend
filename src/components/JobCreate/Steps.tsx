import React from "react";

function Step({ step, description, active, finalStep, complete, setStep }) {
  return (
    <div className="flex relative mb-[55px]">
      <div
        onClick={() => setStep(step)}
        className={`w-8 h-8 rounded-full border-2 ${

}

const Steps = ({ step, setStep }) => {
  return (
    <div className="w-[169px] h-[261px] flex-col justify-start items-start inline-flex">
      <Step
        step={1}
        description="Basic Information"
        complete={step > 1}
        active={step === 1}
        setStep={() => (step > 1 ? setStep(1) : () => {})}
      />
      <Step
        step={2}
        description="Experience"
        complete={step > 2}
        active={step === 2}
        setStep={() => (step > 2 ? setStep(2) : () => {})}
      />
      <Step
        step={3}
        description="Scope of your Work"
        finalStep
        complete={step > 3}
        active={step === 3}
        setStep={() => (step > 3 ? setStep(3) : () => {})}
      />
    </div>
  );
};

export default Steps;
