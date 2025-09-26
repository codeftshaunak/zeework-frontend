const HorizontalCardSkeleton = ({ className } : { className?: string}) => {
  return (
    <div
      className={`w-full bg-white p-5 sm:px-7 rounded-xl border border-[var(--bordersecondary)] ${className}`}
    >
      <div className="rounded w-full mx-auto">
        <div className="animate-pulse">
          <div className="rounded bg-slate-300 h-5 w-full"></div>
          <div className="flex-1 space-y-4 py-1 mt-2 w-full">
            <div className="h-3 bg-slate-300 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-300 rounded col-span-2"></div>
              <div className="h-3 bg-slate-300 rounded col-span-1"></div>
              <div className="h-3 bg-slate-300 rounded col-span-2"></div>
              <div className="h-3 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="h-3 bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardSkeleton;
