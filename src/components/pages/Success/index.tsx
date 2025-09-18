"use client";

import { HStack, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyMail } from "../../../helpers/APIs/apiRequest";
import BtnSpinner from "../../Skeletons/BtnSpinner";
import HomeLayout from "../../Layouts/HomeLayout";

export const VerifySuccess = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  const router = useRouter();

  const verifyMailAddress = async () => {
    setLoading(true);
    try {
      const response = await verifyMail({
        user_id: id,
        token: token,
      });
      if (response.code === 200) {
        toast({
          title: response.msg,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else if (response.code === 401) {
        toast({
          title: response.msg,
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      router.push("/login");
    }
  };

  useEffect(() => {
    verifyMailAddress();
  }, [id]);

  return (
    <HomeLayout>
      <HStack
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
        textColor={"var(--primarycolor)"}
        opacity={0.5}
      >
        {loading && (
          // <Spinner
          //   backgroundColor={"#"}
          //   width={"3rem"}
          //   height={"3rem"}
          //   color="red"
          // />
          <BtnSpinner size={50} />
        )}
      </HStack>
    </HomeLayout>
  );
};
