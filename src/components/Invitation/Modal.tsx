
"use client";
import React from "react";

import { useState } from "react";

import BtnSpinner from "../Skeletons/BtnSpinner";
import UniversalModal from "../Modals/UniversalModal";

const Modal = ({
  openModal,
  setOpenModal,
  acceptInvite,
  offer,
  isLoading: loaders,
}) => {
  const [messages, setMessage] = useState("");
  const { isLoading, statusValue } = loaders || {};

  const HandleTextValue = (e) => {
    setMessage(e.target.value);
  };

  return (
    <UniversalModal
      isModal={openModal}
      setIsModal={setOpenModal}
      title="Enter your message to client"
    >
      <div className="my-5">
        <textarea
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter your message..."
          rows="4"
          value={messages}
          onChange={HandleTextValue}
        />
        <p className="text-red-500 text-sm">

          }}
        >
          {offer ? "Accept Offer" : "Accept Interview"}
        </button>
      </div>
    </UniversalModal>
  );
};

export default Modal;
