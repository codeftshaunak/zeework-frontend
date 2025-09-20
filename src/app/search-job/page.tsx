"use client";

import React from "react";
import HomeLayout from "../../components/Layouts/HomeLayout";
import ModernSearchPage from "../../components/FindJobUi/ModernSearchPage";

export default function SearchJobPage() {
  return (
    <HomeLayout>
      <div className="flex flex-col p-0 w-full">
        <ModernSearchPage isFreelancer={true} />
      </div>
    </HomeLayout>
  );
}