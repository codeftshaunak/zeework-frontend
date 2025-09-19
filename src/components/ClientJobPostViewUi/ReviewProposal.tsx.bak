"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Stack,
  Tabs,
  
  
  
  
  
  Avatar,
  StackDivider,
  AvatarBadge,
} from "@chakra-ui/react";
import { toaster } from "@/lib/providers";
import { useRouter, usePathname } from "next/navigation";
import { useContext, useState } from "react";
import UniversalModal from "../Modals/UniversalModal";
import { getAgencyById } from "../../helpers/APIs/agencyApis";
import ReviewProposalSkeleton from "../Skeletons/ReviewProposalSkeleton";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { MdPayment } from "react-icons/md";
import { getFreelancerById } from "../../helpers/APIs/freelancerApis";
import { FaLocationDot } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { SocketContext } from "../../contexts/SocketContext";
import { sendJobInvitation } from "../../helpers/APIs/clientApis";
import { clearMessageState } from "../../redux/messageSlice/messageSlice";
import { useDispatch } from "react-redux";
import ErrorMsg from "../utils/Error/ErrorMsg";
import AddPaymentNotifyModal from "../Modals/AddPaymentNotifyModal";

export const ReviewProposal = ({ proposals, isProposalsLoading }) => {
  const { profile } = useContext(CurrentUserContext);
  const [paymentModal, setPaymentModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const pathname = usePathname();
  const jobDetails = location.state && location.state.jobDetails;
  const [open, setOpen] = useState(false);
  const [msgIsOpen, setMsgIsOpen] = useState(null);
  const [hireProfile, setHireProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSend = async () => {
    const { user_id, applied_by } = hireProfile;
    setIsLoading(true);
    try {
      const { body, code } =
        applied_by === "freelancer"
          ? await getFreelancerById(user_id)
          : await getAgencyById(user_id);

      if (code === 200) {
        const {
          firstName,
          lastName,
          professional_role,
          profile_image,
          hourly_rate,
          agency_name,
          agency_profileImage,
          agency_hourlyRate,
          user_id,
          _id,
        } = body;

        router.push(
          `/client/hire?job=${jobDetails._id}&${
            applied_by === "freelancer"
              ? `freelancer=${user_id}`
              : `agency=${_id}`
          }`
        );
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    setOpen(false);
    setHireProfile(null);
  };

  // send interview request
  const handleInterviewRequest = async (data) => {
    setIsLoading(true);
    try {
      let res = await sendJobInvitation({
        receiver_id: hireProfile.user_id,
        message: data.message,
        job_id: hireProfile.job_id,
        offer_to: hireProfile.applied_by,
      });

      if (res.code == 200) {
        if (socket && profile.profile.user_id) {
          socket.emit(
            "card_message",
            {
              sender_id: profile.profile.user_id,
              receiver_id: hireProfile.user_id,
              message: data.message,
              message_type: "invitation",
              contract_ref: res.body?.job_invite_id,
            },
            {
              title: jobDetails.title,
              type: "job_invitation",
              job_type: jobDetails.job_type,
              amount: jobDetails.amount,
              url: {
                freelancer: `/message/invitation?job_id=${jobDetails._id}&invite_id=${res.body?.job_invite_id}`,
                client: `/client-jobDetails/${jobDetails._id}`,
              },
            }
          );
        }
        dispatch(clearMessageState());
      }

      toaster.create({
        title: res.msg || res.response.data.msg,
        status: res.code === 200 ? "success" : "warning",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toaster.create({
        title: error.response.data.msg,
        type: "warning",
        duration: 2000,
      });
    }
    setMsgIsOpen(false);
    reset();
    setIsLoading(false);
    setHireProfile({});
  };

  const handleHireReq = (item) => {
    // check client payment status
    setPaymentModal(!profile?.profile?.payment_verified);
    if (profile?.profile?.payment_verified) setHireProfile(item), setOpen(true);
  };

  return (
    <>
      <Box className="flex flex-col gap-8 md:flex-row w-full">
        <Box className="overflow-hidden border rounded-lg basis-full bg-white">
          <Tabs.Root onChange={(index) => setTabIndex(index)} variant="unstyled">
            <Tabs.List className="px-6 pt-4 border-b">
              <Tabs.Trigger className="px-0 text-black">All Proposals</Tabs.Trigger>
              {/* <Tab>Messaged</Tabs.Trigger> */}
            </Tabs.List>
            <Tabs.Indicator
              height="2px"
              borderRadius="1px"
              color={"#000"}
              className=" bg-fg-brand"
            />
            <Tabs.Content width={"100%"}>
              <Tabs.Content p={0} width={"100%"}>
                {isProposalsLoading ? (
                  <Box padding={3}>
                    <ReviewProposalSkeleton />
                  </Box>
                ) : proposals?.length ? (
                  <VStack
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={4}
                    align="stretch"
                    bgColor={"#fafafa"}
                    padding={{ base: 5, sm: 8 }}
                  >
                    {proposals?.map((item, index) => {
                      const details = item.user_details;

                      return (
                        <VStack
                          key={index}
                          className="h-auto w-full shadow-md p-4 sm:p-6 rounded-md"
                          justifyContent={"start"}
                          bgColor={"#ffff"}
                          width={"100%"}
                        >
                          <VStack width={{ base: "100%", sm: "95%" }}>
                            <HStack
                              justifyContent={"space-between"}
                              width={"100%"}
                              alignItems={"start"}
                            >
                              <Box className="w-full sm:w-auto">
                                <Avatar
                                  cursor={"pointer"}
                                  size={"lg"}
                                  name={
                                    details?.agency_name
                                      ? details.agency_name
                                      : details?.firstName +
                                        " " +
                                        details?.lastName
                                  }
                                  src={
                                    details?.profile_image
                                      ? details?.profile_image
                                      : details?.agency_profileImage
                                  }
                                  onClick={() =>
                                    router.push(
                                      item.applied_by === "agency_member"
                                        ? `/profile/a/${item?.user_id}`
                                        : `/profile/f/${item?.user_id}`
                                    )
                                  }
                                >
                                  <AvatarBadge
                                    border="3.5px solid white"
                                    bg={`${
                                      details?.activity === "online"
                                        ? "green"
                                        : "gray.300"
                                    }`}
                                    boxSize="0.7em"
                                    left={-2}
                                    top={0}
                                  />
                                </Avatar>

                                <Box className="w-full space-y-3">
                                  <Box>
                                    <Text
                                      className="font-semibold text-primary w-fit border-b border-transparent border-spacing-0 hover:border-primary"
                                      cursor={"pointer"}
                                      onClick={() =>
                                        router.push(
                                          item.applied_by === "agency_member"
                                            ? `/profile/a/${item?.user_id}`
                                            : `/profile/f/${item?.user_id}`
                                        )
                                      }
                                    >
                                      {details?.agency_name
                                        ? details.agency_name
                                        : details?.firstName +
                                          " " +
                                          details?.lastName}
                                    </Text>
                                    <Box
                                      display={{ base: "block", sm: "none" }}
                                    >
                                      <HStack spacing={10}>
                                        <Text className="font-bold text-[#101010] flex items-center">
                                          <FaDollarSign /> {item?.desired_price}
                                        </Text>
                                        <Text className="font-medium text-[#2a2a2a] flex items-center">
                                          <FaLocationDot className="text-gray-600" />{" "}
                                          {details?.location
                                            ? details?.location
                                            : details?.agency_officeLocation
                                                ?.country || "Not Found"}
                                        </Text>
                                      </HStack>
                                      {item?.applied_by === "agency_member" && (
                                        <Text className="text-white bg-gray-200 border border-green-100 px-2 rounded-full mb-2 text-sm w-fit">
                                          AGENCY
                                        </Text>
                                      )}
                                    </Box>
                                    <Text className="text-sm font-medium text-[#6B7280]">
                                      {details?.agency_name
                                        ? details?.agency_tagline
                                        : details?.professional_role}
                                    </Text>
                                  </Box>
                                  <Box>
                                    <HStack
                                      spacing={4}
                                      align="center"
                                      flexDirection={{
                                        base: "column",
                                        sm: "row",
                                      }}
                                    >
                                      <Button
                                        size="sm"
                                        colorScheme="primary"
                                        variant="outline"
                                        onClick={() => {
                                          setMsgIsOpen(true),
                                            setHireProfile(item);
                                        }}
                                        paddingX={5}
                                        className="w-full sm:w-auto"
                                      >
                                        Invite For Interview
                                      </Button>
                                      <Button
                                        size="sm"
                                        colorScheme="primary"
                                        paddingX={5}
                                        onClick={() => handleHireReq(item)}
                                        className="w-full sm:w-auto"
                                      >
                                        Hire
                                      </Button>
                                    </HStack>
                                  </Box>
                                </Box>
                              </Box>

                              <Box
                                justifyContent={"flex-end"}
                                alignItems={"flex-end"}
                                flexDirection={"column"}
                                display={{ base: "none", sm: "flex" }}
                              >
                                {item?.applied_by === "agency_member" && (
                                  <Text className="text-white bg-gray-200 border border-green-100 px-3 rounded-full mb-2">
                                    AGENCY
                                  </Text>
                                )}
                                <HStack spacing={10}>
                                  <Text className="text-lg font-bold text-[#101010] flex items-center">
                                    <FaDollarSign /> {item?.desired_price}
                                  </Text>
                                  {/* <Text className="text-sm font-medium text-[#6B7280]">
                                    $3M+ earned
                                  </Text> */}
                                  {/* <Text className="text-sm font-medium text-[#6B7280] border-b-2 block border-fg-brand">
                                    100% job success
                                  </Text> */}
                                </HStack>
                                <Box>
                                  <Text className="text-md font-medium text-[#2a2a2a] flex items-center">
                                    <FaLocationDot className="text-gray-600" />{" "}
                                    {details?.location
                                      ? details?.location
                                      : details?.agency_officeLocation
                                          ?.country || "Not Found"}
                                  </Text>
                                </Box>
                              </Box>
                            </HStack>

                            <VStack
                              justifyContent={"start"}
                              width={"100%"}
                              alignItems={"start"}
                            >
                              <Box>
                                <Text className="text-[15px] font-bold mb-2 border-b">
                                  Cover Letter
                                </Text>
                                <Text
                                  mt={1}
                                  className="mt-1 text-sm font-normal mb-4"
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: item?.cover_letter,
                                    }}
                                  />
                                </Text>
                              </Box>
                              <Stack
                                direction="row"
                                align="center"
                                flexWrap={"wrap"}
                                gap={3}
                              >
                                {details?.skills?.map((skill) => (
                                  <Box
                                    key={skill}
                                    size={{ base: "xs", sm: "sm" }}
                                    bgColor={"gray.200"}
                                    textColor={"gray.600"}
                                    paddingX={2}
                                    paddingY={{ sm: 1 }}
                                    borderRadius={"3px"}
                                  >
                                    {skill}
                                  </Box>
                                ))}
                              </Stack>
                            </VStack>
                          </VStack>
                        </VStack>
                      );
                    })}
                  </VStack>
                ) : (
                  <Box padding={8}>
                    <Text>There are no proposals for this job!</Text>
                  </Box>
                )}
              </Tabs.Content>
              <Tabs.Content>
                <Text>Messaged!</Text>
              </Tabs.Content>
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>

      {/* Send Interview Request */}
      <UniversalModal
        isModal={msgIsOpen}
        setIsModal={setMsgIsOpen}
        title={"Enter your message"}
      >
        <form onSubmit={handleSubmit(handleInterviewRequest)}>
          <div className="">
            <div className="my-5">
              <textarea
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your message..."
                rows="4"
                {...register("message", {
                  required: "Interview message is required",
                })}
              />
              {errors.message && <ErrorMsg msg={errors.message.message} />}
            </div>
            <div className="flex justify-end mt-5">
              <Button
                onClick={() => setMsgIsOpen(false)}
                colorScheme="primary"
                variant={"outline"}
                marginRight={5}
              >
                Cancel
              </Button>
              <Button
                colorScheme="primary"
                loadingText="Sending"
                spinner={<BtnSpinner />}
                type="submit"
                isLoading={isLoading}
              >
                Send
              </Button>
            </div>
          </div>
        </form>
      </UniversalModal>

      {/* Send Job Offer Request */}
      <UniversalModal
        isModal={open}
        setIsModal={setOpen}
        title={"Are you sure?"}
      >
        <div className="flex justify-end mt-5">
          <Button
            onClick={() => setOpen(false)}
            colorScheme="primary"
            variant={"outline"}
            marginRight={5}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSend()}
            colorScheme="primary"
            isLoading={isLoading}
            loadingText="Sure"
            spinner={<BtnSpinner />}
          >
            Sure
          </Button>
        </div>
      </UniversalModal>

      {/* Notify Payment Status Before Hiring a Freelancer */}
      <AddPaymentNotifyModal
        isOpen={paymentModal}
        setIsOpen={setPaymentModal}
      />
    </>
  );
};
