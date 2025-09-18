/* eslint-disable react/no-children-prop */
import { useRouter } from "next/navigation";
import { GreenButton } from "../../utils/Buttons/Buttons";

const Findtalent = () => {
  const router = useRouter();
  return (
    <section className="md:w-[85%] w-[90%] max-w-[1200px] mb-16 mx-[auto]">
      <div className="w-full">
        <div className="flex lg:gap-8 justify-between max-[440px]:h-[480px] max-[1439px]:items-center flex-col xl:flex-row w-full h-full max-md:overflow-hidden items-center">
          <div className=" max-lg:w-full max-2xl:flex-1 h-full 2xl:basis-[540px] max-md:relative max-md:overflow-hidden max-md:border max-md:rounded-[60px]">
            <img
              className="absolute min-[440px]:hidden w-full h-full brightness-75"
              src="images/TalentSectionImg3.png"
              alt=""
            />
            <img
              className="absolute max-[440px]:hidden md:hidden w-full h-full brightness-[.3]"
              src="images/TalentSectionImg1.png"
              alt=""
            />
            <div className="w-full max-xl:items-center flex flex-col gap-8 py-8 px-4 relative h-full justify-center">
              <img
                className="absolute z-10 top-[74px] max-xl:left-[calc(50%-140px)] left-[100px] max-md:hidden"
                src="./images/Underline.svg"
                alt=""
              />
              <img
                className="absolute z-10 left-[2%] -bottom-[7%] max-[1439px]:hidden"
                src={"./images/TalentEllipse.svg"}
              />
              <img
                className="absolute z-10 left-[25%] bottom-0 max-[1439px]:hidden"
                src={"./images/TalentCircle3.svg"}
              />
              <h1 className=" font-cabinet-normal md:text-[40px] text-[1.9rem] md:leading-[70px] md:text-left sm:text-center max-md:text-white max-[425px]:text-[1.2rem]  max-[425px]:font-geist-extra  max-[425px]:text-center">
                Find{" "}
                <span className="font-cabinet-black md:text-[50px] max-md:text-primary max-md:underline text-[2.5rem]">
                  talen<span className="z-20 sticky">t</span>
                </span>{" "}
                the right way.
              </h1>
              <p className="text-sm md:text-[20px] md:leading-7 opacity-80 font-cabinet-normal tracking-wider max-md:text-white max-xl:text-center z-10 max-[425px]:text-[1.3rem] max-[425px]:leading-6">
                Work with the largest network of independent professionals and
                get things done—from quick turnarounds to big transformations.
              </p>
              <div className="z-10">
                <GreenButton
                  children={"Hire a Freelancer"}
                  onClick={() => router.push("/signup")}
                />
              </div>
            </div>
          </div>
          <div className="w-full max-2xl:flex-1 xl:w-[755px] flex justify-center max-md:hidden relative">
            <img
              className="absolute z-10 -left-[5%] -bottom-[10%]"
              src={"./images/TalentCircle1.svg"}
            />
            <img
              className="absolute z-10 right-[calc(40.5%)] -bottom-[10%]"
              src={"./images/TalentCircle2.svg"}
            />
            <img
              className="absolute z-10 right-0 -bottom-[27.5%]"
              src={"./images/TalentEllipse2.svg"}
            />
            <div className="flex gap-8 h-full">
              <div className="flex gap-8 flex-col justify-between basis-[50%]">
                <div className="basis-[50%] rounded-[24px] border overflow-hidden relative z-50">
                  <div className="bg-gradient-to-br from-[#055020]/20 to-[#0A5D29] absolute top-0 left-0 right-0 bottom-0 opacity-40"></div>
                  <img
                    className="h-full w-full z-0"
                    src={"images/TalentSectionImg1.png"}
                  />
                </div>
                <div className="basis-[50%] rounded-[24px] border overflow-hidden relative z-50">
                  <div className="bg-gradient-to-l from-[#055020]/20 to-[#0A5D29] absolute top-0 left-0 right-0 bottom-0 opacity-40"></div>
                  <img
                    className="h-full w-full z-0"
                    src={"images/TalentSectionImg2.png"}
                  />
                </div>
              </div>
              <div className="h-full basis-[50%] rounded-[24px] border overflow-hidden relative z-50">
                <div className="bg-gradient-to-bl from-[#055020]/20 to-[#0A5D29] absolute top-0 left-0 right-0 bottom-0 opacity-40"></div>
                <img
                  className="h-full w-full z-0"
                  src={"images/TalentSectionImg3.png"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Findtalent;
