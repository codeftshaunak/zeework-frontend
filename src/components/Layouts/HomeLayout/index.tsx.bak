"use client";

import { VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { AuthHeader, Header } from "../../Header";
import Notifications from "../../NotifyToast/Notifications";

interface HomeLayoutProps {
  width?: string;
  gap?: string | number;
  bg?: string;
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = (props) => {
  const token = useSelector((state: any) => state.auth.authtoken);
  const role = useSelector((state: any) => state.auth.role);

  return (
    <VStack width={"full"} spacing={0} gap={props.gap ? props.gap : 0}>
      {token ? <AuthHeader role={role} /> : <Header />}
      <Notifications />
      <VStack
        width={props.width ? props.width : "85%"}
        gap={props.gap ? props.gap : "60px"}
        bg={props.bg}
        maxW={"1200px"}
      >
        {props.children}
      </VStack>
    </VStack>
  );
};

export default HomeLayout;