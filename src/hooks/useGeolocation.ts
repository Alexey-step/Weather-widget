import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserWeather } from "../store/api/api-actions";
import { setStatus } from "../store/action-creators";
import { Status, ERROR_TIMEOUT } from "../const";

interface IGeo {
  errorMessage: string;
}

const useGeolocation = (): IGeo => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const geolocationSuccess = (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    dispatch(
      fetchUserWeather(position.coords.latitude, position.coords.longitude)
    );
  };

  const geolocationFailure = (positionError: { message: string }) => {
    setErrorMessage(positionError.message);
    dispatch(setStatus(Status.ERROR));
    setTimeout(() => dispatch(setStatus(Status.PENDING)), ERROR_TIMEOUT);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        geolocationSuccess,
        geolocationFailure
      );
    } else {
      setErrorMessage("Geolocation off");
      dispatch(setStatus(Status.ERROR));
      setTimeout(() => dispatch(setStatus(Status.PENDING)), ERROR_TIMEOUT);
    }
  }, []);

  return {
    errorMessage,
  };
};

export default useGeolocation;
