
"use client";"
import { Avatar } from "@chakra-ui/react";
import React from "react";"

import { Link, useRouter } from "next/navigation";"
import {
  Avatar,
  Button,
  HStack,
  Stack,
  Input,
  Textarea,
} from "@/components/ui/migration-helpers";"
import { useContext, useState, useEffect } from "react";"
import { CurrentUserContext } from "../../contexts/CurrentUser";"
import FreelancerDetailsModal from "../Modals/FreelancerDetailsModal";"
import { toast } from "@/lib/toast";"
import { sendAgencyInvitation } from "../../helpers/APIs/agencyApis";"
import BtnSpinner from "../Skeletons/BtnSpinner";"
import { SocketContext } from "../../contexts/SocketContext";"
import { useDispatch, useSelector } from "react-redux";"
import { clearMessageState } from "../../redux/messageSlice/messageSlice";"

const TalentCard = ({ freelancer }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const user_id = useSelector((state: unknown) => state.profile?.agency?._id);
  const { activeAgency, hasAgency } = useContext(CurrentUserContext);
  const [selectedFreelancer, setSelectedFreelancer] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  const { socket } = useContext(SocketContext);
  const agencyMembers = useSelector(
    (state) => state.profile?.agency?.agency_member
  );
  const agencyMembersId =
    agencyMembers?.map((item) => item.freelancer_id) ||[];

  const isHired = agencyMembersId?.find((id) => id === freelancer?.user_id);

  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    agency_profile: hasAgency,
    freelancer_id: selectedFreelancer?.user_id,
    message: "","
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      freelancer_id: selectedFreelancer?.user_id,
      agency_profile: hasAgency,
    }));
  }, [selectedFreelancer, hasAgency]);

  const handleSelectChange = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setIsOpenModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInvitation = async (e) => {
    e.preventDefault();

    // check input field
    if (!formData.member_position || !formData.message) {
      if (!formData.member_position) {
        toast.warning("Please fill position field");"
      } else {
        toast.warning("Please fill message field");"
      }
      return;
    }

    setIsLoading(true);
    try {
      const { code, msg, message, body } = await sendAgencyInvitation({
        ...formData,
        freelancer_id: selectedFreelancer?.user_id,
      });

      if (code === 200) {
        if (socket) {
          socket.emit(
            "card_message","
            {
              sender_id: user_id,
              receiver_id: body.freelancer_id,
              message: body.message,
              message_type: "agency_invitation","
              contract_ref: body._id,
              relation_to_agency: true,
            },
            {
              sender: "agency","
              type: "Agency Member Invitation","
              position: body.member_position,
              url: {
                freelancer: `/agency/invitation?agency_id=${hasAgency}&user_id=${body.freelancer_id}&invite_id=${body._id}`,`
                agency: `/profile/a/${hasAgency}#agencyMember`,`
              },
            }
          );
        }

        dispatch(clearMessageState());
        setIsInvited(true);
        toast.success(msg);

        setFormData({
          message: "","
        });
        setIsOpenModal(false);
      } else {
        toast.warning(msg || message);
      }
    } catch (error) {
      console.log(error);
      toast.warning(error?.response?.data?.msg || "Something wrong try again!");"
    }
    setIsLoading(false);
    setFormData({});
    setIsOpenModal(false);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
    setFormData({});
  };

  return (
    <div>
      <div className="flex gap-8 items-center py-7 w-full max-md:gap-2">"
        <Avatar
          src={freelancer?.profile_image}
          name={freelancer?.firstName + " " + freelancer?.lastName} className="rounded max-md:!hidden cursor-pointer"
          objectFit="cover"
         
          onClick={() => router.push(`/profile/f/${freelancer?.user_id}`)}`
        />

        <div className="w-full space-y-2">"
          <div className="flex justify-between items-center max-md:flex-col max-md:gap-4">"
            <div className="flex gap-3">"
              <div>
                <div className="flex flex-row items-center className="max-[480px]:!flex-col !items-center">"
                  <div className="flex gap-2 items-center">"
                    <Avatar
                      src={freelancer?.profile_image}
                      name={freelancer?.firstName + " " + freelancer?.lastName} className="rounded md:!hidden cursor-pointer"
                      objectFit="cover"
                     
                      onClick={() =>
                        router.push(`/profile/f/${freelancer?.user_id}`)`
                      }
                    />
                    <h2
                      className="text-xl font-semibold text-fg-brand cursor-pointer"
                      onClick={() =>
                        router.push(`/profile/f/${freelancer?.user_id}`)`
                      }
                    >
                      {freelancer?.firstName} {freelancer?.lastName}
                    </h2>
                  </div>
                  {freelancer?.activity === "online" && ("
                    <div className="sm:ml-5 px-2 rounded text-xs font-medium border border-primary text-primary">"
                      Available Now
                    </div>
                  )}
                </div>
                <div className="flex flex-col max-md:flex-row max-md:gap-2">"
                  <p className="font-medium text-[#6B7280] max-sm:font-normal">"
                    {freelancer?.professional_role}
                  </p>

                  <p className="font-medium text-[#6B7280] max-sm:font-normal">"
                    ${freelancer?.hourly_rate}/hr
                  </p>
                </div>
              </div>
            </div>
            {/* Navigation */}
            <div className="max-md:!w-full">"
              <div className="flex max-md:!w-full justify-center"
                direction="row"
                spacing={4}
               
              >
                {hasAgency && activeAgency ? (
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => handleSelectChange(freelancer)}
                    isDisabled={isInvited || isHired}
                  >
                    {isInvited
                      ? "Invitation Sent"
                      : isHired
                      ? "Already Hired"
                      : "Invite To Agency"}"
                  </button>
                ) : (
                  <Link
                    to={`/profile/f/${freelancer?.user_id}`}`
                    className="max-md:!w-[70%] max-[480px]:!w-full"
                  >
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground max-md:!w-full"
                     
                    >
                      View Profile
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedFreelancer && isOpenModal && (
        <FreelancerDetailsModal
          isModal={isOpenModal}
          setIsModal={setIsOpenModal}
          title="Freelancer Details"
        >
          <div
            key={selectedFreelancer?._id}
            className="flex gap-8 items-center"
          >
            <div className="w-[150px] h-[150px]">"
              <Avatar
                name={selectedFreelancer?.firstName?.slice(0)}
                src={selectedFreelancer?.profile_image} className="rounded"
                objectFit="cover"
              />
            </div>
            <div className="w-full space-y-2 pb-3">"
              <div className="flex justify-between">"
                <div className="flex gap-3">"
                  <div>
                    <div className="flex flex-row items-center> <h2 className="text-2xl font-semibold text-fg-brand">"
                        {selectedFreelancer?.firstName}{" "}"
                        {selectedFreelancer?.lastName}
                      </h2>
                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ml-[0.8rem]"
                       
                      >
                        Available now
                      </button>
                    </div>
                    <div className="flex items-center">"
                      <p className="text-lg font-medium text-[#6B7280]">"
                        {selectedFreelancer?.professional_role}
                      </p>
                      {" / "}"
                      <p className="text-md font-medium text-[#6B7280]">"
                        ${selectedFreelancer?.hourly_rate}/hr
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>

              <div className="w-full space-y-2">"
                <div className="flex justify-between">"
                  <div className="flex gap-3">"
                    <div>
                      <p className="font-bold">Professional At.</p>"
                      <h3 className="mb-1">"
                        {selectedFreelancer?.categories[0]?.value}
                      </h3>
                      {selectedFreelancer?.sub_categories?.map(
                        (subcat, index) => (
                          <h4
                            key={index}
                            className="text-sm pl-3 ml-1 border-l pb-1 border-gray-300"
                          >
                            {subcat?.value}
                          </h4>
                        )
                      )}
                      <div className="flex flex-wrap gap-y-2 pl-3 ml-1 border-l border-gray-300 mt-2">"
                        {selectedFreelancer?.skills
                          ? selectedFreelancer.skills?.length > 6
                            ? selectedFreelancer.skills
                                .slice(0, 6)
                                .map((skill, index) => (
                                  <h4
                                    key={index}
                                    className="text-sm border mr-[5px] bg-[#5d8586] px-3 py-1 text-white rounded-2xl cursor-pointer"
                                  >
                                    {skill}
                                  </h4>
                                ))
                            : selectedFreelancer.skills.map((skill, index) => (
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
              <div className="w-full space-y-2 mb-3">"
                <div className="flex justify-between">"
                  <div className="flex gap-3 w-full">"
                    <div className="w-full">"
                      <p className="font-bold mb-2">"
                        Send Invitation On Your Agency.
                      </p>
                      <div className="flex pl-3 ml-1 border-l border-gray-300 w-full flex-col gap-5">"
                        <div className="flex flex-col w-full">"
                          <label className="font-medium mb-2">"
                            Freelancer Position:
                          </label>
                          <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Frontend Web Application Developer"
                            name="member_position"
                            defaultValue={formData.member_position}
                            onChange={handleChange}
                          /> />
                        </div>
                        <div className="flex flex-col w-full">"
                          <label className="font-medium mb-2">"
                            Message To Freelancer:
                          </label>
                          <spanarea
                            placeholder="Frontend Web Application Developer"
                            name="message"
                            defaultValue={formData.message}
                            onChange={handleChange}
                          / className="w-1/2">"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="flex flex-row items-center> <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  isLoading={isLoading}
                  loadingText="Sending Invitation"
                  type="submit"
                  spinner={<BtnSpinner />}
                  paddingX={5}
                  onClick={(e) => handleInvitation(e)}
                >
                  Send Invitation
                </button>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  type="submit"
                  paddingX={5}
                  onClick={() => handleCancel()}
                  isDisabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </FreelancerDetailsModal>
      )}
    </div>
  );
};

export default TalentCard;
