import React from "react";

import CreateForm from "./CreateForm";

const CreateAgency = () => {
  return (
    <div className="flex flex-col justify-flex-start items-center w-full mt-[3%]">
      <h1 className="font-[500] text-2xl sm:text-3xl mb-5">
        Create Your Agency Profile Right Now...
      </h1>
      <CreateForm />
    </div>
  );
};

export default CreateAgency;
