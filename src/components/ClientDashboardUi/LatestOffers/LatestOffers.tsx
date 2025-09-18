import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
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
      <Tabs
        onChange={(index) => setTabIndex(index)}
        position="relative"
        variant="unstyled"
        paddingX={"16px"}
      >
        {!marketplace && (
          <TabList className="flex flex-wrap">
            <Tab>All</Tab>
            <Tab>Pending</Tab>
            <Tab>In Progress</Tab>
            <Tab>Completed</Tab>
          </TabList>
        )}
        {!marketplace && (
          <TabIndicator
            mt="-1.5px"
            height="2px"
            className="sm:bg-fg-brand"
            borderRadius="1px"
          />
        )}

        <SmoothMotion key={tabIndex}>
          <TabPanels>
            <TabPanel>
              <GigDisplayCards
                allOffers={latestOffer}
                purchasesReq={purchasedGigs || []}
                tabIndex={tabIndex}
                isLoading={isLoading}
              />
            </TabPanel>
            <TabPanel>
              <GigDisplayCards
                allOffers={pendingOrder}
                tabIndex={tabIndex}
                isLoading={isLoading}
              />
            </TabPanel>
            <TabPanel>
              <GigDisplayCards
                allOffers={rejectedOrder}
                tabIndex={tabIndex}
                isLoading={isLoading}
              />
            </TabPanel>
          </TabPanels>
        </SmoothMotion>
      </Tabs>
    </>
  );
};

export default LatestOffers;
