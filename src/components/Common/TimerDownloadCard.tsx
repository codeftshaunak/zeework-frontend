import React from "react";
import { useRouter } from "next/navigation";

const TimerDownloadCard = ({ msg } : { msg?: string}) => {
  const router = useRouter();
  return (
    <div
      className={`${
        msg ? "xl:w-[250px]" : "xl:w-[350px]"
      } mt-6 mx-auto rounded-2xl w-full  h-[500px] relative bg-gradient-to-br from-[#F2FDF0] to-[#A4B8A1]`}
    >
      <div>
        <img
          className="absolute bottom-0 right-0 rounded-2xl"
          src="/images/dashboard/zeework_card-bg.png"
          alt="banner"
        />
        <img
          className="absolute bottom-0 right-0 rounded-2xl"
          src="/images/dashboard/zeework_banner.png"
          alt="banner"
        />
      </div>
      <div className="flex flex-col gap-3 absolute top-0 left-0 p-6">
        <div className="text-2xl text-[#0A0C0F] font-semibold">Earn Hourly</div>
        <div className="text-md text-black/[.7] font-medium">
          Analyze your performance to improve your success
        </div>
        <button
          className="bg-[#22C55E] text-secondary rounded-lg h-[36px] w-[145px]"
          onClick={() => router.push("/downloads")}
        >
          Download Now
        </button>
      </div>
    </div>
  );
};

export default TimerDownloadCard;
