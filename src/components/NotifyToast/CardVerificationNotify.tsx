import { BsInfoCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { hideToast } from "../../redux/toastSlice/toastSlice";
const CardVerificationNotify = () => {
  const role = useSelector((state: unknown) => state.auth.role);
  const pathname = usePathname();

  const router = useRouter();

  const paymentStatus = useSelector((state: unknown) => state.toast.visible);

  const dispatch = useDispatch();

  return (
    <>
      {role == 2 && !paymentStatus && pathname !== "/login" && (
        <div className="w-[85%] bg-green-100 py-4 px-2 sm:px-3 pr-[25px] relative shadow-sm rounded-lg mt-2">
          <div className="flex items-start justify-start lg:items-center md:justify-center gap-[10px] lg:gap-[6px] tracking-wide">
            <div className="mt-1.5 lg:mt-0">
              <BsInfoCircle size={18} />
            </div>
            <p className="capitalize">
              Don&apos;t forget to complete your profile with payment details
              and start your first hire!{" "}
              <span
                onClick={() => router.push("/setting/billing-payments")}
                className="cursor-pointer underline underline-offset-2 hover:no-underline transition font-bold text-[var(--primarycolor)]"
              >
                Click to Update Here
              </span>
            </p>
          </div>
          <div
            className="absolute top-2 right-2 lg:right-3 cursor-pointer rounded-full hover:bg-white/10"
            onClick={() => dispatch(hideToast())}
          >
            <IoMdClose />
          </div>
        </div>
      )}
    </>
  );
};

export default CardVerificationNotify;
