import GithubCard from "./GithubCard";
import StackOverflowCard from "./StackOverflowCard";

const ProfilesCard = ({ data, isPublic }) => {
  const { accountType } = data;
  return (
    <>
      {accountType === "github" && (
        <GithubCard data={data} isPublic={isPublic} />
      )}
      {accountType === "stackoverflow" && (
        <StackOverflowCard data={data} isPublic={isPublic} />
      )}
    </>
  );
};

export default ProfilesCard;
