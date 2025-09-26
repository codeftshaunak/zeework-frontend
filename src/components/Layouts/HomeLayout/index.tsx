
"use client";
import React from "react";


import { useSelector } from "react-redux";
import { AuthHeader, Header } from "../../Header";
import Notifications from "../../NotifyToast/Notifications";

interface HomeLayoutProps {
  width?: string;
  gap?: string | number;
  bg?: string;
  children: any;
  displaydir?: string
}

const HomeLayout: React.FC<HomeLayoutProps> = (props) => {
  const token = useSelector((state: any) => state.auth.authtoken);
  const role = useSelector((state: any) => state.auth.role);

  return (
    <div className="flex flex-col w-full">
      {token ? <AuthHeader role={role} /> : <Header />}
      <Notifications />
      <div className="flex flex-col max-w-[1400px] mx-auto px-4 lg:px-6 xl:px-8">
        {props.children}
      </div>
    </div>
  );
};

export default HomeLayout;