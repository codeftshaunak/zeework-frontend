import Image from "next/image";
import LinkArrowIcon from "../../assets/icons/link-arrow";
import { Link, useRouter } from "next/navigation";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export 
  return (
    <div>
      <div className="bg-green-50 mt-20 py-[2.62rem]">
        <div className="max-w-[1300px] mx-auto">
          <div className="w-[1300px] h-[253px] flex-col justify-start items-start gap-9 inline-flex">
            <div className="w-[1300px]">
              <span className="text-black text-5xl font-['SF Pro']">
                Important{" "}
              </span>
              <span className="text-green-600 text-5xl font-['SF Pro']">
                links
              </span>
              <span className="text-black text-5xl font-['SF Pro']">.</span>
            </div>
            <div className="justify-start items-start gap-5 inline-flex">
              <div className="h-40 flex-col justify-between items-start inline-flex">
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push("/")}
                  >
                    Home
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    About
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    Contact Us
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    About
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
              </div>
              <div className="h-40 flex-col justify-between items-start inline-flex">
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    Casestudies
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    Blogs
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    Events
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    Community
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
              </div>
              <div className="h-40 flex-col justify-between items-start inline-flex">
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    One Pager
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    Multi Pager
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    E-commerce Pages
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    Dynamic Content Pages
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
              </div>
              <div className="h-40 flex-col justify-between items-start inline-flex">
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    Privacy
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    Terms & Conditions
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    Leadership
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
                <div className="w-[310px] justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg font-normal font-['Lato'] cursor-pointer"
                    onClick={() => router.push()}
                  >
                    Team
                  </div>
                  <div className="w-5 h-5 relative">
                    <LinkArrowIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-600">
        <div className="w-[1300px] mx-auto px-2 py-[13px] text-center">
          <div className="text-white text-base font-normal font-['Lato'] leading-tight">
            ZeeWork © 2023. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export 
  return (
    <div>
      <div className="bg-green-50 py-[2.62rem]">
        <div className="max-w-[1300px] mx-auto">
          <div className="w-[1300px] h-[23px] flex-col justify-start items-start gap-9 inline-flex">
            <div className="flex justify-between w-full items-center">
              <img src="/images/zeework_logo.png" className="w-[150px]" alt="ZeeWork Logo" />

              <div className="w-3/4 flex items-center justify-between">
                <div className="justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg f cursor-pointer"
                    onClick={() => router.push()}
                  >
                    About Us
                  </div>
                </div>

                <div className="justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg  cursor-pointer"
                    onClick={() => router.push("/")}
                  >
                    Facebook
                  </div>
                </div>

                <div className="justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg  cursor-pointer"
                    onClick={() => router.push("/")}
                  >
                    Facebook
                  </div>
                </div>

                <div className="justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg  cursor-pointer"
                    onClick={() => router.push()}
                  >
                    Contact Us
                  </div>
                </div>

                <div className="justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg  cursor-pointer"
                    onClick={() => router.push()}
                  >
                    Privacy Policy
                  </div>
                </div>

                <div className="justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg  cursor-pointer"
                    onClick={() => router.push()}
                  >
                    Terms of Service
                  </div>
                </div>
                <div className="text-gray-700 text-base leading-tight">
                  ZeeWork © 2023. All Rights Reserved
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='bg-green-600'>
                <div className='w-[1300px] mx-auto px-2 py-[13px] text-center'>
                    <div className="text-white text-base font-normal font-['Lato'] leading-tight">
                        ZeeWork © 2023. All Rights Reserved
                    </div>
                </div>
            </div> */}
    </div>
  );
};

export 
};
