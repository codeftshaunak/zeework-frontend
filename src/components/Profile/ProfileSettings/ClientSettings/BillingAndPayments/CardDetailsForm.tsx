
"use client";
import React from "react";
import { toast } from "@/lib/toast";

import {
  Box,
  Button,
  Input,
  InputGroup,
  Text,
} from "@/components/ui/migration-helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { CurrentUserContext } from "../../../../../contexts/CurrentUser";
import { getCountries } from "../../../../../helpers/APIs/freelancerApis";
import { addPaymentMethods } from "../../../../../helpers/APIs/payments";
import { billingSchema } from "../../../../../schemas/payments";
import BtnSpinner from "../../../../Skeletons/BtnSpinner";
import ErrorMsg from "../../../../utils/Error/ErrorMsg";
import { useDispatch } from "react-redux";
import { hideToast } from "../../../../../redux/toastSlice/toastSlice";

export const CardDetailsForm = ({ setCard }) => {
  const { getUserDetails } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    reset,
    setError,
  } = useForm({ resolver: yupResolver(billingSchema) });
  const [countries, setCountries] = useState([]);
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

  useEffect(() => {
    const getCountriesList = async () => {
      try {
        const { body, code } = await getCountries();
        if (code === 200)
          setCountries(
            body?.map((country) => ({
              name: country.name,
              value: country.name,
              label: country.name,
            }))
          );
      } catch (error) {
        console.error(error);
      }
    };

    getCountriesList();
  }, []);

  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    try {
      const { error, token } = await stripe.createToken(
        elements.getElement(CardNumberElement),
        {
          name: `${data.firstName} ${data.lastName}`,
          ...data,
        }
      );

      if (error) {
        switch (error?.type) {
          case "validation_error":
            if (error?.code === "incomplete_number") {
              setError("cardNumber", {
                type: "manual",
                message: error?.message || "Please enter a valid card number.",
              });
            } else if (
              error?.code === "incomplete_expiry" ||
              error?.code === "invalid_expiry_year_past"
            ) {
              setError("cardExpiry", {
                type: "manual",
                message: error?.message || "Please enter a valid expiry date.",
              });
            } else if (error?.code === "incomplete_cvc") {
              setError("cardCvc", {
                type: "manual",
                message: error?.message || "Please enter a valid CVC.",
              });
            } else {
              setError("cardNumber", {
                type: "manual",
                message: error?.message || "Please recheck card details!",
              });
            }
            break;
          default:
            setError("cardNumber", {
              type: "manual",
              message: error?.message || "Please recheck card details!",
            });
            break;
        }
      } else {
        const { code, msg, body } = await addPaymentMethods({ token });

        toast.default(msg);

        if (code === 200) {
          sessionStorage.setItem("paymentNotify", "true");
          await getUserDetails();
          dispatch(hideToast());
          setTab(1);
          setCard({
            payment_verified: body?.payment_verified,
            card_details: body?.card_details,
          });
          reset();
          elements.getElement(CardNumberElement).clear();
          elements.getElement(CardExpiryElement).clear();
          elements.getElement(CardCvcElement).clear();
        } else {
          setError("general", {
            type: "manual",
            message: msg || "Something went wrong!",
          });
        }
      }
    } catch (error) {
      setError("general", {
        type: "manual",
        message: error?.response?.data?.msg || "Something went wrong!",
      });
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className="mb-[10px]">
        Card Details
      </span>
      <div>
        <div
          className="grid"
         
         
        >
          <InputGroup>
            <span className="mb-[10px]">
              Card Number
            </span>
            <CardNumberElement className="px-4 py-2.5 rounded-md border border-[var(--bordersecondary)] bg-white" />
            {errors.cardNumber && <ErrorMsg msg={errors.cardNumber.message} />}
          </InputGroup>
          <InputGroup className="flex flex-col md:flex-row">
            <InputGroup>
              <span className="mb-[10px]">
                Expiration Date
              </span>
              <CardExpiryElement className="px-4 py-2.5 rounded-md border border-[var(--bordersecondary)] bg-white" />
              {errors.cardExpiry && (
                <ErrorMsg msg={errors.cardExpiry.message} className="-mb-5" />
              )}
            </InputGroup>
            <InputGroup>
              <span className="mb-[10px]">
                CVC
              </span>
              <CardCvcElement className="px-4 py-2.5 rounded-md border border-[var(--bordersecondary)] bg-white" />
              {errors.cardCvc && (
                <ErrorMsg msg={errors.cardCvc.message} className="-mb-5" />
              )}
            </InputGroup>
          </InputGroup>
        </div>
      </div>
      {errors.general && <ErrorMsg msg={errors.general.message} />}
      <span
       
       
        marginTop={10}
        className="mb-[10px]"
      >
        Billing Address
      </span>
      <div
        className="grid"
       
       
      >
        <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"Group flexDir={{ base: "column", xl: "row" }}>
          <InputGroup>
            <span className="mb-[10px]">
              First Name
            </span>
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...register("firstName")}
              placeholder="First Name"
            />
            {errors.firstName && <ErrorMsg msg={errors.firstName.message} />}
          </InputGroup>
          <InputGroup>
            <span className="mb-[10px]">
              Last Name
            </span>
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...register("lastName")}
              placeholder="Last Name"
            />
            {errors.lastName && <ErrorMsg msg={errors.lastName.message} />}
          </InputGroup>
        </InputGroup>
        <div>
          <span className="mb-[10px]">
            Country
          </span>
          <Select
            {...register("address_country")}
            placeholder="Select Country"
            options={countries}
            onChange={(data) => {
              setValue("address_country", data.name),
                trigger("address_country");
            }}
          />
          {errors.address_country && (
            <ErrorMsg msg={errors.address_country.message} />
          )}
        </div>
        <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"Group flexDir={{ base: "column", xl: "row" }}>
          <InputGroup>
            <span className="mb-[10px]">
              City
            </span>
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...register("address_city")}
              placeholder="City"
            />
            {errors.address_city && (
              <ErrorMsg msg={errors.address_city.message} />
            )}
          </InputGroup>
          <InputGroup>
            <span className="mb-[10px]">
              Postal Code
            </span>
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...register("address_zip")}
              placeholder="Postal Code"
            />
            {errors.address_zip && (
              <ErrorMsg msg={errors.address_zip.message} />
            )}
          </InputGroup>
        </InputGroup>
        <InputGroup>
          <span className="mb-[10px]">
            Address Line 1
          </span>
          <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            {...register("address_line1")}
            type="text"
            placeholder="Address Line 1"
          />
          {errors.address_line1 && (
            <ErrorMsg msg={errors.address_line1.message} />
          )}
        </InputGroup>
        <InputGroup>
          <span className="mb-[10px]">
            Address Line 2 <span>(Optional)</span>
          </span>
          <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            {...register("address_line2")}
            type="text"
            placeholder="Address Line 2"
          />
        </InputGroup>
      </div>
      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        isLoading={isLoading}
        type="submit"
        paddingX={isLoading ? 5 : 10}
        loadingText="Adding Card"
        spinner={<BtnSpinner />}
      >
        Save Details
      </button>
    </form>
  );
};
