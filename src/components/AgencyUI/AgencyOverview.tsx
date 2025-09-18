import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import QuillToolbar, {
  formats,
  modules,
} from "../utils/QuillToolbar/QuillToolbar";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateAgencyProfile } from "../../helpers/APIs/agencyApis";
import UniversalModal from "../Modals/UniversalModal";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { RiEdit2Fill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import ErrorMsg from "../utils/Error/ErrorMsg";
import { overviewSchema } from "../../schemas/agency-profile-schema";

const AgencyOverview = ({ overview: overviewValue, setAgency }) => {
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(overviewSchema),
    defaultValues: { agency_overview: overviewValue },
  });

  useEffect(() => {
    reset({ agency_overview: overviewValue });
  }, [overviewValue, reset]);

  // handle update info
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { body, code } = await updateAgencyProfile(data);

      if (code === 200) setAgency(body);
    } catch (error) {
      console.log(error);
    }
    setIsModal(false);
    setIsLoading(false);
    reset();
  };

  const removeTrailingEmptyTags = (html) => {
    console.log("Original HTML:", html);
    const cleanedHtml = html.replace(/(<p>\s*<br\s*\/?>\s*<\/p>\s*)+$/, "");
    console.log("Cleaned HTML:", cleanedHtml);
    return cleanedHtml;
  };

  return (
    <>
      <div>
        <HStack marginBottom={"0.5rem"} marginTop={"1rem"}>
          <Text
            fontSize={{ base: "1.3rem", md: "1.7rem", lg: "2rem" }}
            fontWeight={"600"}
            marginBottom={"0"}
          >
            Overview
          </Text>
          <VStack
            backgroundColor={"white"}
            borderRadius={"50%"}
            width={"20px"}
            border={"1px solid var(--primarycolor)"}
            height={"20px"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"0.6s ease-in-out"}
            cursor={"pointer"}
            mt={1}
            _hover={{
              border: "2px solid var(--primarycolor)",
              backgroundColor: "transparent",
              color: "var(--primarycolor)",
            }}
            onClick={() => {
              reset({ agency_overview: overviewValue });
              setIsModal(true);
            }}
          >
            {overviewValue ? <RiEdit2Fill /> : <FiPlus fontSize={"15px"} />}
          </VStack>
        </HStack>
        {overviewValue && (
          <article className="">
            <div dangerouslySetInnerHTML={{ __html: overviewValue }} />
          </article>
        )}
      </div>

      {/* update overview */}
      {isModal && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={`Update Profile Overview`}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <QuillToolbar />
              <Controller
                name="agency_overview"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={(content) => {
                      const cleanedContent = removeTrailingEmptyTags(content);
                      field.onChange(cleanedContent);
                    }}
                    className="h-64 [&>*]:rounded-b-md"
                    modules={modules}
                    formats={formats}
                  />
                )}
              />
              {errors.agency_overview && (
                <ErrorMsg msg={errors.agency_overview.message} />
              )}
            </div>
            <div className="text-right mt-10">
              <Button
                isLoading={isLoading}
                loadingText="Submit"
                colorScheme="primary"
                type="submit"
                spinner={<BtnSpinner />}
              >
                Submit
              </Button>
            </div>
          </form>
        </UniversalModal>
      )}
    </>
  );
};

export default AgencyOverview;
