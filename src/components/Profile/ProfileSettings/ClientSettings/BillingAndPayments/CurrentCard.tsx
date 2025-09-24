"use client";

import { toast } from "@/lib/toast";
import { useState } from "react";
import {
  FaCcAmex,
  FaCcDinersClub,
  FaCcDiscover,
  FaCcJcb,
  FaCcMastercard,
  FaCcVisa,
  FaCreditCard,
} from "react-icons/fa";
import { MdCreditCardOff, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteBankDetails } from "../../../../../helpers/APIs/payments";
import { showToast } from "../../../../../redux/toastSlice/toastSlice";
import { MainButtonRounded } from "../../../../Button/MainButton";
import UniversalModal from "../../../../Modals/UniversalModal";
import BtnSpinner from "../../../../Skeletons/BtnSpinner";
import { Button } from "@/components/ui/migration-helpers";

const getCardIcon = (brand) => {
  switch (brand?.toLowerCase()) {
    case "visa":
      return <FaCcVisa />;
    case "mastercard":
      return <FaCcMastercard />;
    case "american express":
      return <FaCcAmex />;
    case "discover":
      return <FaCcDiscover />;
    case "diners club":
      return <FaCcDinersClub />;
    case "jcb":
      return <FaCcJcb />;
    default:
      return <FaCreditCard />;
  }
};

const CurrentCard = ({ data, setData, setTab }) => {
  const [isHover, setIsHover] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { brand, exp_month, exp_year, last4, name, id } =
    data.card_details || {};
  const cardIcon = getCardIcon(brand);
  const dispatch = useDispatch();

  const removeCard = async () => {
    setIsLoading(true);
    try {
      const res = await deleteBankDetails({ type: "card", ref_id: id });
      toast.default(res.msg || "Error performing action");
      if (res.code === 200) {
        setData({}), setIsModal(false);
        dispatch(showToast());
      }
    } catch (error) {
      toast.default(error?.response?.data?.msg || "Error performing action");
    }
    setIsLoading(false);

  };

  return (
    <>
      {data.card_details ? (
        <div
          className="bg-white rounded-lg shadow-md max-w-sm mx-auto mt-4 relative overflow-hidden"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="flex items-center mb-4 text-white bg-gray-300 px-5 pt-5 pb-2">
            <div className="text-4xl mr-4">{cardIcon}</div>
            <h2 className="text-lg font-semibold">Card Details</h2>
          </div>
          <div className="p-5 pt-0">
            <div className="text-lg font-semibold mb-2">
              **** **** **** {last4}
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <div>
                <p className="font-medium text-gray-700">Cardholder Name</p>
                <p>{name}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Expires</p>
                <p>
                  {exp_month}/{exp_year}
                </p>
              </div>
            </div>
          </div>
          {isHover && (
            <MdDelete
              className="absolute top-5 right-5 cursor-pointer bg-red-50 p-1 rounded hover:bg-red-300 transition text-3xl"
              onClick={() => setIsModal(true)}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <MainButtonRounded variant="outline" onClick={() => setTab(2)}>
            Add New Card
          </MainButtonRounded>
        </div>
      )}

      <UniversalModal isModal={isModal} setIsModal={setIsModal}>
        <div className="w-[72px] h-[72px] flex items-center justify-center bg-red-50 rounded-full mx-auto">
          <MdCreditCardOff className="text-4xl text-red-500" />
        </div>
        <p className="text-xl font-semibold text-center">
          Are you sure you want to removed your card?
        </p>
        <div className="flex gap-5 sm:gap-10 mt-4 sm:mt-10">
          <Button
            onClick={() => setIsModal(false)}
            className="w-full"
          >
            No, I don&apos;t want
          </Button>
          <Button
            isLoading={isLoading}
            loadingText=" Yes, I want to removed"
            spinner={<BtnSpinner />}
            onClick={() => removeCard()}
          >
            Yes, I want to removed
          </Button>
        </div>
      </UniversalModal>
    </>
  );
};

export default CurrentCard;
