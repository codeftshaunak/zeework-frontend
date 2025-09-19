import React from "react";

import { useRouter } from "next/navigation";

interface CardDetailsProps {
  message?: any;
  user_id?: string;
  role?: number;
}

const CardDetails: React.FC<CardDetailsProps> = ({ message, user_id, role }) => {
  const { title, type, job_type, amount, url, position } =
    message?.card_details || {};
  const router = useRouter();

  return (
    <>
      <div
        className="bg-gray.50 shadow text-left"
        paddingX={5}
        paddingY={3}}
       
      >
        <span className="capitalize text-sm font-bold">
          {type?.replace(/_/g, " ")}
        </span>
        <div className="border-l-2 border-green-500 pl-2 mt-1 gap-5">
          {title && (
            <span className="text-sm font-semibold">
              Title: {title}
            </span>
          )}
          {position && (
            <span className="text-xs font-semibold">
              Position: {position}
            </span>
          )}
          {job_type && (
            <span className="capitalize text-xs">
              Type: {job_type}
            </span>
          )}
          {job_type &&
            amount &&
            (job_type ? (
              <span className="text-xs font-semibold">
                {job_type === "fixed"
                  ? `Budget: $${amount}`
                  : `Hourly Rate: $${amount}`}
              </span>
            ) : (
              <span className="text-xs font-semibold">
                Price: ${amount}
              </span>
            ))}
        </div>
        {url && (
          <span
            onClick={() = className="font-medium text-green-500 ml-1 w-fit tracking-wide text-sm cursor-pointer">
              role == 1
                ? url?.agency
                  ? message.sender_id === user_id
                    ? router.push(url.agency)
                    : router.push(url.freelancer)
                  : router.push(url.freelancer)
                : url?.client && router.push(url.client)
            }
          >
            Details
          </span>
        )}
      </div>
    </>
  );
};

export default CardDetails;
