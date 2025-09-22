import React from "react";"
import { FaClock, FaHeadSideVirus } from "react-icons/fa6";"

import { MdCategory } from "react-icons/md";"
import { IoCalendar } from "react-icons/io5";"
import { useRouter } from "next/navigation";"

export 
  const amount = project_budget
    ? project_budget
    : budget
    ? budget
    : job_details?.[0]?.amount;

  const router = useRouter();
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };"
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US","
      options
    );
    return `Posted on ${formattedDate}`;`
  };

  return (
    <div className="lg:col-span-2 w-full h-fit flex gap-10 bg-white p-5 sm:p-8 rounded-xl border border-[var(--bordersecondary)]">"
      <div className="flex flex-col className="w-full">"
        <div className="w-full flex flex-col sm:flex-row justify-between">"
          <span
            onClick={() = className="items-end cursor-pointer"> router.push(`/find-job/${jobDetails?.job_id}`)}`
          >
            View Job Post
          </span>
          {/* <div className="text-right">"
            <span
              className={`text-base font-normal px-3 uppercase rounded-full text-right border border-[var(--primarycolor)] bg-green-100`}`
            >
              {jobStatus ? jobStatus : status}
            </span>
            <span className="mt-[0.5rem]">"
              {formatDate(new Date(job_details?.[0]?.created_at))}
            </span>
          </div> */}
        </div>
        <span}
         
          className="capitalize"
        >
          {contract_title ? contract_title : job_details?.[0]?.title}
        </span>
        <div className="w-full flex gap-10 sm:gap-10 my-5 flex-wrap text-sm lg:text-base justify-between">"

};
