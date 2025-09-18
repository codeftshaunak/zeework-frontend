import Marketing from "./Marketing";
import PeopleLoved from "./PeopleLoved";
import Random from "./Random";
import Technology from "./Technology";

const RecommendedGigs = () => {
  return (
    <div className="space-y-12 mt-10 w-full">
      <PeopleLoved />
      <Marketing />
      <Technology />
      <Random />
    </div>
  );
};

export default RecommendedGigs;
