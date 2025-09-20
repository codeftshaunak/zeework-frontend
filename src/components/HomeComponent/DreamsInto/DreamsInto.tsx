import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const DreamsInto = () => {
  const router = useRouter();
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-green-700 shadow-xl">

          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-6 left-6 w-8 h-8 bg-white rounded-full"></div>
            <div className="absolute top-6 right-12 w-6 h-6 bg-white rounded-full"></div>
            <div className="absolute bottom-6 left-12 w-10 h-10 bg-white rounded-full"></div>
            <div className="absolute bottom-6 right-6 w-7 h-7 bg-white rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 py-12 md:px-12 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">

              {/* Left content */}
              <div>
                <h2 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl leading-tight mb-4">
                  Crafting Your Digital Dreams into Reality
                </h2>
                <p className="text-white/90 text-base md:text-lg font-medium mb-6">
                  Connect with world-class talent and transform your vision into exceptional results.
                </p>
              </div>

              {/* Right content - CTA */}
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <button
                  onClick={() => router.push("/signup")}
                  className="group inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-gray-50 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  onClick={() => router.push("/signup")}
                  className="group inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamsInto;
