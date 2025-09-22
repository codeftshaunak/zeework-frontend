
"use client";"
import React from "react";"

import UniversalModal from "../../Modals/UniversalModal";"
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  RadioGroup,
  Stack,
} from "@/components/ui/migration-helpers";"
import { toast } from "@/lib/toast";"
import { useContext, useState } from "react";"
import Select from "react-select";"
import { useSelector } from "react-redux";"
import { useForm } from "react-hook-form";"
import { getPaidFreelancerWithdrawal } from "../../../helpers/APIs/payments";"
import BtnSpinner from "../../Skeletons/BtnSpinner";"
import { FaCheckCircle } from "react-icons/fa";"
import { CurrentUserContext } from "../../../contexts/CurrentUser";"
import ErrorMsg from "../../utils/Error/ErrorMsg";"
import { yupResolver } from "@hookform/resolvers/yup";"
import * as Yup from "yup";"

const customAmountSchema = (balance) => {
  return Yup.object().shape({
    withdraw_amount: Yup.number()
      .required("Amount is required")"
      .max(balance, `Amount must be less than or equal to ${balance}`)`
      .positive("Amount must be greater than 0"),"
    payment_method: Yup.object().required("Payment method is required"),"
  });
};

const allAmountSchema = () => {
  return Yup.object().shape({
    payment_method: Yup.object().required("Payment method is required"),"
  });
};

const GetFreelancerPaid = ({ isModal, setIsModal, balance }) => {
  const { getUserDetails } = useContext(CurrentUserContext);
  const [amountType, setAmountType] = useState("all");"
  const [customAmount, setCustomAmount] = useState(0);
  const paymentDetails = useSelector(
    (state) => state.profile.profile?.payment_details
  );
  const [paymentMethods] = useState([
    {
      label: paymentDetails?.payment_method?.toUpperCase(),
      value: paymentDetails?.payment_info,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessBody, setIsSuccessBody] = useState(!isModal && null);

  // Update useForm to use the resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(
      amountType === "all" ? allAmountSchema() : customAmountSchema(balance)"
    ),
  });

  // handle balance withdrawal
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const withdrawAmount =
        amountType === "all" ? balance : parseFloat(data?.withdraw_amount) || 0;"
      const reqBody = {
        withdraw_amount: withdrawAmount,
        payment_method: {
          payment_method: data.payment_method?.label?.toLowerCase(),
          payment_info: paymentDetails?.payment_info,
        },
      };
      const { code, body, msg, message } = await getPaidFreelancerWithdrawal(
        reqBody
      );
      if (code === 200) {
        getUserDetails(), setIsSuccessBody(body);
      }

      toast.default(msg || message);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {isModal && (
        <UniversalModal isModal={isModal} setIsModal={setIsModal}>
          {isSuccessBody ? (
            <div>
              <p className="text-lg flex items-center gap-1 mb-1">"
                <FaCheckCircle className="text-2xl text-green-500" />{" "}"
                Congratulation! You&apos;ve successfully withdrawn funds.
              </p>
              <hr />
              <div>
                <p className="text-xl sm:text-2xl font-semibold my-4">"
                  Payment details
                </p>
                <hr />
                <div className="flex flex-col gap-1 mt-4 tracking-wide">"
                  <p className="text-lg font-semibold">Payment method</p>"
                  <p className="capitalize">"
                    {isSuccessBody?.payment_method?.payment_method}
                  </p>
                </div>
                <div className="flex gap-1 justify-between font-semibold text-lg mt-4 mb-2">"
                  <p>Withdraw Amount</p>{" "}"
                  <p>${isSuccessBody?.withdraw_amount}</p>
                </div>
                <hr />
                <div className="flex gap-1 justify-between text-gray-300 my-2">"
                  <p>Withdrawal Fee </p> <p>$0.00</p>
                </div>
                <div className="flex gap-1 justify-between font-bold text-xl mt-5">"
                  <p>Total Amount</p> <p>${isSuccessBody?.withdraw_amount}</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-2xl font-semibold mb-5">Get paid now</p>"
              <div className="flex flex-col sm:flex-row gap-1 text-lg sm:text-xl font-semibold tracking-wide">"
                <p>Available balance</p>
                <p className="text-xl sm:text-2xl">${balance}</p>"
              </div>
              <div className="flex flex-col gap-2 mt-5 tracking-wide">"
                <p className="text-lg sm:text-xl font-semibold">"
                  Payment method
                </p>
                <Select
                  placeholder="Select payment method"
                  options={paymentMethods}
                  {...register("payment_method", { required: true })}"
                  onChange={(data) => {
                    setValue("payment_method", data);"
                    trigger("payment_method");"
                  }}
                />
                {errors?.payment_method && (
                  <ErrorMsg msg="Payment method is required" />"
                )}
              </div>
              <div className="flex flex-col gap-1 font-semibold my-5 tracking-wide">"
                <p className="text-lg sm:text-xl">Amount</p>"
                <RadioGroup.Root onValueChange={setAmountType} value={amountType}>
                  <div className="flex> <RadioGroup.Item value="all">"
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>${balance}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="custom">"
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>Other amount</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  </div>
                </RadioGroup.Root>
                {amountType === "custom" && ("
                  <>
                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"Grou />p>"
                      <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"LeftElement"
                        pointerEvents="none"
                        paddingRight={1}
                      /> >
                        $
                      </InputLeftElement>
                      <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        type="number"
                        placeholder="Enter amount"
                        // {...register("withdraw_amount")}"
                        onChange={(e)  />=> {
                          const value = e.target?.value;
                          const numValue = parseFloat(value || 0);

                          if (value === "") {"
                            setCustomAmount(0);
                            setValue("withdraw_amount", null);"
                            return;
                          }

                          if (!isNaN(numValue) && numValue <= balance) {
                            setCustomAmount(numValue);
                            setValue("withdraw_amount", numValue);"
                          } else {
                            setValue("withdraw_amount", numValue);"
                          }

                          trigger("withdraw_amount");"
                        }}
                        paddingLeft={7}
                        className="placeholder-slate-300"
                      />
                    </InputGroup>
                    <ErrorMsg
                      msg={errors?.withdraw_amount?.message}
                      className="font-normal"
                    />
                  </>
                )}
              </div>
              <hr />
              <div className="text-gray-300 my-4">"
                <div className="flex gap-1 justify-between">"
                  <p>Withdrawal Fee (per payment)</p> <p>$0.00</p>
                </div>
                <small>Other bank fees may apply</small>
              </div>
              <hr />
              <div className="flex gap-1 justify-between font-semibold text-lg sm:text-xl mt-2">"
                <p>Total Amount</p>{" "}"
                <p>${amountType === "all" ? balance : customAmount}</p>"
              </div>
              <div className="flex gap-7 justify-end mt-7">"
                <button
                  className="text-green-500 font-semibold"
                  onClick={() => setIsModal(false)}
                >
                  Cancel
                </button>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  isLoading={isLoading}
                  loadingText="Get Paid"
                  spinner={<BtnSpinner />}
                  paddingX={10}
                  type="submit"
                >
                  Get Paid
                </button>
              </div>
            </form>
          )}
        </UniversalModal>
      )}
    </div>
  );
};

export default GetFreelancerPaid;
