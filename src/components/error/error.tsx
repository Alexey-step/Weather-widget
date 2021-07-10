import React from "react";

interface Props {
  message?: string;
}

const Error: React.FC<Props> = ({ message }) => {
  return (
    <div className="error">
      <p className="error__message">{message || "Something went wrong!"}</p>
    </div>
  );
};

export default Error;
