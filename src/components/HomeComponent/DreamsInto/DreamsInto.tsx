/* eslint-disable react/no-children-prop */
import { useNavigate } from "next/navigation";
import { CommonButton } from "../../utils/Buttons/Buttons";

const DreamsInto = () => {
  const router = useRouter();
  return (
    <section className="md:w-[85%] w-[90%] max-w-[1200px] mb-16 mx-[auto]">
      <div className="w-full mx-[auto] h-[292px] rounded-xl relative bg-primary z-10 flex items-center px-16  max-[425px]:px-8">
        <img
          className="absolute top-0 left-0 z-10 opacity-20 max-xl:hidden"
          src={"images/DreamSectionImg1.svg"}
          alt=""
        />
        <img
          className="absolute top-0 left-[320px] z-10 opacity-20 max-xl:hidden"
          src={"images/DreamSectionImg2.svg"}
          alt=""
        />
        <img
          className="absolute top-0 right-0 z-10 opacity-40 max-[520px]:hidden"
          src={"images/DreamSectionImg3.svg"}
          alt=""
        />
        <img
          className="absolute top-0 right-[7.5%] z-10 max-[520px]:hidden"
          src={"images/DreamSectionImg4.png"}
          alt=""
        />
        <div className="w-full flex flex-col z-20">
          <h1 className="text-white font-cabinet-bold lg:text-[2rem] capitalize text-[1.2rem] max-[425px]:text-[1.6rem]  max-[425px]:leading-8 max-[425px]:text-center">
            Crafting Your Digital Dreams into Reality.
          </h1>
          <p className="text-white lg:text-[1.3rem] font-bold my-4 font-cabinet-normal opacity-80 mb-8  max-[425px]:text-[1.3rem] max-[425px]:text-center">
            You can have the best people. Right now. Right here.
          </p>
          <div>
            <CommonButton
              children={"Join Us"}
              onClick={() => router.push("/signup")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamsInto;
