import React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Home } from "lucide-react";

interface JobDetailsSkeletonProps {
  hideNavigation?: boolean;
}

const JobDetailsSkeleton = ({ hideNavigation }: JobDetailsSkeletonProps) => {
  return (
    <>
      <div className="w-full mx-auto">
        <div className="flex w-full py-6">
          <div className="w-full">

};

export default JobDetailsSkeleton;
