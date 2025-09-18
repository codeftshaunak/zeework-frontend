import {
  Box,
  Text,
  Radio,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Skeleton,
} from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardDetailsForm } from "./CardDetailsForm";
import CurrentCard from "./CurrentCard";
import { getBankDetails } from "../../../../../helpers/APIs/payments";
import { useEffect, useState } from "react";
import SmoothMotion from "../../../../utils/Animation/SmoothMotion";
import { PayPalCardForm } from "./PayPalCardForm";

// Load Stripe.js with your publishable key
const privateKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
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
        <Tabs
          position="relative"
          colorScheme="primary"
          padding={6}
          rounded="2xl"
          bgColor="white"
          index={tab - 1}
          onChange={(index) => setTab(index + 1)}
          height={isLoading && "200px"}
        >
          <TabList>
            {bankDetails?.card_details && (
              <Tab fontWeight={"semibold"}>Current Card Details</Tab>
            )}
            <Tab fontWeight={"semibold"}>Add Billing Method</Tab>
          </TabList>
          <SmoothMotion key={tab}>
            <TabPanels>
              {bankDetails?.card_details && (
                <TabPanel padding={0}>
                  <Box mt={5}>
                    <CurrentCard
                      data={bankDetails}
                      setData={setBankDetails}
                      setTab={setTab}
                    />
                  </Box>
                </TabPanel>
              )}
              <TabPanel padding={0}>
                <Box mt={5}>
                  <Box marginBottom={6}>
                    <Radio size="lg" colorScheme="primary" isChecked>
                      <Text fontSize="xl" fontWeight="semibold">
                        Payment Card
                      </Text>
                    </Radio>
                  </Box>

                  <Box marginTop={1} className="w-full xl:w-[700px]">
                    <Elements stripe={stripePromise}>
                      <CardDetailsForm
                        setTab={setTab}
                        setCard={setBankDetails}
                      />
                      {/* <PayPalCardForm
                        setTab={setTab}
                        setCard={setBankDetails}
                      /> */}
                    </Elements>
                  </Box>
                </Box>
              </TabPanel>
            </TabPanels>
          </SmoothMotion>
        </Tabs>
      </Skeleton>
    </div>
  );
};

export default BillingAndPayments;
