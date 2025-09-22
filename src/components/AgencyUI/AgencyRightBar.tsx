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

  const [stateData] = useState<unknown[]>([]);
  const [cityData] = useState<unknown[]>([]);
  const [stateCode, setStateCode] = useState<string>("");

  const { name: countryName } =
    (useSelector((state: unknown) => state?.profile?.agency?.agency_location) as {
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
              <RiEdit2Fill />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationPin />
            <span>
              {agency_officeLocation?.state}, {agency_officeLocation?.country}
            </span>
          </div>
        </div>

        {/* Agency Size */}
        <div className="relative mt-3">
          <div className="flex items-center mb-2">
            <span className="font-semibold">Agency Size</span>
            <div
              className="flex items-center justify-center w-5 h-5 ml-2 transition duration-300 border rounded cursor-pointer hover:border-primary hover:bg-transparent hover:text-primary"
              onClick={() => handleUpdate("Agency Size")}
            >
              <RiEdit2Fill />
            </div>
          </div>
          <span>{agency_size || "Not specified"} team members</span>
        </div>

        {/* Founded Year */}
        <div className="relative mt-3">
          <div className="flex items-center mb-2">
            <span className="font-semibold">Founded</span>
            <div
              className="flex items-center justify-center w-5 h-5 ml-2 transition duration-300 border rounded cursor-pointer hover:border-primary hover:bg-transparent hover:text-primary"
              onClick={() => handleUpdate("Founded")}
            >
              <RiEdit2Fill />
            </div>
          </div>
          <span>{agency_foundedYear || "Not specified"}</span>
        </div>

        {/* Focus Areas */}
        <div className="relative mt-3">
          <div className="flex items-center mb-2">
            <span className="font-semibold">Focus</span>
            <div
              className="flex items-center justify-center w-5 h-5 ml-2 transition duration-300 border rounded cursor-pointer hover:border-primary hover:bg-transparent hover:text-primary"
              onClick={() => handleUpdate("Focus")}
            >
              <RiEdit2Fill />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {agency_focus?.map((focus, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 rounded"
              >
                {focus}
              </span>
            )) || <span>No focus areas specified</span>}
          </div>
        </div>

        {/* Language */}
        <div className="relative mt-3">
          <div className="flex items-center mb-2">
            <span className="font-semibold">Language</span>
            <div
              className="flex items-center justify-center w-5 h-5 ml-2 transition duration-300 border rounded cursor-pointer hover:border-primary hover:bg-transparent hover:text-primary"
              onClick={() => handleUpdate("Language")}
            >
              <RiEdit2Fill />
            </div>
          </div>
          <span>{agency_language || "Not specified"}</span>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <UniversalModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={`Update ${modalType}`}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {modalType === "Hourly Rate" && (
              <div>
                <label className="block text-sm font-medium">Hourly Rate ($)</label>
                <Controller
                  name="agency_hourlyRate"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter hourly rate"
                    />
                  )}
                />
                {errors.agency_hourlyRate && (
                  <ErrorMsg msg={errors.agency_hourlyRate.message} />
                )}
              </div>
            )}

            {modalType === "Office Location" && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <p>Select State</p>
                    <Controller
                      control={control}
                      name="agency_officeLocation.state"
                      render={({ field: { onChange, ref } }) => (
                        <Select
                          className="w-full"
                          inputRef={ref}
                          onChange={(val: unknown, action: unknown) => {
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
                          inputRef={ref}
                          onChange={(val: unknown, action: unknown) => {
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
