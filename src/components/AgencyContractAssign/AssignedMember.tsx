"use client";

import { Avatar, Box, VStack, Text } from "@chakra-ui/react";
import { toast } from "@/lib/toast";
import { useState } from "react";
import { MainButtonRounded } from "../Button/MainButton";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useRouter } from "next/navigation";
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
    const handleEndContract = async () => {
    setIsLoading(true);
    try {
      const { message, code, body, msg } = await endContractOfFreelancer({
        contract_ref,
        freelancer_id,
        assigned_id: _id,
      });

      if (code === 200) setJobDetails((prev) => ({ ...prev, ...body }));

      toast.default(msg || message);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    setIsModal(false);
  };

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
          <button
            onClick={() => setIsModal(false)}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition disabled:opacity-50"
          >
            No, I don&apos;t want
          </button>
          <button
            disabled={isLoading}
            onClick={() => handleEndContract()}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <BtnSpinner />
                <span className="ml-2">Yes, I want to assign</span>
              </>
            ) : (
              "End Contract"
            )}
          </button>
        </div>
      </UniversalModal>
    </>
  );
};

export default AssignedMember;
