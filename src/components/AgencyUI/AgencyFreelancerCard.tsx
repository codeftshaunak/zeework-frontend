"use client";
import React from "react";

import { toast } from "@/lib/toast";
import { Avatar, Button } from "@/components/ui/migration-helpers";
import { useEffect, useRef, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { removedAgencyMember } from "../../helpers/APIs/agencyApis";
import { MainButtonRounded } from "../Button/MainButton";
import UniversalModal from "../Modals/UniversalModal";
import BtnSpinner from "../Skeletons/BtnSpinner";

// Types
interface Profile {
  profile?: {
    lastName?: string;
    firstName?: string;
    profile_image?: string;
    professional_role?: string;
  };
}

interface FreelancerDetails {
  profile_image?: string;
  firstName?: string;
  lastName?: string;
  professional_role?: string;
  skills?: string[];
  categories?: Array<{ value?: string }>;
  sub_categories?: Array<{ value?: string }>;
  hourly_rate?: number;
  user_id?: string;
}

interface AgencyMember {
  member_position?: string;
  freelancer_details?: FreelancerDetails[];
}

interface AgencyFreelancerCardProps {
  details: AgencyMember;
  setRemainingMembers: React.Dispatch<React.SetStateAction<AgencyMember[]>>;
}

interface ApiResponse {
  code: number;
  msg?: string;
}

// Custom Badge component replacement
const CustomBadge: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline";
  colorScheme?: "green" | "gray" | "red" | "blue";
}> = ({
  children,
  className = "",
  variant = "solid",
  colorScheme = "gray",
}) => {
  const colorClasses = {
    green:
      variant === "solid"
        ? "bg-green-500 text-white"
        : "border-green-500 text-green-500",
    gray:
      variant === "solid"
        ? "bg-gray-500 text-white"
        : "border-gray-500 text-gray-500",
    red:
      variant === "solid"
        ? "bg-red-500 text-white"
        : "border-red-500 text-red-500",
    blue:
      variant === "solid"
        ? "bg-blue-500 text-white"
        : "border-blue-500 text-blue-500",
  };

  const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";

  return (
    <span
      className={`${baseClasses} ${colorClasses[colorScheme]} ${className}`}
    >
      {children}
    </span>
  );
};

export const AgencyManagerCard: React.FC = () => {
  const profile = useSelector((state: { profile: Profile }) => state.profile);
  const { lastName, firstName, profile_image, professional_role } =
    profile.profile || {};

  return (
    <div className="flex flex-col shadow border p-4 sm:p-6 rounded-md relative mt-0 md:mt-2.5 max-w-[300px]">
      <Avatar src={profile_image} name={`${firstName} ${lastName}`} size="lg" />
      <span className="font-semibold">
        {firstName} {lastName}
      </span>
      <span className="text-base text-center">{professional_role}</span>
      <CustomBadge
        variant="solid"
        colorScheme="green"
        className="absolute right-2.5 top-2.5"
      >
        Manager
      </CustomBadge>
    </div>
  );
};

export const AgencyFreelancerCard: React.FC<AgencyFreelancerCardProps> = ({
  details,
  setRemainingMembers,
}) => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const selectMenuRef = useRef<HTMLDivElement>(null);

  const { member_position } = details || {};
  const freelancerDetails =
    details?.freelancer_details?.[0] || ({} as FreelancerDetails);

  const {
    profile_image,
    firstName,
    lastName,
    professional_role = "",
    skills,
    categories,
    sub_categories,
    hourly_rate,
    user_id,
  } = freelancerDetails;

  const handleClick = (id: string | undefined): void => {
    if (id) {
      router.push(`/profile/f/${id}`);
    }
  };

  // handle removed freelancers
  const handleRemoved = async (): Promise<void> => {
    if (!user_id) return;

    setIsLoading(true);
    try {
      const response: ApiResponse = await removedAgencyMember({
        member_id: user_id,
        status: "removed",
      });

      if (response.code === 200) {
        setRemainingMembers((prevInvitations) =>
          prevInvitations.filter(
            (invitation) =>
              invitation.freelancer_details?.[0]?.user_id !== user_id
          )
        );
        toast.success(response.msg || "Member removed successfully");
      } else {
        toast.warning(response.msg || "Failed to remove member");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove member");
    } finally {
      setIsLoading(false);
      setIsModal(false);
    }
  };

  // handle close select option when click on outside
  const handleClickOutside = (event: MouseEvent): void => {
    event.stopPropagation();
    if (
      selectMenuRef.current &&
      !selectMenuRef.current.contains(event.target as Node)
    ) {
      setIsMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="mt-[10px] py-[25px] shadow border p-4 rounded-md relative w-[300px] items-center justify-center flex flex-col">
        <Avatar
          src={profile_image}
          name={`${firstName} ${lastName}`}
          size="lg"
          className="mt-[30px]"
        />
        <span className="font-semibold">
          {firstName} {lastName}
        </span>
        <span className="w-full overflow-hidden text-base text-center">
          {professional_role.length > 34
            ? professional_role.slice(0, 34) + "..."
            : professional_role}
        </span>
        <CustomBadge
          variant="solid"
          colorScheme="green"
          className="absolute right-2.5 top-2.5"
        >
          {member_position && member_position.length > 50
            ? member_position.slice(0, 50) + "..."
            : member_position}
        </CustomBadge>
        <MainButtonRounded 
          onClick={() => handleClick(user_id)}
          noRounded={false}
          className=""
        >
          Visit Profile
        </MainButtonRounded>
        <div>
          <BiDotsVerticalRounded
            className="absolute z-0 text-2xl text-gray-400 transition rounded-full cursor-pointer top-1 left-1 bg-slate-100 hover:bg-slate-300"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenu(!isMenu);
            }}
          />
        </div>
        {isMenu && (
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/5"
            onClick={() => setIsMenu(false)}
          >
            <div
              className="absolute p-2 bg-white rounded shadow left-1 top-8"
              ref={selectMenuRef}
            >
              <div
                className="px-3 py-1 transition rounded cursor-pointer hover:bg-gray-200/20"
                onClick={() => setIsMenu(false)}
              >
                Block
              </div>
              <div
                className="px-3 py-1 transition rounded cursor-pointer hover:bg-gray-200/20"
                onClick={() => {
                  setIsModal(true);
                  setIsMenu(false);
                }}
              >
                Remove
              </div>
            </div>
          </div>
        )}
      </div>

      {isModal && (
        <UniversalModal
          isModal={isModal}
          size={"3xl" as any}
          setIsModal={setIsModal}
          title="Freelancer Details"
        >
          <div className="flex items-center gap-8">
            <div className="w-[150px] h-[150px]">
              <Avatar
                name={`${firstName} ${lastName}`}
                src={profile_image}
                className="object-cover w-full h-full rounded"
              />
            </div>
            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div>
                    <div className="flex flex-row items-center">
                      <h2 className="text-2xl font-semibold text-fg-brand">
                        {firstName} {lastName}
                      </h2>
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ml-[0.8rem]">
                        Available now
                      </button>
                    </div>

                    <p className="text-sm font-medium text-[#6B7280]">
                      {professional_role}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-md font-medium text-[#202020]">
                  ${hourly_rate}/hr
                </p>
              </div>

              <div className="w-full space-y-2">
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <div>
                      <p className="font-bold">Professional At.</p>
                      <h3 className="mb-2">
                        {categories?.[0]?.value || "N/A"}
                      </h3>
                      {sub_categories?.map((subcat, index) => (
                        <h4
                          key={index}
                          className="pl-1 mb-2 ml-1 text-sm border-l border-gray-300"
                        >
                          {subcat?.value}
                        </h4>
                      ))}
                      <div className="flex flex-wrap pl-1 ml-1 border-l border-gray-300">
                        {skills && skills.length > 0
                          ? skills.slice(0, 6).map((skill, index) => (
                              <span
                                key={index}
                                className="text-sm border mr-[5px] bg-[#5d8586] px-3 py-1 text-white rounded-2xl cursor-pointer"
                              >
                                {skill}
                              </span>
                            ))
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="w-full space-y-2">
                <div className="flex justify-between">
                  <div className="flex w-full gap-3">
                    <div className="w-full">
                      <p className="mb-1 font-bold">
                        Freelancer role to your agency
                      </p>
                      <p className="capitalize">
                        {member_position && member_position.length > 50
                          ? member_position.slice(0, 50) + "..."
                          : member_position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-5 pt-6">
                <Button
                  
                  loadingText="Removing"
                  onClick={handleRemoved}
                  className="px-10 py-2 text-white transition-colors bg-red-600 rounded-md hover:bg-red-700"
                >
                  Remove
                </Button>
                <Button
                  onClick={() => setIsModal(false)}
                  variant="outline"
                  className="px-10 py-2 transition-colors border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </UniversalModal>
      )}
    </>
  );
};
