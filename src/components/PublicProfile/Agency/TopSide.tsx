import React from "react";
import { toast } from "@/lib/toast";
import {
  HStack,
  Image,
  VStack,
  Text,
  Avatar,
} from "@/components/ui/migration-helpers";
import { AgencyBodyLayout } from "../../AgencyUI/AgencyBody";
import { BsLink45Deg } from "react-icons/bs";

const TopSide = ({ details }) => {
  const {
    agency_name,
    agency_tagline,
    agency_coverImage,
    agency_profileImage,
  } = details || {};

  const handleCopyProfileURL = () => {
    const profileURL = window.location.href;
    navigator.clipboard.writeText(profileURL);

    toast.success("Agency Profile Copied.");
  };
  return (
    <>
      <div className="flex flex-col className="w-full relative">
        <div className="flex flex-col className="w-full relative">
          {agency_coverImage ? (
            <Image
              src={agency_coverImage}
              alt="cover image"
              className="shadow w-full"}
             
              objectFit="cover"
              filter={"brightness(80%)"} className="rounded"
            />
          ) : (
            <Image
              src="/images/zeework_agency_cover.png"
              alt="cover image"
              className="shadow w-full"}
             
              objectFit="cover"
              filter={"brightness(80%)"} className="rounded"
            />
          )}
        </div>

        <AgencyBodyLayout>
          <div className="flex flex-row items-center} className="justify-between w-full"}
          >
            <div className="flex flex-row items-center className="w-full">
              <Avatar
                src={agency_profileImage}
                name={agency_name}}} className="rounded"
              />

              <div className="flex flex-col className="items-flex-start ml-[1.1rem]"
              >
                {" "}
                <span}
                 className="font-semibold">
                  {agency_name}
                </span>
                <span}>
                  {agency_tagline}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center> <div items-center cursor-pointer justify-center w-[36px] h-[36px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)]"
              onClick={handleCopyProfileURL}
            >
              <BsLink45Deg />
            </div>
          </div>
        </AgencyBodyLayout>
      </div>
    </>
  );
};

export default TopSide;
