import { FaArrowRight } from "react-icons/fa6";
import { Card, CardContent } from "../../ui/card";
import { ArrowRight, DollarSign, Users, Zap } from "lucide-react";

interface WorkteamsCardProps {
  image: string;
  title: string;
  subTitle: string;
  color?: string;
  icon?: React.ReactNode;
}

const iconMap = {
  "Flexibility": <Zap className="w-8 h-8" />,
  "Cost Saving": <DollarSign className="w-8 h-8" />,
  "Access To Talent": <Users className="w-8 h-8" />
};

const WorkteamsCard = ({ image, title, subTitle, color = "primary", icon }: WorkteamsCardProps) => {
    const gradientColors = {
      primary: "from-green-500 to-emerald-600",
      secondary: "from-blue-500 to-cyan-600",
      tertiary: "from-purple-500 to-violet-600"
    };

    const bgColors = {
      primary: "bg-green-50",
      secondary: "bg-blue-50",
      tertiary: "bg-purple-50"
    };

    return (
        <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-white relative overflow-hidden h-80">
            {/* Background decoration */}
            <div className={`absolute inset-0 ${bgColors[color]} opacity-50 transition-opacity group-hover:opacity-70`} />

            {/* Floating orbs */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${gradientColors[color]} rounded-full opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className={`absolute -bottom-16 -left-10 w-24 h-24 bg-gradient-to-br ${gradientColors[color]} rounded-full opacity-10 group-hover:opacity-20 transition-opacity`} />

            <CardContent className="p-8 relative z-10 h-full flex flex-col">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientColors[color]} text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {iconMap[title] || <img src={image} className="w-8 h-8" alt={title} />}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {subTitle}
                    </p>
                </div>

                {/* Learn More */}
                <div className="flex items-center gap-3 pt-4 group-hover:gap-4 transition-all cursor-pointer">
                    <span className="font-semibold text-gray-800 group-hover:text-gray-900">Learn More</span>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${gradientColors[color]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const WorkteamsSection = () => {
    return (
        <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
                {/* Header */}
                <div className="text-center space-y-6 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                        <Users className="w-4 h-4" />
                        <span>Why Choose Zeework?</span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                        Why Online{" "}
                        <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            Workteams?
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        You have the opportunity to enlist top-tier talent.{" "}
                        <span className="font-semibold text-gray-800">
                            Right at this moment. Right here with us.
                        </span>
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <WorkteamsCard
                        image="./icons/FlexibltyBadge.svg"
                        title="Flexibility"
                        subTitle="Ramp up and down, from short-term engagements to full-time teams"
                        color="primary"
                    />
                    <WorkteamsCard
                        image="./icons/MoneyBadge.svg"
                        title="Cost Saving"
                        subTitle="Pay only for hours worked. Hourly rates fit any budget."
                        color="secondary"
                    />
                    <WorkteamsCard
                        image="./icons/TalentBadge.svg"
                        title="Access To Talent"
                        subTitle="Hire the best from around the world."
                        color="tertiary"
                    />
                </div>
            </div>
        </section>
    );
};

export default WorkteamsSection;