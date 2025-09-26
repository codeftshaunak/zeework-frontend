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
  defaultValue: any;
  setIsModal: (isOpen: boolean) => void;
  setDefaultValue: (value: any) => void;
}

interface EducationData {
  institution: string;
  degree_name: string;
  start_date: string;
  end_date: string;
}

interface ProfileState {
  education: any[];
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
            educationId: formattedData?._id || "",
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
                  {...register("degree_name")}
                />

                {errors.degree_name && (
                  <ErrorMsg msg={errors.degree_name.message} />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-[500] text-[#374151]">Institution</p>
              <div>
                <Input
                  borderColor={"var(--bordersecondary)"}
                  placeholder="Institution"
                  {...register("institution")}
                />

                {errors.institution && (
                  <ErrorMsg msg={errors.institution.message} />
                )}
              </div>
            </div>
            <HStack className="justify-between">
              <div className="flex flex-col gap-[2px] w-[49%]">
                <p className="font-[500] text-[#374151]">Start Date</p>
                <div>
                  <Input
                    borderColor={"var(--bordersecondary)"}
                    type="date"
                    placeholder="Start Date"
                    {...register("start_date")}
                  />

                  {errors.start_date && (
                    <ErrorMsg msg={errors.start_date.message} />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-[2px] w-[49%]">
                <p className="font-[500] text-[#374151]">End Date</p>
                <div>
                  <Input
                    borderColor={"var(--bordersecondary)"}
                    type="date"
                    placeholder="End Date"
                    {...register("end_date")}
                  />

                  {errors.end_date && (
                    <ErrorMsg msg={errors.end_date.message} />
                  )}
                </div>
              </div>
            </HStack>
          </div>
          <div className="flex items-center justify-end gap-2 pt-5 w-full">
            <Button
              variant="gradient"
              disabled={isLoading}
              type="submit"
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <BtnSpinner />
                  {type === "Add Education" ? "Adding..." : "Updating..."}
                </>
              ) : (
                type === "Add Education" ? "Add Education" : "Update Education"
              )}
            </Button>
          </div>
        </form>
      )}

      {/* Delete the education */}
      {type === "Delete Education" && (
        <div className="text-center space-y-6">
          <div className="w-16 h-16 flex items-center justify-center bg-red-50 rounded-full mx-auto">
            <Trash2 className="h-8 w-8 text-red-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Delete Education
            </h3>
            <p className="text-gray-600">
              Are you sure you want to delete this education entry? This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => setIsModal(false)}
              className="min-w-[100px]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={handleDelete}
              className="gap-2 min-w-[100px]"
            >
              {isLoading ? (
                <>
                  <BtnSpinner />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Education;
