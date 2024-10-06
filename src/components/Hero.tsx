import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section className="mt-11  px-2 md:px-16  ml-2.5 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col items-start self-stretch my-auto w-full font-semibold text-white max-md:mt-10 max-md:max-w-full">
            <h1 className="self-stretch text-7xl max-md:max-w-full max-md:text-4xl">
              Monetize fan calls with SOL{" "}
              <span className="text-green-500">platform</span>
            </h1>
            <button className="flex gap-1.5 p-2.5 mt-8 text-lg whitespace-nowrap bg-[#00B81B] rounded-sm">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/338136148abf309b60c980009faa7c19a148eb93e2a26d38dbbdc0fba231fcb0?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12"
                alt=""
                className="object-contain shrink-0 w-6 rounded-sm aspect-square"
              />

              <span>Watch</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="grow w-full relative aspect-[1.09] max-md:mt-10 max-md:max-w-full">
            <Image
              src="/hero-img.png"
              className="object-contain"
              fill
              alt="Hero illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
