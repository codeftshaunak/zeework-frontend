"use client";

import DreamsInto from "./DreamsInto/DreamsInto";
import Faqs from "./Faqs/Faqs";
import Findtalent from "./Findtalent/Findtalent";
import GuaranteedWork from "./GuaranteedWork/GuaranteedWork";
import { Header } from "../Header";
import HeroSection from "./HeroSection/HeroSection";
import MoreCategories from "./MoreCategories/MoreCategories";
import ReviewSection from "./ReviewSection/ReviewSection";
import WorkteamsSection from "./WorkteamsSection/WorkteamsSection";
import { useEffect, useState, useRef } from "react";

function useIsVisible(ref: React.RefObject<HTMLDivElement | null>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}

const HomeComponent = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const isVisible1 = useIsVisible(ref1);

  const ref2 = useRef<HTMLDivElement>(null);
  const isVisible2 = useIsVisible(ref2);

  const ref3 = useRef<HTMLDivElement>(null);
  const isVisible3 = useIsVisible(ref3);

  const ref4 = useRef<HTMLDivElement>(null);
  const isVisible4 = useIsVisible(ref4);

  const ref5 = useRef<HTMLDivElement>(null);
  const isVisible5 = useIsVisible(ref5);

  const ref6 = useRef<HTMLDivElement>(null);
  const isVisible6 = useIsVisible(ref6);

  return (
    <div className="min-h-screen bg-white text-gray-700 overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div
        ref={ref1}
        className={`transition-all ease-in-out duration-1000 transform ${
          isVisible1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } bg-gradient-to-br from-white via-gray-50 to-green-50/30`}
      >
        <HeroSection />
      </div>

      {/* Workteams Section */}
      <div
        ref={ref2}
        className={`transition-all ease-in-out duration-1000 transform ${
          isVisible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } relative bg-white`}
      >
        {/* Subtle background decorations */}
        <div className="absolute inset-0 opacity-30">
          <img
            className="absolute left-[calc(50%-362px)] -z-10 max-sm:hidden opacity-50"
            src="./images/Illustration.svg"
            alt="Decoration"
          />
          <img
            className="absolute left-12 lg:left-[calc(50%-520px)] 2xl:top-[calc(50%-280px)] top-20 -z-10 max-sm:hidden opacity-40"
            src="./images/TeamsSectionImg1.svg"
            alt="Teams decoration"
          />
        </div>
        <WorkteamsSection />
      </div>

      {/* Find Talent Section */}
      <div
        ref={ref3}
        className={`transition-all ease-in-out duration-1000 transform ${
          isVisible3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } bg-gray-50/50`}
      >
        <Findtalent />
      </div>

      {/* Guaranteed Work Section */}
      <div
        ref={ref4}
        className={`transition-all ease-in-out duration-1000 transform ${
          isVisible4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } bg-gradient-to-br from-green-50 to-emerald-50 relative`}
      >
        {/* Modern decoration */}
        <div className="absolute left-0 top-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-3xl"></div>
        <GuaranteedWork />
      </div>

      {/* More Categories Section */}
      <div
        ref={ref5}
        className={`transition-all ease-in-out duration-1000 transform ${
          isVisible5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } bg-white`}
      >
        <MoreCategories />
      </div>

      {/* Dreams Into Section */}
      <div
        ref={ref6}
        className={`transition-all ease-in-out duration-1000 transform ${
          isVisible6 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } bg-gradient-to-br from-blue-50 to-purple-50`}
      >
        <DreamsInto />
      </div>

      {/* Review Section */}
      <div className="bg-white">
        <ReviewSection />
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50">
        <Faqs />
      </div>
    </div>
  );
};

export default HomeComponent;
