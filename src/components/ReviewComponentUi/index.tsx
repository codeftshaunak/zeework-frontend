"use client";

// End Contract By Client
import { useEffect, useState } from "react";
import {
  HStack,
  VStack,
  useToast,
  Textarea,
  Text,
  Box,
  Select,
  Button,
} from "@chakra-ui/react";
import { BiSolidDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import StarRatings from "react-star-ratings";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { giveFeedback, getOptionsList } from "../../helpers/APIs/clientApis";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { MdCheckCircle } from "react-icons/md";
import UniversalModal from "../Modals/UniversalModal";

const ReviewComponent = () => {
  const options = [
    "Skills",
    "Quality of Requirements",
    "Availability",
    "Set Responsible Deadlines",
    "Communication",
    "Cooperation",
  ];
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const state = useSelector((state: any) => state);
  const { user_id } = state.profile.profile;
  const { role } = state.auth;
  const [resonOptionList, setResonOptionList] = useState([]);
  const pathname = usePathname();
  const jobDetails = location.state && location.state.jobDetails;
  const receiverDetails = location.state && location.state.receiverDetails;
  const receiver_id = receiverDetails?.user_id;
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    receiver_id: "",
    contract_ref: "",
    job_id: "",
    private_feedback: {
      reason_for_ending_contract: "",
      recommending_others: 0,
      feedback: options.map((option) => ({
        options: option,
        ratings: 0,
      })),
    },
    public_feedback: {
      average_rating: 0,
      feedback_message: feedbackMessage,
    },
  });

  const [selectedNumber, setSelectedNumber] = useState(0);

  const handleNumberClick = (num) => {
    setSelectedNumber((prevSelectedNumber) =>
      prevSelectedNumber === num ? 0 : num
    );
  };

  const getResonOptionList = async () => {
    try {
      const { body } = await getOptionsList();
      setResonOptionList(body?.reasons);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublicFeedbackChange = (option, field, value) => {
    setFormData((prevData) => {
      if (field === "feedback_message") {
        return {
          ...prevData,
          public_feedback: {
            ...prevData.public_feedback,
            [field]: value,
          },
        };
      } else if (field === "reason_for_ending_contract") {
        return {
          ...prevData,
          private_feedback: {
            ...prevData.private_feedback,
            [field]: value,
          },
        };
      } else {
        return {
          ...prevData,
          private_feedback: {
            ...prevData.private_feedback,
            feedback: prevData.private_feedback.feedback.map((item) =>
              item.options === option ? { ...item, ratings: value } : item
            ),
          },
        };
      }
    });
  };

  const totalScore = (
    formData.private_feedback.feedback
      .map((item) => item.ratings || 0)
      .reduce((total, rating) => total + rating, 0) / options?.length || 0
  ).toFixed(2);

  useEffect(() => {
    setFormData((data) => ({
      ...data,
      job_id: jobDetails?.job_id,
      contract_ref: jobDetails?._id,
      receiver_id: receiver_id,
      public_feedback: {
        ...data.public_feedback,
        average_rating: totalScore,
        feedback_message: feedbackMessage,
      },
      private_feedback: {
        ...data.private_feedback,
        recommending_others: selectedNumber,
      },
    }));
    if (!resonOptionList.length) getResonOptionList();
  }, [totalScore, feedbackMessage, selectedNumber, user_id, receiver_id]);

  const validateFormData = () => {
    const { reason_for_ending_contract, feedback } = formData.private_feedback;
    if (!reason_for_ending_contract)
      return "Reason for ending contract is required";
    if (selectedNumber === 0) return "Recommendation is required";
    for (let i = 0; i < feedback.length; i++) {
      if (feedback[i].ratings === 0)
        return `Rating for ${feedback[i].options} is required`;
    }
    if (!feedbackMessage) return "Feedback message is required";
    return null;
  };

  const handleSubmit = async () => {
    const errorMessage = validateFormData();
    if (errorMessage) {
      toast({
        title: errorMessage,
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-center",
      });
      return;
    }
    setIsLoading(true);
    try {
      const res = await giveFeedback(formData);
      if (res.code === 200) {
        toast({
          title: res.msg,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        setIsModal(true);
        // router.push("/");
      } else {
        toast({
          title: res.msg || res.response.data.msg,
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title:
          error.data.msg || "Some issue happen please check everything again",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!jobDetails || !receiverDetails) {
      router.push("/");
    }
  }, [jobDetails, receiverDetails, navigate]);

  // If jobDetails and receiverDetails are not available, prevent rendering
  if (!jobDetails || !receiverDetails) {
    return null;
  }

  return (
    <>
      <VStack
        width={{ lg: "90%" }}
        alignItems={"start"}
        gap={"30px"}
        margin={"auto"}
        padding={"0 0 3rem 0"}
      >
        <Text
          textAlign={"left"}
          fontSize={"2rem"}
          fontWeight={"600"}
          marginTop={{ base: "4", md: "10" }}
        >
          {" "}
          End contract review{" "}
        </Text>
        <VStack
          alignItems={"start"}
          justifyContent={"start"}
          margin={"auto"}
          width={"100%"}
          gap={"20px"}
          padding={{ base: "1.5rem", md: "3rem 2.5rem" }}
          border={"0.1px solid gray"}
          borderRadius={"15px"}
          bgColor={"white"}
        >
          <Box width={"80%"} gap={"20px"}>
            <Box>
              <Text textAlign={"left"} fontSize={"1.2rem"} fontWeight={"600"}>
                {role == 1 && "Client"}
                {role == 2 && "Freelancer"}
              </Text>
              <Text textAlign={"left"} fontSize={"1.2rem"}>
                {receiverDetails?.firstName} {receiverDetails?.lastName}
              </Text>
            </Box>
            <br />
            <Box>
              <Text textAlign={"left"} fontSize={"1.2rem"} fontWeight={"600"}>
                {" "}
                Contract Title{" "}
              </Text>
              <Text textAlign={"left"} fontSize={"1.2rem"}>
                {" "}
                {jobDetails?.contract_title}{" "}
              </Text>
            </Box>
          </Box>
        </VStack>

        <VStack
          alignItems={"start"}
          justifyContent={"start"}
          margin={"auto"}
          width={"100%"}
          gap={"20px"}
          padding={{ base: "1.5rem", md: "3rem 2.5rem" }}
          border={"0.1px solid gray"}
          borderRadius={"15px"}
          bgColor={"white"}
        >
          <Text textAlign={"left"} fontSize={"1.6rem"} fontWeight={"600"}>
            {" "}
            Private feedback{" "}
          </Text>
          <Box width={{ lg: "80%" }} gap={"20px"}>
            <Text fontSize={"1.2rem"}>
              This is your opportunity to share feedback on{" "}
              {receiverDetails?.firstName} that you {"don't"} want posted
              publicly.
              {"We'll"} use it to improve the user experience, but we {"won't"}{" "}
              share it with {receiverDetails?.firstName}.
            </Text>
            <br />
            <Box>
              <Text
                textAlign={"left"}
                fontSize={"1.2rem"}
                fontWeight={"600"}
                marginBottom={"1rem"}
              >
                Primary reason for ending contract
              </Text>
              <Select
                placeholder="Select a reason"
                size="lg"
                id="reasonSelect"
                onChange={(e) =>
                  handlePublicFeedbackChange(
                    "",
                    "reason_for_ending_contract",
                    e.target.value
                  )
                }
              >
                {resonOptionList?.length ? (
                  resonOptionList?.map((option) => (
                    <option value={option?.reason} key={option?._id}>
                      {option?.reason}
                    </option>
                  ))
                ) : (
                  <option value={"not found"}>Not Found</option>
                )}
              </Select>
            </Box>
            <br />
            <Box>
              <Text textAlign={"left"} fontSize={"1.2rem"} fontWeight={"600"}>
                {" "}
                How likely are you to recommend this client to a friend or a
                colleague?
              </Text>
              <br />
              <VStack alignItems={"start"}>
                <HStack
                  justifyContent={"space-between"}
                  flexWrap={"wrap"}
                  width={"100%"}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <VStack
                      key={num}
                      fontSize={"1.2rem"}
                      justifyContent={"center"}
                      borderRadius={"50%"}
                      cursor={"pointer"}
                      fontWeight={"600"}
                      width={"50px"}
                      height={"50px"}
                      border={"2px solid var(--bordersecondary)"}
                      textAlign={"center"}
                      bg={
                        selectedNumber === num
                          ? "var(--primarycolor)"
                          : "transparent"
                      }
                      color={selectedNumber === num ? "white" : "black"}
                      onClick={() => handleNumberClick(num)}
                    >
                      <Text padding={"0"}>{num}</Text>
                    </VStack>
                  ))}
                </HStack>

                <HStack
                  justifyContent={"space-between"}
                  width={"100%"}
                  marginTop={"1rem"}
                >
                  <BiSolidDislike
                    fontSize={"1.9rem"}
                    color="var(--primarytextcolor)"
                  />
                  <Text>
                    Embark on a journey to discover your preferred range of
                    choices.
                  </Text>
                  <BiSolidLike fontSize={"1.9rem"} color="#0096FE" />
                </HStack>
              </VStack>
            </Box>
          </Box>
        </VStack>

        <VStack
          alignItems={"start"}
          justifyContent={"start"}
          margin={"auto"}
          width={"100%"}
          gap={{ base: "10px", md: "20px" }}
          padding={{ base: "1.5rem", md: "3rem 2.5rem" }}
          border={"0.1px solid gray"}
          borderRadius={"15px"}
          bgColor={"white"}
        >
          <Text textAlign={"left"} fontSize={"1.6rem"} fontWeight={"600"}>
            {" "}
            Public feedback{" "}
          </Text>
          <Box width={{ lg: "80%" }} gap={"20px"}>
            <Text fontSize={{ md: "1.2rem" }}>
              We&apos;ll post your feedback on {receiverDetails?.firstName}
              &apos;s Recent History when they&apos;ve left there feedback for
              you or after 14-day feedback period closes. Your insights can help
              other Zeework talent choose their next job{" "}
            </Text>
            <br />
            <Box>
              <VStack alignItems={"start"}>
                <Box marginTop={{ base: 10, md: 8 }}>
                  <Text
                    fontSize={{ base: "x-large", md: "2xl" }}
                    fontWeight="semibold"
                  >
                    Feedback to client
                  </Text>
                  <Box
                    marginTop={{ base: 3, md: 6 }}
                    className="flex flex-col gap-4 md:gap-8 w-full"
                  >
                    {options?.map((option, index) => (
                      <Box
                        key={index}
                        className="flex md:items-center gap-1 sm:gap-2 md:gap-6 flex-col md:flex-row"
                      >
                        <Box className="flex items-center gap-2">
                          <StarRatings
                            rating={
                              formData.private_feedback.feedback.find(
                                (item) => item.options === option
                              ).ratings
                            }
                            starRatedColor="orange"
                            starHoverColor="orange"
                            starEmptyColor="gray"
                            changeRating={(newRating) =>
                              handlePublicFeedbackChange(
                                option,
                                "ratings",
                                newRating
                              )
                            }
                            numberOfStars={5}
                            starDimension="2rem"
                            name={`ratings-${index}`}
                          />
                        </Box>
                        <Text fontSize={{ md: "xl" }} className="w-full">
                          {option}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                  <Text
                    fontWeight="semibold"
                    fontSize={{ base: "xl", md: "2xl" }}
                    marginTop={{ base: 4, md: 8 }}
                  >
                    Total Score: {totalScore}
                  </Text>
                </Box>
              </VStack>
            </Box>
            <br />
            <br />
            <Box>
              <Text
                fontSize={{ base: "x-large", md: "2xl" }}
                fontWeight="semibold"
              >
                Share your experience to Zeework community
              </Text>
              <Box marginTop={{ base: 3, md: 6 }}>
                <Textarea
                  padding={{ base: 2, md: 4 }}
                  height={{ base: 32, md: 40 }}
                  fontSize={{ base: "lg", md: "xl" }}
                  placeholder="Your comments will be shared publicly"
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  sx={{ "::placeholder": { opacity: 0.3 } }} // Adjust opacity as needed
                />
              </Box>
            </Box>
          </Box>
        </VStack>

        <VStack
          marginTop={{ md: "10" }}
          border={"0.1px solid gray"}
          borderRadius={"15px"}
          padding={{ base: "1.5rem", md: "3rem 2.5rem" }}
          justifyContent={"start"}
          width={"100%"}
          alignItems={"start"}
          bgColor={"white"}
        >
          <Box marginTop={{ base: 4, md: 6 }}>
            <Text fontSize={{ sm: "xl", md: "1.2rem" }}>
              Ending this contract will permanently lock the Work Diary for this
              project. {"We'll"} let your client know the job is done and send
              you a final statement for any unpaid work.
            </Text>
          </Box>
          <Box
            marginTop={{ base: 2, md: 6 }}
            width={{ base: "full", sm: "fit-content" }}
          >
            <Box className="flex flex-col items-center sm:flex-row md:items-center justify-center text-center gap-3 sm:gap-6 w-full">
              <Text
                fontSize={{ base: "xl", md: "1.2rem" }}
                fontWeight="450"
                className="text-[#22c55e]"
                width={{ base: "full", sm: "fit-content" }}
              >
                Cancel
              </Text>

              <Button
                width={"full"}
                fontSize={{ base: "xl", md: "1.2rem" }}
                isLoading={isLoading}
                loadingText="Submitting"
                colorScheme="primary"
                type="submit"
                spinner={<BtnSpinner />}
                paddingX={8}
                rounded={"full"}
                onClick={() => handleSubmit()}
              >
                Submit Review
              </Button>
            </Box>
          </Box>
        </VStack>
      </VStack>

      {/* Successful Popup */}
      {isModal && (
        <UniversalModal
          isModal={isModal}
          setIsModal={setIsModal}
          isCloseBtn={false}
        >
          <div className="grid gap-6 justify-center">
            <div className="w-[72px] h-[72px] flex items-center justify-center bg-green-50 rounded-full mx-auto">
              <MdCheckCircle className="text-4xl text-green-500" />
            </div>
            <div className="text-gray-700 text-2xl font-semibold font-['SF Pro Text'] leading-loose text-center">
              Feedback Submitted
            </div>
            <div className="text-center text-gray-700 font-medium font-['SF Pro Text'] leading-tight">
              Thank you for your feedback! Your input is invaluable to us.
            </div>
            <div className="w-full flex justify-between items-center gap-6">
              <div className="w-full h-9 flex-col justify-start items-start gap-2.5 inline-flex">
                <div
                  className="self-stretch grow shrink basis-0 px-3 py-2 bg-gray-50 rounded-md shadow border border-gray-300 justify-center items-center gap-1 inline-flex cursor-pointer"
                  onClick={() =>
                    router.push(role == 1 ? "/my-jobs" : "/client-dashboard")
                  }
                >
                  <div className="text-center text-gray-700 text-sm font-medium font-['SF Pro Text'] leading-tight">
                    Back to {role == 1 ? "my jobs" : "dashboard"}
                  </div>
                </div>{" "}
              </div>
              <div className="w-full h-9 flex-col justify-start items-start gap-2.5 inline-flex">
                <div
                  className="self-stretch h-9 px-3 py-2 bg-green-500 rounded-md shadow justify-center items-center gap-1 inline-flex cursor-pointer"
                  onClick={() =>
                    router.push(role == 1 ? `/find-job` : "/my-stats")
                  }
                >
                  <div className="text-center text-white text-sm font-medium font-['SF Pro Text'] leading-tight">
                    Go to {role == 1 ? "find work" : "my stats"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UniversalModal>
      )}
    </>
  );
};

export default ReviewComponent;
