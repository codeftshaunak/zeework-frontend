"use client";

import { CiUser } from "react-icons/ci";
import {
  VStack,
  Flex,
  Input,
  Skeleton,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { toaster } from "@/lib/providers";
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
    toaster.create({
      title: msg,
      duration: 3000,
      type: code === 200 ? "success" : "error",
    });
  };

  return (
    <OnboardingCardLayout title="Forget Your Password">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5">
        <VStack width="100%" gap={6}>
          {step === 1 && (
            <>
              <Box width={"full"}>
                <Text marginBottom={1}>Enter your email address</Text>
                <Skeleton
                  isLoaded
                  width={"full"}
                  startColor="gray.100"
                  endColor="gray.300"
                >
                  <Flex
                    border="1px solid var(--bordersecondary)"
                    borderRadius="5px"
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                    overflow={"hidden"}
                  >
                    <Box padding={"0.4rem"}>
                      <CiUser
                        style={{ fontSize: "1.3rem", marginRight: "0.1rem" }}
                      />
                    </Box>
                    <Input
                      type="text"
                      name="email"
                      placeholder="Username Or Email"
                      fontSize="1rem"
                      width="100%"
                      border="none"
                      variant="unstyled"
                      rounded={0}
                      padding="0.5rem 0.5rem"
                      {...register("email")}
                    />
                  </Flex>
                  {errors.email && <ErrorMsg msg={errors.email.message} />}
                </Skeleton>
              </Box>
              <Button
                loadingText="Continue"
                colorScheme="primary"
                type="submit"
                paddingX="10"
                isLoading={isLoading}
                spinner={<BtnSpinner />}
              >
                Continue
              </Button>
              <Text onClick={() => router.push("/login")} fontWeight={"500"}>
                Do you know the password?{" "}
                <span className="text-[var(--primarytextcolor)] cursor-pointer">
                  Login
                </span>
              </Text>
            </>
          )}
          {step === 2 && (
            <>
              <Box width={"full"}>
                <Text marginBottom={1}>Enter OTP</Text>
                <Skeleton
                  isLoaded
                  width={"full"}
                  startColor="gray.100"
                  endColor="gray.300"
                >
                  <Flex
                    border="1px solid var(--bordersecondary)"
                    borderRadius="5px"
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                    padding="0rem 0.4rem"
                  >
                    <TbPasswordFingerprint
                      style={{ fontSize: "1.3rem", marginRight: "0.1rem" }}
                    />
                    <Input
                      type="number"
                      name="OTP"
                      placeholder="****"
                      fontSize="1rem"
                      width="100%"
                      border="none"
                      variant="unstyled"
                      padding="0.5rem 0.5rem"
                      {...register("OTP")}
                    />
                  </Flex>
                  {errors.OTP && <ErrorMsg msg={errors.OTP.message} />}
                </Skeleton>
              </Box>
              <Button
                loadingText="Continue"
                colorScheme="primary"
                type="submit"
                paddingX="10"
                isLoading={isLoading}
                spinner={<BtnSpinner />}
              >
                Continue
              </Button>
            </>
          )}
          {step === 3 && (
            <>
              <Box width={"full"}>
                <Text marginBottom={1}>New Password</Text>
                <Skeleton
                  isLoaded
                  width={"full"}
                  startColor="gray.100"
                  endColor="gray.300"
                >
                  <Flex
                    border="1px solid var(--bordersecondary)"
                    borderRadius="5px"
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                    overflow={"hidden"}
                  >
                    <Box padding={"0.5rem"}>
                      {" "}
                      <TbPasswordUser
                        style={{ fontSize: "1.3rem", marginRight: "0.1rem" }}
                      />
                    </Box>
                    <Input
                      type={visiblePass.one ? "text" : "password"}
                      name="password"
                      placeholder="****"
                      fontSize="1rem"
                      width="100%"
                      border="none"
                      variant="unstyled"
                      padding="0.4rem"
                      rounded={0}
                      {...register("password")}
                    />
                    <Box
                      onClick={() =>
                        setVisiblePass({
                          ...visiblePass,
                          one: !visiblePass.one,
                        })
                      }
                      fontSize={"xl"}
                      bgColor={"gray.200"}
                      padding="0.6rem"
                    >
                      {visiblePass.one ? <FaEye /> : <FaEyeSlash />}
                    </Box>
                  </Flex>
                  {errors.password && (
                    <ErrorMsg msg={errors.password.message} />
                  )}
                </Skeleton>
              </Box>
              <Box width={"full"}>
                <Text marginBottom={1}>Repeat Password</Text>
                <Skeleton
                  isLoaded
                  width={"full"}
                  startColor="gray.100"
                  endColor="gray.300"
                >
                  <Flex
                    border="1px solid var(--bordersecondary)"
                    borderRadius="5px"
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                    overflow={"hidden"}
                  >
                    <Box padding={"0.5rem"}>
                      {" "}
                      <TbPasswordUser
                        style={{ fontSize: "1.3rem", marginRight: "0.1rem" }}
                      />
                    </Box>

                    <Input
                      type={visiblePass.two ? "text" : "password"}
                      name="repeatPassword"
                      placeholder="****"
                      fontSize="1rem"
                      width="100%"
                      border="none"
                      variant="unstyled"
                      padding="0.4rem"
                      rounded={0}
                      {...register("repeatPassword")}
                    />
                    <Box
                      onClick={() =>
                        setVisiblePass({
                          ...visiblePass,
                          two: !visiblePass.two,
                        })
                      }
                      fontSize={"xl"}
                      bgColor={"gray.200"}
                      padding="0.6rem"
                      cursor={"pointer"}
                    >
                      {visiblePass.two ? <FaEye /> : <FaEyeSlash />}
                    </Box>
                  </Flex>
                  {errors.repeatPassword && (
                    <ErrorMsg msg={errors.repeatPassword.message} />
                  )}
                </Skeleton>
              </Box>
              <Button
                loadingText="Continue"
                colorScheme="primary"
                type="submit"
                paddingX="10"
                isLoading={isLoading}
                spinner={<BtnSpinner />}
              >
                Continue
              </Button>
            </>
          )}
        </VStack>
      </form>
    </OnboardingCardLayout>
  );
};

export default ForgetPassword;
