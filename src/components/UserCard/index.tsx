import React from 'react';
import Image from 'next/image';
import { AiOutlineStar } from "react-icons/ai";
import { BsBriefcase, BsSend } from "react-icons/bs";

const UserCard: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <Image
        src="/images/user.jpeg"
        alt="user"
        className="w-20 h-20 rounded-full object-cover"
        width={80}
        height={80}
      />

      <div className="flex flex-col">
        <span className="mb-[0]">
          Sasheen M.
        </span>
        <span className="mb-[0]">Customer Experience Consultant</span>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row items-center gap-1">
          <AiOutlineStar />
          <span>5.0</span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <BsSend />
          <span>$65.00/hr</span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <BsBriefcase />
          <span>$65.00/hr</span>
        </div>
      </div>
      <span className="font-medium text-center">
        “ZeeWork has enabled me to increase my rates. I know what I’m bringing to
        the table and love the feelings of being able to help a <br />
        variety of clients.”
      </span>
    </div>
  );
};

export default UserCard;
