const SingleGigSkeleton = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-end sm:items-center justify-between gap-2 sm:gap-16 bg-white px-5 py-3 rounded-md animate-pulse">
      <div className="flex gap-3 items-center">
        <div className="h-16 w-28 bg-slate-200 rounded"></div>
        <div>
          {/* <div className="h-5 w-48 bg-slate-200 rounded mb-2"></div> */}
          <div className="h-5 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
      <div className="relative flex items-center gap-3">
        <div className="h-7 w-7 bg-slate-200 rounded-full"></div>
        <div className="h-7 w-7 bg-slate-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default SingleGigSkeleton;
