"use client";

import {
  Avatar,
  Badge,
  Box,
  Button,
  HStack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "next/navigation";
import { removedAgencyMember } from "../../helpers/APIs/agencyApis";
import { MainButtonRounded } from "../Button/MainButton";
import UniversalModal from "../Modals/UniversalModal";
import BtnSpinner from "../Skeletons/BtnSpinner";

export const AgencyManagerCard = () => {
  const profile = useSelector((state: any) => state.profile);
  const { lastName, firstName, profile_image, professional_role } =
    profile.profile || [];
  return (
    <VStack
      marginTop={{ base: "0px", md: "10px" }}
      className="shadow border p-4 sm:p-6 rounded-md"
      lineHeight={"20px"}
      position={"relative"}
      maxWidth={"300px"}
    >
      {/* {profile_image ? (
        <Image src={profile_image} width={"90px"} borderRadius={"50%"} />
      ) : (
        <Avatar name={firstName + " " + lastName} />
      )} */}
      <Avatar
        src={profile_image}
        name={firstName + " " + lastName}
        size={"lg"}
      />
      <Text fontSize={{ base: "1.1rem", md: "1.4rem" }} fontWeight={"semibold"}>
        {firstName + " " + lastName}
      </Text>
      <Text fontSize={"1rem"} textAlign={"center"}>
        {professional_role}
      </Text>
      <Badge
        variant="solid"
        colorScheme="green"
        position={"absolute"}
        right={"10px"}
        top={"10px"}
      >
        Manager
      </Badge>
    </VStack>
  );
};

export const AgencyFreelancerCard = ({ details, setRemainingMembers }) => {
  const [isMenu, setIsMenu] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const selectMenuRef = useRef(null);

  const { member_position } = details || [];
  const freelancerDetails =
    details?.freelancer_details?.length > 0
      ? details?.freelancer_details[0]
      : [];
  const {
    profile_image,
    firstName,
    lastName,
    professional_role,
    skills,
    categories,
    sub_categories,
    hourly_rate,
    user_id,
  } = freelancerDetails || [];

  const handleClick = (id) => {
    router.push(`/profile/f/${id}`);
  };

  // const customStyles = {
  //   content: {
  //     top: "50%",
  //     left: "50%",
  //     right: "auto",
  //     bottom: "auto",
  //     marginRight: "-50%",
  //     transform: "translate(-50%, -50%)",
  //     width: "850px",
  //   },
  // };

  // handle removed freelancers
  const handleRemoved = async () => {
    setIsLoading(true);
    try {
      const { code, msg } = await removedAgencyMember({
        member_id: user_id,
        status: "removed",
      });

      if (code === 200)
        setRemainingMembers((prevInvitations) =>
          prevInvitations.filter(
            (invitation) =>
              invitation.freelancer_details?.[0]?.user_id !== user_id
          )
        );

      toast({
        title: msg,
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    setIsModal(false);
  };

  // handle close select option when click on outside
  const handleClickOutside = (event) => {
    event.stopPropagation();
    if (
      selectMenuRef.current &&
      !selectMenuRef.current.contains(event.target)
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
      <VStack
        marginTop={"10px"}
        paddingY={"25px"}
        className="shadow border p-4 rounded-md"
        lineHeight={"20px"}
        position={"relative"}
        width={"300px"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"3"}
      >
        <Avatar
          src={profile_image}
          name={firstName + " " + lastName}
          size={"lg"}
          marginTop={"30px"}
        />
        <Text fontSize={"1.3rem"} fontWeight={"semibold"}>
          {firstName + " " + lastName}
        </Text>
        <Text
          fontSize={"1rem"}
          textAlign={"center"}
          overflow={"hidden"}
          width={"100%"}
        >
          {professional_role.length > 34
            ? professional_role.slice(0, 34)
            : professional_role}
        </Text>
        <Badge
          variant="solid"
          colorScheme="green"
          position={"absolute"}
          right={"10px"}
          top={"10px"}
        >
          {member_position?.length > 50
            ? member_position.slice(0, 50) + "..."
            : member_position}
        </Badge>
        <MainButtonRounded onClick={() => handleClick(user_id)}>
          Visit Profile
        </MainButtonRounded>
        <Box>
          <BiDotsVerticalRounded
            className="absolute top-1 left-1 text-2xl text-gray-400 rounded-full bg-slate-100 hover:bg-slate-300 transition cursor-pointer z-0"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenu(!isMenu);
            }}
          />
        </Box>
        {isMenu && (
          <div
            className="bg-black/5 w-full h-full absolute top-0 left-0"
            onClick={() => setIsMenu(false)}
            ref={selectMenuRef}
          >
            <div className="absolute left-1 top-8 p-2 shadow bg-white rounded">
              <div
                className="px-3 py-1 hover:bg-gray-200/20 rounded cursor-pointer transition"
                onClick={() => setIsMenu(false)}
              >
                Block
              </div>
              <div
                className="px-3 py-1 hover:bg-gray-200/20 rounded cursor-pointer transition"
                onClick={() => {
                  setIsModal(true), setIsMenu(false);
                }}
              >
                Remove
              </div>
            </div>
          </div>
        )}
      </VStack>

      {isModal && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          title="Freelancer Details"
          size="3xl"
        >
          <div className="flex gap-8 items-center">
            <div className="w-[150px] h-[150px]">
              <Avatar
                name={firstName + " " + lastName}
                src={profile_image}
                width={"130px"}
                height={"130px"}
                borderRadius={"50%"}
                fontSize={"3rem"}
                objectFit={"cover"}
              />
            </div>
            <div className="w-full space-y-2 ">
              <div className="flex justify-between ">
                <div className="flex gap-3">
                  <div>
                    <HStack>
                      <h2 className="text-2xl font-semibold text-fg-brand">
                        {firstName} {lastName}
                      </h2>
                      <Button
                        colorScheme="#22C35E"
                        variant="outline"
                        size={"xs"}
                        color={"#22C35E"}
                        marginLeft={"0.8rem"}
                        height={"18px"}
                      >
                        Available now
                      </Button>
                    </HStack>

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

              <div className="w-full space-y-2 ">
                <div className="flex justify-between ">
                  <div className="flex gap-3">
                    <div>
                      <p className="font-bold">Professional At.</p>
                      <h3 className="mb-2">{categories[0]?.value}</h3>
                      {sub_categories?.map((subcat, index) => (
                        <h4
                          key={index}
                          className="text-sm pl-1 ml-1 border-l border-gray-300 mb-2"
                        >
                          {subcat?.value}
                        </h4>
                      ))}
                      <div className="flex flex-wrap pl-1 ml-1 border-l border-gray-300">
                        {skills
                          ? skills?.length > 6
                            ? skills.slice(0, 6).map((skill, index) => (
                                <h4
                                  key={index}
                                  className="text-sm border mr-[5px] bg-[#5d8586] px-3 py-1 text-white rounded-2xl cursor-pointer"
                                >
                                  {skill}
                                </h4>
                              ))
                            : skills.map((skill, index) => (
                                <h4
                                  key={index}
                                  className="text-sm border mr-[5px] bg-[#5d8586] px-3 py-1 text-white rounded-2xl cursor-pointer"
                                >
                                  {skill}
                                </h4>
                              ))
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="w-full space-y-2 ">
                <div className="flex justify-between ">
                  <div className="flex gap-3 w-full">
                    <div className="w-full">
                      <p className="font-bold mb-1">
                        Freelancer role to your agency
                      </p>
                      <p className="capitalize">
                        {member_position?.length > 50
                          ? member_position.slice(0, 50) + "..."
                          : member_position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-5 pt-6">
                <Button
                  isLoading={isLoading}
                  loadingText="Removing"
                  colorScheme="primary"
                  type="submit"
                  spinner={<BtnSpinner />}
                  onClick={handleRemoved}
                  rounded="full"
                  paddingX={10}
                >
                  Remove
                </Button>
                <Button
                  onClick={() => {
                    setIsModal(false);
                  }}
                  variant="outline"
                  colorScheme="primary"
                  rounded="full"
                  paddingX={10}
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
