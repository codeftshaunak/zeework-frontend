
"use client";
import Link from "next/link";
import React from "react";



const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex items-center justify-center h-[100%]">
        <div maxW="xl" className="w-full">
          <div
           
            bgSize="cover"
            bgPos="center"
          >
            <h1 className="text-4xl font-bold">
              404
            </h1>
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              {`Looks like you're lost`}
            </h3>

            <span>The page you are looking for is not available!</span>

            <Link href="/" className="no-underline">
              <div className="hover:bg-green-600 px-4 py-2 bg-green-500 text-white rounded">
                Go to Home
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
