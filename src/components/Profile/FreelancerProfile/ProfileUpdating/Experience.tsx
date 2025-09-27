"use client";

import { useState, useEffect } from "react";
import { HStack } from "@/components/ui/migration-helpers";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "@/lib/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFreelancer,
  updateFreelancerProfile,
} from "../../../../helpers/APIs/userApis";
import { profileData } from "../../../../redux/authSlice/profileSlice";
import BtnSpinner from "../../../Skeletons/BtnSpinner";
import ErrorMsg from "../../../utils/Error/ErrorMsg";
import { MdDelete } from "react-icons/md";
import {
  deleteExperience,
  getCountries,
} from "../../../../helpers/APIs/freelancerApis";
import Select from "react-select";
import { experienceSchema } from "../../../../schemas/freelancer-profile-schema";

// TypeScript interfaces
interface ExperienceProps {
  type: string;
  defaultValue: any;
  setIsModal: (isOpen: boolean) => void;
  setDefaultValue: (value: any) => void;
}

interface ExperienceFormData {
  company_name: string;
  start_date: string;
  end_date: string;
  position: string;
  job_location: string;
  job_description: string;
}

interface Country {
  _id: string;
  name: string;
  label: string;
  value: string;
}

interface ProfileState {
  experience: any[];
}

interface RootState {
  profile: {
    profile: ProfileState;
  };
}

const Experience: React.FC<ExperienceProps> = ({ type, defaultValue, setIsModal, setDefaultValue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const existProfile = useSelector((state: RootState) => state.profile.profile);
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryLoading, setCountryLoading] = useState(true);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(experienceSchema),
    defaultValues: defaultValue || {
      company_name: "",
      start_date: "",
      end_date: "",
      job_location: "",
      job_description: "",
    },
  });

  const getVerifiedCountries = async () => {
    try {
      const { code, body } = await getCountries();

      if (code === 200)
        setCountries(
          body?.map((c) => ({ ...c, label: c.name, value: c.name }))
        );
    } catch (error) {
      console.error(error);
    }
    setCountryLoading(false);
  };

  const formatDate = (date: string | Date) => {
    if (!date) return null;
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  };

  // Update new information
  const profileDispatch = (data: any) => {
    if (type === "Add Experience") {
      dispatch(profileData({ profile: data }));
    } else {
      dispatch(
        profileData({
          profile: {
            ...existProfile,
            experience: [
              ...existProfile.experience.filter(
                (item) => item._id !== data.experience.experienceId
              ),
              {
                ...data.experience,
                _id: data.experience.experienceId,
              },
            ],
          },
        })
      );
    }
  };

  // Add or Updating the experience
  const onSubmit = async (data: ExperienceFormData) => {
    setIsLoading(true);

    // Format dates to 'YYYY-MM-DD' before sending
    const formattedData = {
      ...data,
      start_date: formatDate(data.start_date),
      end_date: formatDate(data.end_date),
    };

    try {
      let response;
      if (type === "Add Experience") {
        response = await updateFreelancerProfile({
          experience: {
            company_name: formattedData.company_name,
            start_date: formattedData.start_date,
            end_date: formattedData.end_date,
            position: formattedData.position,
            job_location: formattedData.job_location,
            job_description: formattedData.job_description,
          },
        });
      } else if (type === "Update Experience") {
        response = await updateFreelancer({
          experience: {
            experienceId: (formattedData as any)?._id || "",
            company_name: formattedData.company_name,
            start_date: formattedData.start_date,
            end_date: formattedData.end_date,
            position: formattedData.position,
            job_location: formattedData.job_location,
            job_description: formattedData.job_description,
          },
        });
      }

      if (response.code === 200) {
        if (response.body.experience) profileDispatch(response.body);
        toast.success(type === "Add Experience"
              ? "Experience Added Successfully"
              : "Experience Updated Successfully");
        setIsModal(false);
      } else {
        toast.warning(response.msg);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setDefaultValue(null);
      reset();
    }
  };

  // Delete the experience
  const handleDelete = async () => {
    setIsLoading(true);
    const newPayload = { experienceId: defaultValue._id };

    try {
      const { code, msg } = await deleteExperience(newPayload);

      if (code === 200) {
        const newProfile = { ...existProfile };
        newProfile.experience = existProfile.experience?.filter(
          (item) => item._id !== defaultValue._id
        );
        toast.success(msg);
        dispatch(profileData({ profile: newProfile }));
        setIsModal(false);
      } else {
        toast.warning(msg || "Something gonna wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.warning("Something gonna wrong!");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (defaultValue) {
      for (const [key, value] of Object.entries(defaultValue)) {
        setValue(key, value);
      }
    }
  }, [defaultValue, setValue]);

  useEffect(() => {
    if (!countries?.length) getVerifiedCountries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Add or Update the experience */}
      {(type === "Add Experience" || type === "Update Experience") && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col">
              <div className="flex flex-col gap-[2px]">
                <p className="font-[500] text-[#374151]">Your Company Name</p>
                <div>
                  <Input
                    borderColor={"var(--bordersecondary)"}
                    placeholder="Your Company Name"
                    {...register("company_name")}
                  />

                  {errors.company_name && (
                    <ErrorMsg msg={errors.company_name.message} />
                  )}
                </div>
              </div>
              <br />
              <HStack className="justify-between">
                <div className="flex flex-col gap-[2px] w-[49%]">
                  <p className="font-[500] text-[#374151]">Start Year</p>
                  <div>
                    <Input
                      borderColor={"var(--bordersecondary)"}
                      type="date"
                      placeholder="Start Year"
                      {...register("start_date")}
                    />

                    {errors.start_date && (
                      <ErrorMsg msg={errors.start_date.message} />
                    )}
                  </div>
                </div>
                <br />
                <div className="flex flex-col gap-[2px] w-[49%]">
                  <p className="font-[500] text-[#374151]">End Year</p>
                  <div>
                    <Input
                      borderColor={"var(--bordersecondary)"}
                      type="date"
                      placeholder="End Year"
                      {...register("end_date")}
                    />

                    {errors.end_date && (
                      <ErrorMsg msg={errors.end_date.message} />
                    )}
                  </div>
                </div>
              </HStack>
              <br />
              <div className="flex flex-col gap-[2px]">
                <p className="font-[500] text-[#374151]">Position</p>
                <div>
                  <Input
                    borderColor={"var(--bordersecondary)"}
                    placeholder="Position"
                    {...register("position")}
                  />
                  {errors.position && (
                    <ErrorMsg msg={errors.position.message} />
                  )}
                </div>
              </div>
              <br />
              <div className="flex flex-col gap-[2px]">
                <p className="font-[500] text-[#374151]">Location</p>
                {/* <div>
                  <input
                    type="text"
                    className="w-full py-1.5 px-2 outline-none text-[#000] font-[400] border border-[var(--bordersecondary)] rounded-md"
                    placeholder="Location"
                    {...register("job_location")}
                  />
                  {errors.job_location && (
                    <ErrorMsg msg={errors.job_location.message} />
                  )}
                </div> */}
                <div>
                  <Select
                    {...register("job_location")}
                    placeholder="Select Location"
                    options={countries}
                    onChange={(data) => {
                      setValue("job_location", (data as any)?.name || (data as any)?.value);
                      trigger("job_location");
                    }}
                  />
                  {errors.job_location && (
                    <ErrorMsg msg={errors.job_location.message} />
                  )}
                </div>
              </div>
              <br />
              <div className="flex flex-col gap-[2px]">
                <p className="font-[500] text-[#374151]">Description</p>
                <div>
                  <Textarea
                    borderColor={"var(--bordersecondary)"}
                    placeholder="Description"
                    {...register("job_description")}
                  />

                  {errors.job_description && (
                    <ErrorMsg msg={errors.job_description.message} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-5 w-full border-t-[#F3F4F6]">
            <button
              disabled={isLoading}
              type="submit"
              className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <BtnSpinner />
                  <span className="ml-2">{type === "Add Experience" ? "Adding" : "Updating"}</span>
                </>
              ) : (
                type === "Add Experience" ? "Add" : "Update"
              )}
            </button>
          </div>
        </form>
      )}

      {/* Delete the experience */}
      {type === "Delete Experience" && (
        <div>
          <div className="w-[72px] h-[72px] flex items-center justify-center bg-red-50 rounded-full mx-auto">
            <MdDelete className="text-4xl text-red-400" />
          </div>
          <p className="text-2xl font-semibold text-center">
            Are you sure you want to delete?
          </p>

          <div className="flex gap-5 sm:gap-10 mt-4 sm:mt-10">
            <button
              onClick={() => setIsModal(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              No, cancel
            </button>
            <button
              disabled={isLoading}
              onClick={handleDelete}
              className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <BtnSpinner />
                  <span className="ml-2">Deleting..</span>
                </>
              ) : (
                "Yes, delete it"
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Experience;
