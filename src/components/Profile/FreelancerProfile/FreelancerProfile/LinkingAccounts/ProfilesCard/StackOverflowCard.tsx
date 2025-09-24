
"use client";
import React from "react";
import Avatar from "@/components/ui/Avatar";

import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { MdInsertLink } from "react-icons/md";
import axios from "axios";

const StackOverflowCard = ({ data, isPublic }) => {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user_id } = data || {};
  const { creation_date, link, profile_image, display_name } = details;

  useEffect(() => {
    const fetchGithubProfile = async () => {
      if (user_id) {
        try {
          const response = await axios.get(
            `https://api.stackexchange.com/2.3/users/${user_id}`,
            {
              params: {
                order: "desc",
                sort: "reputation",
                filter: "!9Z(-wwYGT",
                site: "stackoverflow",
              },
            }
          );

          if (response) setDetails(response.data?.items?.[0]);
        } catch (error) {
          console.error("Failed to fetch GitHub profile:", error);
        }
        setIsLoading(false);
      }
    };

    fetchGithubProfile();
  }, [user_id]);

  return (
    <div className="grid gap-2">
      <div className="flex justify-between gap-1">
        <div>
          <div className="flex items-end gap-1">
            <p className="text-xl font-bold text-slate-500">StackOverflow</p>
            {creation_date && (
              <p className="text-[12px] font-medium text-gray-300 tracking-wide">
                Since {new Date(creation_date * 1000).getFullYear()}
              </p>
            )}
          </div>
          {display_name && (
            <p className="font-semibold text-gray-300">{display_name}</p>
          )}
        </div>
        {display_name && (
          <Avatar size="sm" src={profile_image} name={display_name} />
        )}
      </div>

      {link ? (
        <>
          <div className="flex items-center gap-2">
            <MdInsertLink className="text-gray-400 text-lg" />
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-medium"
            >
              View Profile
            </a>
          </div>
        </>
      ) : (
        <p className="text-center p-1 bg-white rounded-md text-gray-300">
          Not Found
        </p>
      )}
      {/* {!isPublic && <p className="underline cursor-pointer w-fit">Unlink</p>} */}
    </div>
  );
};

export default StackOverflowCard;
