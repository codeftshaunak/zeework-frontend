"use client";

import React, { useState, ReactNode } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
// import { AgencyUpdatedModal } from "./ProfileUpdated";

interface AgencyTitleProps {
  children: ReactNode;
  isValue?: boolean;
  data?: []; // Replace `any` with a proper type once you know the shape
  setAgency?: (value: []) => void; // Replace `any` with the right type
  noAdded?: boolean;
  isSmall?: boolean;
}

const AgencyTitle: React.FC<AgencyTitleProps> = ({
  children,
  isValue = false,
  data,
  setAgency,
  noAdded = false,
  isSmall = false,
}) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <div className="flex flex-row items-center mt-4 mb-2">
        <span className={`font-semibold ${isSmall ? "text-sm" : "text-lg"}`}>
          {children}
        </span>

        {isValue && (
          <div
            className="flex items-center justify-center w-5 h-5 ml-2 transition duration-200 border rounded cursor-pointer hover:border-primary hover:bg-transparent hover:text-primary"
            onClick={() => setIsModal(true)}
          >
            <RiEdit2Fill size={14} />
          </div>
        )}

        {!isValue && noAdded && (
          <div
            className="flex items-center justify-center ml-2 transition duration-200 border rounded cursor-pointer h-7 w-7 hover:border-primary hover:bg-transparent hover:text-primary"
            onClick={() => setIsModal(true)}
          >
            <FiPlus size={16} />
          </div>
        )}
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
