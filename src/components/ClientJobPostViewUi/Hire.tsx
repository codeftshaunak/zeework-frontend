
"use client";
import React from "react";

import {
  
  
  
  
  
  Tabs,
} from "@/components/ui/migration-helpers";
import SmoothMotion from "../utils/Animation/SmoothMotion";
import { useState } from "react";

export const Hire = () => {
  const [active setActiveTab] = useState(0);
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="overflow-hidden border rounded-lg basis-full bg-white">
        <Tabs.Root variant="unstyled" onChange={(index) => setActiveTab(index)}>
          <Tabs.List className="px-6 pt-4 border-b">
            <Tabs.Trigger className="px-0 text-black">Offers</Tabs.Trigger>
            <Tabs.Trigger className="px-0 text-black">Hired</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Indicator
            className=" bg-fg-brand"
          />
          <SmoothMotion key={activeTab}>
            <Tabs.Content>
              <Tabs.Content>
                <div className="h-[196px] px-8 pt-8 pb-4 flex justify-center items-center ">
                  <p>You don’t have any hires yet</p>
                </div>
              </Tabs.Content>
              <Tabs.Content>
                <p>Hired!</p>
              </Tabs.Content>
            </Tabs.Content>
          </SmoothMotion>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default Hire;
