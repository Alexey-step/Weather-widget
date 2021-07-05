import React from "react";
import "./error.scss";

const Error: React.FC = () => {
  return (
    <div className="error">
      <p data-testid="Error">Something went wrong!</p>
    </div>
  );
};

export default Error;
