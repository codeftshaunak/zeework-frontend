
"use client";
import React from "react";

import { CiUser } from "react-icons/ci";
import {
  VStack,
  Flex,
  Input,
  Skeleton,
  Button,
  Text,
  Box,
} from "@/components/ui/migration-helpers";
import { toast } from "@/lib/toast";
import OnboardingCardLayout from "../../Layouts/CardLayout/OnbardingCardLayout";
import { useState } from "react";
import { TbPasswordFingerprint, TbPasswordUser } from "react-icons/tb";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { forgetLoginPassword } from "../../../helpers/APIs/userApis";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BtnSpinner from "../../Skeletons/BtnSpinner";
import ErrorMsg from "../../utils/Error/ErrorMsg";

const validationSchema = (step) => {
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
          .number()
          .typeError("OTP must be a number")
          .required("OTP is required"),
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
          .oneOf([yup.ref("password"), null], "Passwords must match")
          .required("Repeat Password is required"),
      });
    default:
      return yup.object().shape({});
  }
};

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [visiblePass, setVisiblePass] = useState({ one: false, two: false });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema(step)),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      if (step === 1) {
        const { code, msg } = await forgetLoginPassword({
          ref: "send_verification_code",
          email: data?.email,
        });
        visibleToast(msg, code);
        if (code === 200) setEmail(data?.email), setStep(2);
      } else if (step === 2) {
        const { code, msg } = await forgetLoginPassword({
          ref: "verify_otp",
          email: email,
          otp: data?.OTP,
        });
        visibleToast(msg, code);
        if (code === 200) setStep(3);
      } else if (step === 3) {
        const { code, msg } = await forgetLoginPassword({
          ref: "change_password",
          email: email,
          new_password: data?.password,
        });
        if (code === 200) {
          setEmail(""), router.push("/login"), visibleToast(msg, code);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const visibleToast = (msg, code) => {
    toast.default(msg);
  };

  return (
    <OnboardingCardLayout title="Forget Your Password">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5">
        <div className="flex flex-col> {step === 1 && ( <> <div className="w-full">
                <span marginBottom={1}>Enter your email address</span>
                <Skeleton
                  isLoaded
                  className="w-full"
                  startColor="gray.100"
                  endColor="gray.300"
                >
                  <div
                   className="flex overflow-hidden">
                    <div className="p-[0.4rem]">
                      <CiUser
                        style={{ fontSize: "1.3rem", marginRight: "0.1rem" }}
                      />
                    </div>
                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      type="text"
                      name="email"
                      placeholder="Username Or Email"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && <ErrorMsg msg={errors.email.message} />}
                </Skeleton>
              </div>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                loadingText="Continue"
                type="submit"
                paddingX="10"
                isLoading={isLoading}
                spinner={<BtnSpinner />}
              >
                Continue
              </button>
              <span onClick={() => router.push("/login")}>
                Do you know the password?{" "}
                <span className="text-[var(--primarytextcolor)] cursor-pointer">
                  Login
                </span>
              </span>
            </>
          )}
          {step === 2 && (
            <>
              <div className="w-full">
                <span marginBottom={1}>Enter OTP</span>
                <Skeleton
                  isLoaded
                  className="w-full"
                  startColor="gray.100"
                  endColor="gray.300"
                >
                  <div className="flex"
                   
                   
                   
                   
                   
                   
                  >
                    <TbPasswordFingerprint
                      style={{ fontSize: "1.3rem", marginRight: "0.1rem" }}
                    />
                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      type="number"
                      name="OTP"
                      placeholder="****"
                      {...register("OTP")}
                    />
                  </div>
                  {errors.OTP && <ErrorMsg msg={errors.OTP.message} />}
                </Skeleton>
              </div>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                loadingText="Continue"
                type="submit"
                paddingX="10"
                isLoading={isLoading}
                spinner={<BtnSpinner />}
              >
                Continue
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <div className="w-full">
                <span marginBottom={1}>New Password</span>
                <Skeleton
                  isLoaded
                  className="w-full"
                  startColor="gray.100"
                  endColor="gray.300"
                >
                  <div
                   className="flex overflow-hidden">
                    <div className="p-[0.5rem]">
                      {" "}
                      <TbPasswordUser
                        style={{ fontSize: "1.3rem", marginRight: "0.1rem" }}
                      />
                    </div>
                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      type={visiblePass.one ? "text" : "password"}
                      name="password"
                      placeholder="****"
                      {...register("password")}
                    />
                    <div
                      onClick={() =>
                        setVisiblePass({
                          ...visiblePass,
                          one: !visiblePass.one,
                        })
                      }
                      padding="0.6rem"
                    >
                      {visiblePass.one ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                  {errors.password && (
                    <ErrorMsg msg={errors.password.message} />
                  )}
                </Skeleton>
              </div>
              <div className="w-full">
                <span marginBottom={1}>Repeat Password</span>
                <Skeleton
                  isLoaded
                  className="w-full"
                  startColor="gray.100"
                  endColor="gray.300"
                >
                  <div
                   className="flex overflow-hidden">
                    <div className="p-[0.5rem]">
                      {" "}
                      <TbPasswordUser
                        style={{ fontSize: "1.3rem", marginRight: "0.1rem" }}
                      />
                    </div>

                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      type={visiblePass.two ? "text" : "password"}
                      name="repeatPassword"
                      placeholder="****"
                      {...register("repeatPassword")}
                    />
                    <div
                      onClick={() =>
                        setVisiblePass({
                          ...visiblePass,
                          two: !visiblePass.two,
                        })
                      }
                      padding="0.6rem"
                    >
                      {visiblePass.two ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                  {errors.repeatPassword && (
                    <ErrorMsg msg={errors.repeatPassword.message} />
                  )}
                </Skeleton>
              </div>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                loadingText="Continue"
                type="submit"
                paddingX="10"
                isLoading={isLoading}
                spinner={<BtnSpinner />}
              >
                Continue
              </button>
            </>
          )}
        </div>
      </form>
    </OnboardingCardLayout>
  );
};

export default ForgetPassword;
