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
export { AgencyBodyLayout };

export default AgencyBody;
