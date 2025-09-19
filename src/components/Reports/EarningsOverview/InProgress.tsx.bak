import { Button, Tooltip } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const InProgress = ({ balance }) => {
  const paymentStatus = useSelector(
    (state) => state.profile.profile.payment_verified
  );
  const router = useRouter();

  return (
    <div className="mt-5 border border-[var(--bordersecondary)] p-8 rounded-lg bg-white grid gap-8">
      <div>
        <p className="text-lg font-semibold mb-3">
          What does In-Progress mean?
        </p>
        <p>
          In-Progress details the current earnings from all hourly and fixed
          contracts that you are working on this week.
        </p>
      </div>
    </div>
  );
};

export default InProgress;
