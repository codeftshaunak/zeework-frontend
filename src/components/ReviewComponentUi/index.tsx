
"use client";
import React from "react";
import { toast } from "@/lib/toast";

// End Contract By Client
import { useEffect, useState } from "react";
import {
  HStack,
  VStack,
  Textarea,
  Text,
  Box,
  Select,
  Button,
} from "@/components/ui/migration-helpers";
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
      toast.info(errorMessage);
      return;
    }
    setIsLoading(true);
    try {
      const res = await giveFeedback(formData);
      if (res.code === 200) {
        toast.success(res.msg);

        setIsModal(true);
        // router.push("/");
      } else {
        toast.warning(res.msg || res.response.data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.data.msg || "Some issue happen please check everything again");
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
      <div className="flex flex-col items-start m-[auto] p-[0 0 3rem 0]"
       
      >
        <span
          marginTop={{ base: "4", md: "10" }}
         className="text-4xl font-semibold text-left">
          {" "}
          End contract review{" "}
        </span>
        <div className="flex flex-col border rounded bg-white items-start justify-start m-[auto] w-full"
         
        >
          <div className="w-[80%]">
            <div>
              <span className="text-xl font-semibold text-left">
                {role == 1 && "Client"}
                {role == 2 && "Freelancer"}
              </span>
              <span className="text-xl text-left">
                {receiverDetails?.firstName} {receiverDetails?.lastName}
              </span>
            </div>
            <br />
            <div>
              <span className="text-xl font-semibold text-left">
                {" "}
                Contract Title{" "}
              </span>
              <span className="text-xl text-left">
                {" "}
                {jobDetails?.contract_title}{" "}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start m-[auto] w-full border rounded bg-white"
        >
          <span className="text-3xl font-semibold text-left">
            {" "}
            Private feedback{" "}
          </span>
          <div}>
            <span className="text-xl">
              This is your opportunity to share feedback on{" "}
              {receiverDetails?.firstName} that you {"don't"} want posted
              publicly.
              {"We'll"} use it to improve the user experience, but we {"won't"}{" "}
              share it with {receiverDetails?.firstName}.
            </span>
            <br />
            <div>
              <span
               className="mb-[1rem] text-xl font-semibold text-left">
                Primary reason for ending contract
              </span>
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
            </div>
            <br />
            <div>
              <span className="text-xl font-semibold text-left">
                {" "}
                How likely are you to recommend this client to a friend or a
                colleague?
              </span>
              <br />
              <div className="flex flex-col className="items-start">
                <div className="flex flex-row items-center className= w-full"justify-between"
                  flexWrap="wrap"
                 
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <divtext-1.2rem justify-center rounded"
                      className="font-600 w-[50px] h-[50px] border text-center flex flex-col key={num} className= cursor-pointer"
                      onClick={() => handleNumberClick(num)}
                    >
                      <span>{num}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-row items-center className="justify-between w-full mt-[1rem]"
                >
                  <BiSolidDislike
                  />
                  <span>
                    Embark on a journey to discover your preferred range of
                    choices.
                  </span>
                  <BiSolidLike />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col className= border rounded bg-white"items-start justify-start m-[auto] w-full"}}
         
        >
          <span className="text-3xl font-semibold text-left">
            {" "}
            Public feedback{" "}
          </span>
          <div}>
            <span}>
              We&apos;ll post your feedback on {receiverDetails?.firstName}
              &apos;s Recent History when they&apos;ve left there feedback for
              you or after 14-day feedback period closes. Your insights can help
              other Zeework talent choose their next job{" "}
            </span>
            <br />
            <div>
              <div className="flex flex-col className="items-start">
                <div marginTop={{ base: 10, md: 8 }}>
                  <span}
                   
                  >
                    Feedback to client
                  </span>
                  <div
                    marginTop={{ base: 3, md: 6 }}
                    className="flex flex-col gap-4 md:gap-8 w-full"
                  >
                    {options?.map((option, index) => (
                      <div
                        key={index}
                        className="flex md:items-center gap-1 sm:gap-2 md:gap-6 flex-col md:flex-row"
                      >
                        <div className="flex items-center gap-2">
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
                        </div>
                        <span} className="w-full">
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span}
                    marginTop={{ base: 4, md: 8 }}
                  >
                    Total Score: {totalScore}
                  </span>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div>
              <span}
               
              >
                Share your experience to Zeework community
              </span>
              <div marginTop={{ base: 3, md: 6 }}>
                <spanarea}}}
                  placeholder="Your comments will be shared publicly"
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  sx={{ "::placeholder": { opacity: 0.3 } }} // Adjust opacity as needed
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col marginTop={{ md: border rounded"10" }}}
          className="justify-start w-full items-start bg-white"
        >
          <div marginTop={{ base: 4, md: 6 }}>
            <span}>
              Ending this contract will permanently lock the Work Diary for this
              project. {"We'll"} let your client know the job is done and send
              you a final statement for any unpaid work.
            </span>
          </div>
          <div
            marginTop={{ base: 2, md: 6 }}}
          >
            <div className="flex flex-col items-center sm:flex-row md:items-center justify-center text-center gap-3 sm:gap-6 w-full">
              <span}
               
                className="text-[#22c55e]"}
              >
                Cancel
              </span>

              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full"}
                isLoading={isLoading}
                loadingText="Submitting"
                type="submit"
                spinner={<BtnSpinner />}
                paddingX={8}
                onClick={() => handleSubmit()}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>

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
