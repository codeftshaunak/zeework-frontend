import { toaster } from "@/lib/providers";
"use client";

import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  HStack,
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
      return toaster.create({
        title: "You can't change the verified name",
        type: "warning",
        duration: 3000,
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
        toaster.create({
          title: "Account information updated",
          type: "success",
          duration: 3000,
        });
      } else {
        toaster.create({
          title: "Something went wrong",
          type: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Something went wrong",
        type: "error",
        duration: 3000,
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
            <Box isInvalid={errors.firstName}>
              <Text mb={2}>First Name</Text>
              <Input
                name="firstName"
                type="text"
                placeholder="Enter first name"
                isDisabled={isDisabled}
                focusBorderColor="green.300"
                {...register("firstName")}
              />
              <ErrorMsg msg={errors?.firstName?.message} className={"-mb-5"} />
            </Box>
            <Box isInvalid={errors.lastName}>
              <Text mb={2}>Last Name</Text>
              <Input
                name="lastName"
                type="text"
                placeholder="Enter last name"
                isDisabled={isDisabled}
                focusBorderColor="green.300"
                {...register("lastName")}
              />
              <ErrorMsg msg={errors?.lastName?.message} className={"-mb-5"} />
            </Box>
          </HStack>
          <Box isInvalid={errors.email}>
            <Text mb={2}>Email</Text>
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
          </Box>
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
