"use client";

import HomeLayout from "../../Layouts/HomeLayout";
import { ClientJobPostViewComponent } from "../../ClientJobPostViewUi";

const ClientJobPostView = () => {
  return (
    <>
      <HomeLayout>
        <ClientJobPostViewComponent />
      </HomeLayout>
    </>
  );
};

export default ClientJobPostView;
