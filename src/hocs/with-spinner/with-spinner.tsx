import React from "react";
import { useSelector } from "react-redux";
import { Status } from "../../const";
import { RootState } from "../../store/reducer";
import Spinner from "../../components/UI/spinner/spinner";
import { CityWeatherAdapted } from "../../types";

interface Props {
  cities?: CityWeatherAdapted[];
  onCitiesList?: (cities: CityWeatherAdapted[]) => void;
}

const withSpinner = (Component: React.FC): React.FC<Props> => {
  const WithSpinner: React.FC<Props> = (props) => {
    const { status } = useSelector((state: RootState) => state);

    if (status === Status.LOAD) {
      return <Spinner />;
    }

    return (
      <>
        <Component {...props} />
      </>
    );
  };

  return WithSpinner;
};

export default withSpinner;
