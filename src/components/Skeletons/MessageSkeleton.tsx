
import React from "react";
import { Avatar, Skeleton } from "@/components/ui/migration-helpers";



export const MessageUsersSkeleton = () => {
  return (
    <div>
      <div
        className="items-center flex h-[90px] w-full border rounded-2xl bg-white mt-[2rem] cursor-pointer opacity-50 cursor-not-allowed"
      >
        <div className="flex items-center"
          
         
          justify="between"
        >
          <div>
            <Avatar size="md" round="20px" />
          </div>
          <div
            style={{marginLeft: '1rem'}}
          >
            <Skeleton></Skeleton>
            <Skeleton marginTop={3}></Skeleton>
            <Skeleton marginTop={2}></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MessageBodySkeleton = () => {
  return (
    <div
      className="border shadow-sm bg-white rounded relative h-[80%] overflow-hidden cursor-not-allowed"
    >
      <div className="flex items-center"
        borderBottom="1px"
        borderColor="gray.400"
       
      >
        <Avatar size="md" round="20px" />
        <div className="flex flex-col">
          <Skeleton></Skeleton>
          <Skeleton marginTop={3}></Skeleton>
        </div>
      </div>

      <div className="flex flex-col items-start w-full h-[100%] relative"
      >
        <div
          className="h-[69vh] w-full flex overflow-y-auto flex-col justify-start"
        >
          <div className="flex flex-row items-center mt-2">
            <Avatar size="sm" round="20px" opacity="0.5" />
            <div className="flex flex-col">
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
            </div>
          </div>
          <div className="flex flex-row items-center ml-auto">
            <div className="flex flex-col justify-end items-end">
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
            </div>
            <Avatar size="sm" round="20px" opacity="0.5" />
          </div>
          <div className="flex flex-row items-center items-start mt-2">
            <Avatar size="sm" round="20px" opacity="0.5" />
            <div className="flex flex-col">
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
            </div>
          </div>
          <div className="flex flex-row items-center ml-auto">
            <div className="flex flex-col justify-end items-end">
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
            </div>
            <Avatar size="sm" round="20px" opacity="0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
