"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";
import { IoIosMore, IoMdClose } from "react-icons/io";
import { AiOutlineShareAlt } from "react-icons/ai";
import { deleteFreelancerGig } from "../../../helpers/APIs/gigApis";
import { useRouter } from "next/navigation";
import BtnSpinner from "../../Skeletons/BtnSpinner";
import UniversalModal from "../../Modals/UniversalModal";

const SingleGig = ({ gig, getAllGigs }) => {
  const [isMenu, setIsMenu] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { title, images, _id } = gig;
  const router = useRouter();

  // handle details & edit button
  const handleGigEdit = () => {
    router.push(`/freelancer/gig/edit/${_id}`);
  };
  const handleGigDetails = () => {
    router.push(`/freelancer/gig/details/${_id}`);
  };

  const handleDelete = async (value) => {
    if (value === "modal") {
      setIsModal(true);
    } else if (value === "delete") {
      setIsLoading(true);
      try {
        const response = await deleteFreelancerGig(gig._id);
        if (response?.code === 200) {
          toast.default(response.msg);
          setIsModal(false);
          getAllGigs();
        }
      } catch (error) {
        console.log(error);
        setIsModal(false);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="flex flex-col-reverse sm:flex-row items-end sm:items-center justify-between gap-2 sm:gap-16 bg-white px-5 py-3 rounded-md"
        onMouseLeave={() => setIsMenu(false)}
      >
        <div className="flex gap-3 items-center">
          {/* <img src={images[0]} className="h-16 w-28 bg-cover" /> */}
          <div
            className={` h-16 w-28 bg-cover rounded`}
            style={{
              backgroundImage: `url(${images?.[0]})`,
            }}
          ></div>
          <div>
            <h4 className="text-lg font-semibold text-gray-600">
              I will {title}
            </h4>
          </div>
        </div>
        <div>
          {
            <div className="relative flex items-center gap-3">
              <div className="cursor-pointer border border-[var(--primarytextcolor)] bg-white hover:bg-gray-200/30 p-1 rounded-full z-0">
                <AiOutlineShareAlt />
              </div>
              <div
                className="cursor-pointer border border-[var(--primarytextcolor)] bg-white hover:bg-gray-200/30 p-1 rounded-full z-0"
                onClick={() => setIsMenu(true)}
              >
                <IoIosMore />
              </div>

              {isMenu && (
                <div
                  className="absolute right-9 -top-11 bg-white z-30"
                  onMouseEnter={() => {
                    setIsMenu(true);
                  }}
                  onMouseLeave={() => {
                    setIsMenu(false);
                  }}
                >
                  <div className="relative w-full h-fit bg-white p-2 shadow rounded">
                    <div className="w-4 h-4 shadow bg-slate-100 absolute -right-1 top-[45%] rotate-45 -z-10"></div>
                    <div
                      className="px-3 py-1 hover:bg-gray-200/20 rounded cursor-pointer transition"
                      onClick={handleGigDetails}
                    >
                      Details
                    </div>
                    <div
                      className="px-3 py-1 hover:bg-gray-200/20 rounded cursor-pointer transition"
                      onClick={handleGigEdit}
                    >
                      Edit
                    </div>
                    <div
                      className="px-3 py-1 hover:bg-gray-200/20 rounded cursor-pointer transition"
                      onClick={() => handleDelete("modal")}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              )}
            </div>
          }
        </div>
      </div>
      {isModal && (
        <UniversalModal isModal={isModal} setIsModal={setIsModal}>
          <div className="flex flex-col justify-between h-full w-full">
            <div>
              <h4 className="text-3xl font-semibold text-center">
                Are you wish to proceed?
              </h4>
              <p className="mt-3 text-gray-600 text-center">
                Deleting this gig is an irreversible action. I would like to
                implement a standard naming convention.
              </p>
            </div>
            <div className="flex gap-5 font-semibold mt-auto w-full">
              <button
                onClick={() => {
                  setIsModal(false);
                }}
                className="w-full px-5 py-1 border-2 border-green-500 hover:text-white hover:bg-green-500 bg-green-100 rounded-md transition"
                disabled={isLoading}
              >
                No, Keep it.
              </button>
              <button
                onClick={() => handleDelete("delete")}
                disabled={isLoading}
                className="w-full px-5 py-1 justify-center bg-green-500 hover:bg-green-600 transition rounded-md text-white disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <BtnSpinner />
                    <span className="ml-2">Deleting</span>
                  </>
                ) : (
                  "Yes, Delete!"
                )}
              </button>
            </div>
          </div>
        </UniversalModal>
      )}
    </>
  );
};

export default SingleGig;
