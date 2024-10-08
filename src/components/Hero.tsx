import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section className="mt-11  px-2 md:px-16  ml-2.5 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col items-start self-stretch my-auto w-full font-semibold text-white max-md:mt-10 max-md:max-w-full">
            <h1 className="self-stretch text-7xl max-md:max-w-full max-md:text-4xl">
              Monetize fan calls with SOL
              <span className="text-green-500">platform</span>
            </h1>
            <button className="flex items-center gap-1.5 p-2.5 mt-8 text-lg whitespace-nowrap bg-[#00B81B] rounded-sm">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 0.5C8.9233 0.5 6.89323 1.11581 5.16652 2.26957C3.4398 3.42332 2.09399 5.0632 1.29927 6.98182C0.504549 8.90045 0.296614 11.0116 0.701759 13.0484C1.1069 15.0852 2.10693 16.9562 3.57538 18.4246C5.04384 19.8931 6.91476 20.8931 8.95156 21.2982C10.9884 21.7034 13.0996 21.4955 15.0182 20.7007C16.9368 19.906 18.5767 18.5602 19.7304 16.8335C20.8842 15.1068 21.5 13.0767 21.5 11C21.5 8.21523 20.3938 5.54451 18.4246 3.57538C16.4555 1.60625 13.7848 0.5 11 0.5ZM16.5853 11.6713L7.58526 16.1713C7.47088 16.2284 7.3438 16.2554 7.21607 16.2496C7.08835 16.2438 6.96422 16.2055 6.85548 16.1382C6.74674 16.0709 6.65701 15.977 6.59479 15.8653C6.53257 15.7536 6.49995 15.6279 6.50001 15.5V6.5C6.50007 6.37221 6.53279 6.24655 6.59506 6.13495C6.65733 6.02336 6.74708 5.92952 6.8558 5.86235C6.96452 5.79519 7.0886 5.75691 7.21626 5.75116C7.34392 5.74541 7.47094 5.77238 7.58526 5.8295L16.5853 10.3295C16.7097 10.3919 16.8143 10.4876 16.8874 10.606C16.9605 10.7244 16.9992 10.8608 16.9992 11C16.9992 11.1392 16.9605 11.2756 16.8874 11.394C16.8143 11.5124 16.7097 11.6081 16.5853 11.6705"
                  fill="white"
                />
              </svg>

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
