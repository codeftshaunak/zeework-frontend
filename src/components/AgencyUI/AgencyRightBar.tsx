"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { MdLocationPin } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import Select from "react-select/creatable";
import { updateAgencyProfile } from "../../helpers/APIs/agencyApis";
import UniversalModal from "../Modals/UniversalModal";
import AgencyTitle from "./AgencyTitle";
import BtnSpinner from "../Skeletons/BtnSpinner";
import ErrorMsg from "../utils/Error/ErrorMsg";

// ---- Types ----
interface AgencyLocation {
  country?: string;
  state?: string;
  street?: string;
  address?: string;
}

export interface Agency {
  agency_hourlyRate?: number;
  agency_officeLocation?: AgencyLocation;
  agency_size?: number;
  agency_foundedYear?: string;
  agency_focus?: string[];
  agency_language?: string;
  agency_totalJob?: number;
}

interface AgencyRightBarProps {
  agency: Agency | null;
  setAgency: (agency: Agency) => void;
}

type ModalType =
  | "Hourly Rate"
  | "Office Location"
  | "Agency Size"
  | "Founded"
  | "Focus"
  | "Language"
  | "";

// ---- Component ----
const AgencyRightBar: React.FC<AgencyRightBarProps> = ({
  agency,
  setAgency,
}) => {
  const [isModal, setIsModal] = useState(false);
  const [modalType, setIsModalType] = useState<ModalType>("");
  const [value, setValue] = useState<string | number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Agency>();

  const {
    agency_hourlyRate,
    agency_officeLocation,
    agency_size,
    agency_foundedYear,
    agency_focus,
    agency_language,
    agency_totalJob,
  } = agency || {};

  const [stateData] = useState<any[]>([]);
  const [cityData] = useState<any[]>([]);
  const [stateCode, setStateCode] = useState<string>("");

  const { name: countryName } =
    (useSelector((state: any) => state?.profile?.agency?.agency_location) as {
      name?: string;
    }) || {};

  // handle update info
  const onSubmit: SubmitHandler<Agency> = async (data) => {
    setIsLoading(true);
    try {
      const { body, code } = await updateAgencyProfile(data);
      if (code === 200) setAgency(body as Agency);
    } catch (error) {
      console.error(error);
    }
    setIsModal(false);
    setIsLoading(false);
  };

  useEffect(() => {
    reset();
  }, [agency, reset]);

  const handleUpdate = (type: ModalType, value?: string | number) => {
    setIsModal(true);
    setIsModalType(type);
    setValue(value ?? null);
  };

  return (
    <>
      <div className="flex flex-col items-start justify-end mx-auto mt-10 lg:mt-0">
        <span className="font-semibold">Your Agency Activity</span>

        {/* Hourly Rate */}
        <div className="relative mt-3">
          <span className="mb-2 text-base font-medium">Hourly Rate</span>
          <span className="mb-2 font-semibold">${agency_hourlyRate}</span>
          <div
            className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 transition duration-300 border rounded cursor-pointer hover:border-primary hover:bg-transparent hover:text-primary"
            onClick={() => handleUpdate("Hourly Rate", agency_hourlyRate)}
          >
            <RiEdit2Fill />
          </div>
        </div>

        {/* Completed Jobs */}
        <div className="relative mt-3">
          <span className="mb-2 font-semibold">Total Completed Jobs</span>
          <span className="font-semibold">{agency_totalJob}</span>
        </div>

        {/* Office Location */}
        <div className="relative mt-3">
          <div className="flex items-center mb-2">
            <span className="font-semibold">Office Location</span>
            <div
              className="flex items-center justify-center w-5 h-5 ml-2 transition duration-300 border rounded cursor-pointer hover:border-primary hover:bg-transparent hover:text-primary"
              onClick={() => handleUpdate("Office Location")}
            >
              {agency_officeLocation?.country ? <RiEdit2Fill /> : <FiPlus />}
            </div>
          </div>

          {!!agency_officeLocation?.country &&
            agency_officeLocation?.street &&
            agency_officeLocation?.state && (
              <div className="flex items-center gap-1">
                <MdLocationPin />
                <span>
                  {agency_officeLocation?.street},{" "}
                  {agency_officeLocation?.state}
                </span>
              </div>
            )}
        </div>

        {/* Company Info */}
        <div className="flex flex-col gap-3 mt-6">
          <AgencyTitle noAdded={true} isSmall={true}>
            Company Information
          </AgencyTitle>

          {/* Agency Size */}
          <div className="flex items-start gap-2">
            <div
              className="flex items-center justify-center w-5 h-5 transition duration-300 border rounded cursor-pointer hover:border-primary hover:bg-transparent hover:text-primary"
              onClick={() => handleUpdate("Agency Size", agency_size)}
            >
              {agency_size ? <RiEdit2Fill /> : <FiPlus />}
            </div>
            {agency_size ? (
              <div>
                <span className="text-base font-medium">Agency Size: </span>
                <span>{agency_size}</span>
              </div>
            ) : (
              <span className="text-base font-medium">
                Add Your Agency Size
              </span>
            )}
          </div>

          {/* Founded Year */}
          <div className="flex items-start gap-2">
            <div
              className="flex items-center justify-center w-5 h-5 transition duration-300 border rounded cursor-pointer hover:border-primary hover:bg-transparent hover:text-primary"
              onClick={() => handleUpdate("Founded", agency_foundedYear)}
            >
              {agency_foundedYear ? <RiEdit2Fill /> : <FiPlus />}
            </div>
            {agency_foundedYear ? (
              <div>
                <span className="text-base font-medium">Agency Founded: </span>
                <span>{agency_foundedYear}</span>
              </div>
            ) : (
              <span className="text-base font-medium">
                Add Year Agency Founded
              </span>
            )}
          </div>

          {/* Focus */}
          <div className="flex items-start gap-2">
            <div
              className="flex items-center justify-center w-5 h-5 transition duration-300 border rounded cursor-pointer hover:border-primary hover:bg-transparent hover:text-primary"
              onClick={() => handleUpdate("Focus")}
            >
              {agency_focus?.length ? <RiEdit2Fill /> : <FiPlus />}
            </div>
            <div>
              {agency_focus?.length ? (
                <div>
                  <span className="text-base font-medium">Agency Focus:</span>
                  <ul className="flex flex-wrap gap-1 mt-1">
                    {agency_focus.map((item, index) => (
                      <li
                        key={index}
                        className="px-2 text-sm border rounded-full"
                      >
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

          {/* Language */}
          <div className="flex items-start gap-2">
            <div
              className="flex items-center justify-center w-5 h-5 transition duration-300 border rounded cursor-pointer hover:border-primary hover:bg-transparent hover:text-primary"
              onClick={() => handleUpdate("Language")}
            >
              {agency_language ? <RiEdit2Fill /> : <FiPlus />}
            </div>
            {agency_language ? (
              <div>
                <span className="text-base font-medium">Language: </span>
                <span>{agency_language}</span>
              </div>
            ) : (
              <span className="text-base font-medium">Add Languages</span>
            )}
          </div>
        </div>
      </div>

      {/* Universal Modal */}
      {isModal && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={`Update ${modalType}`}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Hourly Rate */}
            {modalType === "Hourly Rate" && (
              <div>
                <input
                  type="number"
                  {...register("agency_hourlyRate", {
                    required: "Hourly rate is required",
                  })}
                  defaultValue={Number(value)}
                  className="w-full px-3 py-1 border rounded"
                />
                {errors.agency_hourlyRate && (
                  <ErrorMsg msg={errors.agency_hourlyRate.message || ""} />
                )}
              </div>
            )}

            {/* Office Location */}
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
                <div className="flex w-full gap-5 mt-3">
                  <div className="w-1/2">
                    <p>Select State</p>
                    <Controller
                      control={control}
                      name="agency_officeLocation.state"
                      render={({ field: { onChange, ref } }) => (
                        <Select
                          className="w-full"
                          ref={ref}
                          onChange={(val: any, action: any) => {
                            if (action.action === "create-option") {
                              onChange(action.option.value);
                              setStateCode("");
                            } else {
                              onChange(val.value);
                              setStateCode(val.isoCode);
                            }
                          }}
                          options={[
                            ...(stateData || []),
                            {
                              label: "Add new state",
                              value: "__create_new_field__",
                            },
                          ]}
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
                          ref={ref}
                          onChange={(val: any, action: any) => {
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

            {/* Agency Size */}
            {modalType === "Agency Size" && (
              <input
                type="number"
                {...register("agency_size")}
                defaultValue={Number(value)}
                required
                className="w-full px-3 py-1 border rounded"
              />
            )}

            {/* Founded Year */}
            {modalType === "Founded" && (
              <input
                type="date"
                defaultValue={value?.toString()}
                {...register("agency_foundedYear")}
                className="w-full px-3 py-1 border rounded"
                required
              />
            )}

            {/* Focus & Language */}
            {modalType === "Focus" && <p>Coming Soon</p>}
            {modalType === "Language" && <p>Coming Soon</p>}

            <div className="mt-10 text-right">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-accent hover:text-accent-foreground"
                disabled={isLoading}
              >
                {isLoading ? <BtnSpinner /> : "Submit"}
              </button>
            </div>
          </form>
        </UniversalModal>
      )}
    </>
  );
};

export default AgencyRightBar;
