import React from "react";

import "./trash-bucket-icon.scss";

const TrashBucketIcon: React.FC = () => {
  return (
    <svg
      className="trash-bucket-icon"
      viewBox="0 0 14 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 3L5.5 1H8.5L9 3M13 3H2L3 15H11L12 3H1H13ZM7 6V12V6ZM9.5 6L9 12L9.5 6ZM4.5 6L5 12L4.5 6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashBucketIcon;
