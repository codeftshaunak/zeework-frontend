import React from "react";
import {
  HStack,
  Card,
  Text,
  Box,
  Button,
  VStack,
  Image,
} from "@/components/ui/migration-helpers";
import { useRouter } from "next/navigation";
const data = [
  {
    id: 0,
    title: "Applications Sent",
    number: 20,
  },
  {
    id: 4,
    title: "Invitations Received",
    number: 20,
  },
  {
    id: 1,
    title: "Jobs Completed",
    number: 20,
  },
  {
    id: 2,
    title: "Total Hours Worked",
    number: 20,
  },
  {
    id: 3,
    title: "Gross Earnings",
    number: 20,
  },
];
const Adjustment = () => {
  const router = useRouter();

  return (
    <div className="relative">
      <h2 className="mt-10 mb-8 text-[25px] font-semibold">
        Further Information
      </h2>
      <div className="relative h-[25rem]">
        <div className="flex flex-row items-center spacing= h-[100%] max-sm:!hidden"4">
          {data.map((data, index) => (
            <Card
              key={index}
              backgroundColor="#F0FDF4"
            >
              <p className="font-semibold text-4xl mb-2">{data.number}</p>
              <p className="font-semibold text-lg capitalize">{data.title}</p>
            </Card>
          ))}
        </div>

        <div
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="100"
          background="rgba(255, 255, 255, 0.8)"
          backdropFilter="blur(10px)"
         className="h-[max-content] p-[2rem 0] rounded border absolute">
          <div className="flex flex-col spacing= w-[60%] max-md:!w-[80%]"4">
            <img src="./images/zeework_logo.png" />
            <span>
              Welcome to ZeeWork!
            </span>
            <span>
              We&apos;re excited to have you be a part of our brand new launch!
            </span>
            <span>
              Detailed reporting is coming shortly in further updates with the
              site. For anything you may require immediately for accounting
              purposes or otherwise, please feel free to ping our support
              department for a swift response.
            </span>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded"
              backgroundColor={"var(--primarycolor)"}
              _hover={{
                color: "var(--primarytext)",
                backgroundColor: "var(--secondarycolor)",
                border: "1px solid var(--primarytextcolor)",
              }}
              onClick={() => router.push("/help")}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adjustment;
