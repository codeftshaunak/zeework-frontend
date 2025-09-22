
"use client";
import React from "react";

import {
  
  
  
  
  
  Tabs,
} from "@/components/ui/migration-helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommonJobGigs,
  getGigPurchasesReq,
} from "../../../helpers/APIs/clientApis";
import { setDashboard } from "../../../redux/pagesSlice/pagesSlice";
import SmoothMotion from "../../utils/Animation/SmoothMotion";
import GigDisplayCards from "./GigDisplayCards";

const LatestOffers = ({ marketplace }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { latestOffer, purchasedGigs } = useSelector(
    (state) => state.pages.dashboard
  );

  const [pendingOrder, setPendingOrder] = useState([]);
  const [rejectedOrder, setRejectedOrder] = useState([]);
  const dispatch = useDispatch();

  const getAllOffers = async () => {
    setIsLoading(true);
    try {
      const { body: purchasesBody, code } = await getGigPurchasesReq();

      if (code === 200) {
        dispatch(setDashboard({ purchasedGigs: purchasesBody }));
        if (!latestOffer?.length) {
          const { body } = await getCommonJobGigs();
          if (body?.length) dispatch(setDashboard({ latestOffer: body }));
        }
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!latestOffer?.length) getAllOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestOffer]);

  useEffect(() => {

      setRejectedOrder(
        purchasedGigs
          .filter((gig) => gig?.status === "rejected")
          .map((gig) => ({
            ...gig?.gig_details,
            _id: gig?.gig_id,
            status: gig?.status,
          }))
      );
    }
  }, [purchasedGigs, pendingOrder?.length, rejectedOrder?.length]);

  return (
    <>
      <Tabs.Root
        onChange={(index) => setTabIndex(index)}
        variant="unstyled"
        paddingX="16px"

};

export default LatestOffers;
