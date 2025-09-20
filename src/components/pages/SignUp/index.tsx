"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/lib/toast";
import AuthLayout from "../../auth/AuthLayout";
import AuthFormField from "../../auth/AuthFormField";

// Icons
import { Users, Briefcase, Loader2, Mail, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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
        : "Get started";

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
          <AuthLayout
            title="Join ZeeWork"
            description="Choose how you'd like to use ZeeWork"
          >
            <div className="space-y-6">
              {/* Role Selection Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Client Option */}
                <Card
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md",
                    selectedOption === "client" ? "ring-2 ring-green-500 border-green-500" : "border-gray-200 hover:border-green-300"
                  )}
                  onClick={() => setSelectedOption("client")}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 rounded-full bg-green-100">
                        <Briefcase className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">I'm a Client</h3>
                        <p className="text-sm text-gray-600">Hiring for a project</p>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        selectedOption === "client" ? "border-green-500 bg-green-500" : "border-gray-300"
                      )}>
                        {selectedOption === "client" && (
                          <CheckCircle className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Freelancer Option */}
                <Card
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md",
                    selectedOption === "freelancer" ? "ring-2 ring-green-500 border-green-500" : "border-gray-200 hover:border-green-300"
                  )}
                  onClick={() => setSelectedOption("freelancer")}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 rounded-full bg-blue-100">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">I'm a Freelancer</h3>
                        <p className="text-sm text-gray-600">Looking for work</p>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        selectedOption === "freelancer" ? "border-green-500 bg-green-500" : "border-gray-300"
                      )}>
                        {selectedOption === "freelancer" && (
                          <CheckCircle className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Continue Button */}
              <Button
                variant="gradient"
                size="lg"
                className="w-full h-12 text-base font-semibold"
                onClick={handleButtonClick}
                disabled={!selectedOption}
              >
                {buttonText}
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <span className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-green-600 hover:text-green-700 font-medium transition-colors"
                    onClick={() => router.push("/login")}
                  >
                    Sign in
                  </button>
                </span>
              </div>
            </div>
          </AuthLayout>
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
      <AuthLayout
        title="Check your email"
        description="We've sent a verification link to your email address"
      >
        <div className="space-y-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 rounded-full bg-green-100">
              <Mail className="h-12 w-12 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600">
              {formatTime(countdown)}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verify your email to continue
              </h3>
              <p className="text-gray-600">
                We just sent an email to{" "}
                <span className="font-semibold text-green-600">
                  {email}
                </span>
                <br />
                Please check your email and click the verification link to activate your account
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleResendVerification}
              disabled={countdown > 0 || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                "Resend verification email"
              )}
            </Button>
            <Button
              variant="gradient"
              size="lg"
              className="w-full"
              onClick={handleOpenGmailBox}
            >
              Open Gmail inbox
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Join as a Freelancer"
      description="Create your account to start finding amazing projects"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              {...register("firstName")}
              placeholder="First name"
              className={cn(
                "h-12 text-base",
                errors.firstName && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 font-medium">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              {...register("lastName")}
              placeholder="Last name"
              className={cn(
                "h-12 text-base",
                errors.lastName && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 font-medium">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <AuthFormField
          type="email"
          placeholder="Enter your email address"
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Password Field */}
        <AuthFormField
          type="password"
          placeholder="Create a strong password"
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Country Field */}
        <div className="space-y-2">
          <Select
            placeholder="Select your country"
            options={countries}
            onChange={(data: any) => {
              setValue("country", data.name);
              trigger("country");
            }}
            error={errors.country?.message}
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-4">
          <Checkbox
            {...register("sendEmails")}
            label="Send me information on how to find my dream job"
          />

          <Checkbox
            {...register("has_accepted_terms")}
            label={
              <span>
                I understand and agree to the ZeeWork{" "}
                <span className="font-semibold text-green-600">
                  Terms of Service
                </span>
              </span>
            }
            error={errors.has_accepted_terms?.message}
          />
        </div>

        {/* Submit Button */}
        <div className="space-y-4">
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full h-12 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create freelancer account"
            )}
          </Button>

          <div className="text-center">
            <span className="text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
                onClick={() => router.push("/login")}
              >
                Sign in
              </button>
            </span>
          </div>
        </div>
      </form>
    </AuthLayout>
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
      <AuthLayout
        title="Check your email"
        description="We've sent a verification link to your email address"
      >
        <div className="space-y-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 rounded-full bg-green-100">
              <Mail className="h-12 w-12 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600">
              {formatTime(countdown)}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verify your email to continue
              </h3>
              <p className="text-gray-600">
                We just sent an email to{" "}
                <span className="font-semibold text-green-600">
                  {email}
                </span>
                <br />
                Please check your email and click the verification link to activate your account
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleResendVerification}
              disabled={countdown > 0 || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                "Resend verification email"
              )}
            </Button>
            <Button
              variant="gradient"
              size="lg"
              className="w-full"
              onClick={handleOpenGmailBox}
            >
              Open Gmail inbox
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Join as a Client"
      description="Create your account to start hiring top talent"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              {...register("firstName")}
              placeholder="First name"
              className={cn(
                "h-12 text-base",
                errors.firstName && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 font-medium">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              {...register("lastName")}
              placeholder="Last name"
              className={cn(
                "h-12 text-base",
                errors.lastName && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 font-medium">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <AuthFormField
          type="email"
          placeholder="Enter your email address"
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Password Field */}
        <AuthFormField
          type="password"
          placeholder="Create a strong password"
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Country Field */}
        <div className="space-y-2">
          <Select
            placeholder="Select your country"
            options={countries}
            onChange={(data: any) => {
              setValue("country", data.name);
              trigger("country");
            }}
            error={errors.country?.message}
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-4">
          <Checkbox
            {...register("sendEmails")}
            label="Send me emails on how to find the best talent"
          />

          <Checkbox
            {...register("has_accepted_terms")}
            label={
              <span>
                I understand and agree to the ZeeWork{" "}
                <span className="font-semibold text-green-600">
                  Terms of Service
                </span>
              </span>
            }
            error={errors.has_accepted_terms?.message}
          />
        </div>

        {/* Submit Button */}
        <div className="space-y-4">
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full h-12 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create client account"
            )}
          </Button>

          <div className="text-center">
            <span className="text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
                onClick={() => router.push("/login")}
              >
                Sign in
              </button>
            </span>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};