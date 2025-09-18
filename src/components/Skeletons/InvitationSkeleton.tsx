const InvitationSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-5 items-start">
      <div className="lg:col-span-2">
        <div className="animate-pulse bg-white rounded-xl h-60 p-8 border border-[var(--bordersecondary)]">
          <div className="h-6 bg-slate-200 rounded-lg w-2/3 mb-10"></div>
          <div className="h-7 bg-slate-200 rounded-lg mb-4 mt-1"></div>
          <div className="h-10 bg-slate-200 rounded-lg mb-4"></div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="animate-pulse p-8 border border-[var(--bordersecondary)] rounded-xl bg-white tracking-wide h-[392px]">
          <div className="h-2 bg-slate-200 rounded-lg w-2/3 mb-4"></div>
          <div className="h-10 bg-slate-200 rounded-lg mb-4 mt-1"></div>
          <div className="h-10 bg-slate-200 rounded-lg mb-4"></div>
          <div className="h-6 bg-slate-200 rounded-lg w-2/3 mb-4 mt-14"></div>
          <div className="h-6 bg-slate-200 rounded-lg w-1/2 mb-4"></div>
          <div className="h-6 bg-slate-200 rounded-lg w-1/4 mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default InvitationSkeleton;
