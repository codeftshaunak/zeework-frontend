const MoreCategoriesCard = ({ image, title }) => (
  <div className="rounded-[20px] h-[124px] w-[250px] flex justify-center items-center border max-md:rounded-[40px] max-md:w-full relative overflow-hidden hover:scale-110 transition-all duration-500">
    <img alt=""
      className="absolute w-full h-full object-fill z-10 brightness-50"
      src={image}
    />
    <h5 className="font-poppins font-semibold text-xl text-white z-20 hover:animate-bounce cursor-pointer">
      {title}
    </h5>
  </div>
);

const MoreCategories = () => {
  const cardData = [
    {
      title: "Graphic & Design",
      image: "./images/CatagorySectionImg1.png",
    },
    {
      title: "Cartoon Animation",
      image: "./images/CatagorySectionImg2.png",
    },
    {
      title: "Illustration",
      image: "./images/CatagorySectionImg3.png",
    },
    {
      title: "Flyers & Vouchers",
      image: "./images/CatagorySectionImg4.png",
    },
    {
      title: "Logo Design",
      image: "./images/CatagorySectionImg5.png",
    },
    {
      title: "Social graphics",
      image: "./images/CatagorySectionImg6.png",
    },
    {
      title: "Article writing",
      image: "./images/CatagorySectionImg7.png",
    },
    {
      title: "Video Editing",
      image: "./images/CatagorySectionImg8.png",
    },
  ];

  return (
    <section className="relative md:w-[85%] w-[90%] max-w-[1400px] mx-auto pt-16">
      <h2 className=" font-geist-extra text-[30px] md:text-4xl text-center xl:text-left sm:text-center">
        Looking For Something?
      </h2>
      <div className="flex items-center flex-col w-full">
        <div className="flex md:justify-between justify-center items-center flex-wrap gap-8 py-20 max-[425px]:py-10">
          {cardData.map((item, index) => (
            <MoreCategoriesCard
              key={index}
              title={item.title}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreCategories;
