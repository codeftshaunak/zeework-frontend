
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
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { CurrentUserContext } from "../../../../../contexts/CurrentUser";
import { getCountries } from "../../../../../helpers/APIs/freelancerApis";

import { useDispatch } from "react-redux";
import { addPaymentMethods } from "../../../../../helpers/APIs/payments";
import { hideToast } from "../../../../../redux/toastSlice/toastSlice";
import { paypalCardSchema } from "../../../../../schemas/payments";
import BtnSpinner from "../../../../Skeletons/BtnSpinner";
import ErrorMsg from "../../../../utils/Error/ErrorMsg";

export const PayPalCardForm = ({ setCard, setTab }) => {
  const { getUserDetails } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(paypalCardSchema) });
  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getCountriesList = async () => {
      try {
        const { body, code } = await getCountries();
        if (code === 200)
          setCountries(
            body?.map((country) => ({
              name: country.name,
              value: country.code || country.name,
              label: country.name,
            }))
          );
      } catch (error) {
        console.error(error);
      }
    };

    getCountriesList();
  }, []);

  const formatCardNumber = (e) => {
    const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      const formatted = parts.join(" ");
      e.target.value = formatted;
      setValue("card_number", formatted);
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2, 6)}`;
    }
    setValue("expiry", value);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const [expire_month, expire_year] = data.expiry.split("/");
      const reqBody = {
        ...data,
        expire_month: expire_month.padStart(2, "0"),
        expire_year,
        card_number: data.card_number.replace(/\s/g, ""),
      };
      const { code, msg, body } = await addPaymentMethods(reqBody);

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
      }
    } catch (error) {
      toast.warning(error?.response?.data?.msg || "Something went wrong!");
    }
    setIsLoading(false);

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text>
        Card Details
      </Text>

      <div
        className="grid"
       
       
      >
        <InputGroup>
          <Text>
            Card Number
          </Text>
          <Input
            {...register("card_number")}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            onChange={formatCardNumber}
          />
          {errors.card_number && <ErrorMsg msg={errors.card_number.message} />}
        </InputGroup>

        <InputGroup flexDir={{ base: "column", md: "row" }}>
          <InputGroup>
            <Text>
              Expiration Date
            </Text>
            <Input
              {...register("expiry")}
              placeholder="MM/YYYY"
              maxLength={7}
              onChange={handleExpiryChange}
            />
            {errors.expiry && <ErrorMsg msg={errors.expiry.message} />}
          </InputGroup>

          <InputGroup>
            <Text>
              CVV/CVC
            </Text>
            <Input
              {...register("security_code")}
              placeholder="123"
              type="password"
              maxLength={4}
            />
            {errors.security_code && (
              <ErrorMsg msg={errors.security_code.message} />
            )}
          </InputGroup>
        </InputGroup>
      </div>

      {errors.general && <ErrorMsg msg={errors.general.message} />}

      <Text>
        Billing Address
      </Text>

      <div
        className="grid"
       
       
      >
        <InputGroup flexDir={{ base: "column", xl: "row" }}>
          <InputGroup>
            <Text>
              First Name
            </Text>
            <Input
              {...register("first_name")}
              placeholder="First Name"
            />
            {errors.first_name && <ErrorMsg msg={errors.first_name.message} />}
          </InputGroup>

          <InputGroup>
            <Text>
              Last Name
            </Text>
            <Input
              {...register("last_name")}
              placeholder="Last Name"
            />
            {errors.last_name && <ErrorMsg msg={errors.last_name.message} />}
          </InputGroup>
        </InputGroup>

        <div>
          <Text>
            Country
          </Text>
          <Select
            placeholder="Select Country"
            options={countries}
            onChange={(data) => {
              setValue("country_code", (data as any)?.value);
              trigger("country_code");
            }}
          />
          {errors.country_code && (
            <ErrorMsg msg={errors.country_code.message} />
          )}
        </div>

        <InputGroup flexDir={{ base: "column", xl: "row" }}>
          <InputGroup>
            <Text>
              City
            </Text>
            <Input
              {...register("city")}
              placeholder="City"
            />
            {errors.city && <ErrorMsg msg={errors.city.message} />}
          </InputGroup>

          <InputGroup>
            <Text>
              Postal Code
            </Text>
            <Input
              {...register("zip")}
              placeholder="Postal Code"
            />
            {errors.zip && <ErrorMsg msg={errors.zip.message} />}
          </InputGroup>
        </InputGroup>

        <InputGroup>
          <Text>
            State / Province
          </Text>
          <Input
            {...register("state")}
            placeholder="State"
          />
          {errors.state && <ErrorMsg msg={errors.state.message} />}
        </InputGroup>

        <InputGroup>
          <Text>
            Address Line 1
          </Text>
          <Input
            {...register("address_line1")}
            placeholder="Address Line 1"
          />
          {errors.address_line1 && (
            <ErrorMsg msg={errors.address_line1.message} />
          )}
        </InputGroup>

        <InputGroup>
          <Text>
            Address Line 2 <Text as="span">(Optional)</Text>
          </Text>
          <Input
            {...register("address_line2")}
            placeholder="Address Line 2"
          />
        </InputGroup>
      </div>

      <Button
        
        type="submit"
        paddingX={isLoading ? 5 : 10}
        loadingText="Adding Card"
        spinner={<BtnSpinner />}
      >
        Save Details
      </Button>
    </form>
  );
};
