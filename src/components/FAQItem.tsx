import { useState } from "react";

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
          <g clipPath="url(#clip0_17_2264)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
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

export default FAQItem;
