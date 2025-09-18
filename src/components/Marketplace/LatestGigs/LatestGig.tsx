"use client";

import { useEffect, useState } from "react";
import { getSearchGigs } from "../../../helpers/APIs/gigApis";
import GigDisplayCards from "../../ClientDashboardUi/LatestOffers/GigDisplayCards";

const LatestGig = () => {
  const [gigs, setGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllGigs = async () => {
    try {
      setIsLoading(true);
      const { code, body } = await getSearchGigs();
      if (code === 200) setGigs(body.gigs);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllGigs();
  }, []);

  return (
    <div className="border border-[var(--bordersecondary)] rounded-md overflow-hidden w-full mt-1">
      <div className="flex justify-between border-b border-[var(--bordersecondary)] bg-white p-4">
        <div className=" text-2xl font-medium text-[#374151]">
          Latest Offers
        </div>
      </div>
      <div className="bg-white text-center py-4">
        <div>
          <GigDisplayCards
            allOffers={gigs}
            purchasesReq={[]}
            // tabIndex={tabIndex}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default LatestGig;
