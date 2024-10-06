const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="100"
        height="100"
        fill="#02590f"
        stroke="none"
        className="single-loader"
        overflow="visible"
        viewBox="0 0 100 100"
      >
        <defs>
          <circle
            id="spinner"
            cx="50"
            cy="50"
            r="4"
            transform="translate(0 -30)"
          ></circle>
        </defs>
        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#spinner">
          <animate
            attributeName="opacity"
            begin="0s"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          ></animate>
        </use>
        <use
          xmlnsXlink="http://www.w3.org/1999/xlink"
          transform="rotate(45 50 50)"
          xlinkHref="#spinner"
        >
          <animate
            attributeName="opacity"
            begin="0.125s"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          ></animate>
        </use>
        <use
          xmlnsXlink="http://www.w3.org/1999/xlink"
          transform="rotate(90 50 50)"
          xlinkHref="#spinner"
        >
          <animate
            attributeName="opacity"
            begin="0.25s"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          ></animate>
        </use>
        <use
          xmlnsXlink="http://www.w3.org/1999/xlink"
          transform="rotate(135 50 50)"
          xlinkHref="#spinner"
        >
          <animate
            attributeName="opacity"
            begin="0.375s"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          ></animate>
        </use>
        <use
          xmlnsXlink="http://www.w3.org/1999/xlink"
          transform="rotate(180 50 50)"
          xlinkHref="#spinner"
        >
          <animate
            attributeName="opacity"
            begin="0.5s"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          ></animate>
        </use>
        <use
          xmlnsXlink="http://www.w3.org/1999/xlink"
          transform="rotate(225 50 50)"
          xlinkHref="#spinner"
        >
          <animate
            attributeName="opacity"
            begin="0.625s"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          ></animate>
        </use>
        <use
          xmlnsXlink="http://www.w3.org/1999/xlink"
          transform="rotate(270 50 50)"
          xlinkHref="#spinner"
        >
          <animate
            attributeName="opacity"
            begin="0.75s"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          ></animate>
        </use>
        <use
          xmlnsXlink="http://www.w3.org/1999/xlink"
          transform="rotate(315 50 50)"
          xlinkHref="#spinner"
        >
          <animate
            attributeName="opacity"
            begin="0.875s"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          ></animate>
        </use>
      </svg>
    </div>
  );
};

export default Loader;
