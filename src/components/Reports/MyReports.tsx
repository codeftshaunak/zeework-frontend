import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { Link } from "next/navigation";

const MyReports = () => {
  return (
    <>
      <div className="my-8">
        <h2 className="text-xl font-semibold text-[#374151]">My Reports</h2>
      </div>
      <div className="space-y-6">
        <div className="border flex justify-between rounded-lg p-4">
          <div>
            <Link
              to="#"
              className="text-fg-brand text-sm font-medium hover:underline"
            >
              Weekly summary
            </Link>
            <p className="text-[#9CA3AF] text-sm font-normal">current Week</p>
          </div>
          <div className="">
            <HiOutlineDocumentChartBar className="w-12 h-12 border rounded-full p-2 text-fg-brand" />
          </div>
        </div>
        <div className="border rounded-lg p-10"></div>
      </div>
    </>
  );
};

export default MyReports;
