"use client";

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
  Skeleton,
  Button,
  Text,
} from "@chakra-ui/react";
// import { toaster } from "@/lib/providers"; // Disabled until proper toast API is implemented
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
        
        console.log("Login successful:", response.msg);
        // TODO: Implement proper toast notification
        
        if (detailsFound || clientDetailsFound) {
          router.replace(from);
        } else {
          router.push("/onboarding");
        }
      } else if (response?.code === 403) {
        console.warn("Login warning:", response?.msg);
        // TODO: Implement proper toast notification
      } else if (response?.code === 405) {
        console.warn("Login warning:", response?.msg);
        // TODO: Implement proper toast notification
        router.push("/login");
      }
    } catch (error) {
      console.error("Login error:", error);
      // TODO: Implement proper toast notification
    } finally {
      // Always ensure loading states are reset
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
        <VStack width="100%" gap={6} mt={6}>
          {loading ? (
            <Skeleton
              width={"full"}
              startColor="gray.100"
              endColor="gray.300"
            >
              <div style={{ height: "50px", width: "100%" }}></div>
            </Skeleton>
          ) : (
            <div>
              <Flex
                border="1px solid var(--bordersecondary)"
                borderRadius="5px"
                width="100%"
                justifyContent="center"
                alignItems="center"
                overflow={"hidden"}
              >
                <CiUser
                  style={{
                    fontSize: "2rem",
                    marginRight: "0.1rem",
                    padding: "0.4rem",
                  }}
                />
                <Input
                  type="text"
                  placeholder="Username Or Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  fontSize="1rem"
                  width="100%"
                  border="none"
                  variant="unstyled"
                  padding="0.5rem 0.5rem"
                  rounded={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      passwordRef.current?.focus();
                    }
                  }}
                />
              </Flex>
              {errors.email && <ErrorMsg msg={errors.email.message} className="" />}
            </div>
          )}
          {loading ? (
            <Skeleton
              width={"full"}
              startColor="gray.100"
              endColor="gray.300"
            >
              <div style={{ height: "50px", width: "100%" }}></div>
            </Skeleton>
          ) : (
            <div>
              <Flex
                border="1px solid var(--bordersecondary)"
                borderRadius="5px"
                width="100%"
                justifyContent="center"
                alignItems="center"
                overflow={"hidden"}
              >
                <MdPassword
                  style={{
                    fontSize: "2.1rem",
                    marginRight: "0.1rem",
                    padding: "0.5rem",
                  }}
                />
                <Input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", { required: "Password is required" })}
                  variant="unstyled"
                  fontSize="1rem"
                  padding="0.5rem 0.5rem"
                  border={"none"}
                  rounded={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit(onSubmit)();
                  }}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide Password" : "Show Password"}
                  onClick={toggleShowPassword}
                  className="p-2"
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </button>
              </Flex>
              {errors.password && <ErrorMsg msg={errors.password.message} className="" />}
              <Text
                fontWeight={500}
                marginTop={3}
                marginLeft={1}
                color="var(--primarycolor)"
                cursor={"pointer"}
                onClick={() => router.push("/forget-password")}
              >
                Forget Your Password?
              </Text>
            </div>
          )}
          {loading ? (
            <Skeleton
              startColor="gray.100"
              endColor="gray.300"
            >
              <div style={{ height: "40px", width: "200px" }}></div>
            </Skeleton>
          ) : (
            <Button
              loading={loginBtnLoading}
              type="submit"
              className="bg-primary text-white hover:bg-primary/90"
            >
              {loginBtnLoading ? "Verifying..." : "Continue with Email"}
            </Button>
          )}
          <Divider text="Don't have a ZeeWork account?" dwidth="60px" />
        </VStack>
      </form>
      <br />
      {loading ? (
        <Skeleton
          startColor="gray.100"
          endColor="gray.300"
          width={"full"}
        >
          <div style={{ height: "40px", width: "100%" }}></div>
        </Skeleton>
      ) : (
        <CTAButton
          fontSize="1rem"
          text="Sign Up"
          border="1px solid var(--bordersecondary)"
          bg="var(--secondarycolor)"
          width="full"
          onClick={() => router.push("/signup")}
        />
      )}
    </OnbardingCardLayout>
  );
};

export default Login;
