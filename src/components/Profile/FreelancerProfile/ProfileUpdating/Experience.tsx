"use client";

import { HStack, Input, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
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
  defaultValue: unknown;
  setIsModal: (isOpen: boolean) => void;
  setDefaultValue: (value: unknown) => void;
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
  experience: unknown[];
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
  const profileDispatch = (data: unknown) => {
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
            experienceId: formattedData._id,
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

                      trigger("job_location");

};

export default Experience;
