import { useState } from "react";
import ProfileContainer from "../ProfileContainer";
import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import FreelancerSettings from "./FreelancerSettings/FreelancerSettings";
import ClientSettings from "./ClientSettings/ClientSettings";
import { useParams, useNavigate } from "next/navigation";

const ProfileSettingTemplate = () => {
  const role = useSelector((state: any) => state?.auth?.role);
  const { step: navStep } = useParams();
  const [step, setStep] = useState(navStep ? navStep : "password");
  const router = useRouter();

  return (
    <ProfileContainer>
      <div className="w-full flex flex-col gap-[30px]">
        <div className="flex gap-[16px] items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            cursor={"pointer"}
            onClick={() => router.push("/")}
          >
            <path
              d="M4.16699 10V15.8333C4.16699 16.7538 4.91318 17.5 5.83366 17.5H14.167C15.0875 17.5 15.8337 16.7538 15.8337 15.8333V10"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 17.4997V12.4997C7.5 11.5792 8.24619 10.833 9.16667 10.833H10.8333C11.7538 10.833 12.5 11.5792 12.5 12.4997V17.4997"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.16667 10H2.5L10 2.5L17.5 10H15.8333"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <BsChevronRight />
          <p className="text-[14px] text-[#374151] font-[400]">Setting</p>
          <BsChevronRight />
          <p className="text-[14px] text-[#374151] font-[400]">
            {step
              ?.split(/[-_]/)
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-5 min-h-[calc(80vh)]">
          <div className="md:col-span-1 border-[1px]  border-[var(--bordersecondary)] rounded-lg bg-white">
            <SettingsNav
              title={"Profile Settings"}
              active={step === "password"}
              step={"password"}
              setStep={setStep}
            />
            <SettingsNav
              title={"Billing and Payment"}
              active={step === "billing-payments"}
              step={"billing-payments"}
              setStep={setStep}
            />
            <SettingsNav
              title={"Contact Info"}
              active={step === "contact-info"}
              step={"contact-info"}
              setStep={setStep}
            />
          </div>
          <div className="md:col-span-3 min-h-fit">
            {role == 1 && <FreelancerSettings step={step} />}
            {role == 2 && <ClientSettings step={step} />}
          </div>
        </div>
      </div>
    </ProfileContainer>
  );
};

export default ProfileSettingTemplate;

const SettingsNav = ({ title, noBorder, active, setStep, step }) => {
  const router = useRouter();

  const handleClick = () => {
    const newUrl = `/setting/${step}`;
    router.push(newUrl, { replace: true });
    setStep(step);
  };
  return (
    <div
      className={`w-full flex items-center text-[${
        active ? "#22C35E" : "#374151"
      }] justify-between py-[16px] border-b-[${
        !noBorder ? "1px" : "none"
      }] border-b-[${
        !noBorder ? "var(--bordersecondary)" : "none"
      }] px-[24px] cursor-pointer `}
      onClick={handleClick}
    >
      <p className={`text-[16px]  font-[500]`}>{title}</p>
      <BsChevronRight />
    </div>
  );
};
