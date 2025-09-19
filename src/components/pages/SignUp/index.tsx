"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";

// UI Components
import {
  HStack,
  Input,
  Text,
  VStack,
  Box,
  Button,
  IconButton,
  InputGroup,
  Checkbox,
  Stack,
  RadioGroup,
} from "@/components/ui/migration-helpers";
import { toast } from "@/lib/toast";
import OnbardingCardLayout from "../../Layouts/CardLayout/OnbardingCardLayout";
import CTAButton from "../../CTAButton";
import Divider from "../../Divider/Divider";
import BtnSpinner from "../../Skeletons/BtnSpinner";
import ErrorMsg from "../../utils/Error/ErrorMsg";

// Icons
import {
  BsFacebook,
  BsApple,
  BsEyeSlash,
  BsEye,
  BsBriefcase,
  BsPerson
} from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";

// API Functions
import { signUp } from "../../../helpers/APIs/apiRequest";
import { resendEmailVerification } from "../../../helpers/APIs/clientApis";
import { getCountries } from "../../../helpers/APIs/freelancerApis";

// Schemas
import {
  clientSignUpSchema,
  freelancerSignUpSchema,
} from "../../../schemas/profile-create-schema";

// Types
interface Country {
  name: string;
  label: string;
  value: string;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  role: number;
  sendEmails?: boolean;
  has_accepted_terms: boolean;
}

export const SignUp = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const buttonText =
    selectedOption === "freelancer"
      ? "Apply as a freelancer"
      : selectedOption === "client"
      ? "Join as a client"
      : "Create An Account";

  const handleButtonClick = () => {
    if (selectedOption === "freelancer") {
      setIsFreelancer(true);
      setIsClient(false);
    } else if (selectedOption === "client") {
      setIsClient(true);
      setIsFreelancer(false);
    }
  };

  return (
    <>
      {(isFreelancer && <FreelancerSignUp />) ||
        (isClient && <ClientSignUp />) || (
          <OnbardingCardLayout title="Join as a Client or Freelancer" gap="10">
            <RadioGroup.Root
              value={selectedOption}
              onValueChange={handleOptionChange}
            >
              <div className="flex flex-row items-center justify-center max-sm:flex-col max-sm:w-full gap-4">
                {/* Client Option */}
                <div
                  className="max-sm:w-full p-6 w-[250px] relative rounded-lg cursor-pointer border-2 border-gray-200 hover:border-green-500 transition-colors"
                  onClick={() => setSelectedOption("client")}
                >
                  <div className="flex flex-row items-center justify-between">
                    <BsBriefcase className="text-4xl text-green-600 mb-4" />
                    <RadioGroup.Item
                      value="client"
                      className="cursor-pointer"
                    >
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                    </RadioGroup.Item>
                  </div>
                  <span className="font-medium text-gray-700">
                    I'm a Client, <br />
                    hiring for a project
                  </span>
                </div>

                {/* Freelancer Option */}
                <div
                  className="max-sm:w-full p-6 w-[250px] relative rounded-lg cursor-pointer border-2 border-gray-200 hover:border-green-500 transition-colors"
                  onClick={() => setSelectedOption("freelancer")}
                >
                  <div className="flex flex-row items-center justify-between">
                    <BsPerson className="text-4xl text-blue-600 mb-4" />
                    <RadioGroup.Item
                      value="freelancer"
                      className="cursor-pointer"
                    >
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                    </RadioGroup.Item>
                  </div>
                  <span className="font-medium text-gray-700">
                    I'm a Freelancer, <br />
                    looking for work
                  </span>
                </div>
              </div>
            </RadioGroup.Root>

            <div className="w-full flex flex-col gap-5 p-5">
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground bg-green-600 text-white py-3 px-6 disabled:opacity-50"
                onClick={handleButtonClick}
                disabled={!selectedOption}
              >
                {buttonText}
              </button>
              <span className="text-center text-gray-600">
                Already Have Account?{" "}
                <span
                  className="text-green-600 cursor-pointer hover:underline"
                  onClick={() => router.push("/login")}
                >
                  Login
                </span>
              </span>
            </div>
          </OnbardingCardLayout>
        )}
    </>
  );
};

export const FreelancerSignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [verifyShow, setVerifyShow] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<SignUpData>({
    resolver: yupResolver(freelancerSignUpSchema),
  });

  const email = sessionStorage.getItem("email");

  // Get Countries List
  const getVerifiedCountries = async () => {
    try {
      const { code, body } = await getCountries();
      if (code === 200) {
        setCountries(
          body?.map((country: any) => ({
            ...country,
            label: country.name,
            value: country.name,
          }))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setValue("role", 1);
    getVerifiedCountries();
  }, [setValue]);

  // SignUp a profile as a freelancer
  const onSubmit = async (data: SignUpData) => {
    setIsLoading(true);
    try {
      const { body, code, msg } = await signUp(data);
      if (code === 200) {
        toast.success(msg);
        setVerifyShow(true);
        setCountdown(119);
        sessionStorage.setItem("email", body.email);
        sessionStorage.setItem("userName", body.name);
      } else if (code === 403) {
        toast.warning(msg);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      const { code, msg } = await resendEmailVerification({ email });
      if (code === 200) {
        toast.default(msg);
        setCountdown(119);
      }
    } catch (error: any) {
      toast.error(error?.message);
      console.error("Error fetching search results:", error);
    }
    setIsLoading(false);
  };

  const handleOpenGmailBox = () => {
    const gmailInboxURL = "https://mail.google.com/mail/u/0/";
    window.open(gmailInboxURL, "_blank");
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  if (verifyShow) {
    return (
      <OnbardingCardLayout>
        <div className="max-sm:w-full flex flex-col gap-5 p-5">
          <div className="flex flex-col gap-5 items-center text-center">
            <div className="p-4 rounded-lg bg-green-50">
              <HiOutlineMail className="text-5xl text-green-600" />
            </div>
            <span className="text-2xl font-medium text-green-600">
              {formatTime(countdown)}
            </span>
            <span className="text-xl font-medium">
              Verify your email to proceed
            </span>
            <span className="text-gray-600">
              We just sent an email to the address{" "}
              <span className="font-bold text-green-600">
                {email}
              </span>
              <br />
              Please check your email and click on the link provided <br />
              to verify your address
            </span>
          </div>

          <div className="flex flex-row items-center justify-center gap-4 max-sm:flex-col max-sm:w-full">
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground bg-gray-600 text-white py-2 px-4 disabled:opacity-50"
              onClick={handleResendVerification}
              disabled={countdown > 0 || isLoading}
            >
              {isLoading && <BtnSpinner size="16" />}
              {isLoading ? "Resending Email" : "Resend Verification Email"}
            </button>
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground bg-green-600 text-white py-2 px-4"
              onClick={handleOpenGmailBox}
            >
              Go to My Inbox
            </button>
          </div>
        </div>
      </OnbardingCardLayout>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <OnbardingCardLayout title="Sign Up To Find Your Dream Job">
        <div className="flex flex-col gap-6 p-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...register("firstName")}
                placeholder="First name"
              />
              {errors.firstName && (
                <ErrorMsg msg={errors.firstName.message} />
              )}
            </div>
            <div>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...register("lastName")}
                placeholder="Last name"
              />
              {errors.lastName && (
                <ErrorMsg msg={errors.lastName.message} />
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...register("email")}
              placeholder="Email"
              type="email"
            />
            {errors.email && <ErrorMsg msg={errors.email.message} />}
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pr-10"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </button>
            {errors.password && (
              <ErrorMsg msg={errors.password.message} />
            )}
          </div>

          {/* Country Field */}
          <div>
            <Select
              {...register("country")}
              placeholder="Select Country"
              options={countries}
              onChange={(data: any) => {
                setValue("country", data.name);
                trigger("country");
              }}
              className="custom-select"
            />
            {errors.country && <ErrorMsg msg={errors.country.message} />}
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                {...register("sendEmails")}
                className="rounded border-gray-300"
              />
              Send me information on how to find my dream job.
            </label>

            <div>
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  {...register("has_accepted_terms")}
                  className="rounded border-gray-300 mt-0.5"
                />
                <span>
                  Yes, I understand & agree to the ZeeWork{" "}
                  <span className="font-semibold text-green-600">
                    Terms of Service
                  </span>
                </span>
              </label>
              {errors.has_accepted_terms && (
                <ErrorMsg msg={errors.has_accepted_terms.message} />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex flex-col gap-4">
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground bg-green-600 text-white py-3 px-6 disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <BtnSpinner size="16" />}
              {isLoading ? "Creating Account" : "Create An Account"}
            </button>
            <span className="text-center text-gray-600">
              Already Have an Account?{" "}
              <span
                className="text-green-600 cursor-pointer hover:underline"
                onClick={() => router.push("/login")}
              >
                Login
              </span>
            </span>
          </div>
        </div>
      </OnbardingCardLayout>
    </form>
  );
};

export const ClientSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verifyShow, setVerifyShow] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<SignUpData>({
    resolver: yupResolver(clientSignUpSchema),
  });

  const email = sessionStorage.getItem("email");

  // Get Countries List
  const getVerifiedCountries = async () => {
    try {
      const { code, body } = await getCountries();
      if (code === 200) {
        setCountries(
          body?.map((country: any) => ({
            ...country,
            label: country.name,
            value: country.name,
          }))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setValue("role", 2);
    getVerifiedCountries();
  }, [setValue]);

  const onSubmit = async (data: SignUpData) => {
    setIsLoading(true);
    try {
      const response = await signUp(data);
      if (response.code === 200) {
        toast.success(response.msg);
        setVerifyShow(true);
        setCountdown(119);
        sessionStorage.setItem("email", response.body.email);
        sessionStorage.setItem("userName", response.body.name);
      } else if (response.code === 403) {
        toast.warning(response.msg);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      const { code, msg } = await resendEmailVerification({ email });
      if (code === 200) {
        toast.default(msg);
        setCountdown(119);
      }
    } catch (error: any) {
      toast.error(error?.message);
      console.error("Error fetching search results:", error);
    }
    setIsLoading(false);
  };

  const handleOpenGmailBox = () => {
    const gmailInboxURL = "https://mail.google.com/mail/u/0/";
    window.open(gmailInboxURL, "_blank");
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  if (verifyShow) {
    return (
      <OnbardingCardLayout>
        <div className="flex flex-col gap-5 p-5">
          <div className="flex flex-col gap-5 items-center text-center">
            <div className="p-4 rounded-lg bg-green-50">
              <HiOutlineMail className="text-5xl text-green-600" />
            </div>
            <span className="text-2xl font-medium text-green-600">
              {formatTime(countdown)}
            </span>
            <span className="text-xl font-medium">
              Verify your email to proceed
            </span>
            <span className="text-gray-600">
              We just sent an email to the address{" "}
              <span className="font-bold text-green-600">
                {email}
              </span>
              <br />
              Please check your email and click on the link provided <br />
              to verify your address
            </span>
          </div>

          <div className="flex flex-row items-center justify-center gap-4">
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground bg-gray-600 text-white py-2 px-4 disabled:opacity-50"
              onClick={handleResendVerification}
              disabled={countdown > 0 || isLoading}
            >
              {isLoading && <BtnSpinner size="16" />}
              {isLoading ? "Resending Email" : "Resend Verification Email"}
            </button>
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground bg-green-600 text-white py-2 px-4"
              onClick={handleOpenGmailBox}
            >
              Go to My Inbox
            </button>
          </div>
        </div>
      </OnbardingCardLayout>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <OnbardingCardLayout title="Sign Up To Hire Talent">
        <div className="flex flex-col gap-6 p-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...register("firstName")}
                placeholder="First name"
              />
              {errors.firstName && (
                <ErrorMsg msg={errors.firstName.message} />
              )}
            </div>
            <div>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...register("lastName")}
                placeholder="Last name"
              />
              {errors.lastName && (
                <ErrorMsg msg={errors.lastName.message} />
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...register("email")}
              placeholder="Email"
              type="email"
            />
            {errors.email && <ErrorMsg msg={errors.email.message} />}
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pr-10"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </button>
            {errors.password && (
              <ErrorMsg msg={errors.password.message} />
            )}
          </div>

          {/* Country Field */}
          <div>
            <Select
              {...register("country")}
              placeholder="Select Country"
              options={countries}
              onChange={(data: any) => {
                setValue("country", data.name);
                trigger("country");
              }}
              className="custom-select"
            />
            {errors.country && <ErrorMsg msg={errors.country.message} />}
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                {...register("sendEmails")}
                className="rounded border-gray-300"
              />
              Send me emails on how to find the best talent
            </label>

            <div>
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  {...register("has_accepted_terms")}
                  className="rounded border-gray-300 mt-0.5"
                />
                <span>
                  Yes, I understand & agree to the ZeeWork{" "}
                  <span className="font-semibold text-green-600">
                    Terms of Service
                  </span>
                </span>
              </label>
              {errors.has_accepted_terms && (
                <ErrorMsg msg={errors.has_accepted_terms.message} />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex flex-col gap-4">
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground bg-green-600 text-white py-3 px-6 disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <BtnSpinner size="16" />}
              {isLoading ? "Creating Account" : "Create An Account"}
            </button>
            <span className="text-center text-gray-600">
              Already Have an Account?{" "}
              <span
                className="text-green-600 cursor-pointer hover:underline"
                onClick={() => router.push("/login")}
              >
                Login
              </span>
            </span>
          </div>
        </div>
      </OnbardingCardLayout>
    </form>
  );
};