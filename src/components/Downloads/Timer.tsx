"use client";

import { useEffect, useState } from "react";
import { Button, Image, useToast } from "@chakra-ui/react";

const Timer = () => {
  const [downloadLink, setDownloadLink] = useState("");
  const [platformText, setPlatformText] = useState("");

  const desktopApp = process.env.NEXT_PUBLIC_WINDOWS_TIMER_URL || '';
  const macApp = process.env.NEXT_PUBLIC_MAC_TIMER_URL || '';
  const appVersion = process.env.NEXT_PUBLIC_TIMER_VERSION || "0.0.0";

  const toast = useToast();

  useEffect(() => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes("win")) {
      setDownloadLink(desktopApp);
      setPlatformText("Windows");
    } else if (platform.includes("mac")) {
      setDownloadLink(macApp);
      setPlatformText("macOS");
    } else {
      setDownloadLink("");
      setPlatformText("your current platform");
    }
  }, [desktopApp, macApp]);

  const handleDownload = () => {
    if (downloadLink) {
      window.location.href = downloadLink;
    } else {
      toast({
        title: "Sorry, the timer is not available for your current platform.",
        status: "info",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <div className="grid sm:grid-cols-2 w-full rounded-md sm:rounded-2xl overflow-hidden">
      <div className="col-span-1 w-full bg-purple-100 p-5 lg:p-10">
        <p className="text-3xl sm:text-4xl lg:text-5xl text-gray-700 font-semibold font-poppins tracking-wide">
          Get{" "}
          <span className="font-bold">
            Zee<span className="text-primary">Work</span>
          </span>{" "}
          Timer
        </p>
        <p className=" mt-3 text-3xl sm:text-4xl lg:text-5xl text-gray-700 font-semibold font-poppins tracking-wide">
          for Your {platformText}
        </p>
        <p className="mt-5 sm:mt-10 font-medium text-lg tracking-wide font-redHat">
          Track your time for hourly contracts. Stay connected with your work.
        </p>
        <div className="mt-6 sm:mt-10 flex flex-col lg:flex-row items-center gap-3 lg:gap-10">
          <select
            placeholder="Select version"
            className="bg-white p-2 rounded w-full lg:w-[250px]"
            disabled
          >
            <option value={appVersion}>Version {appVersion}</option>
          </select>
          <Button
            colorScheme="primary"
            rounded={"full"}
            paddingX={{ base: 10, md: 16 }}
            onClick={handleDownload}
            disabled={!downloadLink}
            className="w-full lg:w-fit"
          >
            Download
          </Button>
        </div>
        <p className="text-lg font-semibold mt-3">
          Download for {platformText}
        </p>
        <p className="text-gray-600 font-semibold mt-5">
          [ <span className="text-red-500">*</span>Before installing the new
          version, please uninstall any older versions of the desktop app. ]
        </p>
      </div>
      <div className="col-span-1 bg-gray-300 w-full flex justify-center items-end p-5 pb-0 sm:pt-10 md:pt-14">
        <Image
          src="/images/timer_preview.png"
          width={"350px"}
          height={"fit-content"}
        />
      </div>
    </div>
  );
};

export default Timer;
