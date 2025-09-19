
"use client";
import React from "react";

import {
  Heading,
  Text,
  Box,
  Select,
  Input,
} from "@/components/ui/migration-helpers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getClientJobs } from "../../helpers/APIs/clientApis";

const JobDetails = ({ formData, setFormData, jobInfo }) => {
  const [jobsTitle, setJobsTitle] = useState([]);
  const profile = useSelector((state: any) => state?.profile?.profile);

  // Fetch Job Title
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await getClientJobs();
        setJobsTitle(jobsData);
      } catch (error) {
        console.error("Error fetching job titles:", error);
      }
    };

    fetchData();
  }, []);

  const handleFormDataChange = (key, value) => {
    let updatedFormData = { ...formData };

    if (key === "job_title") {
      const selectedJob = JSON.parse(value);
      const { _id: job_id, title } = selectedJob;

      updatedFormData = {
        ...updatedFormData,
        job_title: title,
        job_id: job_id,
      };
    } else {
      updatedFormData[key] = value;
    }

    setFormData(updatedFormData);
  };

  const teamName =
    profile?.businessName && profile?.businessName !== "null"
      ? profile.businessName
      : profile?.name;

  return (
    <div
     
     
      borderColor="gray.200"
     
    >
      <Heading as="h4" size="md" mb={6}>
        Job Details
      </Heading>

      {/* Hiring Team Section */}
      <div>
        <span mb={2}>
          Hiring Team
        </span>
        <Select
          placeholder="Select Team"
          maxWidth="2xl"
          value={formData.hiring_team}
          onChange={(e) => handleFormDataChange("hiring_team", e.target.value)}
          required
          focusBorderColor="green.500"
        >
          <option value={`${teamName}'s Team`}>{teamName}&apos;s Team</option>
        </Select>
      </div>

      {/* Related Job Posting Section */}
      <div>
        <span
         mb={2}>
          Related Job Posting
          {jobInfo && (
            <span>
              (Optional)
            </span>
          )}
        </span>
        <Select
          placeholder="Select an open job post"
          maxWidth="2xl"
          onChange={(e) => handleFormDataChange("job_title", e.target.value)}
          required={!formData?.job_id}
          focusBorderColor="green.500"
        >
          {jobsTitle?.map((job) => (
            <option key={job._id} value={JSON.stringify(job)}>
              {job?.title}
            </option>
          ))}
        </Select>
      </div>

      {/* Contract Title Section */}
      <div>
        <span mb={2}>
          Contract Title
        </span>
        <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Enter contract title"
          maxWidth="2xl"
          value={formData?.contract_title}
          onChange={(e) =>
            handleFormDataChange("contract_title", e.target.value?.slice(0, 50))
          }
          required
          focusBorderColor="green.500"
        />
        <span>
          {formData?.contract_title?.length || 0}/50 characters
        </span>
      </div>
    </div>
  );
};

export default JobDetails;
