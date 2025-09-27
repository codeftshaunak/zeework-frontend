import { format } from 'date-fns';
import { useSelector } from "react-redux";
import Image from 'next/image';

const Greetings = () => {
    const profile = useSelector((state: any) => state.profile.profile);
    const todaysDate = format(new Date(), "eeee, MMMM do");
    const { firstName } = profile || [];

    const getGreetingMsg = () => {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            return "🔆  Good Morning, " + firstName;
        } else if (currentHour >= 12 && currentHour < 18) {
            return "🌞  Good Afternoon, " + firstName;
        } else {
            return `🌙  Good Evening, ` + firstName;
        }
    };
    return (
        <div>
            <div className="bg-gradient-to-br from-[#1EAE53] to-[#51E186] w-full h-[150px] rounded-2xl mb-4 flex justify-between">
                <div className="flex-1 flex flex-col justify-center">
                    <div className="sm:pl-8 text-center sm:text-start">
                        <button className="px-4 py-1 h-9 rounded-3xl text-white italic font-medium bg-[#508765]/[0.5] border border-[#A7D0B6]">
                            {todaysDate}
                        </button>
                        <h1 className="text-white text-xl font-medium mt-2">
                            {getGreetingMsg()}
                        </h1>
                    </div>
                </div>
                <div className="relative flex-1 hidden sm:block">
                    <Image
                        src="/images/dashboard/zeework_banner-bg.png"
                        alt=""
                        className="absolute h-full z-[0] bottom-0 top-0 sm:right-6 lg:right-12"
                        width={200}
                        height={150}
                    />
                    <Image
                        src="/images/dashboard/banner-cards.png"
                        alt=""
                        className="absolute h-full z-1 bottom-0 right-2"
                        width={150}
                        height={150}
                    />
                </div>
            </div>
        </div>
    )
}

export default Greetings
