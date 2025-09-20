
"use client";
import React from "react";

import { useContext, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import CTAButton from "../../CTAButton";
import Divider from "../../Divider/Divider";
import {
  VStack,
  Flex,
  Input,

  Button,
  Text,
} from "@/components/ui/migration-helpers";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";

import OnbardingCardLayout from "../../Layouts/CardLayout/OnbardingCardLayout";
import { signIn } from "../../../helpers/APIs/apiRequest";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../../redux/authSlice/authSlice";
import { getAllDetailsOfUser } from "../../../helpers/APIs/userApis";
import { CurrentUserContext } from "../../../contexts/CurrentUser";
import BtnSpinner from "../../Skeletons/BtnSpinner";
import { useForm } from "react-hook-form";
import ErrorMsg from "../../utils/Error/ErrorMsg";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || "/";
  const { getUserDetails } = useContext(CurrentUserContext);
  const passwordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginBtnLoading, setLoginBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setLoginBtnLoading(true);
    setLoading(false); // Ensure skeleton is hidden initially
    
    try {
      const response = await signIn(formData);
      setLoginBtnLoading(false);
      
      if (response.code === 200) {
        const { role, token } = response.body;
        dispatch(setAuthData({ role: role, authtoken: token }));
        getUserDetails();
        setLoading(true); // Show skeleton only during user details loading
        
        const res = await getAllDetailsOfUser();
        const data = res?.body;
        const detailsFound =
          data?.categories?.length > 0 &&
          data?.skills?.length > 0 &&
          data?.hourly_rate;
        const clientDetailsFound =
          data?.businessName?.length > 0 && data?.briefDescription?.length > 0;

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await delay(1500);
      toast.success(response.msg);
      if (detailsFound || clientDetailsFound) {
        router.push(from, { replace: true });
      } else {
        router.push("/onboarding");
      }

      setLoading(false);
    } else if (response?.code === 403) {
      toast.warning(response?.msg);
      setLoginBtnLoading(false);
    } else if (response?.code === 405) {
      toast.warning(response?.msg);
      router.push("/login");
    }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
      setLoginBtnLoading(false);
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <OnbardingCardLayout title="Log In to ZeeWork">
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>

        <div className="flex flex-col gap-4">
          <div className={cn("w-full", loading && "animate-pulse")}>
            {loading ? (
              <div className="h-12 bg-gray-200 rounded-md w-full"></div>
            ) : (
              <>
                <div className="flex overflow-hidden"
                 
                 
                 
                 
                 
                 
                >
                  <CiUser
                    style={{
                      fontSize: "2rem",
                      marginRight: "0.1rem",
                      padding: "0.4rem",
                    }}
                  />
                  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm border-none text-base py-2 px-2 rounded-none focus:outline-none focus:ring-0"
                    type="text"
                    placeholder="Username Or Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email address",
                      },
                    })}
                   
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        passwordRef.current.focus();
                      }
                    }}
                  />
                </div>
                {errors.email && <ErrorMsg msg={errors.email.message} className="text-red-500 text-sm mt-1" />}
              </>
            )}
          </div>
          <div className={cn("w-full", loading && "animate-pulse")}>
            {loading ? (
              <div className="h-12 bg-gray-200 rounded-md w-full"></div>
            ) : (
              <>
                <div className="flex overflow-hidden"
                 
                 
                 
                 
                 
                 
                >
                  <MdPassword
                    style={{
                      fontSize: "2.1rem",
                      marginRight: "0.1rem",
                      padding: "0.5rem",
                    }}
                  />
                  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm border-none text-base py-2 px-2 rounded-none focus:outline-none focus:ring-0 flex-1"
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", { required: "Password is required" })}
                   
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmit(onSubmit)();
                    }}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide Password" : "Show Password"}
                    onClick={toggleShowPassword}
                    className="p-2 hover:bg-gray-100 transition-colors rounded-none"
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </div>
                {errors.password && <ErrorMsg msg={errors.password.message} className="text-red-500 text-sm mt-1" />}
                <span
                  className="cursor-pointer mt-3 ml-1"
                  onClick={() => router.push("/forget-password")}
                >
                  Forget Your Password?
                </span>
              </>
            )}
          </div>
          <div className={cn("w-full", loading && "animate-pulse")}>
            {loading ? (
              <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            ) : (
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full"
                type="submit"
                disabled={loginBtnLoading}
              >
                {loginBtnLoading ? "Verifying..." : "Continue with Email"}
              </button>
            )}
          </div>
          <Divider text="Don't have a ZeeWork account?" dwidth="60px" />
        </div>
      </form>
      <br />

      <div className={cn("w-full", loading && "animate-pulse")}>
        {loading ? (
          <div className="h-10 bg-gray-200 rounded-md w-full"></div>
        ) : (
          <CTAButton
            text="Sign Up"
            onClick={() => router.push("/signup")}
          />
        )}
      </div>
    </OnbardingCardLayout>
  );
};

export default Login;
