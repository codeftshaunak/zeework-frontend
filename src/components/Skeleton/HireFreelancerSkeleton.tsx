const HireFreelancerSkeleton = () => {
  return (
    <section className="w-[80%] animate-pulse">
      <div className="border rounded-xl mt-4  px-10 py-6 bg-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-300"></div>
          <div className="space-y-2">
            <div className="h-5 w-40 bg-gray-300 rounded"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="border rounded-xl mt-4 px-10 py-6 bg-white">
        <div className="h-6 w-32 bg-gray-300 rounded mb-6"></div>

        <div className="space-y-6">
          <div>
            <div className="h-5 w-40 bg-gray-300 rounded mb-2"></div>
            <div className="h-10 w-full max-w-2xl bg-gray-200 rounded"></div>
          </div>

          <div>
            <div className="h-5 w-40 bg-gray-300 rounded mb-2"></div>
            <div className="h-10 w-full max-w-2xl bg-gray-200 rounded"></div>
          </div>

          <div>
            <div className="h-5 w-40 bg-gray-300 rounded mb-2"></div>
            <div className="h-10 w-full max-w-2xl bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="border  rounded-xl mt-4 px-10 py-6 bg-white">
        <div className="h-6 w-40 bg-gray-300 rounded mb-6"></div>

        <div className="grid grid-cols-2 max-w-2xl gap-5">
          {[1, 2].map((_, i) => (
            <div key={i} className="border-2 rounded-md p-4">
              <div className="flex justify-between mb-3">
                <div className="h-5 w-16 bg-gray-300 rounded"></div>
                <div className="h-5 w-5 rounded-full bg-gray-300"></div>
              </div>
              <div className="h-6 w-6 bg-gray-300 mb-4"></div>
              <div className="h-6 w-32 bg-gray-300 mb-2"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-xl mt-4  px-10 py-6 bg-white">
        <div className="h-5 w-full bg-gray-200 rounded mb-6"></div>

        <div className="flex justify-end gap-10">
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    </section>
  );
};

export default HireFreelancerSkeleton;
