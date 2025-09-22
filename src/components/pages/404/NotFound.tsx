
"use client";"
import React from "react";"


import { Link as ReactLink } from "react-router";"

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col className="h-[100vh]">"
      <div className="flex items-center justify-center className="h-[100%]">"
        <div maxW="xl" className="w-full">"
          <div
           
            bgSize="cover"
            bgPos="center"
          >
            <Heading>
              404
            </Heading>
          </div>

          <div>
            <Heading as="h3">"
              {`Looks like you're lost`}`
            </Heading>

            <span>The page you are looking for is not available!</span>

            <Link as={ReactLink} to="/" textDecoration="none">"
              <div
                _hover={{ bgColor: "#307525" }}"
              >
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
