"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Hero, Header } from "@veluxlink/components";

type FeatureCardProps = {
  imageSrc: string;

  description: React.ReactNode;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ imageSrc, description }) => {
  return (
    <div className="flex flex-col text-base font-semibold text-center text-white max-md:mt-10">
      <img
        loading="lazy"
        src={imageSrc}
        alt=""
        className="object-contain self-center ml-3 max-w-full aspect-square w-[120px]"
      />

      <p className="mt-9">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/9596d138560d2fb1efe5dcbc180ca72e4d76f3edd9b891c27ce02dce26bddceb?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12",

      description: (
        <>
          Schedule or have someone schedule a meeting with{" "}
          <span className="text-green-500">Veluxlink</span>
        </>
      ),
    },

    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f5a02c3a33f7ac3dbc93e69e2efa723d38ffffbd018c225156efcafdee5fdec8?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12",

      description:
        "Charge for your time on a call and get paid for either video or voice call",
    },

    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ef378ec01b07e17fdc1a41292739342c34f33db1ec1b50d62ce3a86d994e9e72?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12",

      description: (
        <>
          Connect your <span className="text-purple-500">phantom</span> wallet
          to pay for calls and receive payment for calls also in SOL
        </>
      ),
    },
  ];
  return (
    <section className="mt-20  px-4 md:px-16  w-full max-md:mt-10 max-md:max-w-full">
      <div className="flex justify-center gap-5 max-md:flex-col">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
          >
            <FeatureCard
              imageSrc={feature.imageSrc}
              description={feature.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const HowItWorks: React.FC = () => {
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
          end of the call in your{" "}
          <span className="text-purple-500">Phantom</span> wallet
        </>
      ),
    },
  ];

  return (
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

        <div className="flex flex-col ml-5 w-[39%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/63f92c142fc0b7101ffa2001b85a7a06420bc44cdd42ba8e4a328eb9822f4915?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12"
            alt="How it works illustration"
            className="object-contain w-full aspect-[0.64] max-md:mt-10"
          />
        </div>
      </div>
    </section>
  );
};

const ContactForm: React.FC = () => {
  return (
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
  );
};

type FAQItemProps = {
  question: string;

  answer: string;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col px-11 py-7 mt-7 w-full rounded-xl border border-solid border-zinc-300 border-opacity-50 max-md:px-5 max-md:max-w-full">
      <button
        className="flex flex-wrap gap-5 justify-between text-xl max-md:max-w-full"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>

        <svg
          width="59"
          height="28"
          viewBox="0 0 59 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_17_2264)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M31.0882 22.856L44.7593 7.77067L41.3422 4L29.3797 17.2L17.4172 4L14 7.77067L27.6711 22.856C28.1243 23.3559 28.7388 23.6368 29.3797 23.6368C30.0205 23.6368 30.6351 23.3559 31.0882 22.856Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_17_2264">
              <rect
                width="27.6368"
                height="58.7593"
                fill="white"
                transform="matrix(0 1 1 0 0 0)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2.5 mr-14 max-md:mr-2.5 max-md:max-w-full">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQSection: React.FC = () => {
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

  return (
    <section className="flex flex-col  bg-cover bg-[url('/angular.png')] self-stretch px-16 pt-14 pb-20 mt-16 w-full font-semibold text-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <h2 className="self-center text-4xl">FAQs</h2>

      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </section>
  );
};

const Footer: React.FC = () => {
  return (
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
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6f829a6987d9451f368ce81bacb05f4cb17abe81fb2acdd19d0c9c8e32ceb11?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12"
            alt="Twitter"
            className="object-contain shrink-0 w-7 aspect-square"
          />
        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/aab70609b90d1246ae7bce29384f64893717f6bce8a958552911372beac784f7?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12"
            alt="Facebook"
            className="object-contain shrink-0 w-7 aspect-square"
          />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b890ec515f1c310a471200821edeed390b1be0d2c5da357507aa163595561688?placeholderIfAbsent=true&apiKey=e00d6ddf1d4c4f1ab2742b8880176f12"
            alt="Instagram"
            className="object-contain shrink-0 w-7 aspect-square"
          />
        </a>
      </nav>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col self-stretch pb-3 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex bg-cover bg-[url('/angular.png')] flex-col self-stretch pt-10 pb-3 w-full max-md:px-5 max-md:max-w-full">
        <Header />
        <Hero />
      </div>
      <Features />

      <HowItWorks />

      <ContactForm />

      <FAQSection />

      <Footer />
    </main>
  );
}
