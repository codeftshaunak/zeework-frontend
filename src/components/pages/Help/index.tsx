
"use client";
import React from "react";
import Image from "next/image";

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import CTAButton from "../../CTAButton";
import Faqs from "../../HomeComponent/Faqs/Faqs";
import HomeLayout from "../../Layouts/HomeLayout";

const Introduction = () => {
  return (
    <div className="w-full bg-white p-5 sm:p-10 rounded-xl">
      <h1 className="text-3xl sm:text-5xl text-left font-semibold mb-8">
        Introducing ZeeWork: The Future of Freelancer Marketplaces
      </h1>
      <div className="max-w-full overflow-hidden text-justify">
        <p className="mb-4">{`In the dynamic landscape of freelance work, where talent knows no bounds and opportunities span the globe, ZeeWork emerges as a beacon of fairness and innovation. ZeeWork isn&apos;t just another freelancer marketplace; it's a visionary platform meticulously crafted to revolutionize the way businesses connect with freelance talent, fostering growth and success for both parties involved.`}</p>
        <p className="mb-4">{`At the heart of ZeeWork&apos;s ethos lies a commitment to fairness. Unlike traditional platforms that often prioritize profit margins over the well-being of freelancers and clients, ZeeWork is driven by the belief that every individual deserves equitable treatment and opportunities. Here, fairness isn't just a buzzword; it's the guiding principle that shapes every aspect of the platform's operation.`}</p>
        <p className="mb-4">
          {`In a rapidly evolving global economy, emerging businesses often face daunting challenges in accessing top-tier talent. ZeeWork bridges this gap by providing a curated marketplace where these businesses can find and engage with the most talented freelancers from around the world. Whether it's a burgeoning startup in Silicon Valley or a visionary entrepreneur in Southeast Asia, ZeeWork ensures that every business, regardless of size or location, has access to the expertise it needs to thrive.`}
        </p>
        <p className="mb-4">{`In a world where the gig economy is rapidly becoming the new normal, ZeeWork stands out as a beacon of integrity, empowerment, and opportunity. By championing fairness, fostering growth, and connecting talent with ambition, ZeeWork is not just shaping the future of freelance work—it's defining it. Join us on this transformative journey and experience the difference that fairness can make. Welcome to ZeeWork, where the future of freelancing begins.`}</p>
      </div>
    </div>
  );
};

const Career = () => {
  return (
    <div className="w-full bg-white p-5 sm:p-10 rounded-xl">
      <h1 className="text-3xl sm:text-5xl text-left font-semibold mb-8">
        Careers
      </h1>
      <div className="max-w-full overflow-hidden text-justify">
        <p className="mb-4">
          {`Interested in working with ZeeWork? We&apos;d be delighted to talk! We&apos;re building the Future of Work with the worlds fastest growing freelance platform. We're always on the lookout for developers, creators, marketers, community leaders and general go-getters.`}{" "}
          <br /> <br /> Looking to join a team with global aspirations? <br />{" "}
          Get in touch - <a href="mailto:info@zeework.com">info@zeework.com</a>
        </p>
      </div>
    </div>
  );
};

const SocialMedia = () => {
  return (
    <div className="w-full sm:mr-10 bg-white rounded-xl">
      <Image
        src="./images/social_work.jpg"
        alt="cover image"
        filter={"brightness(100%)"}
        className="shadow-lg w-full rounded mb-[30px]"
      />
      <div className="flex justify-evenly sm:pt-5 text-3xl sm:text-4xl md:text-5xl text-gray-200">
        <FaFacebook className="cursor-pointer" />
        <FaInstagram className="cursor-pointer" />
        <FaLinkedin className="cursor-pointer" />
        <FaXTwitter className="cursor-pointer" />
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="w-full bg-white mb-10 sm:mb-0 sm:ml-10 rounded-xl">
      <div>
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          Contact Us
        </h1>
      </div>
      <div className="mx-auto">
        <div className="flex flex-wrap items-center -m-2">
          <div className="p-2 w-full sm:w-1/2">
            <div className="relative">
              <label htmlFor="name" className="leading-8 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-green-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-full sm:w-1/2">
            <div className="relative">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-green-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-full">
            <div className="relative w-full">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-600"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-green-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
          </div>
          <div className="p-2 w-full">
            <CTAButton
              text="Send Request"
            ></CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const Help = () => {
  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 sm:mt-10 pb-12 w-full">
        <img
          src="./images/help_banner.png"
          alt="cover image"
          className="shadow bg-cover w-full rounded mt-[2rem]"
          style={{objectFit: "cover", filter: "brightness(100%)"}}
        />
        <div className="flex gap-10 w-full flex-wrap">
          <div className="w-full">
            <Introduction />
          </div>
          <div className="w-[100%]">
            <Faqs />
          </div>
        </div>
        <div className="flex w-full">
          <Career />
        </div>
        <div className="flex flex-col-reverse md:flex-row w-full bg-white p-5 sm:p-10 rounded-xl">
          <SocialMedia />

          <div className="bg-gray-200 w-[2px]"></div>
          <Contact />
        </div>
      </div>
    </HomeLayout>
  );
};

export default Help;
