"use client";


import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClientProfileCard from "./ProfileCard";
import {
  getClientJobs,
  getHiredListByClient,
} from "../../helpers/APIs/clientApis";
import AgencyTopbar from "./AgencyTopbar";
import UserProfileCard from "./../FindJobUi/UserCard";
import AgencyUserCard from "../FindJobUi/AgencyUserCard";

const AgencyDashboard = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [hiredList, setHiredList] = useState([]);
  const uniqueHired = [];
  const seenFreelancerIds = new Set();
  if (hiredList?.length > 0) {
    hiredList?.forEach((item) => {
      // Check if the freelancer_id is already in the Set
      if (!seenFreelancerIds.has(item.freelencer_id)) {
        // If not, add it to the Set and push the item to the result array
        seenFreelancerIds.add(item.freelencer_id);
        uniqueHired.push(item);
      }
    });
  }

  const getClientPostedJob = async () => {
    try {
      const respoonse = await getClientJobs();
      setJobs(respoonse);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDelete = async (id) => {
  //   console.log(id);
  // };

  useEffect(() => {
    getClientPostedJob();
  }, []);

  return (
    <div className="w-[90%]">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-9">
          <h2 className="text-[25px] mb-2">Your Agency Dashboard</h2>
          <hr />
          <div className="text-2xl font-medium text-[#374151] mt-4">
            Your Agency Team
          </div>
          {uniqueHired?.length > 0 ? (
            <div className="flex justify-between mt-4">
              {uniqueHired?.length > 0 &&
                [1, 2, 3].map((index) => {
                  const data = uniqueHired[0]; // Adjusted index to get the correct element
                  return (
                    <div
                      className="col-span-12 md:col-span-6 lg:col-span-4 border border-[var(--bordersecondary)] p-4 rounded-lg w-[300px] bg-[#f4f5f787]"
                      key={index}
                    >
                      <ClientProfileCard data={data.freelancerDetails[0]} />
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="border-2 mt-4 rounded-md">
              <div className="flex justify-between border-b border-[var(--bordersecondary)] p-4">
                <div className="text-2xl font-medium text-[#374151]">
                  My Team
                </div>
              </div>
              <div className="h-[200px] bg-[#f4f5f787] text-center py-4">
                <div className="w-[70%] m-auto flex flex-col justify-center items-center gap-2 h-full">
                  <h2 className="font-bold text-xl">Welcome to ZeeWork!</h2>
                  <p className="py-3">
                    Ready to start building your team online? Explore our vast
                    database of programmers, designers, marketers, builders &
                    more. Click below to make your first hire & bring your
                    project live.
                  </p>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    transition="0.3s ease-in-out"
                    _hover={{
                      bg: "#36af63",
                      color: "#fff",
                    }}
                  >
                    Post a new job
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="border-2 mt-4 rounded-md">
            <div className="flex justify-between border-b border-[var(--bordersecondary)] p-4">
              <div className="text-2xl font-medium text-[#374151]">
                Your Packages
              </div>
            </div>
            <div className="h-[200px] bg-[#f4f5f787] text-center py-4">
              <div className="w-[70%] m-auto flex flex-col justify-center items-center gap-2 h-full">
                <h2 className="font-bold text-xl">Remumber Packages</h2>
                <p className="py-3">
                  Ready to start building your team online? Explore our vast
                  database of programmers, designers, marketers, builders &
                  more. Click below to make your first hire & bring your project
                  live.
                </p>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  transition="0.3s ease-in-out"
                  _hover={{
                    bg: "#36af63",
                    color: "#fff",
                  }}
                >
                  Post a new job
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[300px] flex flex-col m-auto justify-center items-center">
          <AgencyUserCard />
          <br />
          <UserProfileCard />
          <button
            className="bg-[#22C35E] text-[#fff] border-2 border-[#22C35E] text-md w-[90%] text-center mt-4 rounded-md font-semibold py-1"
            onClick={() => router.push("/search-freelancers")}
          >
            Invite Freelancer To Your Agency
          </button>
          <button className="bg-[#ebebeb] text-[#2c2c2c] border border-[#707070] text-md w-[90%] text-center mt-4 rounded-md font-semibold py-1">
            Your Agency Settings
          </button>
        </div>
      </div>
      <AgencyTopbar />
    </div>
  );
};

export default AgencyDashboard;
