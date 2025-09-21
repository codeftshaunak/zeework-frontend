"use client";

import React from "react";
import HomeLayout from "../../components/Layouts/HomeLayout";
import ModernAllJobs from "../../components/FindJobUi/ModernAllJobs";

export default function FindJobPage() {
  return (
    <HomeLayout>
      <div className="flex flex-col w-full justify-center">
        <ModernAllJobs />
      </div>
    </HomeLayout>
  );
}