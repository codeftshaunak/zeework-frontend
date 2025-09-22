"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "@/lib/toast";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input, HStack } from "@/components/ui/migration-helpers";
import {
  updateFreelancer,
  updateFreelancerProfile,
} from "../../../../helpers/APIs/userApis";
import { profileData } from "../../../../redux/authSlice/profileSlice";
import BtnSpinner from "../../../Skeletons/BtnSpinner";
import ErrorMsg from "../../../utils/Error/ErrorMsg";
import { deleteEducation } from "../../../../helpers/APIs/freelancerApis";
import { Trash2 } from "lucide-react";
import { educationSchema } from "../../../../schemas/freelancer-profile-schema";

// TypeScript interfaces
interface EducationProps {
  type: string;
  defaultValue: unknown;
  setIsModal: (isOpen: boolean) => void;
  setDefaultValue: (value: unknown) => void;
}

interface EducationData {
  institution: string;
  degree_name: string;
  start_date: string;
  end_date: string;
}

interface ProfileState {
  education: unknown[];
}

interface RootState {
  profile: {
    profile: ProfileState;
  };
}

const Education: React.FC<EducationProps> = ({ type, defaultValue, setIsModal, setDefaultValue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const existProfile = useSelector((state: RootState) => state.profile.profile);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(educationSchema),
    defaultValues: defaultValue || {
      degree_name: "",
      institution: "",
      start_date: "",
      end_date: "",
    },
  });

  useEffect(() => {
    if (defaultValue) {
      for (const [key, value] of Object.entries(defaultValue)) {
        setValue(key, value);
      }
    }
  }, [defaultValue, setValue]);

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  };

  // update new information
  const profileDispatch = (data) => {
    if (type === "Add Education") {
      dispatch(profileData({ profile: data }));
    } else {
      dispatch(
        profileData({
          profile: {
            ...existProfile,
            education: [
              ...existProfile.education.filter(
                (item) => item._id !== data.education.educationId
              ),
              {
                ...data.education,
                _id: data.education.educationId,
              },
            ],
          },
        })
      );
    }
  };

  const onSubmit = async (data: EducationData) => {
    setIsLoading(true);

    const formattedData = {
      ...data,
      start_date: formatDate(data.start_date),
      end_date: formatDate(data.end_date),
    };

    try {
      let response;
      if (type === "Add Education") {
        response = await updateFreelancerProfile({
          education: {
            degree_name: formattedData.degree_name,
            institution: formattedData.institution,
            start_date: formattedData.start_date,
            end_date: formattedData.end_date,
          },
        });
      } else if (type === "Update Education") {
        response = await updateFreelancer({
          education: {
            educationId: formattedData._id,
            degree_name: formattedData.degree_name,
            institution: formattedData.institution,
            start_date: formattedData.start_date,
            end_date: formattedData.end_date,
          },
        });
      }

      if (response.code === 200 && response.body) {
        if (response.body.education) profileDispatch(response.body);

        toast.success(type === "Add Education"
              ? "Education Added Successfully"
              : "Education Updated Successfully");
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

  // Delete the education
  const handleDelete = async () => {
    setIsLoading(true);
    const newPayload = { educationId: defaultValue._id };

    try {
      const { code, msg } = await deleteEducation(newPayload);

      if (code === 200) {
        const newProfile = { ...existProfile };
        newProfile.education = existProfile.education?.filter(
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

  return (
    <>
      {/* Add or Update the education */}
      {(type === "Update Education" || type === "Add Education") && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[2px]">
              <p className="font-[500] text-[#374151]">Degree Name</p>
              <div>
                <Input
                  borderColor={"var(--bordersecondary)"}
                  placeholder="Degree"

};

export default Education;
