
"use client";
import React from "react";


import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { MdInsertLink } from "react-icons/md";
import axios from "axios";

const GithubCard = ({ data, isPublic }) => {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user_id } = data || {};
  const { html_url, created_at, avatar_url, name, followers } = details;

  useEffect(() => {
    const fetchGithubProfile = async () => {
      if (user_id) {
        try {
          const response = await axios.get(
            `https://api.github.com/user/${user_id}`
          );
          if (response) setDetails(response.data);
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
            <p className="text-xl font-bold text-slate-500">GitHub</p>
            {created_at && (
              <p className="text-[12px] font-medium text-gray-300 tracking-wide">
                Since {new Date(created_at).getFullYear()}
              </p>
            )}
          </div>
          {name && <p className="font-semibold text-gray-300">{name}</p>}
        </div>
        {name && <Avatar size="sm" name={name} src={avatar_url} />}
      </div>

      {html_url ? (
        <>
          <div className="flex items-center gap-2">
            <MdInsertLink className="text-gray-400 text-lg" />
            <a
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-medium"
            >
              View Profile
            </a>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <FaUsers />
            <p className="font-medium">{followers} Followers</p>
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

export default GithubCard;
