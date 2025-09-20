import React from "react";

import AgencyOverview from "./AgencyOverview";
import AgencyProjects from "./AgencyPorjects";
import AgencyServices from "./AgencyServices";
import AgencyWorkHistory from "./AgencyWorkHistory";

const AgencyLeftbar = ({ agency, setAgency }) => {
  const { agency_overview } = agency || {};
  return (
    <div className="flex flex-col p-5 border-r border-gray-300 lg:mr-5">
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
