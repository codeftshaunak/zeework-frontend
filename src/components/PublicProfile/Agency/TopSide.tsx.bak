import { toaster } from "@/lib/providers";
import {
  HStack,
  Image,
  VStack,
  Text,
  Avatar,
} from "@chakra-ui/react";
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

    toaster.create({
      title: "Agency Profile Copied.",
      type: "success",
      duration: 3000,
    });
  };
  return (
    <>
      <VStack width={"100%"} position={"relative"}>
        <VStack width={"100%"} position={"relative"}>
          {agency_coverImage ? (
            <Image
              src={agency_coverImage}
              alt="cover image"
              className="shadow"
              height={{ base: "150px", md: "250px", lg: "350px" }}
              width={"100%"}
              objectFit={"cover"}
              filter={"brightness(80%)"}
              borderRadius={"20px"}
            />
          ) : (
            <Image
              src="/images/zeework_agency_cover.png"
              alt="cover image"
              className="shadow"
              height={{ base: "150px", md: "250px", lg: "350px" }}
              width={"100%"}
              objectFit={"cover"}
              filter={"brightness(80%)"}
              borderRadius={"10px"}
            />
          )}
        </VStack>

        <AgencyBodyLayout>
          <HStack
            display={{ base: "grid", md: "flex" }}
            justifyContent={"space-between"}
            width={"100%"}
            padding={{ base: "0px", lg: "10px" }}
          >
            <HStack width={"100%"}>
              <Avatar
                src={agency_profileImage}
                name={agency_name}
                width={{ base: "70px", md: "80px", lg: "100px" }}
                height={{ base: "70px", md: "80px", lg: "100px" }}
                borderRadius={"10px"}
              />

              <VStack
                alignItems={"flex-start"}
                lineHeight={"1.3rem"}
                marginLeft={"1.1rem"}
              >
                {" "}
                <Text
                  fontSize={{ base: "1.5rem", md: "1.7rem", lg: "2rem" }}
                  fontWeight={"600"}
                >
                  {agency_name}
                </Text>
                <Text fontSize={{ base: "1rem", md: "1.1rem" }}>
                  {agency_tagline}
                </Text>
              </VStack>
            </HStack>
          </HStack>
          <HStack>
            <div
              className="flex items-center cursor-pointer justify-center w-[36px] h-[36px] bg-[#F9FAFB] rounded-[6px] border-[1px] border-[var(--bordersecondary)]"
              onClick={handleCopyProfileURL}
            >
              <BsLink45Deg width={"20px"} height={"20px"} />
            </div>
          </HStack>
        </AgencyBodyLayout>
      </VStack>
    </>
  );
};

export default TopSide;
