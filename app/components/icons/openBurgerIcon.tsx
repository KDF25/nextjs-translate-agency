export const OpenBurgerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={38}
      fill="none"
    >
      <g filter="url(#a)">
        <path
          fill="#67D2FB"
          stroke="#fff"
          strokeWidth={0.5}
          d="M33 17.02c0 5.583-.619 8.375-2.432 10.11-1.815 1.735-4.732 2.327-10.568 2.327-5.836 0-8.755-.592-10.567-2.326C7.619 25.394 7 22.603 7 17.019c0-5.584.619-8.376 2.433-10.11C11.244 5.173 14.163 4.58 20 4.58c5.836 0 8.755.592 10.568 2.328C32.381 8.642 33 11.435 33 17.019Z"
        />
        <path
          fill="#67D2FB"
          d="M26 20.846H14h12Zm0-3.74H14h12Zm0-3.436H14h12Z"
        />
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M26 20.846H14m12-3.74H14m12-3.436H14"
        />
      </g>
      <defs>
        <filter
          id="a"
          width={38.5}
          height={37.376}
          x={0.75}
          y={0.331}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={2} />
          <feGaussianBlur stdDeviation={3} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_107_24229"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_107_24229"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
