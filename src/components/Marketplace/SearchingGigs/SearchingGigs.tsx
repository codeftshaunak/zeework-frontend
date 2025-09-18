import GigCardSkeleton from "../../Skeletons/GigCardSkeleton";
import GigCards from "../GigCards/GigCards";

const SearchingGigs = ({ gigs, isLoading, headText = "Searching Gigs" }) => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-medium md:text-left">{headText}</h1>
      <div className="py-4">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full">
            {[1, 2, 3].map((i) => (
              <GigCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <GigCards
            gigs={gigs.gigs}
            isLoading={isLoading}
            // currentPage={currentPage}
            // totalPages={totalPages}
            // onPageChange={(page) => setCurrentPage(page)}
          />
        )}
        {!isLoading && !gigs?.gigs?.length && (
          <p className="rounded-lg shadow p-4 border bg-white text-center">
            No gigs found matching the search criteria
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchingGigs;
