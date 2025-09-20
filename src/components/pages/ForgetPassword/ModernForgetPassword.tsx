"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/lib/toast";
import AuthLayout from "../../auth/AuthLayout";
import AuthFormField from "../../auth/AuthFormField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { forgetLoginPassword } from "../../../helpers/APIs/userApis";
import { cn } from "@/lib/utils";
import { ArrowLeft, Mail, Shield, Lock, Loader2, CheckCircle } from "lucide-react";

const validationSchema = (step: number) => {
  switch (step) {
    case 1:
      return yup.object().shape({
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
      });
    case 2:
      return yup.object().shape({
        OTP: yup
          .string()
          .required("OTP is required")
          .length(6, "OTP must be 6 digits"),
      });
    case 3:
      return yup.object().shape({
        password: yup
          .string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters")
          .matches(/[a-zA-Z]/, "Password must contain at least one letter")
          .matches(/[0-9]/, "Password must contain at least one number")
          .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
          ),
        repeatPassword: yup
          .string()
          .oneOf([yup.ref("password")], "Passwords must match")
          .required("Repeat Password is required"),
      });
    default:
      return yup.object().shape({});
  }
};

const ModernForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [visiblePass, setVisiblePass] = useState({ one: false, two: false });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema(step)),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      if (step === 1) {
        const { code, msg } = await forgetLoginPassword({
          ref: "send_verification_code",
          email: data?.email,
        });
        visibleToast(msg, code);
        if (code === 200) {
          setEmail(data?.email);
          setStep(2);
          reset(); // Reset form for next step
        }
      } else if (step === 2) {
        const { code, msg } = await forgetLoginPassword({
          ref: "verify_otp",
          email: email,
          otp: data?.OTP,
        });
        visibleToast(msg, code);
        if (code === 200) {
          setStep(3);
          reset(); // Reset form for next step
        }
      } else if (step === 3) {
        const { code, msg } = await forgetLoginPassword({
          ref: "change_password",
          email: email,
          new_password: data?.password,
        });
        if (code === 200) {
          setEmail("");
          toast.success("Password reset successfully! Please sign in with your new password.");
          router.push("/login");
        } else {
          visibleToast(msg, code);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  const visibleToast = (msg: string, code: number) => {
    if (code === 200) {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return {
          title: "Forgot your password?",
          description: "No worries! Enter your email and we'll send you a reset code",
          icon: <Mail className="h-12 w-12 text-green-600" />
        };
      case 2:
        return {
          title: "Check your email",
          description: `We sent a verification code to ${email}`,
          icon: <Shield className="h-12 w-12 text-green-600" />
        };
      case 3:
        return {
          title: "Create new password",
          description: "Your new password must be different from previous passwords",
          icon: <Lock className="h-12 w-12 text-green-600" />
        };
      default:
        return {
          title: "Reset Complete",
          description: "Your password has been successfully reset",
          icon: <CheckCircle className="h-12 w-12 text-green-600" />
        };
    }
  };

  const stepContent = getStepContent();

  return (
    <AuthLayout
      title={stepContent.title}
      description={stepContent.description}
    >
      <div className="space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-green-100">
            {stepContent.icon}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Email Input */}
          {step === 1 && (
            <>
              <AuthFormField
                type="email"
                placeholder="Enter your email address"
                error={errors.email?.message}
                {...register("email")}
              />

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
                      Sending code...
                    </>
                  ) : (
                    "Send reset code"
                  )}
                </Button>

                <div className="text-center">
                  <span className="text-gray-600">
                    Remember your password?{" "}
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
            </>
          )}

          {/* Step 2: OTP Input */}
          {step === 2 && (
            <>
              <div className="space-y-2">
                <label className="text-base font-semibold text-gray-900">
                  Verification Code
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    className={cn(
                      "h-12 text-base pl-10 text-center tracking-widest",
                      errors.OTP && "border-red-500 focus-visible:ring-red-500"
                    )}
                    maxLength={6}
                    {...register("OTP")}
                  />
                </div>
                {errors.OTP && (
                  <p className="text-sm text-red-500 font-medium">{errors.OTP.message}</p>
                )}
              </div>

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
                      Verifying...
                    </>
                  ) : (
                    "Verify code"
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-700 font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
                    onClick={() => {
                      setStep(1);
                      reset();
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to email
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <>
              <div className="space-y-4">
                <AuthFormField
                  type="password"
                  placeholder="Enter new password"
                  showPassword={visiblePass.one}
                  onTogglePassword={() =>
                    setVisiblePass({ ...visiblePass, one: !visiblePass.one })
                  }
                  error={errors.password?.message}
                  {...register("password")}
                />

                <AuthFormField
                  type="password"
                  placeholder="Confirm new password"
                  showPassword={visiblePass.two}
                  onTogglePassword={() =>
                    setVisiblePass({ ...visiblePass, two: !visiblePass.two })
                  }
                  error={errors.repeatPassword?.message}
                  {...register("repeatPassword")}
                />
              </div>

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
                      Updating password...
                    </>
                  ) : (
                    "Update password"
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-700 font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
                    onClick={() => {
                      setStep(2);
                      reset();
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to verification
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </AuthLayout>
  );
};

export default ModernForgetPassword;