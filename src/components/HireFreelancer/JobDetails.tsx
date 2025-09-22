
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
  const profile = useSelector((state: unknown) => state?.profile?.profile);

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

};

export default JobDetails;
