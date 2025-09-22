import Image from "next/image";
import { Avatar } from "@chakra-ui/react";
import React from "react";
import { toast } from "@/lib/toast";
import { HStack, VStack, Text } from "@/components/ui/migration-helpers";
import { AgencyBodyLayout } from "../../AgencyUI/AgencyBody";
import { BsLink45Deg } from "react-icons/bs";

// Types
interface AgencyDetails {
  agency_name?: string;
  agency_tagline?: string;
  agency_coverImage?: string;
  agency_profileImage?: string;
}

interface TopSideProps {
  details?: AgencyDetails;
}

const TopSide: React.FC<TopSideProps> = ({ details }) => {
  const {
    agency_name,
    agency_tagline,
    agency_coverImage,
    agency_profileImage,
  } = details || {};

  const handleCopyProfileURL = (): void => {
    if (typeof window === "undefined") return;

    const profileURL = window.location.href;
    navigator.clipboard.writeText(profileURL);
    toast.success("Agency Profile Copied.");
  };

  return (
    <div className="relative flex flex-col w-full">
      <div className="relative flex flex-col w-full">
        {agency_coverImage ? (
          <Image
            src={agency_coverImage}
            alt="cover image"
            className="object-cover w-full rounded shadow brightness-80"
          />
        ) : (
          <Image
            src="/images/zeework_agency_cover.png"
            alt="cover image"
            className="object-cover w-full rounded shadow brightness-80"
          />
        )}
      </div>

      <AgencyBodyLayout>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center w-full">
            <Avatar
              src={agency_profileImage}
              name={agency_name || "Agency"}
              className="rounded"
            />

            <div className="flex flex-col items-start ml-[1.1rem]">
              <span className="font-semibold">
                {agency_name || "Agency Name"}
              </span>
              <span className="text-gray-600">
                {agency_tagline || "Agency Tagline"}
              </span>
            </div>
          </div>

          <div
            className="flex items-center cursor-pointer justify-center w-9 h-9 bg-[#F9FAFB] rounded-[6px] border border-[var(--bordersecondary)] hover:bg-gray-100 transition-colors"
            onClick={handleCopyProfileURL}
            aria-label="Copy profile URL"
          >
            <BsLink45Deg className="text-lg" />
          </div>
        </div>
      </AgencyBodyLayout>
    </div>
  );
};

export default TopSide;
