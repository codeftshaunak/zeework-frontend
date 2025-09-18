import {
  Button,
  Checkbox,
  HStack,
  Text,
  Textarea,
  VStack,
  Input,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import * as yup from "yup";
import { GigCreateLayout } from "../GigCreate";
import ErrorMsg from "../../utils/Error/ErrorMsg";

// validation schema
const schema = yup.object().shape({
  project_description: yup
    .object()
    .shape({
      project_summary: yup.string().label("Project Summery").required(),
      // faqs: yup
      //   .array(
      //     yup.object().shape({
      //       question: yup.string().label("Question").required(),
      //       answer: yup.string().label("Answer").required(),
      //     })
      //   )
      //   .label("Faq"),
    })
    .label("Project Description")
    .required(),
  terms: yup.boolean().oneOf([true], "You must accept the Terms & Conditions"),
  privacy_notice: yup
    .boolean()
    .oneOf([true], "You must accept the Privacy Policy"),
});

// default values for the step
const defaultValues = {
  project_description: {
    project_summary: "",
    faqs: [{ question: "", answer: "" }],
  },
  terms: false,
  privacy_notice: false,
};

const Step4 = ({
  submitCallback,
  onBack,
  afterSubmit,
  formValues,
  isLoading,
}) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
    trigger,
  } = methods;

  const { fields: faqFields, append: appendFaq } = useFieldArray({
    control,
    name: "project_description.faqs",
  });

  const addFaq = () => {
    appendFaq({ question: "", answer: "" });
  };

  // form submit operations
  const onSubmit = (values) => {
    const data = submitCallback(values); // this will update the parent state

    afterSubmit(data); // this will perform task after updating the state
  };

  // Load state
  useEffect(() => {
    const changes = {};
    Object.keys(defaultValues).forEach((key) => {
      if (key !== "terms" && key !== "privacy_notice") {
        const value = formValues?.[key];
        changes[key] = value === undefined ? defaultValues[key] : value;
      }
    });

    // Only reset fields other than terms and privacy_notice
    reset(changes);

    // Reset terms and privacy_notice if they are not in formValues
    setValue("terms", defaultValues.terms);
    setValue("privacy_notice", defaultValues.privacy_notice);
  }, [formValues]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GigCreateLayout
          title={"Project description"}
          forwardBtnText="Submit now"
          onBackward={onBack}
          isLoading={isLoading}
        >
          <VStack alignItems={"start"}>
            <label htmlFor="" className="text-xl font-[600] pb-0">
              Project Summary
            </label>
            <p>
              Tell the client what you are going to deliver and how it&apos;ll
              benefit them.
            </p>
            <Controller
              name="project_description.project_summary"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <Textarea {...field} marginTop={"5px"} bgColor={"white"} />
                    {fieldState.error && (
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </VStack>

          <VStack alignItems={"start"} width={"100%"}>
            <label htmlFor="fileInput" className="text-xl font-[600] pb-0 mb-0">
              Frequently asked questions (optional)
            </label>
            <p>
              Provide answers to common questions your clients may have about
              your project. Feel free to include details that will help them
              better understand your work process.
            </p>
            <VStack width={"100%"}>
              {faqFields.map((faq, index) => (
                <VStack
                  key={index}
                  alignItems={"start"}
                  width={"100%"}
                  backgroundColor={"white"}
                  padding={"2rem 1.5rem"}
                  marginTop={"1rem"}
                  className="rounded-md"
                >
                  <label htmlFor="" className="font-semibold">
                    Question {index + 1}
                  </label>
                  <Controller
                    name={`project_description.faqs[${index}].question`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          {...field}
                          marginTop={"5px"}
                          bgColor={"white"}
                          type="text"
                        />
                        {fieldState.error && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                  <label htmlFor="" className="font-semibold">
                    Answer
                  </label>
                  <Controller
                    name={`project_description.faqs[${index}].answer`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <Textarea
                          {...field}
                          marginTop={"5px"}
                          bgColor={"white"}
                        />
                        {fieldState.error && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </VStack>
              ))}
            </VStack>
            <HStack width={"100%"}>
              <Button
                color="#16a34a"
                fontWeight={"600"}
                cursor={"pointer"}
                padding={"1rem 0"}
                backgroundColor={"transparent"}
                onClick={() => addFaq()}
                _hover={{
                  backgroundColor: "transparent",
                }}
              >
                <FiPlus size={"1.3rem"} /> <Text>Add a step</Text>
              </Button>
            </HStack>
          </VStack>

          <VStack alignItems={"start"} width={"100%"}>
            <label
              htmlFor="fileInput"
              className="text-xl md:text-2xl font-[600] pb-0 mb-0"
            >
              Terms of Service
            </label>

            <HStack width={"100%"}>
              <Checkbox
                colorScheme="primary"
                size="lg"
                onChange={(e) => {
                  setValue("terms", e.target.checked);
                  trigger("terms");
                }}
              ></Checkbox>
              <Text fontSize={"0.9rem"}>
                I understand and agree to the{" "}
                <strong>ZeeWork Terms of Service</strong>, including the{" "}
                <strong>User Agreement</strong> and{" "}
                <strong>Privacy Policy</strong>
              </Text>
            </HStack>
            {errors.terms && <ErrorMsg msg={errors.terms.message} />}
          </VStack>

          <VStack alignItems={"start"} width={"100%"}>
            <label
              htmlFor="fileInput"
              className="text-xl md:text-2xl font-[600] pb-0 mb-0"
            >
              Privacy Notice
            </label>
            <HStack width={"100%"}>
              <Checkbox
                colorScheme="primary"
                size="lg"
                onChange={(e) => {
                  setValue("privacy_notice", e.target.checked);
                  trigger("privacy_notice");
                }}
              ></Checkbox>
              <Text fontSize={"0.9rem"}>
                By submitting the project and activating it you agree to the
                Privacy Policy.
              </Text>
            </HStack>
            {errors.privacy_notice && (
              <ErrorMsg msg={errors.privacy_notice.message} />
            )}
          </VStack>
        </GigCreateLayout>
      </form>
    </FormProvider>
  );
};

export default Step4;
