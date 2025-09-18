const ClientJobSkeleton = () => {
  return (
    <div className="flex items-center justify-between w-full max-[480px]:flex-col animate-pulse">
      <div className="flex flex-col justify-center cursor-pointer space-y-4">
        <div className="h-5 w-52 bg-slate-200 rounded"></div>
        <div className="flex flex-col space-y-1 text-sm">
          <div className="h-3 w-24 bg-slate-200 rounded mb-2"></div>
          <div className="h-3 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end space-y-4 max-[480px]:items-center mt-2 sm:mt-0">
        <div className="h-4 w-28 bg-slate-200 rounded"></div>
        <div className="flex flex-col space-y-2">
          <div className="h-8 w-40 bg-slate-200 rounded"></div>
          <div className="h-8 w-40 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ClientJobSkeleton;
