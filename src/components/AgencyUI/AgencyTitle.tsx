"use client";

import React, { useState } from "react";

import { RiEdit2Fill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
// import { AgencyUpdatedModal } from "./ProfileUpdated";

const AgencyTitle = ({
  children,
  isValue,
  data,
  setAgency,
  noAdded,
  isSmall,
}) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <div className="flex flex-row items-center className="mb-[0.5rem] mt-[1rem]">
        <span : "1.3rem"
          }
         className="mb-[0] font-semibold">
          {children}
        </span>
        {isValue && (
          <div className="className= flex flex-col backgroundColor= cursor-pointer"rounded w-[20px] border h-[20px] items-center justify-center"
            transition="0.6s ease-in-out"
            _hover={{
              border: "2px solid var(--primarycolor)",
              backgroundColor: "transparent",
              color: "var(--primarycolor)",
            }}
            onClick={() => setIsModal(true)}
          >
            <RiEdit2Fill />
          </div>
        )}
        {noAdded ||
          (!isValue && (
            <div className="className= flex flex-col backgroundColor= cursor-pointer"rounded w-[30px] border h-[30px] items-center justify-center"
              transition="0.6s ease-in-out"
              _hover={{
                border: "2px solid var(--primarycolor)",
                backgroundColor: "transparent",
                color: "var(--primarycolor)",
              }}
              onClick={() => setIsModal(true)}
            >
              <FiPlus />
            </div>
          ))}
      </div>
      {/* {isModal && (
        <AgencyUpdatedModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={children}
          data={data}
          setAgency={setAgency}
        />
      )} */}
    </>
  );
};

export default AgencyTitle;
