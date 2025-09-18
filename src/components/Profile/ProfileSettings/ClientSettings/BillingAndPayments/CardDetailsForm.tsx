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

export const CardDetailsForm = ({ setTab, setCard }) => {
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
      <Text fontSize="lg" fontWeight="semibold" marginBottom={"10px"}>
        Card Details
      </Text>
      <Box>
        <Box
          gap={5}
          display={"grid"}
          border="1px solid var(--bordersecondary)"
          padding={5}
          rounded="lg"
          bgColor="var(--secondarycolor)"
        >
          <InputGroup display="grid">
            <Text fontWeight="semibold" marginBottom={"10px"}>
              Card Number
            </Text>
            <CardNumberElement className="px-4 py-2.5 rounded-md border border-[var(--bordersecondary)] bg-white" />
            {errors.cardNumber && <ErrorMsg msg={errors.cardNumber.message} />}
          </InputGroup>
          <InputGroup gap={5} flexDir={{ base: "column", md: "row" }}>
            <InputGroup display="grid">
              <Text fontWeight="semibold" marginBottom={"10px"}>
                Expiration Date
              </Text>
              <CardExpiryElement className="px-4 py-2.5 rounded-md border border-[var(--bordersecondary)] bg-white" />
              {errors.cardExpiry && (
                <ErrorMsg msg={errors.cardExpiry.message} className="-mb-5" />
              )}
            </InputGroup>
            <InputGroup display="grid">
              <Text fontWeight="semibold" marginBottom={"10px"}>
                CVC
              </Text>
              <CardCvcElement className="px-4 py-2.5 rounded-md border border-[var(--bordersecondary)] bg-white" />
              {errors.cardCvc && (
                <ErrorMsg msg={errors.cardCvc.message} className="-mb-5" />
              )}
            </InputGroup>
          </InputGroup>
        </Box>
      </Box>
      {errors.general && <ErrorMsg msg={errors.general.message} />}
      <Text
        fontSize="lg"
        fontWeight="semibold"
        marginTop={10}
        marginBottom={"10px"}
      >
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
            <Text fontWeight="semibold" marginBottom={"10px"}>
              First Name
            </Text>
            <Input
              {...register("firstName")}
              placeholder="First Name"
              border="1px solid var(--bordersecondary)"
              bgColor={"white"}
            />
            {errors.firstName && <ErrorMsg msg={errors.firstName.message} />}
          </InputGroup>
          <InputGroup display="grid">
            <Text fontWeight="semibold" marginBottom={"10px"}>
              Last Name
            </Text>
            <Input
              {...register("lastName")}
              placeholder="Last Name"
              border="1px solid var(--bordersecondary)"
              bgColor={"white"}
            />
            {errors.lastName && <ErrorMsg msg={errors.lastName.message} />}
          </InputGroup>
        </InputGroup>
        <Box>
          <Text fontWeight="semibold" marginBottom={"10px"}>
            Country
          </Text>
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
        </Box>
        <InputGroup gap={5} flexDir={{ base: "column", xl: "row" }}>
          <InputGroup display="grid">
            <Text fontWeight="semibold" marginBottom={"10px"}>
              City
            </Text>
            <Input
              {...register("address_city")}
              placeholder="City"
              border="1px solid var(--bordersecondary)"
              bgColor={"white"}
            />
            {errors.address_city && (
              <ErrorMsg msg={errors.address_city.message} />
            )}
          </InputGroup>
          <InputGroup display="grid">
            <Text fontWeight="semibold" marginBottom={"10px"}>
              Postal Code
            </Text>
            <Input
              {...register("address_zip")}
              placeholder="Postal Code"
              border="1px solid var(--bordersecondary)"
              bgColor={"white"}
            />
            {errors.address_zip && (
              <ErrorMsg msg={errors.address_zip.message} />
            )}
          </InputGroup>
        </InputGroup>
        <InputGroup display={"grid"}>
          <Text fontWeight="semibold" marginBottom={"10px"}>
            Address Line 1
          </Text>
          <Input
            {...register("address_line1")}
            type="text"
            placeholder="Address Line 1"
            border="1px solid var(--bordersecondary)"
            bgColor={"white"}
          />
          {errors.address_line1 && (
            <ErrorMsg msg={errors.address_line1.message} />
          )}
        </InputGroup>
        <InputGroup display={"grid"}>
          <Text fontWeight="semibold" marginBottom={"10px"}>
            Address Line 2 <span>(Optional)</span>
          </Text>
          <Input
            {...register("address_line2")}
            type="text"
            placeholder="Address Line 2"
            border="1px solid var(--bordersecondary)"
            bgColor={"white"}
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
