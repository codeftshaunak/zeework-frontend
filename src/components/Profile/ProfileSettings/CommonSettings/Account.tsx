"use client";

import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  FormControl,
  FormLabel,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateFreelancer } from "../../../../helpers/APIs/userApis";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMsg from "../../../utils/Error/ErrorMsg";
import { profileData } from "../../../../redux/authSlice/profileSlice";
import { useState } from "react";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(
      /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,
      "First name must start with an uppercase letter"
    ),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(
      /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,
      "Last name must start with an uppercase letter"
    ),
  // email: yup
  //   .string()
  //   .email("Invalid email format")
  //   .required("Email is required")
  //   .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
});

const Account = () => {
  const [isLoading, setIsLoading] = useState(false);
  const profile = useSelector((state: any) => state.profile.profile);
  const isDisabled = profile.profile_verified;
  const dispatch = useDispatch();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      email: profile?.email,
    },
  });

  const updateAccount = async (data) => {
    if (isDisabled)
      return toast({
        title: "You can't change the verified name",
        status: "warning",
        duration: 3000,
        position: "top",
        isClosable: true,
      });

    setIsLoading(true);
    try {
      const updatedData = {
        username: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      };
      const { code } = await updateFreelancer(updatedData);

      if (code == 200) {
        dispatch(
          profileData({ profile: { ...profile, ...updatedData.username } })
        );
        toast({
          title: "Account information updated",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      } else {
        toast({
          title: "Something went wrong",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="p-6 border-[1px] border-[var(--bordersecondary)] rounded-lg bg-white overflow-hidden">
      <h2 className="text-xl font-semibold mb-5">Account</h2>

      <form onSubmit={handleSubmit(updateAccount)}>
        <Stack spacing={6}>
          <HStack spacing={4}>
            <FormControl isInvalid={errors.firstName}>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                type="text"
                placeholder="Enter first name"
                isDisabled={isDisabled}
                focusBorderColor="green.300"
                {...register("firstName")}
              />
              <ErrorMsg msg={errors?.firstName?.message} className={"-mb-5"} />
            </FormControl>
            <FormControl isInvalid={errors.lastName}>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                type="text"
                placeholder="Enter last name"
                isDisabled={isDisabled}
                focusBorderColor="green.300"
                {...register("lastName")}
              />
              <ErrorMsg msg={errors?.lastName?.message} className={"-mb-5"} />
            </FormControl>
          </HStack>
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                @
              </InputLeftElement>
              <Input
                name="email"
                type="email"
                placeholder="Enter email"
                focusBorderColor="green.300"
                {...register("email")}
                isDisabled
              />
            </InputGroup>
            <ErrorMsg msg={errors.email?.message} />
          </FormControl>
        </Stack>
        <div className="mt-8">
          <Button
            type="submit"
            colorScheme="primary"
            rounded={"full"}
            paddingX={8}
            isLoading={isLoading}
            loadingText="Updating"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Account;
