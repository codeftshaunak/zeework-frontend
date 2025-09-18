import DreamsInto from "./DreamsInto/DreamsInto";
import Faqs from "./Faqs/Faqs";
import Findtalent from "./Findtalent/Findtalent";
import GuaranteedWork from "./GuaranteedWork/GuaranteedWork";
import HeroSection from "./HeroSection/HeroSection";
import MoreCategories from "./MoreCategories/MoreCategories";
import ReviewSection from "./ReviewSection/ReviewSection";
import WorkteamsSection from "./WorkteamsSection/WorkteamsSection";
import { useEffect, useState, useRef } from "react";

function useIsVisible(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}

const HomeComponent = () => {
  const ref1 = useRef();
  const isVisible1 = useIsVisible(ref1);

  const ref2 = useRef();
  const isVisible2 = useIsVisible(ref2);

  const ref3 = useRef();
  const isVisible3 = useIsVisible(ref3);

  const ref4 = useRef();
  const isVisible4 = useIsVisible(ref4);

  const ref5 = useRef();
  const isVisible5 = useIsVisible(ref5);

  const ref6 = useRef();
  const isVisible6 = useIsVisible(ref6);

  return (
    <div className="mt-0 m-auto overflow-hidden bg-white text-[#575757] ">
      <div
        ref={ref1}
        className={`transition-opacity ease-in duration-700 ${
          isVisible1 ? "opacity-100" : "opacity-0"
        } bg-[#fafafa] py-10 z-50 md:h-full flex items-center`}
      >
        <HeroSection />
      </div>
      <div
        ref={ref2}
        className={`transition-opacity ease-in duration-700 ${
          isVisible2 ? "opacity-100" : "opacity-0"
        } relative sm:pt-16 overflow-hidden z-10`}
      >
        <img
          className="absolute left-[calc(50%-362px)] -z-10 max-sm:hidden"
          src={"./images/Illustration.svg"}
        />
        <img
          className="absolute left-12 lg:left-[calc(50%-520px)]  2xl:top-[calc(50%-280px)] top-20 -z-10 max-sm:hidden"
          src={"./images/TeamsSectionImg1.svg"}
        />
        <img
          className="absolute left-0 -top-[300px] max-lg:hidden"
          src={"./images/LeftBadgeBg.svg"}
        />
        <img
          className="absolute right-0 -top-[350px] max-lg:hidden"
          src={"./images/RightBadgeBg.svg"}
        />
        <WorkteamsSection />
      </div>
      <div
        ref={ref3}
        className={`transition-opacity ease-in duration-700 ${
          isVisible3 ? "opacity-100" : "opacity-0"
        } py-8 my-4 z-0`}
      >
        <Findtalent />
      </div>
      <div
        ref={ref4}
        className={`transition-opacity ease-in duration-700 ${
          isVisible4 ? "opacity-100" : "opacity-0"
        } bg-[#16A34A]/[.12] relative z-10`}
      >
        <div className="bg-[#22C55E]/20 rounded-full h-[175px] w-[175px] absolute left-[-114px] -top-[35px]"></div>
        <GuaranteedWork />
      </div>
      <div
        ref={ref5}
        className={`transition-opacity ease-in duration-700 ${
          isVisible5 ? "opacity-100" : "opacity-0"
        } z-50`}
      >
        <MoreCategories />
      </div>
      <div
        ref={ref6}
        className={`transition-opacity ease-in duration-700 ${
          isVisible6 ? "opacity-100" : "opacity-0"
        } z-50`}
      >
        <DreamsInto />
      </div>
      <div className="z-50">
        <ReviewSection />
      </div>
      <div className="z-50">
        <Faqs />
      </div>
    </div>
  );
};

export default HomeComponent;
