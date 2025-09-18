const JobCardSkeleton = () => {
  return (
    <div className="mt-4 flex h-max animate-pulse items-center rounded-xl border border-[#D1D5DA] bg-white py-3">
      <div className="w-full px-5 py-2.5 md:px-8 md:py-4">
        <div className="mb-2 h-6 w-2/3 rounded bg-slate-300 opacity-70"></div>
        <div className="my-5 hidden md:block">
          <div className="mb-1 h-4 w-full rounded bg-slate-300 opacity-70"></div>
          <div className="mb-1 h-4 w-5/6 rounded bg-slate-300 opacity-70"></div>
          <div className="mb-1 h-4 w-3/4 rounded bg-slate-300 opacity-70"></div>
          <div className="h-4 w-1/2 rounded bg-slate-300 opacity-70"></div>
        </div>
        <div className="my-5 hidden sm:block md:hidden">
          <div className="mb-1 h-4 w-full rounded bg-slate-300 opacity-70"></div>
          <div className="mb-1 h-4 w-5/6 rounded bg-slate-300 opacity-70"></div>
          <div className="mb-1 h-4 w-3/4 rounded bg-slate-300 opacity-70"></div>
          <div className="h-4 w-2/3 rounded bg-slate-300 opacity-70"></div>
        </div>
        <div className="mt-3 block sm:hidden">
          <div className="mb-1 h-4 w-full rounded bg-slate-300 opacity-70"></div>
          <div className="mb-1 h-4 w-5/6 rounded bg-slate-300 opacity-70"></div>
          <div className="h-4 w-2/3 rounded bg-slate-300 opacity-70"></div>
          <div className="mt-1 h-4 w-24 rounded bg-slate-300 opacity-70"></div>
        </div>
        <div className="mt-3 hidden md:block">
          <div className="flex flex-wrap gap-3">
            <div className="h-8 w-20 rounded bg-slate-300 opacity-70"></div>
            <div className="h-8 w-24 rounded bg-slate-300 opacity-70"></div>
            <div className="h-8 w-16 rounded bg-slate-300 opacity-70"></div>
          </div>
        </div>
        <div className="mt-3 block md:hidden">
          <div className="flex flex-wrap gap-3">
            <div className="h-8 w-20 rounded bg-slate-300 opacity-70"></div>
            <div className="h-8 w-24 rounded bg-slate-300 opacity-70"></div>
            <div className="h-8 w-16 rounded bg-slate-300 opacity-70"></div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-[#536179] md:gap-8">
          <div className="flex items-center gap-1">
            <div className="h-5 w-5 rounded-full bg-slate-300 opacity-70"></div>
            <div className="h-4 w-20 rounded bg-slate-300 opacity-70"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-6 rounded bg-slate-300 opacity-70"></div>
            <div className="h-4 w-6 rounded bg-slate-300 opacity-70"></div>
          </div>
          <div className="flex items-center gap-2 md:gap-8">
            <div className="flex items-center gap-1">
              <div className="h-5 w-5 rounded-full bg-slate-300 opacity-70"></div>
              <div className="h-4 w-16 rounded bg-slate-300 opacity-70"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-5 w-5 rounded-full bg-slate-300 opacity-70"></div>
              <div className="h-4 w-16 rounded bg-slate-300 opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;
