"use client";

import { toast } from "@/lib/toast";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useRouter, useParams } from "next/navigation";
import {
  getCategories,
  getSubCategory,
} from "../../helpers/APIs/freelancerApis";
import {
  getGigDetails,
  updateFreelancerGig,
  uploadImages,
  uploadMedia,
} from "../../helpers/APIs/gigApis";
import BtnSpinner from "../Skeletons/BtnSpinner";
import Step0 from "./Steps/Step0";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import { compressImageToWebP } from "../../helpers/manageImages/imageCompressed";

export 
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  const { id } = useParams();

  // update form data with previous data
  const updateFormData = useCallback(
    (newData) => {
      const data = { ...formData, ...newData };
      setFormData((prev) => ({ ...prev, ...newData }));
      return data;
    },
    [formData]
  );

  const gigDetails = async () => {
    try {
      const response = await getGigDetails(id);
      const categories = await getCategorySubCategory(
        response?.body[0]?.category,
        response?.body[0]?.sub_category
      );

        setGigData(updatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get existing category and sub category label, value using id
        const category = categories?.find((item) => item._id === category_id);
      if (category) {
        const { body } = await getSubCategory(category_id);
        const subCategory = body?.find((item) => item._id === sub_category_id);

        return {
          category: {
            category_id: category?._id,
            label: category?.category_name,
            value: category?.category_name,
          },
          sub_category: {
            _id: subCategory?._id,
            category_id: subCategory?.category_id,
            label: subCategory?.sub_category_name,
            value: subCategory?.sub_category_name,
          },
        };
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    gigDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpload = useCallback(
    async (ref_id) => {
      const uploadResponse = { images: [], video: "" };

      // Check existing uploaded or new images
      const existUploaded = formData.images
        .filter((item) => !Object.prototype.hasOwnProperty.call(item, "file"))
        .map((item) => item.preview);
      uploadResponse.images = existUploaded;

      const readyToUpload = formData.images.filter((item) =>
        Object.prototype.hasOwnProperty.call(item, "file")
      );

      if (readyToUpload.length > 0) {
        // Prepare form data for file uploading
        const imagesFormData = new FormData();

        // Compress and append images to FormData
        for (const sf of readyToUpload) {
          try {
            const compressedImage = await compressImageToWebP(sf.file);
            imagesFormData.append("imageFiles", compressedImage);
          } catch (error) {
            console.error(`Error compressing image ${sf.file.name}:`, error);
            // Handle compression error if needed
          }
        }

        try {
          const { code, body } = await uploadImages(imagesFormData);
          if (code === 200) uploadResponse.images.push(...body.images);
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

  const handleUpdateGig = async (data) => {
    setIsLoading(true);
    // Transform data to the desired format
    const transformedData = {
      _id: gigData._id,
      title: data?.title,
      category: data?.category?.category_id,
      sub_category: data?.sub_category._id,
      skills: data?.skills.map((skill) => skill.label),
      pricing: {
        custom_title: data?.pricing.custom_title,
        custom_description: data?.pricing.custom_description,
        service_price: parseInt(data?.pricing.service_price),
        delivery_days: parseInt(data?.pricing.delivery_days),
        revisions: parseInt(data?.pricing.revisions),
        service_options: data?.pricing.service_options,
      },
      images: data?.images || [],
      video: data?.video || "",
      requirements: data?.requirements || [],
      steps: data?.steps || [],
      project_description: {
        project_summary: data?.project_description?.project_summary,
        faqs: data?.project_description?.faqs,
      },
      terms: data?.terms,
      privacy_notice: data?.privacy_notice,
    };
    try {
      const mediaResponse = await handleUpload(gigData._id);

      const response = await updateFreelancerGig({
        ...transformedData,
        images: mediaResponse.images,
        video: mediaResponse.video,
      });
      if (response?.code === 200) {
        toast.default(response.msg);
        router.push(-1);
        setIsEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const firstPageGoBackward = () => {
    router.push(-1);
  };

  return (
    <div className="sm:w-full xl:w-[90%] pb-10">
      {activeStep === 0 && (
        <Step0
          afterSubmit={goForward}
          onBack={firstPageGoBackward}
          submitCallback={updateFormData}
          formValues={gigData}
          isEdit={true}
          isLoading={isLoading}
        />
      )}
      {activeStep === 1 && (
        <Step1
          afterSubmit={goForward}
          onBack={goBackward}
          submitCallback={updateFormData}
          formValues={gigData}
          isLoading={isLoading}
        />
      )}
      {activeStep === 2 && (
        <Step2
          afterSubmit={goForward}
          onBack={goBackward}
          submitCallback={updateFormData}
          formValues={gigData}
          isLoading={isLoading}
        />
      )}{" "}
      {activeStep === 3 && (
        <Step3
          afterSubmit={goForward}
          onBack={goBackward}
          submitCallback={updateFormData}
          formValues={gigData}
          isLoading={isLoading}
        />
      )}
      {activeStep === 4 && (
        <Step4
          afterSubmit={handleUpdateGig}
          onBack={goBackward}
          submitCallback={updateFormData}
          formValues={gigData}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export 
};
