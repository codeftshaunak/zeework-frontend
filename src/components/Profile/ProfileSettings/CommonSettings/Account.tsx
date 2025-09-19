
"use client";
import React from "react";
import { toast } from "@/lib/toast";

import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  HStack,
} from "@/components/ui/migration-helpers";
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
      return toast.warning("You can't change the verified name");

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
        toast.success("Account information updated");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <div className="p-6 border-[1px] border-[var(--bordersecondary)] rounded-lg bg-white overflow-hidden">
      <h2 className="text-xl font-semibold mb-5">Account</h2>

      <form onSubmit={handleSubmit(updateAccount)}>
        <div className="flex spacing={6}> <div className="flex flex-row items-center spacing={4}>
            <div isInvalid={errors.firstName}>
              <span>First Name</span>
              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                name="firstName"
                type="text"
                placeholder="Enter first name"
                isDisabled={isDisabled}
                focusBorderColor="green.300"
                {...register("firstName")}
              />
              <ErrorMsg msg={errors?.firstName?.message} className="-mb-5" />
            </div>
            <div isInvalid={errors.lastName}>
              <span>Last Name</span>
              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                name="lastName"
                type="text"
                placeholder="Enter last name"
                isDisabled={isDisabled}
                focusBorderColor="green.300"
                {...register("lastName")}
              />
              <ErrorMsg msg={errors?.lastName?.message} className="-mb-5" />
            </div>
          </div>
          <div isInvalid={errors.email}>
            <span>Email</span>
            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"Group>
              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"LeftElement
                pointerEvents="none"
              >
                @
              </InputLeftElement>
              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                name="email"
                type="email"
                placeholder="Enter email"
                focusBorderColor="green.300"
                {...register("email")}
                isDisabled
              />
            </InputGroup>
            <ErrorMsg msg={errors.email?.message} />
          </div>
        </div>
        <div className="mt-8">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            type="submit"
            paddingX={8}
            isLoading={isLoading}
            loadingText="Updating"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;
