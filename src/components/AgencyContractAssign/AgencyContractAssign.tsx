"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { offerDetails } from "../../helpers/APIs/freelancerApis";
import { JobDetailsSection } from "../Invitation/JobDetails";
import { getAgencyActiveMembers } from "../../helpers/APIs/agencyApis";
import HorizontalCardSkeleton from "../Skeletons/HorizontalCardSkeleton";
import { MainButtonRounded } from "../Button/MainButton";
import { useSelector } from "react-redux";
import AgencyMember from "./AgencyMember";
import AssignedMember from "./AssignedMember";
import { RootState } from "../../redux/store";
import { JobDetails, Agency } from "../../types";

const AgencyContractAssign = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jobDetails, setJobDetails] = useState<JobDetails>({} as JobDetails);
  const [agencyMembers, setAgencyMembers] = useState<unknown[]>([]);
  const agency = useSelector((state: RootState) => state.profile.agency) as Agency;
  //   const { assigned_member, _id } = jobDetails;

  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const getInvitationDetails = async () => {
    try {
      const { body, code } = await offerDetails(id);
      if (code === 200) {
        setJobDetails(body[0]);
        const { code: aCode, body: aBody } = await getAgencyActiveMembers();
        if (aCode === 200) setAgencyMembers(aBody);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getInvitationDetails();
  }, []);

  return (
    <div className="w-full">
      <div className="my-4">
        <h2 className="my-3 text-2xl font-bold text-[1.6rem] text-[#374151]">
          Assign Agency Member
        </h2>
      </div>
      {isLoading ? (
        <>
          <HorizontalCardSkeleton />

          <HorizontalCardSkeleton className="mt-10" />
        </>
      ) : (
        <div className="w-full">
          <JobDetailsSection jobDetails={jobDetails} />
          {assigned_member ? (
            <div className="bg-white p-5 sm:px-8 rounded-xl border border-[var(--bordersecondary)] mt-10">
              <p className="text-2xl font-semibold text-gray-800">
                Assigned Members
              </p>
              <div className="flex flex-wrap gap-6">
                <AssignedMember
                  member={assigned_member}
                  contract_ref={_id}
                  setJobDetails={setJobDetails}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white p-5 sm:px-8 rounded-xl border border-[var(--bordersecondary)] mt-10">
              <p className="text-2xl font-semibold text-gray-800">
                Agency Members
              </p>
              <div className="flex flex-wrap gap-6">
                {agencyMembers?.length ? (
                  agencyMembers?.map((member) => (
                    <AgencyMember
                      key={member._id}
                      details={member}
                      contractRef={jobDetails._id}
                      setJobDetails={setJobDetails}
                    />
                  ))
                ) : (
                  <div>
                    <h2 className="text-lg mt-5">
                      No Active Members Available
                    </h2>
                    <MainButtonRounded
                      noRounded
                      onClick={() => router.push("/search-freelancers")}
                      className="mt-10"
                    >
                      Invite Freelancer To Join{" "}
                      {agency?.agency_name || "Your Agency"}
                    </MainButtonRounded>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgencyContractAssign;
