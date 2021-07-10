import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import Widget from "../widget/widget";
import { Status } from "../../const";
import Error from "../error/error";
import useGeolocation from "../../hooks/useGeolocation";

const App: React.FC = () => {
  const { status } = useSelector((state: RootState) => state);
  const { errorMessage } = useGeolocation();

  return (
    <>
      {status === Status.ERROR && <Error message={errorMessage} />}
      <Widget />
    </>
  );
};

export default App;
