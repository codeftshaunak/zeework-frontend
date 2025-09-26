"use client";

import { useEffect } from "react";
import { Header } from "../../Header";
import { Footer } from "../../Footer";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import HomeComponent from "../../HomeComponent/HomeComponent";
import AutoPopup from "../../Modals/AutoPopup";

const Home = () => {
  const token = useSelector((state) => state.auth.authtoken);
  const role = useSelector((state) => state.auth.role);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      if (role == 1) {
        router.push("/find-job", );
      } else {
        router.push("/client-dashboard", );
      }
    }
  }, [token, role, navigate]);

  if (token) {
    return;
  }

  return (
    <>
      <AutoPopup />
      <Header />
      <HomeComponent />
      <Footer />
    </>
  );
};

export default Home;
