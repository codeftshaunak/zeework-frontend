import { FaArrowRight } from "react-icons/fa6";


const WorkteamsCard = ({ image, title, subTitle, color }) => {
    return (
        <div className={`${color === "primary" ? 'bg-{#fafafa} border-badge-primary-border' : color === "secondary" ? 'bg-#fafafa border-badge-secondary-border' : 'bg-#fafafa border-badge-tertiary-border'} overflow-hidden relative border rounded-3xl px-[30px] py-[40px] w-full lg:w-[350px] lg:h-[300px]`}>
            <div className={`${color === "primary" ? 'bg-fg-badge-primary/10' : color === "secondary" ? 'bg-fg-badge-secondary/10' : 'bg-fg-badge-tertiary/10'} h-[162px] w-[162px] rounded-full absolute -top-[81px] right-14`}></div>
            <div className={`${color === "primary" ? 'bg-fg-badge-primary/10' : color === "secondary" ? 'bg-fg-badge-secondary/10' : 'bg-fg-badge-tertiary/10'} h-[134px] w-[134px] rounded-full absolute -bottom-[90px]`}></div>
            <div className={`${color === "primary" ? 'bg-badge-primary border-badge-primary-border' : color === "secondary" ? 'bg-badge-secondary border-badge-secondary-border' : 'bg-badge-tertiary border-badge-tertiary-border'} mb-5 border rounded-[12px] flex items-center justify-center z-50 h-[59px] w-[59px]`}>
                <img src={image} />
            </div>
            <div className="flex flex-col gap-3">
                <h1 className="text-[25px] font-semibold">{title}</h1>
                <p className="text-[16px] text-[#141414]">{subTitle}</p>
            </div>
            <div className="flex gap-4 items-center lg:absolute bottom-6">
                <p className="text-[16px] font-semibold text-[#141414]">Learn More</p>
                <div className={`rounded-full p-1 ${color === "primary" ? 'bg-fg-badge-primary/80' : color === "secondary" ? 'bg-fg-badge-secondary/80' : 'bg-fg-badge-tertiary/80'}`}>
                    <FaArrowRight className="text-white" fontSize={'0.8rem'} />
                </div>
            </div>
        </div>
    )
}

const WorkteamsSection = () => {
    return (
        <section className="mt-16 w-[90%] mx-auto">
            <div className="w-[100%] mx-[auto]">
                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className="font-black text-[38px] leading-10 font-cabinet-black"><span className="text-[34px] font-cabinet-extra ">Why Online </span><br /> Workteams?</h1>
                    <p className="text-[18px] text-[var(--primarytext)] opacity-80 font-cabinet-normal mt-5  max-[425px]:text-[0.9rem]  max-[425px]:font-geist-extra  max-[425px]:leading-5">You have the opportunity to enlist top-tier talent. Right at <br className="lg:block hidden" /> this moment. Right here with us.</p>
                </div>

                <div className="flex lg:flex-row flex-col justify-center lg:flex-wrap gap-[40px] py-[50px]">
                    <WorkteamsCard color={"primary"} image={"./icons/FlexibltyBadge.svg"} title={"Flexibility"} subTitle={"Ramp up and down, from short-term engagemennnts to full-time teams"} />
                    <WorkteamsCard color={"secondary"} image={"./icons/MoneyBadge.svg"} title={"Cost Saving"} subTitle={"Pay only for hours worked. Hourly rates fit any budget."} />
                    <WorkteamsCard image={"./icons/TalentBadge.svg"} title={"Access To Talent"} subTitle={"Hire the best from around the world."} />
                </div>
            </div>
        </section>
    );
};

export default WorkteamsSection;