const GigDetailsSkeleton = ({ isClient }) => {
  return (
    <div className="lg:grid grid-cols-3 mt-3 lg:gap-5">
      <div className="col-span-2">
        <div className="animate-pulse p-5">
          <div className="h-6 bg-slate-200 rounded-lg w-2/3 mb-4"></div>
          <div className="h-60 md:h-[600px] bg-slate-200 rounded-lg mb-4"></div>
          <div className="h-32 mt-10 bg-slate-200 rounded-lg w-full mb-4"></div>
        </div>
      </div>

      <div className="col-span-1">
        <div className="animate-pulse border rounded-lg px-10 py-5 h-fit mt-[3.9rem] bg-green-200 tracking-wide">
          <div className="h-6 bg-slate-200 rounded-lg w-2/3 mb-4"></div>
          <div className="h-6 bg-slate-200 rounded-lg w-1/2 mb-4"></div>
          <div className="h-6 bg-slate-200 rounded-lg w-1/4 mb-4"></div>
          <div className="h-6 bg-slate-200 rounded-lg w-1/3 mb-4"></div>
          <div className="h-6 bg-slate-200 rounded-lg w-1/2 mb-4"></div>
          <div className="h-6 bg-slate-200 rounded-lg w-1/4 mb-4"></div>
        </div>
        {isClient && (
          <div className="animate-pulse border rounded-lg px-10 py-5 mt-10 bg-slate-50">
            <div className="h-6 bg-slate-200 rounded-lg w-2/3 mb-4"></div>
            <div className="h-16 bg-slate-200 rounded-lg mb-4"></div>
            <div className="h-6 bg-slate-200 rounded-lg w-1/2 mb-4"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GigDetailsSkeleton;
