
"use client";
import React from "react";


import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { MdLocationPin } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import Select from "react-select/creatable";
import { updateAgencyProfile } from "../../helpers/APIs/agencyApis";
import UniversalModal from "../Modals/UniversalModal";
import AgencyTitle from "./AgencyTitle";
// import { State, City } from "country-state-city";
import BtnSpinner from "../Skeletons/BtnSpinner";
import ErrorMsg from "../utils/Error/ErrorMsg";
// import { AgencyUpdatedModal } from "./ProfileUpdated";

const AgencyRightBar = ({ agency, setAgency }) => {
  const [isModal, setIsModal] = useState(false);
  const [modalType, setIsModalType] = useState("");
  const [value, setValue] = useState(null);
  const [isLading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const {
    agency_hourlyRate,
    agency_officeLocation,
    agency_size,
    agency_foundedYear,
    agency_focus,
    agency_language,
    agency_totalJob,
  } = agency || {};
  const [stateData] = useState([]);
  const [cityData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [stateCode, setStateCode] = useState("");
  const { name: countryName } =
    useSelector((state: any) => state?.profile?.agency?.agency_location) || {};

  // handle update info
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { body, code } = await updateAgencyProfile(data);

      if (code === 200) setAgency(body);
    } catch (error) {
      console.log(error);
    }
    setIsModal(false);
    setIsLoading(false);
  };
  useEffect(() => {
    reset();
  }, [agency, reset]);

  const handleUpdate = (type, value) => {
    setIsModal(true);
    setIsModalType(type);
    setValue(value);
  };

  return (
    <>
      <div className="flex flex-col} className="items-flex-start justify-right"
        marginX={{ xl: "auto" }}
        marginTop={{ base: 10, lg: 0 }}
      >
        <span className="font-semibold">
          Your Agency Activity
        </span>
        <div className="relative">
          <span className="mb-[0.5rem] text-base font-medium">
            Hourly Rate
          </span>
          <span className="mb-[0.5rem] font-semibold">
            ${agency_hourlyRate}
          </span>
          <div className="top= rounded w-[20px] border h-[20px] items-center justify-center"0"
            right="-10"
            transition="0.6s ease-in-out"
            _hover={{
              border: "2px solid var(--primarycolor)",
              backgroundColor: "transparent",
              color: "var(--primarycolor)",
            }}
            onClick={() = className="flex flex-col backgroundColor= cursor-pointer absolute"> handleUpdate("Hourly Rate", agency_hourlyRate)}
          >
            <RiEdit2Fill />
          </div>
        </div>

        <div className="relative">
          <span className="mb-[0.51rem] font-semibold">
            Total Completed Jobs
          </span>
          <span className="font-semibold">
            {agency_totalJob}
          </span>
        </div>

        <div className="relative"}>
          <div className="flex flex-row items-center className="mb-[0.5rem] mt-[1rem]">
            <span className="mb-[0] font-semibold">
              Office Location
            </span>
            {
              <div className="className= flex flex-col backgroundColor= cursor-pointer"rounded w-[20px] border h-[20px] items-center justify-center"
                transition="0.6s ease-in-out"
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                onClick={() => handleUpdate("Office Location")}
              >
                {agency_officeLocation?.country ? (
                  <RiEdit2Fill />
                ) : (
                  <FiPlus />
                )}
              </div>
            }
          </div>

          <div>
            {!!agency_officeLocation?.country &&
              agency_officeLocation?.street &&
              agency_officeLocation?.state && (
                <div className="flex flex-row items-center> <MdLocationPin /> <span> {agency_officeLocation?.street},{" "}
                    {agency_officeLocation?.state}
                  </span>
                </div>
              )}
            {/* <div className="flex flex-row items-center> <IoTime /> <span>6:00 Am, 23 Jan 2024</span> </div> */"
          </div>
        </div>

        <div className="flex flex-col gap= items-flex-start"10px">
          <AgencyTitle noAdded={true} isSmall={true}>
            Company Information
          </AgencyTitle>
          <div className="flex flex-col gap= items-flex-start"10px">
            <div className="flex flex-row items-center className="items-start">
              <div className="className= flex flex-col backgroundColor= cursor-pointer"rounded w-[20px] border h-[20px] items-center justify-center"
                transition="0.6s ease-in-out"
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                onClick={() => handleUpdate("Agency Size", agency_size)}
              >
                {agency_size ? <RiEdit2Fill /> : <FiPlus />}
              </div>
              {agency_size ? (
                <div className="mb-[1rem] ml-[0.57rem]">
                  <span
                   className="mb-[0.5rem] text-base font-medium">
                    Agency Size:
                  </span>{" "}
                  <span>{agency_size}</span>
                </div>
              ) : (
                <span className="text-base font-medium">
                  Add Your Agency Size
                </span>
              )}
            </div>
            <div className="flex flex-row items-center className="items-start">
              <div className="className= flex flex-col backgroundColor= cursor-pointer"rounded w-[20px] border h-[20px] items-center justify-center"
                transition="0.6s ease-in-out"
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                onClick={() => handleUpdate("Founded", agency_foundedYear)}
              >
                {agency_foundedYear ? (
                  <RiEdit2Fill />
                ) : (
                  <FiPlus />
                )}
              </div>
              {agency_foundedYear ? (
                <div className="mb-[1rem] ml-[0.57rem]">
                  <span
                   className="mb-[0.5rem] text-base font-medium">
                    Agency Founded:
                  </span>{" "}
                  <span>{agency_foundedYear}</span>
                </div>
              ) : (
                <span className="text-base font-medium">
                  Add Year Agency Founded
                </span>
              )}
            </div>
            <div className="flex flex-row items-center className="items-start">
              <div className="className= flex flex-col backgroundColor= cursor-pointer"rounded w-[20px] border h-[20px] items-center justify-center"
                transition="0.6s ease-in-out"
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                onClick={() => handleUpdate("Focus")}
              >
                {agency_focus?.length ? (
                  <RiEdit2Fill />
                ) : (
                  <FiPlus />
                )}
              </div>

              <div>
                {agency_focus?.length ? (
                  <div className="mb-[1rem]">
                    <span
                     className="mb-[0.5rem] text-base font-medium">
                      Agency Focus:
                    </span>
                    <ul className="flex gap-1 flex-wrap mt-1">
                      {agency_focus.map((item, index) => (
                        <li key={index} className="border px-2 rounded-full">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <span className="text-base font-medium">
                    Add Your Client Focus
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-row items-center className="items-start">
              <div className="className= flex flex-col backgroundColor= cursor-pointer"rounded w-[20px] border h-[20px] items-center justify-center"
                transition="0.6s ease-in-out"
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                onClick={() => handleUpdate("Language")}
              >
                {agency_language ? (
                  <RiEdit2Fill />
                ) : (
                  <FiPlus />
                )}
              </div>
              {agency_language ? (
                <div className="mb-[1rem] ml-[0.56rem]">
                  <span
                   className="mb-[0.5rem] text-base font-medium">
                    Language:
                  </span>{" "}
                  <span>{agency_language}</span>
                </div>
              ) : (
                <span className="text-base font-medium">
                  Add Languages
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {isModal && (
        <AgencyUpdatedModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={modalType}
          setAgency={setAgency}
          data={value}
        />
      )} */}
      {isModal && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={`Update ${modalType}`}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* update hourly rate */}
            {modalType === "Hourly Rate" && (
              <div>
                <input
                  type="number"
                  {...register("agency_hourlyRate", {
                    required: "Hourly rate is required",
                  })}
                  defaultValue={Number(value)}
                  className="px-3 py-1 border rounded w-full"
                />
                {errors.agency_hourlyRate && (
                  <ErrorMsg msg={errors.agency_hourlyRate.message} />
                )}
              </div>
            )}
            {/* update office location */}
            {modalType === "Office Location" && (
              <div>
                <p>Your Country</p>
                <select
                  className="w-full px-2 py-1 border rounded"
                  {...register("agency_officeLocation.country")}
                  defaultValue={countryName}
                >
                  <option value={countryName}>{countryName}</option>
                </select>
                <div className="w-full flex gap-5 mt-3">
                  <div className="w-1/2">
                    <p>Select State</p>
                    <Controller
                      control={control}
                      name="agency_officeLocation.state"
                      render={({ field: { onChange, ref } }) => (
                        <Select
                          className="w-full"
                          inputRef={ref}
                          onChange={(val, action) => {
                            if (action.action === "create-option") {
                              onChange(action.option.value), setStateCode("");
                            } else {
                              onChange(val.value), setStateCode(val.isoCode);
                            }
                          }}
                          options={[
                            ...(stateData || []),
                            {
                              label: "Add new state",
                              value: "__create_new_field__",
                            },
                          ]}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <p>Select City</p>
                    <Controller
                      control={control}
                      name="agency_officeLocation.street"
                      render={({ field: { onChange, ref } }) => (
                        <Select
                          className="w-full"
                          inputRef={ref}
                          onChange={(val, action) => {
                            if (action.action === "create-option") {
                              onChange(action.option.value);
                            } else {
                              onChange(val.value);
                            }
                          }}
                          options={[
                            ...(cityData || []),
                            {
                              label: "Add new city",
                              value: "__create_new_field__",
                            },
                          ]}
                          required
                          // isDisabled={!stateCode}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <p>Address</p>
                  <input
                    className="w-full px-2 py-1 border rounded"
                    type="text"
                    {...register("agency_officeLocation.address")}
                  />
                </div>
              </div>
            )}
            {/* update company info */}
            {modalType === "Agency Size" && (
              <input
                type="number"
                {...register("agency_size")}
                defaultValue={Number(value)}
                required
                className="px-3 py-1 border rounded w-full"
              />
            )}
            {modalType === "Founded" && (
              <input
                type="date"
                defaultValue={value}
                {...register("agency_foundedYear")}
                className="px-3 py-1 border rounded w-full"
                required
              />
            )}
            {modalType === "Focus" && <p>Coming Soon</p>}
            {modalType === "Language" && <p>Coming Soon</p>}

            <div className="text-right mt-10">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                isLoading={isLading}
                loadingText="Submit"
                type="submit"
                spinner={<BtnSpinner />}
              >
                Submit
              </button>
            </div>
          </form>
        </UniversalModal>
      )}
    </>
  );
};

export default AgencyRightBar;
