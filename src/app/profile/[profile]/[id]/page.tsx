import UserProfile from "../../../../components/Profile";

interface ProfilePageProps {
  params: {
    profile: string;
    id: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return <UserProfile  />;
}