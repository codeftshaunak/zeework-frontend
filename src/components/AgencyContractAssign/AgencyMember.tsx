"use client";

import { toast } from "@/lib/toast";
import { MainButtonRounded } from "../Button/MainButton";
import { useContext, useState } from "react";
import { assignContractToFreelancer } from "../../helpers/APIs/agencyApis";
import UniversalModal from "../Modals/UniversalModal";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { MdAddModerator } from "react-icons/md";
import { SocketContext } from "../../contexts/SocketContext";
import { useDispatch } from "react-redux";
import { clearMessageState } from "../../redux/messageSlice/messageSlice";

const AgencyMember = ({ details, contractRef, setJobDetails }) => {
  const { profile_image, firstName, lastName, professional_role } = details;
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();

  const assignFreelancer = async () => {
    setIsLoading(true);
    try {
      const { message, code, msg, body } = await assignContractToFreelancer({
        contract_ref: contractRef,
        assign_member: details.user_id,
      });

      if (code === 200) {
        setIsAssigned(true);
        setJobDetails((prev) => ({ ...prev, ...body }));

        if (socket && details.user_id) {
          socket.emit(
            "card_message",
            {
              sender_id: body.freelancer_id,
              receiver_id: details.user_id,
              message: " ",
              message_type: "agency_contract",
              contract_ref: body._id,
            },
            {
              type: "assigned_agency_contract",
              position: body.contract_title,
              job_type: body.job_type,
              // amount: jobDetails.amount,
              url: {
                freelancer: `/assigned-contract/${body._id}`,
                agency: `/contract-assign/${body._id}`,
              },
            }
          );
        }
        dispatch(clearMessageState());
      }
      toast.default(msg || message);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
    setIsModal(false);
  };

  return (
    <>
      {" "}
      <VStack
        className="mt-[10px] py-[25px] shadow border p-4 rounded-md leading-[20px] relative bg-white justify-between"
        w="300px"
       
      >
        <Box className="text-center">
          <Avatar
            src={profile_image}
            name={firstName + " " + lastName}
            size="lg"
          />
          <Text mt={2} className="text-2xl font-semibold">
            {firstName + " " + lastName}
          </Text>
          <Text
            my={1}
           className="text-center overflow-hidden w-full text-sm">
            {professional_role}
          </Text>
        </Box>

        <MainButtonRounded
          onClick={() => setIsModal(true)}
          isDisable={isAssigned}
        >
          {isAssigned ? "Already Assigned" : "Assign Contract"}
        </MainButtonRounded>
      </VStack>
      <UniversalModal isModal={isModal} setIsModal={setIsModal}>
        <div className="w-[72px] h-[72px] flex items-center justify-center bg-green-50 rounded-full mx-auto">
          <MdAddModerator className="text-4xl text-primary" />
        </div>
        <p className="text-xl font-semibold text-center">
          Are you sure you want to assign{" "}
          <span className="font-bold">{firstName + " " + lastName}</span>?
        </p>
        <div className="flex gap-5 sm:gap-10 mt-4 sm:mt-10">
          <Button
            onClick={() = className="w-full"> setIsModal(false)}
          >
            No, I don&apos;t want
          </button>
          <Button
            isLoading={isLoading}
            loadingText="Yes, I want to assign"
            spinner={<BtnSpinner />}
            onClick={() => assignFreelancer()}
          >
            Yes, I want to assign
          </button>
        </div>
      </UniversalModal>
    </>
  );
};

export default AgencyMember;
