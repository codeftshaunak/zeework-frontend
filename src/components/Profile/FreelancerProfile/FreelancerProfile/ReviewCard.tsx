import StarRatings from "react-star-ratings";

const ReviewCard = ({ workDetails, role }) => {
  const { contract_details, client_reviews, freelancer_reviews } =
    workDetails || {};

  const feedbackMsg =
    role == 2
      ? freelancer_reviews?.[0]?.public_feedback?.feedback_message
      : client_reviews?.[0]?.public_feedback?.feedback_message;
  const ratings =
    role == 2
      ? freelancer_reviews?.[0]?.public_feedback?.average_rating || 0
      : client_reviews?.[0]?.public_feedback?.average_rating || 0;

  return (
    <div className="flex flex-col gap-3 hover:bg-slate-50 transition duration-300 p-6">
      <div>
        <p className="text-[18px] text-primary font-[500] capitalize">
          {contract_details?.contract_title}
        </p>
        <p className="text-sm text-gray-300 font-medium">
          Nov 5, 2023 - Apr 9, 2024
        </p>
      </div>
      <div>
        <div className="flex items-center gap-[8px]">
          <StarRatings
            rating={Number(ratings)}
            starDimension="14px"
            starSpacing="1px"
            starRatedColor="#22C35E"
            starEmptyColor="#8ab89b"
          />
          <p className="text-[#374151] text-[14px] font-[400]">{ratings}</p>
        </div>

        <p className="text-[#374151] text-[14px] font-[400]">
          {feedbackMsg || "Feedback message isn't available!"}
        </p>
      </div>
      <div className="flex gap-32 text-gray-300 text-lg font-medium">
        {contract_details?.contract_amount && (
          <p>${contract_details?.contract_amount}</p>
        )}
        <p className="capitalize">
          {contract_details?.contract_type === "fixed" && `Fixed price`}
          {contract_details?.contract_type === "hourly" && `Hourly rate`}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
