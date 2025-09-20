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
    <div className="inline-flex items-center border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm px-4 py-2 h-10 text-sm font-medium hover:shadow-md transition-all duration-300 cursor-pointer rounded-full group">
      <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
        {title}
      </span>
      <div className="ml-2 p-1 bg-gray-900 rounded-md group-hover:bg-green-600 transition-colors">
        <IoMdTrendingUp className="text-white text-xs" />
      </div>
    </div>
  );
};

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 opacity-50 -z-10" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>World's Fastest Growing Platform</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900">
                Welcome to the{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Future
                </span>{" "}
                of Freelancing
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Connect with world-class talent or find your dream project.
                <br className="hidden lg:block" />
                <span className="font-semibold text-gray-800">Right here. Right now.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/signup")}
                className="group h-12 rounded-lg px-10 text-base bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Become a Freelancer
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => router.push("/signup")}
                className="group h-12 rounded-lg px-10 text-base border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Hire Talent
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Trending Services */}
            <div className="space-y-4 pt-8">
              <div className="flex items-center gap-3">
                <div className="h-px bg-gradient-to-r from-green-500 to-transparent flex-1" />
                <span className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
                  Trending Services
                </span>
                <div className="h-px bg-gradient-to-l from-green-500 to-transparent flex-1" />
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
            <div className="absolute top-10 right-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse" />
            <div className="absolute bottom-20 left-5 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-pulse delay-1000" />
            <div className="absolute top-1/2 right-5 w-12 h-12 bg-purple-200 rounded-full opacity-25 animate-pulse delay-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
