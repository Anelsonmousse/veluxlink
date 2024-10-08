"use client";
import Image from "next/image";
import { Hero, Header, FAQItem } from "@veluxlink/components";

const faqs = [
  {
    question: "What is Veluxlink?",

    answer:
      "Veluxlink is an innovative Web3 solution that empowers users to monetize their time by setting a price for voice or video calls with their fans. With a personalized booking link, users can share their availability, making it easy for fans to schedule and pay for exclusive interactions using SOL, the native cryptocurrency of the Solana blockchain.",
  },

  {
    question: "How to use Veluxlink",

    answer:
      "To use Veluxlink, create an account, connect your Phantom wallet, set your availability and pricing, and share your booking link with fans.",
  },

  {
    question: "Who pay for the calls?",

    answer:
      "Fans who book calls with you through Veluxlink pay for the calls using SOL cryptocurrency.",
  },

  {
    question: "Tell me more about it",

    answer:
      "Veluxlink provides a seamless platform for content creators, influencers, and professionals to monetize their time and expertise through personalized video or voice calls. It leverages blockchain technology to ensure secure and instant payments.",
  },
];

const steps = [
  {
    number: 1,
    description: (
      <>
        Create an account and connect your{" "}
        <span className="text-purple-500">Phantom</span> wallet
      </>
    ),
  },

  {
    number: 2,
    description:
      "Set your schedule fee, voice and video charges fees for 5 minutes",
  },

  {
    number: 3,
    description:
      "Set your availability to enable other users know you are available for a call",
  },

  {
    number: 4,
    description:
      "Send your links to others enable them book a meeting with you",
  },

  {
    number: 5,
    description: (
      <>
        Get paid for your time on a call. Receive your payment exactly at the
        end of the call in your <span className="text-purple-500">Phantom</span>{" "}
        wallet
      </>
    ),
  },
];

const features = [
  {
    imageSrc: "/feat-3.svg",
    description: (
      <>
        Schedule or have someone schedule a meeting with{" "}
        <span className="text-green-500">Veluxlink</span>
      </>
    ),
  },

  {
    imageSrc: "/feat-1.svg",
    description:
      "Charge for your time on a call and get paid for either video or voice call",
  },

  {
    imageSrc: "/feat-2.svg",
    description: (
      <>
        Connect your <span className="text-purple-500">phantom</span> wallet to
        pay for calls and receive payment for calls also in SOL
      </>
    ),
  },
];

export default function Home() {
  return (
    <main className="flex flex-col self-stretch pb-3 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex bg-cover bg-[url('/angular.png')] flex-col self-stretch pt-10 pb-3 w-full max-md:px-5 max-md:max-w-full">
        <Header />
        <Hero />
      </div>
      <section className="mt-20  px-4 md:px-16  w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex justify-center gap-5 max-md:flex-col">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
            >
              <div className="flex flex-col text-base font-semibold text-center text-white max-md:mt-10">
                <img
                  loading="lazy"
                  src={feature.imageSrc}
                  alt=""
                  className="object-contain self-center ml-3 max-w-full aspect-square w-[120px]"
                />

                <p className="mt-9">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="self-stretch  px-4 md:px-16 bg-cover bg-[url('/angular.png')] pt-5 pb-8 mt-32 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[61%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-20 w-full font-semibold text-white max-md:mt-10 max-md:max-w-full">
              <h2 className="self-center ml-8 text-4xl">
                How <span className="text-green-500">Veluxlink</span> works?
              </h2>
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex gap-3.5 ${
                    index % 2 === 0 ? "self-start" : "self-end"
                  } mt-6`}
                >
                  <div className="px-2 text-base whitespace-nowrap bg-[#00B81B] rounded-full h-[25px] w-[25px]">
                    {step.number}
                  </div>

                  <div className="flex-auto my-auto text-sm">
                    {step.description}
                  </div>
                </div>
              ))}

              <p className="self-center mt-36 text-base max-md:mt-10">
                Make your time, money.
              </p>
            </div>
          </div>

          <div className="flex relative flex-col ml-5 w-[39%] max-md:ml-0 max-md:w-full">
            <Image
              src="/main.png"
              fill
              alt="How it works illustration"
              className="object-contain w-full aspect-[0.64] max-md:mt-10"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col  px-4 md:px-16  mt-24 w-full  max-md:mt-10 max-md:max-w-full">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow mt-3.5 text-4xl font-semibold text-white max-md:mt-10 max-md:max-w-full">
                <h2 className="self-center">Contact Form</h2>
                <div className="relative mt-24 w-full aspect-[1.22] max-md:mt-10 max-md:max-w-full">
                  <Image
                    src="/contact.svg"
                    fill
                    alt="Contact illustration"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <form className="flex flex-col grow text-2xl font-medium text-white max-md:mt-10 max-md:max-w-full">
              <label htmlFor="email" className="self-start">
                Email:
              </label>

              <input
                id="email"
                type="email"
                className="flex shrink-0 mt-2.5 rounded-xl border border-solid bg-zinc-300 bg-opacity-10 border-white border-opacity-60 h-[65px] max-md:max-w-full"
              />

              <label htmlFor="fullName" className="self-start mt-5">
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                className="flex shrink-0 mt-2 rounded-xl border border-solid bg-zinc-300 bg-opacity-10 border-white border-opacity-60 h-[65px] max-md:max-w-full"
              />

              <label htmlFor="message" className="self-start mt-5">
                Message
              </label>

              <textarea
                id="message"
                className="flex shrink-0 mt-3.5 h-60 rounded-xl border border-solid bg-zinc-300 bg-opacity-10 border-white border-opacity-60 max-md:max-w-full"
              ></textarea>
            </form>
          </div>
        </div>
        <button className="self-end px-6 py-5 mt-16 mr-28 text-2xl font-bold text-white bg-green-900 rounded-xl max-md:px-5 max-md:mt-10 max-md:mr-2.5">
          SEND MESSAGE
        </button>
      </section>

      <section className="flex flex-col  bg-cover bg-[url('/angular.png')] self-stretch px-16 pt-14 pb-20 mt-16 w-full font-semibold text-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <h2 className="self-center text-4xl">FAQs</h2>

        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </section>
      <footer className="flex pb-4   px-4 md:px-16  flex-wrap gap-5 justify-between mt-32 w-full max-w-[1137px] max-md:mt-10 max-md:max-w-full">
        <div className="relative shrink-0 self-stretch max-w-full aspect-[5.71] w-[257px]">
          <Image
            src="/logo.png"
            alt="VeluxLink"
            fill
            className="object-contain"
          />
        </div>

        <nav className="flex gap-10 self-start mt-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.0514 0H26.3452L16.9652 11.8611L28 28H19.3592L12.593 18.2109L4.8496 28H0.5516L10.5854 15.3144L0 0H8.8592L14.9772 8.94756L22.0514 0ZM20.545 25.1564H22.925L7.5656 2.69422H5.012L20.545 25.1564Z"
                fill="white"
              />
            </svg>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="29"
              height="28"
              viewBox="0 0 29 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.45398 0H20.214C24.694 0 28.334 3.64 28.334 8.12V19.88C28.334 22.0336 27.4785 24.0989 25.9557 25.6217C24.4329 27.1445 22.3675 28 20.214 28H8.45398C3.97398 28 0.333984 24.36 0.333984 19.88V8.12C0.333984 5.96644 1.18948 3.90109 2.71228 2.37829C4.23507 0.855498 6.30043 0 8.45398 0ZM8.17398 2.8C6.83729 2.8 5.55535 3.331 4.61017 4.27618C3.66498 5.22137 3.13398 6.50331 3.13398 7.84V20.16C3.13398 22.946 5.38798 25.2 8.17398 25.2H20.494C21.8307 25.2 23.1126 24.669 24.0578 23.7238C25.003 22.7786 25.534 21.4967 25.534 20.16V7.84C25.534 5.054 23.28 2.8 20.494 2.8H8.17398ZM21.684 4.9C22.1481 4.9 22.5932 5.08437 22.9214 5.41256C23.2496 5.74075 23.434 6.18587 23.434 6.65C23.434 7.11413 23.2496 7.55925 22.9214 7.88744C22.5932 8.21563 22.1481 8.4 21.684 8.4C21.2199 8.4 20.7747 8.21563 20.4465 7.88744C20.1184 7.55925 19.934 7.11413 19.934 6.65C19.934 6.18587 20.1184 5.74075 20.4465 5.41256C20.7747 5.08437 21.2199 4.9 21.684 4.9ZM14.334 7C16.1905 7 17.971 7.7375 19.2837 9.05025C20.5965 10.363 21.334 12.1435 21.334 14C21.334 15.8565 20.5965 17.637 19.2837 18.9497C17.971 20.2625 16.1905 21 14.334 21C12.4775 21 10.697 20.2625 9.38424 18.9497C8.07148 17.637 7.33398 15.8565 7.33398 14C7.33398 12.1435 8.07148 10.363 9.38424 9.05025C10.697 7.7375 12.4775 7 14.334 7ZM14.334 9.8C13.2201 9.8 12.1518 10.2425 11.3641 11.0302C10.5765 11.8178 10.134 12.8861 10.134 14C10.134 15.1139 10.5765 16.1822 11.3641 16.9698C12.1518 17.7575 13.2201 18.2 14.334 18.2C15.4479 18.2 16.5162 17.7575 17.3038 16.9698C18.0915 16.1822 18.534 15.1139 18.534 14C18.534 12.8861 18.0915 11.8178 17.3038 11.0302C16.5162 10.2425 15.4479 9.8 14.334 9.8Z"
                fill="white"
              />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.8889 0C25.714 0 26.5053 0.327777 27.0888 0.911223C27.6722 1.49467 28 2.28599 28 3.11111V24.8889C28 25.714 27.6722 26.5053 27.0888 27.0888C26.5053 27.6722 25.714 28 24.8889 28H3.11111C2.28599 28 1.49467 27.6722 0.911223 27.0888C0.327777 26.5053 0 25.714 0 24.8889V3.11111C0 2.28599 0.327777 1.49467 0.911223 0.911223C1.49467 0.327777 2.28599 0 3.11111 0H24.8889ZM24.1111 24.1111V15.8667C24.1111 14.5217 23.5768 13.2319 22.6258 12.2808C21.6748 11.3298 20.3849 10.7956 19.04 10.7956C17.7178 10.7956 16.1778 11.6044 15.4311 12.8178V11.0911H11.0911V24.1111H15.4311V16.4422C15.4311 15.2444 16.3956 14.2644 17.5933 14.2644C18.1709 14.2644 18.7248 14.4939 19.1333 14.9023C19.5417 15.3107 19.7711 15.8646 19.7711 16.4422V24.1111H24.1111ZM6.03556 8.64889C6.72865 8.64889 7.39337 8.37356 7.88346 7.88346C8.37356 7.39337 8.64889 6.72865 8.64889 6.03556C8.64889 4.58889 7.48222 3.40667 6.03556 3.40667C5.33833 3.40667 4.66966 3.68364 4.17665 4.17665C3.68364 4.66966 3.40667 5.33833 3.40667 6.03556C3.40667 7.48222 4.58889 8.64889 6.03556 8.64889ZM8.19778 24.1111V11.0911H3.88889V24.1111H8.19778Z"
                fill="white"
              />
            </svg>
          </a>
        </nav>
      </footer>
    </main>
  );
}
