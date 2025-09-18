import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { MdLocationPin } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import Select from "react-select/creatable";
import { updateAgencyProfile } from "../../helpers/APIs/agencyApis";
import UniversalModal from "../Modals/UniversalModal";
import AgencyTitle from "./AgencyTitle";
// import { State, City } from "country-state-city";
import BtnSpinner from "../Skeletons/BtnSpinner";
import ErrorMsg from "../utils/Error/ErrorMsg";
// import { AgencyUpdatedModal } from "./ProfileUpdated";

const AgencyRightBar = ({ agency, setAgency }) => {
  const [isModal, setIsModal] = useState(false);
  const [modalType, setIsModalType] = useState("");
  const [value, setValue] = useState(null);
  const [isLading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const {
    agency_hourlyRate,
    agency_officeLocation,
    agency_size,
    agency_foundedYear,
    agency_focus,
    agency_language,
    agency_totalJob,
  } = agency || {};
  const [stateData] = useState([]);
  const [cityData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [stateCode, setStateCode] = useState("");
  const { name: countryName } =
    useSelector((state: any) => state?.profile?.agency?.agency_location) || {};

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
  };
  useEffect(() => {
    reset();
  }, [agency, reset]);

  const handleUpdate = (type, value) => {
    setIsModal(true);
    setIsModalType(type);
    setValue(value);
  };

  return (
    <>
      <VStack
        width={{ base: "full", md: "250px", xl: "300px" }}
        alignItems={"flex-start"}
        justifyContent={"right"}
        marginX={{ xl: "auto" }}
        marginTop={{ base: 10, lg: 0 }}
      >
        <Text fontSize={"1.3rem"} fontWeight={"600"}>
          Your Agency Activity
        </Text>
        <Box position={"relative"} mb={"1rem"}>
          <Text marginBottom={"0.5rem"} fontSize={"1rem"} fontWeight={"500"}>
            Hourly Rate
          </Text>
          <Text fontSize={"1.3rem"} marginBottom={"0.5rem"} fontWeight={"600"}>
            ${agency_hourlyRate}
          </Text>
          <VStack
            backgroundColor={"white"}
            position={"absolute"}
            top={"0"}
            right={"-10"}
            borderRadius={"50%"}
            width={"20px"}
            border={"1px solid var(--primarycolor)"}
            height={"20px"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"0.6s ease-in-out"}
            cursor={"pointer"}
            _hover={{
              border: "2px solid var(--primarycolor)",
              backgroundColor: "transparent",
              color: "var(--primarycolor)",
            }}
            onClick={() => handleUpdate("Hourly Rate", agency_hourlyRate)}
          >
            <RiEdit2Fill fontSize={"10px"} />
          </VStack>
        </Box>

        <Box position={"relative"} mb={"1rem"}>
          <Text fontSize={"1.3rem"} fontWeight={"600"} marginBottom={"0.51rem"}>
            Total Completed Jobs
          </Text>
          <Text fontSize={"1.3rem"} fontWeight={"600"}>
            {agency_totalJob}
          </Text>
        </Box>

        <Box position={"relative"} mb={{ base: "0.8rem", md: "2rem" }}>
          <HStack marginBottom={"0.5rem"} marginTop={"1rem"}>
            <Text fontSize={"1.3rem"} fontWeight={"600"} marginBottom={"0"}>
              Office Location
            </Text>
            {
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
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                onClick={() => handleUpdate("Office Location")}
              >
                {agency_officeLocation?.country ? (
                  <RiEdit2Fill fontSize={"10px"} />
                ) : (
                  <FiPlus fontSize={"25px"} />
                )}
              </VStack>
            }
          </HStack>

          <Box>
            {!!agency_officeLocation?.country &&
              agency_officeLocation?.street &&
              agency_officeLocation?.state && (
                <HStack>
                  <MdLocationPin fontSize={"1.2rem"} />
                  <Text>
                    {agency_officeLocation?.street},{" "}
                    {agency_officeLocation?.state}
                  </Text>
                </HStack>
              )}
            {/* <HStack>
              <IoTime />
              <Text>6:00 Am, 23 Jan 2024</Text>
            </HStack> */}
          </Box>
        </Box>

        <VStack gap={"10px"} alignItems={"flex-start"}>
          <AgencyTitle noAdded={true} isSmall={true}>
            Company Information
          </AgencyTitle>
          <VStack gap={"10px"} alignItems={"flex-start"}>
            <HStack alignItems={"start"}>
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
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                mt={1}
                onClick={() => handleUpdate("Agency Size", agency_size)}
              >
                {agency_size ? <RiEdit2Fill /> : <FiPlus fontSize={"15px"} />}
              </VStack>
              {agency_size ? (
                <Box marginBottom={"1rem"} marginLeft={"0.57rem"}>
                  <Text
                    fontSize={"1rem"}
                    fontWeight={"500"}
                    marginBottom={"0.5rem"}
                  >
                    Agency Size:
                  </Text>{" "}
                  <Text>{agency_size}</Text>
                </Box>
              ) : (
                <Text fontSize={"1rem"} fontWeight={"500"}>
                  Add Your Agency Size
                </Text>
              )}
            </HStack>
            <HStack alignItems={"start"}>
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
                onClick={() => handleUpdate("Founded", agency_foundedYear)}
              >
                {agency_foundedYear ? (
                  <RiEdit2Fill />
                ) : (
                  <FiPlus fontSize={"15px"} />
                )}
              </VStack>
              {agency_foundedYear ? (
                <Box marginBottom={"1rem"} marginLeft={"0.57rem"}>
                  <Text
                    fontSize={"1rem"}
                    marginBottom={"0.5rem"}
                    fontWeight={"500"}
                  >
                    Agency Founded:
                  </Text>{" "}
                  <Text>{agency_foundedYear}</Text>
                </Box>
              ) : (
                <Text fontSize={"1rem"} fontWeight={"500"}>
                  Add Year Agency Founded
                </Text>
              )}
            </HStack>
            <HStack alignItems={"start"}>
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
                onClick={() => handleUpdate("Focus")}
              >
                {agency_focus?.length ? (
                  <RiEdit2Fill />
                ) : (
                  <FiPlus fontSize={"15px"} />
                )}
              </VStack>

              <Box>
                {agency_focus?.length ? (
                  <Box marginBottom={"1rem"}>
                    <Text
                      fontSize={"1rem"}
                      marginBottom={"0.5rem"}
                      fontWeight={"500"}
                    >
                      Agency Focus:
                    </Text>
                    <ul className="flex gap-1 flex-wrap mt-1">
                      {agency_focus.map((item, index) => (
                        <li key={index} className="border px-2 rounded-full">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Box>
                ) : (
                  <Text fontSize={"1rem"} fontWeight={"500"}>
                    Add Your Client Focus
                  </Text>
                )}
              </Box>
            </HStack>
            <HStack alignItems={"start"}>
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
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
                mt={1}
                onClick={() => handleUpdate("Language")}
              >
                {agency_language ? (
                  <RiEdit2Fill />
                ) : (
                  <FiPlus fontSize={"15px"} />
                )}
              </VStack>
              {agency_language ? (
                <Box marginBottom={"1rem"} marginLeft={"0.56rem"}>
                  <Text
                    fontSize={"1rem"}
                    marginBottom={"0.5rem"}
                    fontWeight={"500"}
                  >
                    Language:
                  </Text>{" "}
                  <Text>{agency_language}</Text>
                </Box>
              ) : (
                <Text fontSize={"1rem"} fontWeight={"500"}>
                  Add Languages
                </Text>
              )}
            </HStack>
          </VStack>
        </VStack>
      </VStack>
      {/* {isModal && (
        <AgencyUpdatedModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={modalType}
          setAgency={setAgency}
          data={value}
        />
      )} */}
      {isModal && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          title={`Update ${modalType}`}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* update hourly rate */}
            {modalType === "Hourly Rate" && (
              <div>
                <input
                  type="number"
                  {...register("agency_hourlyRate", {
                    required: "Hourly rate is required",
                  })}
                  defaultValue={Number(value)}
                  className="px-3 py-1 border rounded w-full"
                />
                {errors.agency_hourlyRate && (
                  <ErrorMsg msg={errors.agency_hourlyRate.message} />
                )}
              </div>
            )}
            {/* update office location */}
            {modalType === "Office Location" && (
              <div>
                <p>Your Country</p>
                <select
                  className="w-full px-2 py-1 border rounded"
                  {...register("agency_officeLocation.country")}
                  defaultValue={countryName}
                >
                  <option value={countryName}>{countryName}</option>
                </select>
                <div className="w-full flex gap-5 mt-3">
                  <div className="w-1/2">
                    <p>Select State</p>
                    <Controller
                      control={control}
                      name="agency_officeLocation.state"
                      render={({ field: { onChange, ref } }) => (
                        <Select
                          className="w-full"
                          inputRef={ref}
                          onChange={(val, action) => {
                            if (action.action === "create-option") {
                              onChange(action.option.value), setStateCode("");
                            } else {
                              onChange(val.value), setStateCode(val.isoCode);
                            }
                          }}
                          options={[
                            ...(stateData || []),
                            {
                              label: "Add new state",
                              value: "__create_new_field__",
                            },
                          ]}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <p>Select City</p>
                    <Controller
                      control={control}
                      name="agency_officeLocation.street"
                      render={({ field: { onChange, ref } }) => (
                        <Select
                          className="w-full"
                          inputRef={ref}
                          onChange={(val, action) => {
                            if (action.action === "create-option") {
                              onChange(action.option.value);
                            } else {
                              onChange(val.value);
                            }
                          }}
                          options={[
                            ...(cityData || []),
                            {
                              label: "Add new city",
                              value: "__create_new_field__",
                            },
                          ]}
                          required
                          // isDisabled={!stateCode}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <p>Address</p>
                  <input
                    className="w-full px-2 py-1 border rounded"
                    type="text"
                    {...register("agency_officeLocation.address")}
                  />
                </div>
              </div>
            )}
            {/* update company info */}
            {modalType === "Agency Size" && (
              <input
                type="number"
                {...register("agency_size")}
                defaultValue={Number(value)}
                required
                className="px-3 py-1 border rounded w-full"
              />
            )}
            {modalType === "Founded" && (
              <input
                type="date"
                defaultValue={value}
                {...register("agency_foundedYear")}
                className="px-3 py-1 border rounded w-full"
                required
              />
            )}
            {modalType === "Focus" && <p>Coming Soon</p>}
            {modalType === "Language" && <p>Coming Soon</p>}

            <div className="text-right mt-10">
              <Button
                isLoading={isLading}
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

export default AgencyRightBar;
