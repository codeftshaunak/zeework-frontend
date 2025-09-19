import React from "react";

import { useRouter } from "next/navigation";
import GigCardSkeleton from "../../Skeletons/GigCardSkeleton";

const GigCards = ({ gigs, isLoading }) => {
  const router = useRouter();

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full">
          {[1, 2, 3].map((i) => (
            <GigCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full">
          {gigs?.map((gig, index) => (
            <div key={index}>
              <div
                className="rounded-lg h-[350px] shadow p-4 border bg-white flex flex-col justify-between w-full cursor-pointer"
                onClick={() =>
                  router.push(`/gig-details/${gig._id}`, {
                    state: { status: gig.status },
                  })
                }
              >
                <img
                  className="w-full h-40 object-cover rounded"
                  src={gig?.images?.[0]}
                  alt="gig img"
                />
                <div className="pt-4 border-t">
                  <div className="flex items-center">
                    <img
                      src={gig?.user_details?.profile_image}
                      alt="user"
                      className="inline-block w-8 h-8 border border-gray-200 rounded-full shadow-md object-cover cursor-pointer mb-3 border-solid"
                    />
                    <p className="font-semibold text-md ml-2 mb-2">
                      {gig?.user_details?.firstName +
                        " " +
                        gig?.user_details?.lastName.slice(0, 1) +
                        "."}
                    </p>
                  </div>
                  <div className="text-left text-md">
                    <Tooltip
                      hasArrow
                      label={gig.title}
                      placement="top"
                    >
                      {gig.title?.length > 50
                        ? `I will  ${gig?.title?.slice(0, 50)}..`
                        : `I will  ${gig.title}`}
                    </Tooltip>
                  </div>
                  <div className="flex flex-col justify-start items-start mt-2">
                    <p className="text-gray-700 text-sm">
                      Delivery time - Est. {gig?.pricing?.delivery_days} days
                    </p>
                    <p className="font-semibold text-md items-center">
                      From ${gig?.pricing?.service_price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GigCards;
