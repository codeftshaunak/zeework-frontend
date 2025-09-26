import LinkArrowIcon from "../../assets/icons/link-arrow";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const HomeFooter = () => {
  const router = useRouter();
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
                    onClick={() => router.push("/about")}
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
                    onClick={() => router.push("/contact")}
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
                    onClick={() => router.push("/about")}
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
                    onClick={() => router.push("/casestudies")}
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
                    onClick={() => router.push("/blog")}
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
                    onClick={() => router.push("/events")}
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
                    onClick={() => router.push("/communities")}
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
                    onClick={() => router.push("/onepager")}
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
                    onClick={() => router.push("/multipager")}
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
                    onClick={() => router.push("/ecommerce")}
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
                    onClick={() => router.push("/dynamiccontent")}
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
                    onClick={() => router.push("/privacy")}
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
                    onClick={() => router.push("/terms")}
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
                    onClick={() => router.push("/leadership")}
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
                    onClick={() => router.push("/team")}
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

export const MVPFooter = () => {
  const router = useRouter();
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
                    onClick={() => router.push("/about")}
                  >
                    About Us
                  </div>
                </div>

                <div className="justify-between items-start inline-flex">
                  <div
                    className="text-gray-700 text-lg  cursor-pointer"
                    onClick={() => router.push("/f")}
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
                    onClick={() => router.push("/contact")}
                  >
                    Contact Us
                  </div>
                </div>

                <div className="justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg  cursor-pointer"
                    onClick={() => router.push("/privacy")}
                  >
                    Privacy Policy
                  </div>
                </div>

                <div className="justify-between items-center inline-flex">
                  <div
                    className="text-gray-700 text-lg  cursor-pointer"
                    onClick={() => router.push("/terms")}
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

export const Footer = () => {
  return (
    <div>
      <div className="bg-[#F4FAF6] mt-5 text-[#575757] text-center">
        <div className="md:w-[85%] max-w-[1400px] mb-16 mx-[auto] p-6">
          <div className="grid lg:grid-cols-[1fr,1.5fr,1fr] md:grid-cols-2 grid-cols-1 gap-8">
            <div className="md:w-full">
              <img
                src="./images/zeework_logo.png"
                alt="ZeeWork"
                className="w-[250px] md:mx-left mx-auto"
              />
              <div className="my-4">
                <p className="w-fit text-[1.2rem] py-2 md:text-left">
                  ZeeWork is a market place helping connect clients and
                  freelancers to empower the future of work!
                </p>
                <div className="flex gap-4 text-[22px] py-3 flex-wrap max-[425px] justify-center md:justify-start">

                <Link href="/" target="_blank">
                <div className="text-[#35AD41] bg-white p-4 rounded-full">
                    <FaFacebookF className="text-[#35AD41] " />
                  </div>
                </Link>
    
                <Link href="/" target="_blank">
                <div className="text-[#35AD41] bg-white p-4 rounded-full">
                    <FaTwitter />
                  </div>
                </Link>

                <Link href="/" target="_blank">
                <div className="text-[#35AD41] bg-white p-4 rounded-full">
                    <FaLinkedinIn />
                  </div>
                </Link>
           
                  <Link href="https://www.instagram.com/zeeworkco/" target="_blank">
                  <div className="text-[#35AD41] bg-white p-4 rounded-full">
                    <FaInstagram />
                  </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* <div className="grid grid-cols-2 md:grid-cols-[1.5fr,1fr,1fr]"> */}
            <div className="flex w-full justify-center">
              <div>
                <h1 className="font-semibold text-[1.3rem] text-center md:text-start">
                  Quick Links
                </h1>
                <div className="my-3 flex flex-col gap-2">
                 
                  <Link href="/terms-conditions" className="text-[1.2rem]">
                    Terms & Conditions
                  </Link>
                  <Link href="/privacy-policy" className="text-[1.2rem] md:text-left">
                    Privacy Policy
                  </Link>
                </div>
              </div>

            
            </div>

            <div className="flex flex-col gap-8 w-[90%] sm:w-full">
              <h1 className="font-semibold text-[1.3rem] text-center md:text-start">
                Link Up
              </h1>
              <p className="text-sm font-medium text-center md:text-start">
                New product drops, discounts & promotions, contests & more
              </p>
              <div className="bg-white flex rounded-xl">
                <input
                  className="text-balck h-[44px] w-full bg-transparent p-4"
                  placeholder="Your email"
                />
                <Button variant="gradient" className="w-[124px] h-[44px] rounded-xl">
                  Subscribe
                </Button>
              </div>
              <h1 className="text-sm font-medium md:text-start">
                Sign up for the ZeeWork Newsletter
              </h1>
            </div>
          </div>

          <div className="flex my-3 items-center justify-between font-medium lg:flex-row flex-col">
            <p>© 2024 ZeeWork. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
