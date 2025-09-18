import { useContext, useEffect, useState, useCallback } from "react";
import ContractTerms from "./ContractTerms";
import FreelancerProfile from "./FreelancerProfile";
import JobDetails from "./JobDetails";
import { sendHireFreelancer } from "../../helpers/APIs/clientApis";
import { useToast, Checkbox } from "@chakra-ui/react";
import { useLocation, useNavigate } from "next/navigation";
import BtnSpinner from "../Skeletons/BtnSpinner";
import { SocketContext } from "../../contexts/SocketContext";
import { clearMessageState } from "../../redux/messageSlice/messageSlice";
import { useDispatch } from "react-redux";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import { getFreelancerById } from "../../helpers/APIs/freelancerApis";
import { getSingleJobDetails } from "../../helpers/APIs/jobApis";
import { getAgencyById } from "../../helpers/APIs/agencyApis";
import HireFreelancerSkeleton from "../Skeleton/HireFreelancerSkeleton";
import { ErrorState } from "../utils/Error/ErrorState";

const HireFreelancerPage = () => {
  const { socket } = useContext(SocketContext);
  const { profile } = useContext(CurrentUserContext);
  const location = useLocation();
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();

  const queryParams = new URLSearchParams(location.search);
  const freelancer_id = queryParams.get("freelancer");
  const agency_id = queryParams.get("agency");
  const job_id = queryParams.get("job");

  const [freelancerInfo, setFreelancerInfo] = useState(null);
  const [agencyInfo, setAgencyInfo] = useState(null);
  const [jobInfo, setJobInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    hiring_team: "",
    job_id: job_id || "",
    job_title: "",
    contract_title: "",
    job_type: "hourly",
    hourly_rate: 0,
    weekly_limit: 40,
    allow_freelancer_manually_timelog: false,
    freelancer_id: freelancer_id || agency_id || "",
    offer_to: agency_id ? "agency" : "freelancer",
    applied_by: agency_id ? "agency" : "freelancer",
    accept_terms_condition: false,
  });

  const validateForm = useCallback(() => {
    const { job_type, hourly_rate, budget, accept_terms_condition } = formData;

    if (!accept_terms_condition) {
      toast({
        title: "Please accept the terms and conditions",
        status: "warning",
        duration: 3000,
        position: "top-right",
      });
      return false;
    }

    if (job_type === "hourly" && Number(hourly_rate) < 1) {
      toast({
        title: "Please enter a valid hourly rate (minimum $1)",
        status: "warning",
        duration: 3000,
        position: "top-right",
      });
      return false;
    }

    if (job_type === "fixed" && Number(budget) < 1) {
      toast({
        title: "Please enter a valid budget (minimum $1)",
        status: "warning",
        duration: 3000,
        position: "top-right",
      });
      return false;
    }

    return true;
  }, [formData, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await sendHireFreelancer(
        formData,
        agency_id ? "agency" : "freelancer"
      );

      if (res?.code === 200) {
        if (socket) {
          socket.emit(
            "card_message",
            {
              sender_id: res?.body.client_id,
              receiver_id: res?.body.freelancer_id,
              message: " ",
              message_type: "offer",
              contract_ref: res?.body._id,
            },
            {
              title: res?.body.job_title,
              type: "job_offer",
              job_type: res?.body.job_type,
              amount: res?.body.hourly_rate || res?.body.budget,
              url: {
                freelancer: `/message/offer?job_id=${res?.body.job_id}&offer_id=${res?.body._id}`,
                client: `/client-jobDetails/${res?.body.job_id}`,
              },
            }
          );
        }

        dispatch(clearMessageState());
        toast({
          title: res?.msg || "Offer sent successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        router.push("/client-dashboard");
      } else {
        toast({
          title: res?.msg || res?.response?.data?.msg || "Failed to send offer",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error sending hire request:", error);
      toast({
        title:
          error?.response?.data?.msg ||
          "An error occurred while sending the offer",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      accept_terms_condition: e.target.checked,
    }));
  };

  const getJobInfo = useCallback(async () => {
    if (!job_id) return;

    try {
      const { body } = await getSingleJobDetails(job_id);
      const jobData = body?.[0];

      if (jobData) {
        setJobInfo(jobData);
        setFormData((prev) => ({
          ...prev,
          job_id: jobData._id || "",
          job_title: jobData.title || "",
          job_type: jobData.job_type || "hourly",
        }));
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  }, [job_id]);

  const getFreelancerInfo = useCallback(async () => {
    if (!freelancer_id) return;

    try {
      const { body } = await getFreelancerById(freelancer_id);

      if (body) {
        setFreelancerInfo(body);
        setFormData((prev) => ({
          ...prev,
          hourly_rate: body.hourly_rate || 0,
        }));
      }
    } catch (error) {
      console.error("Error fetching freelancer details:", error);
    }
  }, [freelancer_id]);

  const getAgencyInfo = useCallback(async () => {
    if (!agency_id) return;

    try {
      const { body } = await getAgencyById(agency_id);

      if (body) {
        setAgencyInfo(body);
        setFormData((prev) => ({
          ...prev,
          hourly_rate: body.agency_hourlyRate || 0,
        }));
      }
    } catch (error) {
      console.error("Error fetching agency details:", error);
    }
  }, [agency_id]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        await Promise.all([
          getJobInfo(),
          freelancer_id ? getFreelancerInfo() : Promise.resolve(),
          agency_id ? getAgencyInfo() : Promise.resolve(),
        ]);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getJobInfo, getFreelancerInfo, getAgencyInfo, freelancer_id, agency_id]);

  useEffect(() => {
    if (!jobInfo?.job_type) return;
    setFormData((prev) => {
      const updatedFormData = { ...prev, job_type: jobInfo.job_type };

      if (jobInfo.job_type === "hourly") {
        delete updatedFormData.budget;
        updatedFormData.weekly_limit = 40;
        updatedFormData.allow_freelancer_manually_timelog = false;
        const rate = agency_id
          ? agencyInfo?.agency_hourlyRate
          : freelancerInfo?.hourly_rate;
        updatedFormData.hourly_rate = rate || 0;
      } else if (jobInfo.job_type === "fixed") {
        delete updatedFormData.hourly_rate;
        delete updatedFormData.weekly_limit;
        delete updatedFormData.allow_freelancer_manually_timelog;
        updatedFormData.budget = jobInfo.amount || 0;
      }

      return updatedFormData;
    });
  }, [
    jobInfo,
    agency_id,
    agencyInfo?.agency_hourlyRate,
    freelancerInfo?.hourly_rate,
  ]);

  useEffect(() => {
    if (loading) return;

    const hasValidProfile = profile?.profile?.payment_verified;

    if (!hasValidProfile) {
      router.push("/client-dashboard");
    }
  }, [loading, profile, freelancerInfo, agencyInfo, navigate]);

  if (loading) {
    return <HireFreelancerSkeleton />;
  }

  if (!freelancerInfo && !agencyInfo) {
    return <ErrorState onNavigate={() => router.push("/client-dashboard")} />;
  }

  return (
    <section className="w-[80%]">
      <FreelancerProfile profile={agency_id ? agencyInfo : freelancerInfo} />

      <form onSubmit={handleSubmit}>
        <JobDetails
          setFormData={setFormData}
          formData={formData}
          jobInfo={jobInfo}
        />

        <ContractTerms
          setFormData={setFormData}
          formData={formData}
          loading={loading}
        />

        <div className="border border-[lightgray] rounded-xl mt-4 py-6 px-10 bg-white">
          <div className="mb-6">
            <Checkbox
              colorScheme="primary"
              isChecked={formData.accept_terms_condition}
              onChange={handleCheckboxChange}
            >
              Yes, I understand and agree to the{" "}
              <span className="text-green-500 cursor-pointer">
                Zeework Terms of Service
              </span>
              , including the{" "}
              <span className="text-green-500 cursor-pointer">
                User Agreement
              </span>{" "}
              and{" "}
              <span className="text-green-500 cursor-pointer">
                Privacy Policy
              </span>
            </Checkbox>
          </div>

          <div className="font-semibold text-right flex items-center justify-end gap-10">
            <button
              type="button"
              className="text-green-500 cursor-pointer hover:text-green-600 transition-colors"
              onClick={() => router.push(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`py-2 px-5 text-white cursor-pointer rounded-full bg-green-500 w-fit flex items-center transition-all ${
                (!formData.accept_terms_condition || isSubmitting) &&
                "opacity-50 cursor-not-allowed"
              }`}
              disabled={!formData.accept_terms_condition || isSubmitting}
            >
              {isSubmitting && <BtnSpinner />}
              {isSubmitting ? "Sending..." : "Continue"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default HireFreelancerPage;
