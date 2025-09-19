
"use client";
import React from "react";

import {
  Skeleton,
  
  
  
  
  Tabs,
} from "@/components/ui/migration-helpers";
import AddPaymentDetails from "./AddPaymentDetails";
import { useEffect, useState } from "react";
import PaymentDetails from "./PaymentDetails";
import { getBankDetails } from "../../../../../helpers/APIs/payments";
import SmoothMotion from "../../../../utils/Animation/SmoothMotion";

const BillingAndPayment = () => {
  const [tab, setTab] = useState(1);
  const [bankDetails, setBankDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getPaymentDetails = async () => {
    try {
      const { code, body } = await getBankDetails();
      if (code === 200) setBankDetails(body);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPaymentDetails();
  }, []);

  return (
    <div className="border-[1px] border-[var(--bordersecondary)] rounded-lg bg-white overflow-hidden w-full">
      <Skeleton isLoaded={!isLoading} startColor="gray.50" endColor="gray.200">
        <Tabs.Root
          colorScheme="primary"
          padding={6}
          index={tab - 1}
          onChange={(index) => setTab(index + 1)}
        >
          <Tabs.List
            flexDirection={{ base: "column", sm: "row" }}
          >
            {bankDetails?.payment_details && (
              <Tabs.Trigger>Current Payment Details</Tabs.Trigger>
            )}
            <Tabs.Trigger>Add Payment Method</Tabs.Trigger>
          </Tabs.List>
          <SmoothMotion key={tab}>
            <Tabs.Content>
              {bankDetails?.payment_details && (
                <Tabs.Content padding={0}>
                  <PaymentDetails
                    data={bankDetails}
                    setData={setBankDetails}
                    setTab={setTab}
                  />
                </Tabs.Content>
              )}
              <Tabs.Content padding={0}>
                <AddPaymentDetails setBank={setBankDetails} setTab={setTab} />
              </Tabs.Content>
            </Tabs.Content>
          </SmoothMotion>
        </Tabs.Root>
      </Skeleton>
    </div>
  );
};

export default BillingAndPayment;
