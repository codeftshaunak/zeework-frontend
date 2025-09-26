import React from "react";

import { useRouter } from "next/navigation";
import Link from "next/link"

const ContractCard = ({ job }) => {
  const { _id, job_type, contract_title, hourly_rate, budget, status } =
    job || [];
  const router = useRouter();
  return (
    <div>
      {" "}
      <div
        borderWidth="1px"
        className="items-center justify-center flex flex-col border p-4 m-2 rounded lg:max-w-[380px] lg:h-[200px] md:h-[180px] md:max-w-[360px] max-w-[520px] h-[240px] my-auto mx-auto relative bg-white border-[var(--bordersecondary)] overflow-hidden cursor-pointer"
        onClick={() => {
          router.push(`/assigned-contract/${_id}`);
        }}
        _hover={{
          border: "1px solid var(--primarycolor)",
        }}
      >
        <span
          className={`${
            status === "task_submitted"
              ? "bg-amber-200 border-amber-500"
              : "bg-green-300 border-green-500"
          } rounded-full border px-3 font-medium absolute top-5 right-5`}
        >
          {status === "task_submitted" ? "Task Submited" : "Active"}
        </span>
        <div className="flex flex-col">
          <img src="./images/active_job.png" />
        </div>
        <div>
          <Link
            href={`/assigned-contract/${_id}`}
            className="text-[1.2rem] font-bold capitalize"
          >
            {contract_title?.length > 20
              ? contract_title.slice(0, 20) + "..."
              : contract_title}
          </Link>

          <div className="flex flex-col justify-around w-[200px] m-[auto]"
          >
            <span
             className="mb-[0] font-semibold">
              Job Type:{" "}
              {job_type == "fixed"
                ? "Fixed"
                : job_type == "hourly"
                ? "Hourly"
                : ""}
            </span>
            <span className="font-semibold">
              {job_type === "fixed"
                ? `Budget: $${budget}`
                : `Rate/Hr: $${hourly_rate}`}
            </span>
          </div>
        </div>
        {/* <div backgroundColor={"var(--primarycolor)"} className="p-[1px 8px] text-white rounded" top="10px" right="10px" className="font-600 absolute">
      <span>{experience}</span>
    </div> */}
      </div>
    </div>
  );
};

export default ContractCard;
