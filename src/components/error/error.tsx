import React from "react";

import "./error.scss";

interface Props {
  message?: string;
}

const Error: React.FC<Props> = ({ message }) => {
  return (
    <div className="error">
      <p data-testid="Error">{message || "Something went wrong!"}</p>
    </div>
  );
};

export default Error;
