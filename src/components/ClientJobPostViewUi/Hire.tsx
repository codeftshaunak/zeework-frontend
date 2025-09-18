import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import SmoothMotion from "../utils/Animation/SmoothMotion";
import { useState } from "react";

export const Hire = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="overflow-hidden border rounded-lg basis-full bg-white">
        <Tabs variant="unstyled" onChange={(index) => setActiveTab(index)}>
          <TabList className="px-6 pt-4 border-b">
            <Tab className="px-0 text-black">Offers</Tab>
            <Tab className="px-0 text-black">Hired</Tab>
          </TabList>
          <TabIndicator
            height="2px"
            borderRadius="1px"
            color={"#000"}
            className=" bg-fg-brand"
          />
          <SmoothMotion key={activeTab}>
            <TabPanels>
              <TabPanel>
                <div className="h-[196px] px-8 pt-8 pb-4 flex justify-center items-center ">
                  <p>You don’t have any hires yet</p>
                </div>
              </TabPanel>
              <TabPanel>
                <p>Hired!</p>
              </TabPanel>
            </TabPanels>
          </SmoothMotion>
        </Tabs>
      </div>
    </div>
  );
};

export default Hire;
