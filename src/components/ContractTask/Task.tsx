"use client";

import { useParams } from "next/navigation";
import { TaskDetails } from "./TaskDetails";
import { useEffect, useState } from "react";
import { getTaskDetails } from "../../helpers/APIs/userApis";
import { offerDetails } from "../../helpers/APIs/freelancerApis";
import DataNotAvailable from "../DataNotAvailable/DataNotAvailable";

const Task = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [taskDetails, setTaskDetails] = useState<Record<string, any>>({});
  const [jobDetails, setJobDetails] = useState<Record<string, any>>({});

  const getTask = async () => {
    setIsLoading(true);
    try {
      const { code, body: taskBody } = await getTaskDetails(id);
      if (code === 200) {
        setTaskDetails(taskBody);
        const { body, code } = await offerDetails(id);
        if (code === 200) setJobDetails(body[0]);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const dataAvailable = taskDetails?.status && jobDetails?.job_details;

  useEffect(() => {
    getTask();
  }, []);
  return (
    <div className="w-full mt-5 sm:mt-10 md:mt-14">
      <h2 className="mb-4 text-[25px] font-semibold">
        Submitted Task Overview
      </h2>
      {isLoading ? (
        <div className="animate-pulse bg-white rounded-xl h-60 p-8 border border-[var(--bordersecondary)]">
          <div className="h-6 bg-slate-200 rounded-lg w-2/3 mb-10"></div>
          <div className="h-7 bg-slate-200 rounded-lg mb-4 mt-1"></div>
          <div className="h-10 bg-slate-200 rounded-lg mb-4"></div>
        </div>
      ) : dataAvailable ? (
        <TaskDetails taskDetails={taskDetails} jobDetails={jobDetails} />
      ) : (
        <DataNotAvailable onRefresh={getTask} />
      )}
    </div>
  );
};

export default Task;
