"use client";

import { toast } from "@/lib/toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyMail } from "../../../helpers/APIs/apiRequest";
import BtnSpinner from "../../Skeletons/BtnSpinner";
import HomeLayout from "../../Layouts/HomeLayout";

export const VerifySuccess = () => {
  const [loading, setLoading] = useState(false);
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
        toast.success(response.msg);
      } else if (response.code === 401) {
        toast.warning(response.msg);
      }
    } catch (error) {
      console.error(error);
    } finally {
      router.push("/login");
    }
  };

  useEffect(() => {
    verifyMailAddress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <HomeLayout>
      <div
        style={{color: "var(--primarycolor)", opacity: 0.5}}
        className="flex items-center justify-center">
        {loading && (
          // <Spinner
          //   backgroundColor="#"
          //
          //
          //
          // />
          <BtnSpinner size={50} />
        )}
      </div>
    </HomeLayout>
  );
};
