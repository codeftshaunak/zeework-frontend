/* eslint-disable react/no-children-prop */
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { IoMdTrendingUp } from "react-icons/io";
import { Sparkles, ArrowRight } from "lucide-react";

interface HeroBadgeProps {
  title: string;
}

const HeroBadge = ({ title }: HeroBadgeProps) => {
  return (
    <div className="inline-flex items-center h-10 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 bg-white border border-gray-200 rounded-full shadow-sm cursor-pointer hover:bg-gray-50 hover:shadow-md group">
      <span className="text-gray-700 transition-colors group-hover:text-gray-900">
        {title}
      </span>
      <div className="p-1 ml-2 transition-colors bg-gray-900 rounded-md group-hover:bg-green-600">
        <IoMdTrendingUp className="text-xs text-white" />
      </div>
    </div>
  );
};

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="relative py-20">
      <div className="container px-4 mx-auto lg:px-8 max-w-7xl">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 -z-10" />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-800 bg-green-100 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span>World&apos;s Fastest Growing Platform</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-gray-900 lg:text-6xl xl:text-7xl">
                Welcome to the{" "}
                <span className="text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text">
                  Future
                </span>{" "}
                of Freelancing
              </h1>

              <p className="max-w-2xl text-xl leading-relaxed text-gray-600 lg:text-2xl">
                Connect with world-class talent or find your dream project.
                <br className="hidden lg:block" />
                <span className="font-semibold text-gray-800">
                  Right here. Right now.
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => router.push("/signup")}
                className="inline-flex items-center justify-center h-12 px-10 text-base font-medium text-white transition-all duration-300 rounded-lg shadow-lg group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-xl whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Become a Freelancer
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => router.push("/signup")}
                className="inline-flex items-center justify-center h-12 px-10 text-base font-medium text-green-600 transition-all duration-300 border-2 border-green-500 rounded-lg group hover:bg-green-500 hover:text-white whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Hire Talent
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Trending Services */}
            <div className="pt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent" />
                <span className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                  Trending Services
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-green-500 to-transparent" />
              </div>

              <div className="flex flex-wrap gap-3">
                <HeroBadge title="UI/UX Design" />
                <HeroBadge title="Web Development" />
                <HeroBadge title="Mobile Apps" />
                <HeroBadge title="AI & ML" />
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="images/hero_right.svg"
                alt="Freelance Platform"
                className="w-full h-auto max-w-lg mx-auto"
              />
            </div>

            {/* Floating elements */}
            <div className="absolute w-20 h-20 bg-green-200 rounded-full top-10 right-10 opacity-20 animate-pulse" />
            <div className="absolute w-16 h-16 delay-1000 bg-blue-200 rounded-full bottom-20 left-5 opacity-30 animate-pulse" />
            <div className="absolute w-12 h-12 delay-500 bg-purple-200 rounded-full opacity-25 top-1/2 right-5 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
