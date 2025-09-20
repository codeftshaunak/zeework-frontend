"use client";

import { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import ModernProcess from "./ModernProcess";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Onboarding = () => {
  const state = useSelector((state) => state);
  const router = useRouter();
  const {
    description,
    skills,
    professional_role,
    briefDescription,
    businessName,
  } = state.profile.profile || {};
  const isAuth = state?.auth?.authtoken?.length > 10;
  const role = state?.auth?.role;
  const isClient = briefDescription && businessName;
  const isFreelancer = description && skills?.length > 0 && professional_role;
  const isComplete = role == 2 ? isClient : isFreelancer;

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    } else if (isComplete) {
      router.push("/");
    }
  }, [isAuth, isComplete, router]);

  return <>{isAuth && !isComplete && <ModernProcess />}</>;
};

export default Onboarding;
