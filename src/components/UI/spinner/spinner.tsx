import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="spinner" data-testid="spinner">
      <div className="spinner__container">
        <div className="spinner__wrapper">
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
