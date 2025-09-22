
"use client";
import React from "react";

import {
  Box,
  Text,
  RadioGroup,
  Tabs,
  
  
  
  
  Skeleton,
} from "@/components/ui/migration-helpers";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardDetailsForm } from "./CardDetailsForm";
import CurrentCard from "./CurrentCard";
import { getBankDetails } from "../../../../../helpers/APIs/payments";
import { useEffect, useState } from "react";
import SmoothMotion from "../../../../utils/Animation/SmoothMotion";
import { PayPalCardForm } from "./PayPalCardForm";

// Load Stripe.js with your publishable key
const privateKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = loadStripe(privateKey);

const BillingAndPayments = () => {
  const [tab, setTab] = useState(1);
  const [bankDetails, setBankDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getCardDetails = async () => {
    try {
      const { code, body } = await getBankDetails();
      if (code === 200) setBankDetails(body);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCardDetails();
  }, []);

  return (
    <div className="border-[1px] border-[var(--bordersecondary)] rounded-lg bg-white overflow-hidden">
      <Skeleton isLoaded={!isLoading} startColor="gray.50" endColor="gray.200">
        <Tabs.Root
          colorScheme="primary"
          padding={6}
          index={tab - 1}
          onChange={(index) => setTab(index + 1)}

};

export default BillingAndPayments;
