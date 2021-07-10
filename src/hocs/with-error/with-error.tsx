import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Error from "../../components/error/error";
import { ERROR_TIMEOUT, Status } from "../../const";
import * as ActionCreator from "../../store/action-creators";
import { RootState } from "../../store/reducer";
import { CityWeatherAdapted } from "../../types";

interface Props {
  citiesList?: CityWeatherAdapted[];
  onCitiesList?: (cities: CityWeatherAdapted[]) => void;
}

const withError = (Component: React.FC): React.FC<Props> => {
  const WithError: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const { status } = useSelector((state: RootState) => state);

    useEffect(() => {
      if (status === Status.ERROR) {
        setTimeout(
          () => dispatch(ActionCreator.setStatus(Status.PENDING)),
          ERROR_TIMEOUT
        );
      }
    }, [dispatch, status]);

    return (
      <>
        {status === Status.ERROR && <Error />}
        <Component {...props} />
      </>
    );
  };

  return WithError;
};

export default withError;
