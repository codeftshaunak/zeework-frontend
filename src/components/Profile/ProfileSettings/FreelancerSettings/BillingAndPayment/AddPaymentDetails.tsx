"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, useToast, Box } from "@chakra-ui/react";
import { addPaymentMethods } from "../../../../../helpers/APIs/payments";
import {
  addBankSchema,
  addPayoneerSchema,
  addPaypalSchema,
} from "../../../../../schemas/payments";
import { PaymentCard } from "../../../PaymentMethod";
import { FaPaypal } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import Select from "react-select";
import BtnSpinner from "../../../../Skeletons/BtnSpinner";
import UniversalModal from "../../../../Modals/UniversalModal";
import ErrorMsg from "../../../../utils/Error/ErrorMsg";
import { getCountries } from "../../../../../helpers/APIs/freelancerApis";

const addAccountSchema = (type) => {
  if (type === "bank") {
    return addBankSchema;
  } else if (type === "paypal") {
    return addPaypalSchema;
  } else if (type === "payoneer") {
    return addPayoneerSchema;
  }
};

const AddPaymentDetails = ({ setBank, setTab }) => {
  const [isModal, setIsModal] = useState(false);
  const [formType, setFormType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(addAccountSchema(formType)),
  });
  const toast = useToast();
  console.log(errors);
  // save payment info
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { code, msg, body } = await addPaymentMethods({
        payment_method: formType,
        payment_details: data,
      });

      toast({
        title: msg,
        status: code === 200 ? "success" : "warning",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      if (code === 200) {
        setBank({
          payment_verified: body?.payment_verified,
          payment_details: body?.payment_details,
        });
        setTab(1);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: error?.response?.data?.msg || "Error performing action",
        duration: 3000,
        position: "top-right",
        status: "warning",
        isClosable: true,
      });
    }
    setIsLoading(false);
    setIsModal(false);
    setFormType("");
    reset();
  };

  const handleCancel = () => {
    setIsModal(false);
    setFormType("");
    reset();
  };

  const getCountriesList = async () => {
    try {
      const { code, body } = await getCountries();
      if (code === 200)
        setCountries(
          body?.map((country) => ({
            ...country,
            label: country.name,
            value: country.name,
          }))
        );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reset();
    if (!isModal) setFormType("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModal]);

  useEffect(() => {
    getCountriesList();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full mt-5">
        <p className="text-[#374151] text-xl font-[600] mb-4">
          Select Payment Gateway
        </p>
        <div className="flex flex-col xl:flex-row gap-[8px]">
          <PaymentCard
            title="Bank Transfer"
            icon={<CiBank />}
            modalType={"bank"}
            setModalType={setFormType}
            setIsModal={setIsModal}
          />
          <PaymentCard
            title="Paypal"
            icon={<FaPaypal />}
            modalType={"paypal"}
            setModalType={setFormType}
            setIsModal={setIsModal}
          />
          <PaymentCard
            title="Payoneer"
            icon={null}
            modalType={"payoneer"}
            setModalType={setFormType}
            setIsModal={setIsModal}
          />
        </div>
      </div>

      {/* Update Account Information */}
      <UniversalModal
        isModal={isModal}
        setIsModal={setIsModal}
        title={`Add your ${formType} here`}
        size="3xl"
      >
        <Box
          className="overflow-y-auto"
          style={{ maxHeight: `calc(100vh - 15vh)` }}
          sx={{
            "&::WebkitScrollbar": {
              width: "0px",
            },
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* add bank info */}
            {formType == "bank" && (
              <div className="grid gap-4">
                <p className="mb-4 text-justify">
                  <span className="text-red-500">*</span> Our form is built to
                  cater to banks worldwide. Please enter all information that is
                  relevant to your bank.
                </p>

                <div className="bg-slate-100 rounded p-2 space-y-4 border shadow">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="bank-name" className="font-semibold">
                      Bank Name:
                    </label>
                    <input
                      {...register("bank_name")}
                      type="text"
                      id="bank-name"
                      placeholder="Enter Bank Name"
                      className="border px-3 py-2 rounded-md focus:outline-none  placeholder:text-gray-300"
                    />
                    {errors.bank_name && (
                      <ErrorMsg msg={errors.bank_name.message} />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="account-number" className="font-semibold">
                      Account Number:
                    </label>
                    <input
                      {...register("account_number")}
                      type="text"
                      id="account-number"
                      placeholder="Enter Account Number"
                      className="border px-3 py-2 rounded-md focus:outline-none  placeholder:text-gray-300"
                    />
                    {errors.account_number && (
                      <ErrorMsg msg={errors.account_number.message} />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="iban" className="font-semibold">
                      IBAN:
                    </label>
                    <input
                      {...register("iban")}
                      type="text"
                      id="iban"
                      placeholder="Enter IBAN"
                      className="border px-3 py-2 rounded-md focus:outline-none  placeholder:text-gray-300"
                    />
                    {errors.account_or_iban && (
                      <ErrorMsg msg={errors.account_or_iban.message} />
                    )}
                  </div>
                </div>
                <div className="bg-slate-100 rounded p-2 border shadow">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="sort-code" className="font-semibold">
                        Sort Code:
                      </label>
                      <input
                        {...register("sort_code")}
                        type="text"
                        id="sort-code"
                        placeholder="Enter Sort Code"
                        className="border px-3 py-2 rounded-md focus:outline-none  placeholder:text-gray-300"
                      />
                      {errors.sort_code && (
                        <ErrorMsg msg={errors.sort_code.message} />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="routing-number" className="font-semibold">
                        Routing Number:
                      </label>
                      <input
                        {...register("routing_number")}
                        type="text"
                        id="routing-number"
                        placeholder="Enter Routing Number"
                        className="border px-3 py-2 rounded-md focus:outline-none  placeholder:text-gray-300"
                      />
                      {errors.routing_number && (
                        <ErrorMsg msg={errors.routing_number.message} />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="bic-swift-code" className="font-semibold">
                        BIC/SWIFT Code:
                      </label>
                      <input
                        {...register("bic_swift_code")}
                        type="text"
                        id="bic-swift-code"
                        placeholder="Enter BIC/SWIFT Code"
                        className="border px-3 py-2 rounded-md focus:outline-none  placeholder:text-gray-300"
                      />
                      {errors.bic_swift_code && (
                        <ErrorMsg msg={errors.bic_swift_code.message} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-slate-100 rounded p-2 space-y-4 border shadow">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col gap-1 w-full">
                      <label htmlFor="first-name" className="font-semibold">
                        First Name:
                      </label>
                      <input
                        {...register("first_name")}
                        type="text"
                        id="first-name"
                        placeholder="Enter First Name"
                        className="border px-3 py-2 rounded-md focus:outline-none  placeholder:text-gray-300"
                      />
                      {errors.first_name && (
                        <ErrorMsg msg={errors.first_name.message} />
                      )}
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <label htmlFor="last-name" className="font-semibold">
                        Last Name:
                      </label>
                      <input
                        {...register("last_name")}
                        type="text"
                        id="last-name"
                        placeholder="Enter Last Name"
                        className="border px-3 py-2 rounded-md focus:outline-none  placeholder:text-gray-300"
                      />
                      {errors.last_name && (
                        <ErrorMsg msg={errors.last_name.message} />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="country" className="font-semibold">
                      Country:
                    </label>
                    <Select
                      {...register("country")}
                      placeholder="Select Country"
                      options={countries}
                      onChange={(data) => {
                        setValue("country", data.value), trigger("country");
                      }}
                      isLoading={!countries?.length}
                    />
                    {errors.country && (
                      <ErrorMsg msg={errors.country.message} />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="personal-details" className="font-semibold">
                      Personal Details:{" "}
                      <span className="text-gray-300">(Optional)</span>
                    </label>
                    <textarea
                      {...register("personal_details")}
                      id="personal-details"
                      placeholder="Enter Personal Details"
                      className="border px-3 py-2 rounded-md focus:outline-none  placeholder:text-gray-300"
                    ></textarea>
                    {errors.personal_details && (
                      <ErrorMsg msg={errors.personal_details.message} />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* add paypal info */}
            {formType == "paypal" && (
              <>
                <h2 htmlFor="paypal" className="mb-2">
                  Please Write Your Paypal Connected Email
                </h2>
                <div>
                  <input
                    type="text"
                    className="py-2 px-3 outline-none border-[1px] rounded-md w-full focus:outline-none  placeholder:text-gray-300  text-gray-400 font-[400] border-[var(--bordersecondary)] "
                    placeholder="Email"
                    {...register("email")}
                  />
                </div>
                {errors.email && <ErrorMsg msg={errors.email.message} />}
              </>
            )}

            {/* add payoneer info */}
            {formType == "payoneer" && (
              <>
                <h2 htmlFor="paypal" className="mb-2">
                  Please Write Your Payoneer Connected Email
                </h2>
                <div>
                  <input
                    type="text"
                    className="py-2 px-3 outline-none border-[1px] rounded-md w-full focus:outline-none  placeholder:text-gray-300  text-gray-400 font-[400] border-[var(--bordersecondary)] "
                    placeholder="Email"
                    {...register("email")}
                  />
                </div>
                {errors.email && <ErrorMsg msg={errors.email.message} />}
              </>
            )}

            <div className="text-right mt-10 flex justify-end gap-10 mb-1">
              <Button
                colorScheme="primary"
                variant={"outline"}
                paddingX={10}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                loadingText="Submit"
                colorScheme="primary"
                type="submit"
                paddingX={10}
                spinner={<BtnSpinner />}
              >
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </UniversalModal>
    </>
  );
};

export default AddPaymentDetails;
