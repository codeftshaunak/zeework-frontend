import React from "react";

import AgencyLeftbar from "./AgencyLeftbar";
import AgencyMembers from "./AgencyMembers";
import AgencyRightBar from "./AgencyRightBar";

const AgencyBody = ({ agency, setAgency }) => {
  return (
    <AgencyBodyLayout>
      <div className="flex flex-col w-full">
        <div className="lg:flex w-[95%] py-[20px] relative">
          <AgencyLeftbar agency={agency} setAgency={setAgency} />
          <AgencyRightBar agency={agency} setAgency={setAgency} />
        </div>
        <div className="lg:flex w-[95%] py-[20px] relative">
          <AgencyMembers setAgency={setAgency} />
        </div>
      </div>
    </AgencyBodyLayout>
  );
};

//  agency body layout
export const AgencyBodyLayout = ({ children }) => {
  return (
    <div
      className="w-full flex justify-center shadow-sm border p-4 bg-white"
    >
      {children}
    </div>
  );
};

export default AgencyBody;
