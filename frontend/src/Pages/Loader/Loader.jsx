import React from "react";

const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ margin: "auto", display: "block" }}
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <defs>
        <filter
          id="ldio-5qu1oyy1ey-filter"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="2.4000000000000004"
          ></feGaussianBlur>
          <feComponentTransfer result="cutoff">
            <feFuncA type="table" tableValues="0 0 0 0 0 0 1 1 1 1 1"></feFuncA>
          </feComponentTransfer>
        </filter>
      </defs>
      {[0, 1, 2, 3, 4].map((index) => (
        <g key={index} transform={`translate(50 50)`}>
          <g>
            <circle
              cx="17"
              cy="0"
              r="5"
              fill={`#${
                ["e15b64", "f47e60", "f8b26a", "abbd81", "849b87"][index]
              }`}
            >
              <animate
                attributeName="r"
                keyTimes="0;0.5;1"
                values="3.6;8.4;3.6"
                dur={`${[4, 2, 1.333, 1, 0.8][index]}s`}
                repeatCount="indefinite"
                begin={`-${[0.25, 0.2, 0.15, 0.1, 0.05][index]}s`}
              ></animate>
            </circle>
            <animateTransform
              attributeName="transform"
              type="rotate"
              keyTimes="0;1"
              values="0;360"
              dur={`${[4, 2, 1.333, 1, 0.8][index]}s`}
              repeatCount="indefinite"
              begin={`-${[0, 0.05, 0.1, 0.1, 0.2][index]}s`}
            ></animateTransform>
          </g>
        </g>
      ))}
    </svg>
  );
};

export default Loader;
