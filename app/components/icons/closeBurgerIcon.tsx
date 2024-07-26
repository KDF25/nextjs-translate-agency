export const CloseBurgerIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={39} fill="none">
      <g filter="url(#a)">
        <path
          fill="#fff"
          stroke="#0096EA"
          strokeWidth={0.5}
          d="M33 17.204c0 5.745-.619 8.617-2.432 10.403C28.753 29.39 25.836 30 20 30c-5.836 0-8.755-.61-10.567-2.393C7.619 25.82 7 22.949 7 17.205c0-5.745.619-8.617 2.433-10.401C11.244 5.018 14.163 4.409 20 4.409c5.836 0 8.755.61 10.568 2.395C32.381 8.586 33 11.46 33 17.204Z"
        />
        <path fill="#fff" d="M25 12 15 22l10-10Zm0 10L15 12l10 10Z" />
        <path
          stroke="#0096EA"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M25 12 15 22m10 0L15 12"
        />
      </g>
      <defs>
        <filter
          id="a"
          width={38.5}
          height={38.091}
          x={0.75}
          y={0.159}
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
            result="effect1_dropShadow_120_588"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_120_588"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
