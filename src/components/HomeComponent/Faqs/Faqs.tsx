"use client";

import React from "react";
import { useState } from "react";
import {
  Accordion,
} from "@/components/ui/migration-helpers";
import { FaPlus } from "react-icons/fa";
import { FaSquareMinus } from "react-icons/fa6";
const accordionData1 = [
  {
    title: "How does the Zeework work?",
    content:
      "Zeework serves as a marketplace connecting freelancers with clients seeking various services. Freelancers create profiles showcasing their skills and experience, while clients post projects they need assistance with. Freelancers can then browse available projects and submit proposals, and clients can review these proposals and hire the freelancer they believe is the best fit for their project.",
  },
  {
    title: "What kind of services can I find on the platform?",
    content:
      "The platform hosts a wide range of services across various industries, including but not limited to graphic design, writing and editing, web development, marketing, translation, and administrative support. Whether you're looking for someone to design a logo, write content for your website, or develop a mobile app, you can likely find a skilled freelancer on the platform to help.",
  },
  {
    title: "How do I ensure quality and reliability when hiring freelancers?",
    content:
      "The platform provides several features to help clients find reliable and high-quality freelancers. These include detailed freelancer profiles with reviews and ratings from previous clients, portfolios showcasing past work, and the ability to communicate with freelancers before hiring them to discuss project details and ensure they're the right fit for the job.",
  },
];
const accordionData2 = [
  {
    title: "What measures are in place to ensure payment security?",
    content:
      "The platform offers secure payment systems to protect both clients and freelancers. Clients typically fund projects upfront, and payments are held securely in escrow until the project is completed and approved by the client. This helps prevent payment disputes and ensures that freelancers are compensated for their work.",
  },
  {
    title: "Are there any fees associated with using the platform?",
    content:
      "While signing up and creating a profile on the platform is usually free for freelancers, the platform may charge a service fee or commission on completed projects to cover operational costs. Clients may also be charged a small fee for posting projects or utilizing premium features such as recruiting assistance or prioritized support.",
  },
  {
    title: "What if I encounter issues or disputes during a project?",
    content:
      "The platform provides support and mediation services to help resolve any issues or disputes that may arise during a project. This includes assistance with communication between clients and freelancers, guidance on project management best practices, and intervention in cases of non-payment or breaches of contract to ensure a fair resolution for both parties.",
  },
];
const Faqs = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [expanded2ndIndex, set2ndExpandedIndex] = useState<number | null>(null);
  const toggleAccordion = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
  const toggle2ndAccordion = (index: number) => {
    set2ndExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
  return (
    <section className="bg-[#DCFCE7] rounded-xl">
      <div className="py-10 sm:py-16 md:w-[85%] w-[90%] max-w-[1200px] mx-[auto]">
        <h1 className="sm:text-[42px] text-[24px] font-geist-extra text-center font-semibold mb-4">
          Frequently Asked <span className="text-primary">Questions</span>
        </h1>
        <h5 className="sm:text-[20px] text-[16px] font-poppins text-center font-medium">
          Got a question about the platform? Check below!
        </h5>
        <div className="flex max-lg:flex-col justify-between lg:gap-10 mt-4">
          <Accordion.Root
            defaultValue={["0"]}
            multiple
            className="lg:my-4 my-1 flex flex-col gap-5 basis-[50%]"
          >
            {accordionData1.map((item, index) => (
              <Accordion.Item
                key={index}
                value={index.toString()}
                className="rounded-2xl max-[480px]:px-3 px-12 py-4 mb-2 bg-white border-0"
              >
                <h2>
                  <Accordion.ItemTrigger
                    onClick={() => toggleAccordion(index)}
                    _hover={{ bg: "none", color: "inherit" }}
                    className="hover:cursor-pointer"
                    px={0}
                  >
                    <span className="flex-1 text-left text-lg font-poppins font-medium proxima-nova max-[480px]:text-sm">
                      {item.title}
                    </span>
                    {expandedIndex === index ? (
                      <FaSquareMinus className="text-[30px] text-primary" />
                    ) : (
                      <div className="bg-[#F7F7FF] border border-transparent rounded-md w-[26px] h-[26px] flex items-center justify-center">
                        <FaPlus className="text-[16px]" />
                      </div>
                    )}
                  </Accordion.ItemTrigger>
                </h2>
                <Accordion.ItemContent
                  pb={4}
                  className="text-[16px] font-medium font-poppins max-w-[514px] !ps-0 max-[480px]:text-xs"
                >
                  {item.content}
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
          <Accordion.Root
            multiple
            className="lg:my-4 my-1 flex flex-col gap-5 basis-[50%]"
          >
            {accordionData2.map((item, index) => (
              <Accordion.Item
                key={index}
                value={index.toString()}
                className="rounded-2xl px-12 py-4 max-[480px]:px-2 bg-white border-0"
              >
                <h2>
                  <Accordion.ItemTrigger
                    onClick={() => toggle2ndAccordion(index)}
                    _hover={{ bg: "none", color: "inherit" }}
                    px={0}
                    className="hover:cursor-pointer"
                  >
                    <span className="flex-1 text-left text-lg font-poppins font-medium proxima-nova max-[480px]:text-sm">
                      {item.title}
                    </span>
                    {expanded2ndIndex === index ? (
                      <FaSquareMinus className="text-[30px] text-primary" />
                    ) : (
                      <div className="bg-[#F7F7FF] border border-transparent rounded-md w-[26px] h-[26px] flex items-center justify-center">
                        <FaPlus className="text-[16px]" />
                      </div>
                    )}
                  </Accordion.ItemTrigger>
                </h2>
                <Accordion.ItemContent
                  pb={4}
                  className="text-[16px] font-medium font-poppins max-w-[514px] !ps-0 max-[480px]:text-xs"
                >
                  {item.content}
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
