"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../../../../schemas/user-schema";
import { toast } from "@/lib/toast";
import { changeOldPassword } from "../../../../helpers/APIs/jobApis";
import BtnSpinner from "../../../Skeletons/BtnSpinner";
import ErrorMsg from "../../../utils/Error/ErrorMsg";

const ChangeOldPassword = () => {
  const [passLoading, setPassLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  // changes old password
  const changePassword = async (data) => {
    setPassLoading(true);
    try {
      const { code, msg } = await changeOldPassword({
        old_password: data.old_password,
        new_password: data.new_password,
      });

      toast.default(msg);
    } catch (error) {
      console.error(error);
    }
    setPassLoading(false);
    reset();
  };

  const handleCancel = () => {
    reset();
  };
  return (
    <div className="border-[1px] border-[var(--bordersecondary)] rounded-lg bg-white overflow-hidden">
      <form onSubmit={handleSubmit(changePassword)}>
        <div className="flex flex-col gap-[8px] py-[20px] px-[24px] w-full">
          <p className="text-[#374151] text-2xl font-[600] mb-4">
            Change Password
          </p>
          <div className="flex flex-col gap-1 w-full lg:w-80 mb-3">
            <label htmlFor="old_password" className="font-semibold mb-2">
              Old Password
            </label>
            <input
              {...register("old_password")}
              type="password"
              id="new_password"
              placeholder="Enter Old Password"
              className="border px-3 py-2 rounded-md focus:outline-none"
            />
            {errors.old_password && (
              <ErrorMsg msg={errors.old_password.message} />
            )}
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col gap-1 w-full lg:w-80">
              <label htmlFor="new_password" className="font-semibold mb-2">
                New Password
              </label>
              <input
                {...register("new_password")}
                type="password"
                id="new_password"
                placeholder="Enter New Password"
                className="border px-3 py-2 rounded-md focus:outline-none"
              />
              {errors.new_password && (
                <ErrorMsg msg={errors.new_password.message} />
              )}
            </div>
            <div className="flex flex-col gap-1 w-full lg:w-80">
              <label htmlFor="confirm_password" className="font-semibold mb-2">
                Confirm New Password
              </label>
              <input
                {...register("confirm_password")}
                type="password"
                id="confirm_password"
                placeholder="Enter Confirm Password"
                className="border px-3 py-2 rounded-md focus:outline-none"
              />
              {errors.confirm_password && (
                <ErrorMsg msg={errors.confirm_password.message} />
              )}
            </div>
          </div>
          <div className="text-right mt-5 flex justify-start gap-3 mb-1">
            <Button
              paddingX={8}
              onClick={handleCancel}
             className="rounded-full">
              Cancel
            </button>
            <Button
              type="submit"
              paddingX={8}
              isLoading={passLoading}
              loadingText="Updating"
              spinner={<BtnSpinner />}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangeOldPassword;
