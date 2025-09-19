
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
    if (
      purchasedGigs?.length > 0 &&
      (!pendingOrder?.length || !rejectedOrder?.length)
    ) {
      setPendingOrder(
        purchasedGigs
          .filter((gig) => gig?.status === "pending")
          .map((gig) => ({
            ...gig?.gig_details,
            _id: gig?.gig_id,
            status: gig?.status,
          }))
      );
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
      >
        {!marketplace && (
          <Tabs.List className="flex flex-wrap">
            <Tab>All</Tabs.Trigger>
            <Tab>Pending</Tabs.Trigger>
            <Tab>In Progress</Tabs.Trigger>
            <Tab>Completed</Tabs.Trigger>
          </Tabs.List>
        )}
        {!marketplace && (
          <Tabs.Indicator
            mt="-1.5px"
            className="sm:bg-fg-brand"
          />
        )}

        <SmoothMotion key={tabIndex}>
          <Tabs.Content>
            <Tabs.Content>
              <GigDisplayCards
                allOffers={latestOffer}
                purchasesReq={purchasedGigs || []}
                tabIndex={tabIndex}
                isLoading={isLoading}
              />
            </Tabs.Content>
            <Tabs.Content>
              <GigDisplayCards
                allOffers={pendingOrder}
                tabIndex={tabIndex}
                isLoading={isLoading}
              />
            </Tabs.Content>
            <Tabs.Content>
              <GigDisplayCards
                allOffers={rejectedOrder}
                tabIndex={tabIndex}
                isLoading={isLoading}
              />
            </Tabs.Content>
          </Tabs.Content>
        </SmoothMotion>
      </Tabs.Root>
    </>
  );
};

export default LatestOffers;
