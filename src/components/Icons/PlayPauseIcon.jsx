import React from "react";

const PlayIcon = ({ fill = "white" }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9806 24.0001C19.608 24.0001 24.9806 18.6275 24.9806 12.0001C24.9806 5.3727 19.608 0.00012207 12.9806 0.00012207C6.35317 0.00012207 0.980591 5.3727 0.980591 12.0001C0.980591 18.6275 6.35317 24.0001 12.9806 24.0001ZM10.0266 8.19696V15.8124C10.0266 16.1974 10.4434 16.4379 10.7767 16.2453L17.2973 12.4771C17.6286 12.2856 17.6308 11.808 17.3012 11.6135L10.7806 7.76633C10.4473 7.56967 10.0266 7.80996 10.0266 8.19696Z"
        fill={fill}
      />
    </svg>
  );
};

const PauseIcon = ({ fill = "white" }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.9805 12C24.9805 18.6275 19.608 24 12.9805 24C6.35297 24 0.980469 18.6275 0.980469 12C0.980469 5.3725 6.35297 0 12.9805 0C19.608 0 24.9805 5.3725 24.9805 12ZM9.60547 7.5H11.8555V16.5H9.60547V7.5ZM16.3555 7.5H14.1055V16.5H16.3555V7.5Z"
        fill={fill}
      />
    </svg>
  );
};

export { PlayIcon, PauseIcon };
