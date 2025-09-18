"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, HStack, Input, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFreelancer,
  updateFreelancerProfile,
} from "../../../../helpers/APIs/userApis";
import { profileData } from "../../../../redux/authSlice/profileSlice";
import BtnSpinner from "../../../Skeletons/BtnSpinner";
import ErrorMsg from "../../../utils/Error/ErrorMsg";
import { deleteEducation } from "../../../../helpers/APIs/freelancerApis";
import { MdDelete } from "react-icons/md";
import { educationSchema } from "../../../../schemas/freelancer-profile-schema";

const Education = ({ type, defaultValue, setIsModal, setDefaultValue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const existProfile = useSelector((state: any) => state.profile.profile);
  const dispatch = useDispatch();
  const toast = useToast();

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

  const onSubmit = async (data) => {
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

        toast({
          title:
            type === "Add Education"
              ? "Education Added Successfully"
              : "Education Updated Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setIsModal(false);
      } else {
        toast({
          title: response.msg,
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
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
    let newPayload = { educationId: defaultValue._id };

    try {
      const { code, msg } = await deleteEducation(newPayload);

      if (code === 200) {
        let newProfile = { ...existProfile };
        newProfile.education = existProfile.education?.filter(
          (item) => item._id !== defaultValue._id
        );
        toast({
          title: msg,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        dispatch(profileData({ profile: newProfile }));
        setIsModal(false);
      } else {
        toast({
          title: msg || "Something gonna wrong!",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Something gonna wrong!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
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
            <HStack justifyContent={"space-between"}>
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
              isLoading={isLoading}
              loadingText={type === "Add Education" ? "Adding" : "Updating"}
              colorScheme="primary"
              type="submit"
              fontSize={"0.9rem"}
              spinner={<BtnSpinner />}
              paddingX={8}
            >
              {type === "Add Education" ? "Add" : "Update"}
            </Button>
          </div>
        </form>
      )}

      {/* Delete the education */}
      {type === "Delete Education" && (
        <div>
          <div className="w-[72px] h-[72px] flex items-center justify-center bg-red-50 rounded-full mx-auto">
            <MdDelete className="text-4xl text-red-400" />
          </div>
          <p className="text-2xl font-semibold text-center">
            Are you sure you want to delete?
          </p>

          <div className="flex gap-5 sm:gap-10 mt-4 sm:mt-10">
            <Button
              variant={"outline"}
              colorScheme="primary"
              onClick={() => setIsModal(false)}
              width="full"
            >
              No, cancel
            </Button>
            <Button
              isLoading={isLoading}
              loadingText="Deleting.."
              colorScheme="primary"
              spinner={<BtnSpinner />}
              onClick={handleDelete}
              width={"full"}
            >
              Yes, delete it
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Education;
