import React from "react";

import AgencyOverview from "./AgencyOverview";
import AgencyProjects from "./AgencyPorjects";
import AgencyServices from "./AgencyServices";
import AgencyWorkHistory from "./AgencyWorkHistory";

const AgencyLeftbar = ({ agency, setAgency }) => {
  const { agency_overview } = agency || {};
  return (
    <divitems-flex-start"}
      marginRight={{ lg: 5 }}
      borderRight={{ base: "none", lg: "0.1px solid gray" }}
     className="flex flex-col className= p-5">
      <AgencyOverview overview={agency_overview} setAgency={setAgency} />
      <br />
      <AgencyServices agency={agency} setAgency={setAgency} />
      <br />
      <AgencyProjects setAgency={setAgency} agency={agency} />
      <br />
      <AgencyWorkHistory setAgency={setAgency} />
      <br />
    </div>
  );
};

export default AgencyLeftbar;
