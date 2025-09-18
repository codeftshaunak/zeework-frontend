const UserCardSkeleton = () => {
  return (
    <div className="p-6 w-full h-full">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 justify-center">
          <div className="rounded-full bg-slate-300 h-[90px] w-[90px] m-auto"></div>
          <div className="h-3 bg-slate-300 rounded"></div>
          <div className="h-2 bg-slate-300 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-slate-300 rounded col-span-2"></div>
              <div className="h-3 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="h-8 bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCardSkeleton;
