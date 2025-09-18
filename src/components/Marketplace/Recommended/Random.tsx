"use client";

import { useEffect, useState } from "react";
import GigCards from "../GigCards/GigCards";
import { getSearchGigs } from "../../../helpers/APIs/gigApis";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";

const Random = () => {
  const [gigs, setGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  const getAllGigs = async (page = 1) => {
    try {
      setIsLoading(true);
      const { code, body } = await getSearchGigs({ page, limit: 10 });
      if (code === 200) {
        setGigs(body.gigs);
        setTotalPages(body.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllGigs(currentPage);
  }, [currentPage]);

  return (
    <div className="bg-misty-rose p-5 rounded-md">
      <h1 className="text-3xl font-semibold text-center md:text-left capitalize">
        Random
      </h1>
      <div className="text-center py-4">
        <div>
          <GigCards gigs={gigs?.slice(0, 6)} isLoading={isLoading} />
        </div>
      </div>
      <Button
        variant={"outline"}
        colorScheme="primary"
        bgColor={"white"}
        rounded={"full"}
        size={"sm"}
        px={10}
        onClick={() => router.push("/marketplace/search?type=random")}
        isDisabled={isLoading}
      >
        See More
      </Button>
    </div>
  );
};

export default Random;
