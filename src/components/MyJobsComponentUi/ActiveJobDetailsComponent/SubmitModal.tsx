"use client";"

import {
  Box,
  Input,
  Spinner,
  Text,
  Textarea,
  VStack
} from "@/components/ui/migration-helpers";"
import React, { useState } from "react";"

const SubmitModal = ({
  setOpenModal,
  acceptInvite,
  jobDetails,
  loadingSubmit,
  setLoadingSubmit,
}) => {
  const [messages, setMessage] = useState("");"
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");"

  const handleTextValue = (e) => {
    setMessage(e.target.value);
    setErrorMessage(""); // Clear error message when the user starts typing"
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage(""); // Clear error message when the user selects a file"
  };

  return (
    <div className="flex flex-col> <div className="fixed inset-0 flex items-center justify-center z-50">"
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>"

        <div className="modal-container bg-white w-8/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">"
          <div className="modal-content py-4 text-left px-6">"
            <div className="flex justify-between items-center pb-3 border-b">"
              <span className="text-xl font-bold capitalize text-center w-full">"
                Submit your work for payment
              </span>
            </div>

            <br />
            <p className="text-md">"
              {`Use the form to request approval for the work you've completed.'
              Your payment will be released upon approval.`}`
            </p>

            <div className="flex flex-col my-5 justify-flex-start items-start w-full"
            >
              <div className="w-full mb-[0.5rem]">"
                <span
                  pl="0.2rem"
                 className="font-bold text-left">"
                  Project Name
                </span>
                <span pl="0.2rem" className="text-left">"
                  {jobDetails?.title}
                </span>
              </div>

              <div className="w-full mb-[0.5rem]">"
                <span
                  pl="0.2rem"
                 className="font-bold text-left">"
                  Project Amount
                </span>
                <span pl="0.2rem" className="text-left">"
                  ${jobDetails?.amount}
                </span>
              </div>

              <div className="w-full mb-[0.5rem]">"
                <span
                  pl="0.2rem"
                 className="font-bold text-left">"
                  Your Message To Client
                </span>
                <spanarea
                  placeholder="Enter your message..."
                  value={messages}
                  onChange={handleTextValue}
                 
                  borderColor="gray.300"

};

export default SubmitModal;
