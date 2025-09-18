/* eslint-disable react/no-children-prop */
import { useRouter } from "next/navigation";
import { MainButton, MainButtonTranparent } from "../../utils/Buttons/Buttons";
import { IoMdTrendingUp } from "react-icons/io";

const HeroBadge = ({ title }) => {
  return (
    <div className="bg-[#252525]/[6%] px-3 flex justify-center w-[150px] h-[40px] items-center rounded-full max-sm:w-full">
      <div className="w-full flex justify-around items-center">
        <div className="w-full">
          <h1 className="text-[13px] font-medium text-[#1A202C] mb-0">
            {title}
          </h1>
        </div>
        <div className="bg-[#1A202C] h-fit w-fit p-[5px] rounded-lg">
          <IoMdTrendingUp className="text-white text-[12px]" />
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="md:w-[80%] w-[90%] max-w-[1200px] mx-auto">
      <div className="w-full mx-[auto] flex justify-between 2xl:justify-around max-2xl:my-10">
        <div className="flex flex-col max-xl:items-center justify-center max-lg:mt-16 max-xl:m-auto">
          <div className="flex flex-col max-xl:items-center">
            <h1 className="z-20 2xl:text-[50px] text-[2.5rem] max-[425px]:text-[1.8rem] max-[425px]:leading-8 font-geist-extra font-[800] 2xl:leading-[70px] leading-[50px] max-xl:text-center">
              Welcome to the <br className="lg:block hidden" />
              World’s <span className="underlined">Fastest Growing</span> {""}
              <br className="lg:block hidden" />
              Freelance Platform.
            </h1>
            <p className="2xl:text-2xl text-lg font-poppins text-[#1A202] mt-6 max-xl:text-center max-[425px]:text-[1.1rem]  max-[425px]:font-geist-extra  max-[425px]:leading-6">
              Forget the old rules. You can have the best people.{" "}
              <br className="lg:block hidden" />
              Right here. Right now.
            </p>
            <div className="flex md:flex-row flex-col items-center gap-4 md:w-fit w-full my-8">
              <MainButton
                children={"Become a Freelancer"}
                onClick={() => router.push("/signup")}
              />
              <MainButtonTranparent
                children={"Hire a Freelancer"}
                onClick={() => router.push("/signup")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 max-sm:w-full">
            <p className="text-xl font-semibold font-poppins text-[#1A202] mt-6 xl:text-left sm:text-center">
              TRENDING SERVICES
            </p>
            <div className="flex gap-2 max-sm:flex-col max-sm:w-full flex-wrap  max-[425px]:gap-5">
              <HeroBadge title={"DESIGNER"} />
              <HeroBadge title={"DEVELOPER"} />
              <HeroBadge title={"WORDPRESS"} />
            </div>
          </div>
        </div>
        <div className="max-xl:hidden relative flex h-[550px]">
          <img src="images/hero_right.svg" className="" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
