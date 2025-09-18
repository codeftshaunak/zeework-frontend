import JobDetails from "../../../components/JobDetails/JobDetails";

interface JobDetailsPageProps {
  params: {
    id: string;
  };
}

export default function JobDetailsPage({ params }: JobDetailsPageProps) {
  return <JobDetails jobId={params.id} />;
}