"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsLink45Deg, BsPlus } from "react-icons/bs";
import { toast } from "@/lib/toast";
import { CiLocationOn } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { format } from "date-fns";
import { TbPencil } from "react-icons/tb";
import { HiOutlineTrash } from "react-icons/hi";
import { getWorkHistory } from "../../../../helpers/APIs/freelancerApis";
import { getAssociatedAgency } from "../../../../helpers/APIs/agencyApis";
import { formatTime, getUserLocation } from "../../../../helpers/APIs/formet";
import ProfileContainer from "../../ProfileContainer";
import SkillCard from "./SkillCard";
import { ProfileGigCards } from "../../../Gigs/SingleGig/ProfileGigCards";
import ReviewCard from "./ReviewCard";
import ProfileUpdating from "../ProfileUpdating/ProfileUpdating";
import PortfolioCard from "./PortfolioCard";
import LinkedAccounts from "./LinkingAccounts/LinkedAccounts";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from "swiper/modules";
import { Avatar, HStack } from "@/components/ui/migration-helpers";

// TypeScript interfaces
interface FreelancerProfileProps {
  viewAs?: boolean;
}

interface ProfileState {
  firstName: string;
  lastName: string;
  profile_image: string;
  professional_role: string;
  location: string;
  hourly_rate: number;
  description: string;
  skills: string[];
  experience: unknown[];
  education: unknown[];
  portfolio: unknown[];
  linked_accounts: unknown[];
  categories?: unknown[];
  user_id?: string;
}

interface RootState {
  profile: {
    profile: ProfileState;
  };
}

interface WorkHistoryItem {
  [key: string]: unknown;
}

interface AgencyDetails {
  agency_id?: string;
  agency_details?: {
    agency_name?: string;
    agency_profileImage?: string;
    agency_officeLocation?: {
      country?: string;
    };
    agency_verified?: boolean;
  };
  join_date?: string;
  leave_date?: string;
}

export const FreelancerProfile: React.FC<FreelancerProfileProps> = ({
  viewAs,
}) => {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [workHistory, setWorkHistory] = useState<WorkHistoryItem[]>([]);
  const [associateAgency, setAssociateAgency] = useState<AgencyDetails>({});
  const [type, setType] = useState<string>("");
  const [defaultValue, setDefaultValue] = useState<unknown>(null);
  const [isModal, setIsModal] = useState(false);
  const [localTime, setLocalTime] = useState<string>("");

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const profile = useSelector((state: RootState) => state.profile);
  const {
    firstName,
    lastName,
    profile_image,
    location,
    professional_role,
    hourly_rate,
    description,
    skills,
    experience,
    education,
    portfolio,
    user_id,
  } = profile.profile || {};

  const findWorkHistory = async (): Promise<void> => {
    try {
      const { code, body } = await getWorkHistory();
      if (code === 200) setWorkHistory(body);
    } catch (error) {
      console.error(error);
    }
  };

  const associatedAgency = async (): Promise<void> => {
    try {
      const { code, body } = await getAssociatedAgency();
      if (code === 200) setAssociateAgency(body);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentTimeAndLocation = async (): Promise<void> => {
    try {
      const currentDate = new Date();
      const currentTime = formatTime(currentDate);
      const location = await getUserLocation();
      setLocalTime(currentTime);
      console.log(
        `${location.latitude}, ${location.longitude} - ${currentTime} local time`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyProfileURL = (): void => {
    if (typeof window === "undefined" || !user_id) return;

    const profileURL = `${window.location.origin}/profile/f/${user_id}`;
    navigator.clipboard.writeText(profileURL);
    toast.success("Zeework Profile Copied.");
  };

  const openUpdatingModal = (type: string, data: unknown = null): void => {
    setDefaultValue(data);
    setType(type);
    setIsModal(true);
  };

  useEffect(() => {
    findWorkHistory();
    associatedAgency();

    const timer = setTimeout(() => {
      getCurrentTimeAndLocation();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ProfileContainer>
        <div className="w-[100%] justify-center m-auto flex flex-col gap-[24px]">
          <div className="w-[100%] bg-white flex items-center justify-between border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg max-sm:flex-col max-sm:gap-4">
            <div className="flex gap-[14px] items-center max-[380px]:gap-0">

                  const endDate = new Date(edu.end_date);
                  const startYear = startDate.getFullYear();
                  const endYear = endDate.getFullYear();

                  return (
                    <div className="flex flex-col gap-[8px]" key={index}>
                      <div className="flex items-center justify-between">
                        <p className="text-[16px] text-[#374151] font-[600]">
                          {edu?.institution}
                        </p>
                        <div className="flex items-center gap-[12px]">

                })}
            </div>

            {/* ==================== Experience ====================== */}
            <div className="flex flex-col gap-[24px] border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg  bg-white">
              <div className="flex items-center justify-between">
                <p className="text-[20px] text-[#374151] font-[600]">

                  const endDate = new Date(exp.end_date);
                  const startYear = startDate.getFullYear();
                  const endYear = endDate.getFullYear();
                  return (
                    <div className="flex flex-col gap-[8px]" key={index}>
                      <div className="flex items-center justify-between">
                        <p className="text-[16px] text-[#374151] font-[600]">
                          {exp?.company_name}
                        </p>
                        <div className="flex items-center gap-[12px]">

                })}
            </div>

            {/* ==================== Linking Accounts =================== */}
            <LinkedAccounts />
          </div>

          <div className="w-full lg:w-[70%] flex flex-col gap-[24px]">
            {/* ==================== Basic info ====================== */}
            <div className="flex flex-col gap-5  border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
              <div className="flex gap-[16px] justify-between">
                <p className="text-[20px] text-[#374151] font-[600] w-[100%]">
                  {professional_role}
                </p>

                <div className="flex gap-5">
                  <p className="text-[20px] text-[#374151] font-[600]">

                    }}
                  >
                    {showDetails ? "less" : "more"}
                  </button>
                )}
              </div>
            </div>
            {/* ===================== skills ============= */}
            <div className="flex flex-col gap-[24px]  border-[1px] py-8 px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">

                    }}
                  >
                    <BsPlus />
                  </div>
                )}
              </div>
              <div className="-z-0">
                {portfolio?.length ? (
                  <div className="relative">
                    <Swiper
                      modules={[Navigation]}
                      navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                      }}
                      spaceBetween={30}
                      breakpoints={{
                        768: {
                          slidesPerView: 2,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                      }}
                      pagination={{

                      }}
                    >
                      Add Portfolio For Attract Client & Get Offer
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* ==================== GIGS ====================== */}
            <div className="flex flex-col gap-[24px]  border-[1px] pt-[20px] px-[24px] border-[var(--bordersecondary)] rounded-lg bg-white">
              <div>
                <p className="text-[20px] text-[#374151] font-[600] pb-3">
                  {viewAs ? "Freelancer Gigs" : "Your Gigs"}
                </p>
                <hr />
                <br />
                <p className="mt-3">

};
