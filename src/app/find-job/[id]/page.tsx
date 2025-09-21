import JobDetails from "../../../components/JobDetails/JobDetails";
import HomeLayout from "../../../components/Layouts/HomeLayout";

interface JobDetailsPageProps {
  params: {
    id: string;
  };
}

export default function JobDetailsPage({ params }: JobDetailsPageProps) {
  return (
    <HomeLayout>
      <JobDetails />
    </HomeLayout>
  );
}