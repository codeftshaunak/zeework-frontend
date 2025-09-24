
"use client";
import React from "react";

import { useContext, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";

import AuthLayout from "../../auth/AuthLayout";
import AuthFormField from "../../auth/AuthFormField";
import { signIn } from "../../../helpers/APIs/apiRequest";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../../redux/authSlice/authSlice";
import { getAllDetailsOfUser } from "../../../helpers/APIs/userApis";
import { CurrentUserContext } from "../../../contexts/CurrentUser";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

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
        // Redirect based on user role after successful login
        if (role === 1) {
          // Freelancer role - redirect to find job page
          router.push("/find-job", { replace: true });
        } else if (role === 2) {
          // Client role - redirect to dashboard
          router.push("/client-dashboard", { replace: true });
        } else {
          // Fallback to original from parameter
          router.push(from, { replace: true });
        }
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
    <AuthLayout
      title="Welcome back"
      description="Sign in to your ZeeWork account to continue"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded-md w-full animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-md w-full animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-md w-full animate-pulse"></div>
          </div>
        ) : (
          <>
            {/* Email Field */}
            <AuthFormField
              type="email"
              placeholder="Enter your email address"
              error={errors.email?.message}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  passwordRef.current?.focus();
                }
              }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
            />

            {/* Password Field */}
            <div className="space-y-2">
              <AuthFormField
                ref={passwordRef}
                type="password"
                placeholder="Enter your password"
                showPassword={showPassword}
                onTogglePassword={toggleShowPassword}
                error={errors.password?.message}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit(onSubmit)();
                }}
                {...register("password", { required: "Password is required" })}
              />

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => router.push("/forget-password")}
                  className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full h-12 text-base font-semibold"
              disabled={loginBtnLoading}
            >
              {loginBtnLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in to ZeeWork"
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">Don&apos;t have an account?</span>
              </div>
            </div>

            {/* Sign Up Button */}
            <Button
              type="button"
              variant="gradient-outline"
              size="lg"
              className="w-full h-12 text-base font-semibold"
              onClick={() => router.push("/signup")}
            >
              Create new account
            </Button>
          </>
        )}
      </form>
    </AuthLayout>
  );
};

export default Login;
