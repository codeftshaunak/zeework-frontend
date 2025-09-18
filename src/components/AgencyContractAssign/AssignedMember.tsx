"use client";

import { Avatar, Box, Button, Text, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { MainButtonRounded } from "../Button/MainButton";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useNavigate } from "next/navigation";
import UniversalModal from "../Modals/UniversalModal";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { MdRemoveModerator } from "react-icons/md";
import { endContractOfFreelancer } from "../../helpers/APIs/agencyApis";

const AssignedMember = ({ member, contract_ref, setJobDetails }) => {
  const [isMenu, setIsMenu] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    first_name,
    last_name,
    profile_image,
    professional_role,
    freelancer_id,
    _id,
  } = member || {};
  const router = useRouter();
  const toast = useToast();

  const handleEndContract = async () => {
    setIsLoading(true);
    try {
      const { message, code, body, msg } = await endContractOfFreelancer({
        contract_ref,
        freelancer_id,
        assigned_id: _id,
      });

      if (code === 200) setJobDetails((prev) => ({ ...prev, ...body }));

      toast({
        title: msg || message,
        status: code === 200 ? "success" : "warning",
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

  return (
    <>
      <VStack
        marginTop={"10px"}
        padding={4}
        className="shadow border p-4 rounded-md"
        lineHeight={"20px"}
        position={"relative"}
        width={"300px"}
        bgColor={"white"}
        justifyContent={"space-between"}
      >
        <Box textAlign={"center"}>
          <Avatar
            src={profile_image}
            name={first_name + " " + first_name}
            size={"lg"}
          />
          <Text fontSize={"1.4rem"} fontWeight={"semibold"} mt={2}>
            {first_name + " " + last_name}
          </Text>
          <Text
            fontSize={"0.9rem"}
            textAlign={"center"}
            overflow={"hidden"}
            width={"100%"}
            my={1}
          >
            {professional_role}
          </Text>
        </Box>
        <MainButtonRounded
          onClick={() => router.push(`/profile/f/${freelancer_id}`)}
        >
          View Profile
        </MainButtonRounded>

        <Box>
          <BiDotsVerticalRounded
            className="absolute top-1 left-1 text-2xl text-gray-400 rounded-full bg-slate-100 hover:bg-slate-300 transition cursor-pointer z-0"
            onClick={() => setIsMenu(!isMenu)}
          />
        </Box>
        {isMenu && (
          <div
            className="bg-black/5 w-full h-full absolute top-0 left-0"
            onClick={() => setIsMenu(!isMenu)}
          >
            <div className="absolute left-1 top-8 p-2 shadow bg-white rounded">
              <div
                className="px-3 py-1 hover:bg-gray-200/20 rounded cursor-pointer transition"
                onClick={() => setIsMenu(false)}
              >
                Pause
              </div>
              <div
                className="px-3 py-1 hover:bg-gray-200/20 rounded cursor-pointer transition"
                onClick={() => {
                  setIsModal(true), setIsMenu(false);
                }}
              >
                End
              </div>
            </div>
          </div>
        )}
      </VStack>

      <UniversalModal isModal={isModal} setIsModal={setIsModal}>
        <div className="w-[72px] h-[72px] flex items-center justify-center bg-green-50 rounded-full mx-auto">
          <MdRemoveModerator className="text-4xl text-primary" />
        </div>
        <p className="text-xl font-semibold text-center">
          Are you sure you want to end contract of{" "}
          <span className="font-bold">{first_name + " " + last_name}</span>?
        </p>
        <div className="flex gap-5 sm:gap-10 mt-4 sm:mt-10">
          <Button
            colorScheme="primary"
            variant={"outline"}
            width={"full"}
            onClick={() => setIsModal(false)}
          >
            No, I don&apos;t want
          </Button>
          <Button
            isLoading={isLoading}
            loadingText="Yes, I want to assign"
            colorScheme="primary"
            width={"full"}
            spinner={<BtnSpinner />}
            onClick={() => handleEndContract()}
          >
            End Contract
          </Button>
        </div>
      </UniversalModal>
    </>
  );
};

export default AssignedMember;
