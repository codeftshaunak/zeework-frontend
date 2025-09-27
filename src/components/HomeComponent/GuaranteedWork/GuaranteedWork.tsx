import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

function GuaranteedWorkCard({ title, text }) {
  return (
    <div className="md:pl-12 px-6 py-3 sm:w-[370px] hover:bg-white bg-white/[.55] rounded-[8px] transition-colors duration-500 border shadow relative flex flex-col gap-2">
      <FaCheckCircle className="absolute text-primary text-lg text-[28px] left-4 top-5 max-md:hidden" />
      <h5 className="text-[16px] font-semibold md:text-[20px] text-[#1A202C] font-poppins p-0 m-0">
        {title}
      </h5>
      <p
        className="text-sm md:text-[16px] opacity-80 text-[#1A202C] font-poppins font-normal"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}

const GuaranteedWork = () => {
  const CardData = [
    {
      title: "See Work as it's Done",
      text: "Check in on your contractors as easily as if you were in the same office.",
    },
    {
      title: "Build a Team of Experts",
      text: "Select from a global talent pool of experts that will help you build business faster than ever.",
    },
    {
      title: "Eliminate Payroll Hassle",
      text: "We'll manage payment and invoicing for all your hires providing you with everything you need to work at ease.",
    },
  ];

  return (
    <section className="relative md:w-[85%] w-[90%] max-w-[1400px] mx-auto">
      <div className="flex justify-between gap-12 xl:flex-row flex-col lg:items-center py-12 w-full">
        <div className="flex flex-col gap-y-[20px] w-full max-2xl:flex-1 2xl:basis-[40%] items-center xl:items-start">
          <h1 className="font-geist-extra capitalize mb-5 font-bold text-3xl md:text-4xl md:w-[400px] sm:w-full text-center xl:text-left sm:text-center  max-[425px]:text-[1.6rem]  max-[425px]:leading-7 ">
            Guaranteed <span className="underlined">work.</span> <br />{" "}
            Guaranteed <span className="underlined">Payment.</span>
          </h1>
          <div className="w-full flex flex-col gap-4 m-auto xl:items-start items-center">
            {CardData.map((item, index) => (
              <GuaranteedWorkCard
                key={index}
                title={item.title}
                text={item.text}
              />
            ))}
          </div>
        </div>

        <div className="hidden xl:flex items-baseline">
          <Image
            className="object-contain w-[800px]"
            src="/images/gurentee_image.webp"
            alt="Guaranteed work"
            width={800}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};

export default GuaranteedWork;
