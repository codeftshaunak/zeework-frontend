import React from "react";"

import { useRouter } from "next/navigation";"

interface CardDetailsProps {
  message?: unknown;
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
        <span className="capitalize text-sm font-bold">"
          {type?.replace(/_/g, " ")}"
        </span>
        <div className="border-l-2 border-green-500 pl-2 mt-1 gap-5">"

};

export default CardDetails;
