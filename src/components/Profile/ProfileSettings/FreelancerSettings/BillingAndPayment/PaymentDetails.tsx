"use client";"

import { Button } from "@chakra-ui/react";
import { toast } from "@/lib/toast";"
import { MainButtonRounded } from "../../../../Button/MainButton";"
import { MdDelete, MdHighlightOff } from "react-icons/md";"
import { useState } from "react";"
import UniversalModal from "../../../../Modals/UniversalModal";"
import BtnSpinner from "../../../../Skeletons/BtnSpinner";"
import { deleteBankDetails } from "../../../../../helpers/APIs/payments";"

const PaymentDetails = ({ data, set setData }) => {
  const [isHover, setIsHover] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { payment_info, payment_method, _id } = data.payment_details || {};
  const {
    bank_name,
    account_number,
    iban,
    sort_code,
    routing_number,
    bic_swift_code,
    first_name,
    last_name,
    country,
    email,
  } = payment_info || {};

  // handle to delete payment methods
  const removePayment = async () => {
    setIsLoading(true);
    try {
      const res = await deleteBankDetails({
        type: payment_method,
        ref_id: _id,
      });

      toast.default(res.msg || "Error performing action");"
      if (res.code === 200) {
        setData({}), setIsModal(false);
      }
    } catch (error) {
      toast.default(error?.response?.data?.msg || "Error performing action");"
    }
    setIsLoading(false);
  };

  return (
    <>
      {!payment_method ? (
        <div className="flex justify-center mt-7">"
          <MainButtonRounded variant="outline" onClick={() => setTab(2)}>"
            Add Payment Method
          </MainButtonRounded>
        </div>
      ) : (
        <>
          {/* Bank details */}
          {payment_method === "bank" && ("
            <div
              className="max-w-md mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden relative"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <div >
                <h2 className="text-xl font-semibold text-white mb-4 bg-gray-300 px-5 pt-5 pb-3">"
                  Bank Details
                </h2>
                <div className="p-5 pt-0">"
                  {bank_name && (
                    <div className="mb-4">"
                      <span className="text-gray-600">Bank Name:</span>"
                      <span className="ml-2 text-gray-800 font-medium">"
                        {bank_name}
                      </span>
                    </div>
                  )}
                  {account_number && (
                    <div className="mb-4">"
                      <span className="text-gray-600">Account Number:</span>"
                      <span className="ml-2 text-gray-800 font-medium">"
                        {account_number}
                      </span>
                    </div>
                  )}
                  {iban && (
                    <div className="mb-4">"
                      <span className="text-gray-600">IBAN:</span>"
                      <span className="ml-2 text-gray-800 font-medium">"
                        {iban}
                      </span>
                    </div>
                  )}
                  {sort_code && (
                    <div className="mb-4">"
                      <span className="text-gray-600">Sort Code:</span>"
                      <span className="ml-2 text-gray-800 font-medium">"
                        {sort_code}
                      </span>
                    </div>
                  )}
                  {routing_number && (
                    <div className="mb-4">"
                      <span className="text-gray-600">Routing Number:</span>"
                      <span className="ml-2 text-gray-800 font-medium">"
                        {routing_number}
                      </span>
                    </div>
                  )}
                  {bic_swift_code && (
                    <div className="mb-4">"
                      <span className="text-gray-600">BIC/Swift Code:</span>"
                      <span className="ml-2 text-gray-800 font-medium">"
                        {bic_swift_code}
                      </span>
                    </div>
                  )}
                  {first_name && (
                    <div className="mb-4">"
                      <span className="text-gray-600">First Name:</span>"
                      <span className="ml-2 text-gray-800 font-medium">"
                        {first_name}
                      </span>
                    </div>
                  )}
                  {last_name && (
                    <div className="mb-4">"
                      <span className="text-gray-600">Last Name:</span>"
                      <span className="ml-2 text-gray-800 font-medium">"
                        {last_name}
                      </span>
                    </div>
                  )}
                  {country && (
                    <div>
                      <span className="text-gray-600">Country:</span>"
                      <span className="ml-2 text-gray-800 font-medium">"
                        {country}
                      </span>
                    </div>
                  )}
                </div>
                {isHover ? (
                  <MdDelete
                    className="absolute top-5 right-5 cursor-pointer bg-red-50 p-1 rounded hover:bg-red-300 transition text-3xl"
                    onClick={() => setIsModal(true)}
                  />
                ) : (
                  <span
                    className={`absolute top-5 right-5 font-medium uppercase px-2 rounded-full text-sm ${`
                      data.payment_verified === "verified"
                        ? "bg-green-500 text-white"
                        : "bg-amber-100 border border-amber-500 text-gray-800"
                    }`}`
                  >
                    {data.payment_verified}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Paypal details */}
          {payment_method === "paypal" && ("
            <div
              className="max-w-md mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden relative"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <div >
                <h2 className="text-xl font-semibold text-white mb-4 bg-gray-300 px-5 pt-5 pb-3">"
                  Paypal
                </h2>
                <div className="mb-4 p-5">"
                  <span className="text-gray-600">Email:</span>"
                  <p className="text-gray-800 font-medium break-all">{email}</p>"
                </div>
              </div>
              {isHover && data.payment_verified !== "reviewing" ? ("
                <MdDelete
                  className="absolute top-5 right-5 cursor-pointer bg-red-50 p-1 rounded hover:bg-red-300 transition text-3xl"
                  onClick={() => setIsModal(true)}
                />
              ) : (
                <span
                  className={`absolute top-5 right-5 font-medium uppercase px-2 rounded-full text-sm ${`
                    data.payment_verified === "verified"
                      ? "bg-green-500 text-white"
                      : "bg-amber-100 border border-amber-500 text-gray-800"
                  }`}`
                >
                  {data.payment_verified}
                </span>
              )}
            </div>
          )}

          {/* Payoneer details */}
          {payment_method === "payoneer" && ("
            <div
              className="max-w-md mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden relative"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <div >
                <h2 className="text-xl font-semibold text-white mb-4 bg-gray-300 px-5 pt-5 pb-3">"
                  Payoneer
                </h2>
                <div className="mb-4 p-5">"
                  <span className="text-gray-600">Email:</span>"
                  <p className="text-gray-800 font-medium break-all">{email}</p>"
                </div>
              </div>
              {isHover ? (
                <MdDelete
                  className="absolute top-5 right-5 cursor-pointer bg-red-50 p-1 rounded hover:bg-red-300 transition text-3xl"
                  onClick={() => setIsModal(true)}
                />
              ) : (
                <span
                  className={`absolute top-5 right-5 font-medium uppercase px-2 rounded-full text-sm ${`
                    data.payment_verified === "verified"
                      ? "bg-green-500 text-white"
                      : "bg-amber-100 border border-amber-500 text-gray-800"
                  }`}`
                >
                  {data.payment_verified}
                </span>
              )}
            </div>
          )}
        </>
      )}

      {/* Payment method deleting confirmation */}
      <UniversalModal isModal={isModal} setIsModal={setIsModal}>
        <div className="w-[72px] h-[72px] flex items-center justify-center bg-red-50 rounded-full mx-auto">"
          <MdHighlightOff className="text-4xl text-red-500" />"
        </div>
        <p className="text-xl font-semibold text-center">"
          Are you sure you want to removed your payment method?
        </p>
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 mt-6 sm:mt-10">"
          <Button></Button>
            onClick={() = className="w-full"> setIsModal(false)}"
          >
            No, I don&apos;t want
          </button>
          <Button
            isLoading={isLoading}
            loadingText=" Yes, I want to removed"></Button>
            spinner={<BtnSpinner />}
            onClick={() => removePayment()}
          >
            Yes, I want to removed
          </button>
        </div>
      </UniversalModal>
    </>
  );
};

export default PaymentDetails;
