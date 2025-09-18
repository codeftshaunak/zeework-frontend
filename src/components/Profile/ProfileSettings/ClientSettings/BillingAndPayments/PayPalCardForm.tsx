"use client";

import {
  Box,
  Button,
  Input,
  InputGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
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

export const PayPalCardForm = ({ set setCard }) => {
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
  const toast = useToast();
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
    let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let matches = value.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      const formatted = parts.join(" ");
      e.target.value = formatted;
      setValue("card_number", formatted, { shouldValidate: true });
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2, 6)}`;
    }
    setValue("expiry", value, { shouldValidate: true });
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

      toast({
        title: msg,
        status: code === 200 ? "success" : "warning",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });

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
      toast({
        title: error?.response?.data?.msg || "Something went wrong!",
        status: "warning",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
    setIsLoading(false);

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="lg" fontWeight="semibold" mb={4}>
        Card Details
      </Text>

      <Box
        gap={5}
        display={"grid"}
        border="1px solid var(--bordersecondary)"
        padding={5}
        rounded="lg"
        bgColor="var(--secondarycolor)"
      >
        <InputGroup display="grid">
          <Text fontWeight="semibold" mb={2}>
            Card Number
          </Text>
          <Input
            {...register("card_number")}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            onChange={formatCardNumber}
            border="1px solid var(--bordersecondary)"
            bgColor="white"
          />
          {errors.card_number && <ErrorMsg msg={errors.card_number.message} />}
        </InputGroup>

        <InputGroup gap={5} flexDir={{ base: "column", md: "row" }}>
          <InputGroup display="grid">
            <Text fontWeight="semibold" mb={2}>
              Expiration Date
            </Text>
            <Input
              {...register("expiry")}
              placeholder="MM/YYYY"
              maxLength={7}
              onChange={handleExpiryChange}
              border="1px solid var(--bordersecondary)"
              bgColor="white"
            />
            {errors.expiry && <ErrorMsg msg={errors.expiry.message} />}
          </InputGroup>

          <InputGroup display="grid">
            <Text fontWeight="semibold" mb={2}>
              CVV/CVC
            </Text>
            <Input
              {...register("security_code")}
              placeholder="123"
              type="password"
              maxLength={4}
              border="1px solid var(--bordersecondary)"
              bgColor="white"
            />
            {errors.security_code && (
              <ErrorMsg msg={errors.security_code.message} />
            )}
          </InputGroup>
        </InputGroup>
      </Box>

      {errors.general && <ErrorMsg msg={errors.general.message} />}

      <Text fontSize="lg" fontWeight="semibold" mt={10} mb={4}>
        Billing Address
      </Text>

      <Box
        gap={5}
        display={"grid"}
        border="1px solid var(--bordersecondary)"
        padding={5}
        rounded="lg"
        bgColor="var(--secondarycolor)"
      >
        <InputGroup gap={5} flexDir={{ base: "column", xl: "row" }}>
          <InputGroup display="grid">
            <Text fontWeight="semibold" mb={2}>
              First Name
            </Text>
            <Input
              {...register("first_name")}
              placeholder="First Name"
              border="1px solid var(--bordersecondary)"
              bgColor="white"
            />
            {errors.first_name && <ErrorMsg msg={errors.first_name.message} />}
          </InputGroup>

          <InputGroup display="grid">
            <Text fontWeight="semibold" mb={2}>
              Last Name
            </Text>
            <Input
              {...register("last_name")}
              placeholder="Last Name"
              border="1px solid var(--bordersecondary)"
              bgColor="white"
            />
            {errors.last_name && <ErrorMsg msg={errors.last_name.message} />}
          </InputGroup>
        </InputGroup>

        <Box>
          <Text fontWeight="semibold" mb={2}>
            Country
          </Text>
          <Select
            placeholder="Select Country"
            options={countries}
            onChange={(data) => {
              setValue("country_code", data.value);
              trigger("country_code");
            }}
          />
          {errors.country_code && (
            <ErrorMsg msg={errors.country_code.message} />
          )}
        </Box>

        <InputGroup gap={5} flexDir={{ base: "column", xl: "row" }}>
          <InputGroup display="grid">
            <Text fontWeight="semibold" mb={2}>
              City
            </Text>
            <Input
              {...register("city")}
              placeholder="City"
              border="1px solid var(--bordersecondary)"
              bgColor="white"
            />
            {errors.city && <ErrorMsg msg={errors.city.message} />}
          </InputGroup>

          <InputGroup display="grid">
            <Text fontWeight="semibold" mb={2}>
              Postal Code
            </Text>
            <Input
              {...register("zip")}
              placeholder="Postal Code"
              border="1px solid var(--bordersecondary)"
              bgColor="white"
            />
            {errors.zip && <ErrorMsg msg={errors.zip.message} />}
          </InputGroup>
        </InputGroup>

        <InputGroup display="grid">
          <Text fontWeight="semibold" mb={2}>
            State / Province
          </Text>
          <Input
            {...register("state")}
            placeholder="State"
            border="1px solid var(--bordersecondary)"
            bgColor="white"
          />
          {errors.state && <ErrorMsg msg={errors.state.message} />}
        </InputGroup>

        <InputGroup display="grid">
          <Text fontWeight="semibold" mb={2}>
            Address Line 1
          </Text>
          <Input
            {...register("address_line1")}
            placeholder="Address Line 1"
            border="1px solid var(--bordersecondary)"
            bgColor="white"
          />
          {errors.address_line1 && (
            <ErrorMsg msg={errors.address_line1.message} />
          )}
        </InputGroup>

        <InputGroup display="grid">
          <Text fontWeight="semibold" mb={2}>
            Address Line 2 <span>(Optional)</span>
          </Text>
          <Input
            {...register("address_line2")}
            placeholder="Address Line 2"
            border="1px solid var(--bordersecondary)"
            bgColor="white"
          />
        </InputGroup>
      </Box>

      <Button
        isLoading={isLoading}
        type="submit"
        rounded="full"
        mt={6}
        colorScheme="primary"
        paddingX={isLoading ? 5 : 10}
        loadingText="Adding Card"
        spinner={<BtnSpinner />}
      >
        Save Details
      </Button>
    </form>
  );
};
