import {
  Button,
  Checkbox,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
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

// validation schema
const schema = yup.object().shape({
  requirements: yup
    .array(
      yup.object().shape({
        requirement: yup.string().label("Title").required(),
        required: yup.boolean().label("Required").default(false).required(),
      })
    )
    .label("Requirements"),
  steps: yup
    .array(
      yup.object().shape({
        step_title: yup.string().label("Title").required(),
        description: yup.string().label("Description").required(),
      })
    )
    .label("Requirements"),
});

// default values for the step
const defaultValues = {
  requirements: [{ requirement: "", required: false }],
  steps: [{ step_title: "", description: "" }],
};

const Step3 = ({ submitCallback, onBack, afterSubmit, formValues }) => {
  const methods = useForm({
    defaultValues,
    // resolver: yupResolver(schema),
  });
  const { handleSubmit, control, setValue, reset } = methods;

  // requirement field array
  const { fields: requirementFields, append: appendRequirement } =
    useFieldArray({
      control,
      name: "requirements",
    });
  // step field array
  const { fields: stepFields, append: appendStep } = useFieldArray({
    control,
    name: "steps",
  });

  // Add a new requirement object to the array
  const addRequirement = () => {
    appendRequirement({ requirement: "", required: false });
  };

  // Add a new step object to the array
  const addStep = () => {
    appendStep({ step_title: "", description: "" });
  };

  // form submit operations
  const onSubmit = (values) => {
    submitCallback(values); // this will update the parent state
    afterSubmit(); // this will perform task after updating the state
  };

  // load state
  useEffect(() => {
    const changes = {};

    Object.keys(defaultValues).map((key) => {
      const value = formValues?.[key];
      changes[key] = value === undefined ? defaultValues[key] : value;
    });

    reset(changes);
  }, [formValues]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GigCreateLayout title={"Gig Requirement & Steps"} onBackward={onBack}>
          <VStack alignItems={"start"} width={"100%"}>
            <label
              htmlFor="fileInput"
              className="text-xl md:text-2xl font-[600] pb-0 mb-0"
            >
              Information you need from the client before you start your project
            </label>

            <VStack
              backgroundColor={"white"}
              width={"100%"}
              padding={"1rem 1.5rem"}
              marginTop={"1rem"}
            >
              {requirementFields.map((requirement, index) => (
                <VStack
                  key={index}
                  alignItems={"start"}
                  width={"100%"}
                  marginBottom={"0.8rem"}
                >
                  <label htmlFor="" className="font-semibold mb-0 pb-0">
                    Requirement
                  </label>
                  <VStack alignItems={"start"} width={"100%"}>
                    <Controller
                      name={`requirements[${index}].requirement`} // Use index to create unique names
                      control={control}
                      render={({ field, fieldState }) => (
                        <>
                          <Textarea
                            {...field}
                            placeholder="You will get a fantastic deliverable that drives impact"
                            marginTop={"5px"}
                          />
                          <HStack width={"100%"}>
                            <Checkbox
                              colorScheme="green"
                              size="lg"
                              {...field}
                              onChange={(e) => {
                                // Update the checkbox value using the index
                                setValue(
                                  `requirements[${index}].required`,
                                  e.target.checked
                                );
                              }}
                            ></Checkbox>
                            <Text fontSize={"1rem"}>
                              Client needs to answer before I can start working
                            </Text>
                          </HStack>
                          {fieldState.error && (
                            <p style={{ color: "red", marginTop: "5px" }}>
                              {fieldState.error.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </VStack>
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
                _hover={{
                  backgroundColor: "transparent",
                }}
                onClick={() => addRequirement()}
              >
                <FiPlus size={"1.3rem"} /> <Text>Add a requirement</Text>
              </Button>
            </HStack>
          </VStack>

          <VStack alignItems={"start"} width={"100%"}>
            <label
              htmlFor="fileInput"
              className="text-xl md:text-2xl font-[600] pb-0 mb-0"
            >
              Steps you&apos;ll take to get the project done
            </label>
            <VStack
              backgroundColor={"white"}
              padding={"2rem 1.5rem"}
              marginTop={"1rem"}
              width={"100%"}
            >
              {stepFields.map((step, index) => (
                <VStack
                  key={index}
                  alignItems={"start"}
                  width={"100%"}
                  className="shadow rounded-md p-3 mt-2"
                >
                  <label htmlFor="" className="font-semibold">
                    Step {index + 1} title
                  </label>

                  <Controller
                    name={`steps[${index}].step_title`} // Unique name using index
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <Input
                          {...field}
                          placeholder="Enter step title"
                          marginTop={"5px"}
                        />
                        {fieldState.error && (
                          <p style={{ color: "red", marginTop: "5px" }}>
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                  <br />
                  <label htmlFor="" className="font-semibold">
                    Description (Optional)
                  </label>
                  <Controller
                    name={`steps[${index}].description`} // Unique name using index
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <Textarea
                          {...field}
                          placeholder="Enter step description"
                          marginTop={"5px"}
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
                onClick={() => addStep()}
                _hover={{
                  backgroundColor: "transparent",
                }}
              >
                <FiPlus size={"1.3rem"} /> <Text>Add a step</Text>
              </Button>
            </HStack>
          </VStack>
        </GigCreateLayout>
      </form>
    </FormProvider>
  );
};

export default Step3;
