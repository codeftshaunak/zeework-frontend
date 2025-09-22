"use client";

import { toast } from "@/lib/toast";
import { useCallback, useState } from "react";
import { createGig } from "../../helpers/APIs/freelancerApis";
import Step0 from "./Steps/Step0";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import { useRouter } from "next/navigation";
import { uploadImages, uploadMedia } from "../../helpers/APIs/gigApis";
import BtnSpinner from "../Skeletons/BtnSpinner";
import UniversalModal from "../Modals/UniversalModal";
import { MdImageNotSupported } from "react-icons/md";
import { compressImageToWebP } from "../../helpers/manageImages/imageCompressed";

export 
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalType, setIsModalType] = useState("");
  const [storedGigId, setStoredGigId] = useState("");

  // update form data with previous data
  const updateFormData = useCallback(
    (newData) => {
      const data = { ...formData, ...newData };
      setFormData((prev) => ({ ...prev, ...newData }));
      return data;
    },
    [formData]
  );

  const handleUpload = useCallback(
    async (ref_id) => {
      const uploadResponse = {};
      if (formData?.images?.length) {
        // prepare form data for file uploading
        const imagesFormData = new FormData();
        for (const image of formData.images) {
          if (!image.file) continue;
          try {
            const compressedImage = await compressImageToWebP(image.file);
            imagesFormData.append(`imageFiles`, compressedImage);
          } catch (error) {
            console.error(`Error compressing image ${image.file.name}:`, error);
            // Handle error if needed
          }
        }
        imagesFormData.append("ref_id", ref_id);
        imagesFormData.append("ref", "create_gig");
        try {
          const response = await uploadImages(imagesFormData);
          uploadResponse.images = response?.body;

          if (response?.code === 200) {
            setIsModalType("success");
            setIsModal(true);
          } else {
            setStoredGigId(ref_id);
            setIsModalType("imgFail");
            setIsModal(true);
          }
        } catch (error) {
          console.error("Error uploading images:", error);

        videoFormData.append("videoFile", formData.video.file);
        videoFormData.append("ref_id", ref_id);
        videoFormData.append("ref", "gig");

        try {
          const response = await uploadMedia(videoFormData);
          uploadResponse.video = response?.body;
        } catch (error) {
          console.error("Error uploading video:", error);
        }
      }

      return uploadResponse;
    },
    [formData.images, formData.video]
  );

  const handleCreateGig = async (data) => {
    setIsLoading(true);
    // Transform data to the desired format
    const transformedData = {
      title: data.title,
      category: data.category.category_id,
      sub_category: data.sub_category._id,
      skills: data.skills.map((skill) => skill.label),
      pricing: {
        custom_title: data.pricing.custom_title,
        custom_description: data.pricing.custom_description,
        service_price: parseInt(data.pricing.service_price),
        delivery_days: parseInt(data.pricing.delivery_days),
        revisions: parseInt(data.pricing.revisions),
        service_options: data.pricing.service_options,
      },
      images: data.images || [],
      video: data.video || "",
      requirements: data.requirements || [],
      steps: data.steps || [],
      project_description: {
        project_summary: data?.project_description?.project_summary,
        faqs: data?.project_description?.faqs,
      },
      terms: data.terms,
      privacy_notice: data.privacy_notice,
    };

    try {
      const { body, code, msg } = await createGig({
        ...transformedData,
        images: [],
        video: "",
      });

      if (code === 200) {
        await handleUpload(body._id);
        toast.success(msg);
      } else {
        toast.warning(msg);
      }
    } catch (error) {
      console.log(error);
      router.push(-1);
    } finally {
      setIsLoading(false);
    }
  };

  const firstPageGoBackward = () => {
    router.push(-1);
  };

  const createNextGig = () => {
    setFormData({});
    setActiveStep(0);
    setIsModal(false);
  };

  return (
    <>
      <div className="w-[90%] pb-10">
        {activeStep === 0 && (
          <Step0
            afterSubmit={goForward}
            onBack={firstPageGoBackward}
            submitCallback={updateFormData}
            formValues={formData}
          />
        )}
        {activeStep === 1 && (
          <Step1
            afterSubmit={goForward}
            onBack={goBackward}
            submitCallback={updateFormData}
            formValues={formData}
          />
        )}
        {activeStep === 2 && (
          <Step2
            afterSubmit={goForward}
            onBack={goBackward}
            submitCallback={updateFormData}
            formValues={formData}
          />
        )}{" "}
        {activeStep === 3 && (
          <Step3
            afterSubmit={goForward}
            onBack={goBackward}
            submitCallback={updateFormData}
            formValues={formData}
          />
        )}
        {activeStep === 4 && (
          <Step4
            afterSubmit={handleCreateGig}
            onBack={goBackward}
            submitCallback={updateFormData}
            formValues={formData}
            isLoading={isLoading}

};

export 
};
