"use client";

import React, { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import JobDetails from "../../JobDetails/JobDetails";
import JobApply from "../../JobDetails/JobApply";

const ApplyJob = () => {
  const [page, setPage] = useState(1);
  const [details, setDetails] = useState([]);

  return (
    <HomeLayout>
      {page === 1 && <JobDetails setPage={setPage} setDetails={setDetails} />}
      {page === 2 && <JobApply setPage={setPage} details={details} />}
    </HomeLayout>
  );
};

export default ApplyJob;
