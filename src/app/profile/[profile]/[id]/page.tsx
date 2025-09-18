import Profile from "../../../../components/Profile";

interface ProfilePageProps {
  params: {
    profile: string;
    id: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return <Profile profileType={params.profile} profileId={params.id} />;
}