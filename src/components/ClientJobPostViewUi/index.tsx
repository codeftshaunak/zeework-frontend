"use client";

import { useLocation, useRouter, useParams } from "next/navigation";
import CTAButton from "../CTAButton";
import { ReviewProposal } from "./ReviewProposal";
import InviteFreelancer from "./InviteFreelancer";
import ViewJobPost from "./ViewJobPost";
import Hire from "./Hire";
import { useEffect, useState } from "react";
import { getProposals } from "../../helpers/APIs/clientApis";
import useUserActivityListener from "../../hooks/useUserActivityListener";

export 
  
  const router = useRouter();
  const [page, setPage] = useState(0);
  const jobDetails = location?.state && location?.state?.jobDetails;
  const [proposals, setProposals] = useState([]);
  const userIds = proposals?.map((proposal) => proposal.user_id);
  const [proposalLoading, setProposalLoading] = useState(true);

  // update user activity status
  useUserActivityListener((data) => {
    if (data) {
      setProposals((prev) =>
        prev.map((proposal) =>
          proposal?.user_id === data.user.user_id ||
          proposal?.user_id === data.user?.agency_id
            ? {
                ...proposal,
                user_details: {
                  ...proposal.user_details,
                  activity: data.status,
                },
              }
            : proposal
        )
      );
    }
  });

  const proposalsDetails = async () => {
    try {
      const { body } = await getProposals(id);
      setProposals(body?.filter((item) => item.contract_status === "applied"));
    } catch (error) {
      console.error(error);
    }
    setProposalLoading(false);
  };

  useEffect(() => {
    proposalsDetails();
  }, []);

  return (
    <div className="w-full md:px-4 md:py-6">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-[#374151] ">
            Your Dashboard
          </h2>
        </div>
        <div className="mt-4">
          <CTAButton
            text="Post a new job"
            onClick={() => router.push("/create-job")}
          ></CTAButton>
        </div>
      </div>

      <div className="my-10">
        <div className="grid gap-1 md:grid-cols-4 lg:w-[73.5%]">
          <div className="col-span-1">
            <div
              className={`hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center cursor-pointer rounded-l-lg ${
                page === 0
                  ? "bg-green-100 border-b-2 border-green-500"
                  : "border bg-white"
              }`}
              onClick={() => {
                setPage(0);
              }}
            >
              <p>View Job Post</p>
            </div>
          </div>
          <div className="col-span-1">
            <div
              className={`hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center cursor-pointer ${
                page === 1
                  ? "bg-green-100 border-b-2 border-green-500"
                  : "border bg-white"
              }`}
              onClick={() => setPage(1)}
            >
              <p>Invite Freelancers</p>
            </div>
          </div>
          <div className="col-span-1">
            <div
              className={`hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center cursor-pointer ${
                page === 2
                  ? "bg-green-100 border-b-2 border-green-500"
                  : "border bg-white"
              }`}
              onClick={() => setPage(2)}
            >
              <p className="flex items-center justify-center flex-wrap gap-x-1">
                Review Proposals{" "}
                {proposalLoading ? (
                  <span className="bg-slate-200 w-4 h-4 rounded-full animate-pulse"></span>
                ) : (
                  <span>({proposals.length})</span>
                )}
              </p>
            </div>
          </div>
          <div className="col-span-1">
            <div
              className={`hover:bg-[#F0FDF4] h-[56px] flex justify-center items-center cursor-pointer rounded-r-lg ${
                page === 3
                  ? "bg-green-100 border-b-2 border-green-500"
                  : "border bg-white"
              }`}
              onClick={() => setPage(3)}
            >
              <p>Hired</p>
            </div>
          </div>
        </div>
        {/* <Tabs.Root onChange={(index) => setPage(index)} variant="unstyled">
          <Tabs.List gap={10}>

};
