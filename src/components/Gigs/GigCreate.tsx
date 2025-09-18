"use client";

import { Button, HStack, Text, useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { createGig } from "../../helpers/APIs/freelancerApis";
import Step0 from "./Steps/Step0";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import { useNavigate } from "next/navigation";
import { uploadImages, uploadMedia } from "../../helpers/APIs/gigApis";
import BtnSpinner from "../Skeletons/BtnSpinner";
import UniversalModal from "../Modals/UniversalModal";
import { MdImageNotSupported } from "react-icons/md";
import { compressImageToWebP } from "../../helpers/manageImages/imageCompressed";

export const GigCreate = ({
  activeStep,
  setActiveStep,
  goForward,
  goBackward,
}) => {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalType, setIsModalType] = useState("");
  const [storedGigId, setStoredGigId] = useState("");
  const toast = useToast();

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
        }
      }

      if (formData.video && formData.video?.file) {
        // prepare uploading form state for video
        const videoFormData = new FormData();
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
        toast({
          title: msg,
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      } else {
        toast({
          title: msg,
          status: "warning",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
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
          />
        )}
      </div>

      {isModal && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          isCloseBtn={false}
        >
          {modalType === "success" && (
            <div className="grid gap-6 justify-center">
              <div className="w-[72px] h-[72px] flex items-center justify-center bg-green-50 rounded-full mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <g id="20/Click">
                    <path
                      id="Path"
                      d="M15.6002 32.4004L11.2002 36.8004"
                      stroke="#22C35E"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Path_2"
                      d="M24 24L42 30L34 34L30 42L24 24"
                      stroke="#22C35E"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Path_3"
                      d="M6 24H12"
                      stroke="#22C35E"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Path_4"
                      d="M32.4004 15.6002L36.8004 11.2002"
                      stroke="#22C35E"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Path_5"
                      d="M15.6002 15.6002L11.2002 11.2002"
                      stroke="#22C35E"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Path_6"
                      d="M24 6V12"
                      stroke="#22C35E"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
              <div className="text-gray-700 text-2xl font-semibold font-['SF Pro Text'] leading-loose text-center">
                Congratulations
              </div>
              <div className="text-center text-gray-700 font-medium font-['SF Pro Text'] leading-tight">
                Thank you for posting your gig! It is currently under review and
                will be live in approximately 30 minutes.
              </div>
              <div className="text-lg text-center text-gray-700 font-medium font-['SF Pro Text'] leading-tight">
                Ready to post your next gig?
              </div>
              <div className="w-full flex justify-between items-center gap-6">
                <div className="w-full h-9 flex-col justify-start items-start gap-2.5 inline-flex">
                  <div
                    className="self-stretch grow shrink basis-0 px-3 py-2 bg-gray-50 rounded-md shadow border border-gray-300 justify-center items-center gap-1 inline-flex cursor-pointer"
                    onClick={() => router.push("/find-job")}
                  >
                    <div className="text-center text-gray-700 text-sm font-medium font-['SF Pro Text'] leading-tight">
                      Back to Home
                    </div>
                  </div>
                </div>

                <div className="w-full h-9 flex-col justify-start items-start gap-2.5 inline-flex">
                  <div
                    className="self-stretch h-9 px-3 py-2 bg-green-500 rounded-md shadow justify-center items-center gap-1 inline-flex cursor-pointer"
                    onClick={createNextGig}
                  >
                    <div className="text-center text-white text-sm font-medium font-['SF Pro Text'] leading-tight">
                      Create Another Gig
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {modalType === "imgFail" && (
            <div className="grid gap-6 justify-center">
              <div className="w-[72px] h-[72px] flex items-center justify-center bg-green-50 rounded-full mx-auto">
                <MdImageNotSupported className="text-4xl text-primary" />
              </div>
              <div className="text-gray-700 text-2xl font-semibold font-['SF Pro Text'] leading-loose text-center">
                Congratulations
              </div>
              <div className="text-center text-gray-700 font-medium font-['SF Pro Text'] leading-tight">
                Your gig has been successfully created, but you need to upload
                the media file again.
              </div>
              <div className="text-lg text-center text-gray-700 font-medium font-['SF Pro Text'] leading-tight">
                Please upload the media file again!
              </div>
              <div className="w-full flex justify-between items-center gap-6">
                <div className="w-full h-9 flex-col justify-start items-start gap-2.5 inline-flex">
                  <div
                    className="self-stretch h-9 px-3 py-2 bg-green-500 rounded-md shadow justify-center items-center gap-1 inline-flex cursor-pointer"
                    onClick={() =>
                      router.push(`/freelancer/gig/edit/${storedGigId}`)
                    }
                  >
                    <div className="text-center text-white text-sm font-medium font-['SF Pro Text'] leading-tight">
                      Edit Created Gig
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </UniversalModal>
      )}
    </>
  );
};

export const GigCreateLayout = ({
  children,
  title,
  onBackward = () => {},
  onForward = () => {},
  backwardBtnText = "Back",
  forwardBtnText = "Save & Continue",
  isLoading,
}) => {
  return (
    <div className="sm:w-full lg:w-[60%]">
      <Text
        fontSize={{ base: "2rem", md: "2.5rem" }}
        fontWeight={"600"}
        textAlign={"left"}
      >
        {title}
      </Text>
      <br />
      <div className="w-full flex flex-col gap-5">{children}</div>
      <HStack marginTop={10}>
        <Button
          colorScheme="primary"
          marginRight={5}
          onClick={onBackward}
          isDisabled={isLoading}
        >
          {backwardBtnText}
        </Button>
        <Button
          isLoading={isLoading}
          loadingText={forwardBtnText}
          colorScheme="primary"
          type="submit"
          spinner={<BtnSpinner />}
          onClick={onForward}
        >
          {forwardBtnText}
        </Button>
      </HStack>
    </div>
  );
};
