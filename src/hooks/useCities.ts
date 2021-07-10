import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CityWeatherAdapted } from "../types";
import { RootState } from "../store/reducer";
import { setCityWeather } from "../store/action-creators";

interface IWidget {
  handleButtonClick: () => void;
  setCitiesList: (cities: CityWeatherAdapted[]) => void;
  citiesList: CityWeatherAdapted[];
  open: boolean;
}

const useCities = (): IWidget => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const { cities } = useSelector((state: RootState) => state);
  const [citiesList, setCitiesList] = useState<CityWeatherAdapted[]>(cities);

  useEffect(() => {
    setCitiesList(cities);
  }, [cities]);

  useEffect(() => {
    const citiesList = JSON.parse(localStorage.getItem("items"));
    if (citiesList) {
      citiesList.forEach((city: CityWeatherAdapted) =>
        dispatch(setCityWeather(city))
      );
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(citiesList));
  }, [citiesList]);

  const handleButtonClick = () => {
    setOpen(!open);
  };

  return {
    handleButtonClick,
    setCitiesList,
    citiesList,
    open,
  };
};

export default useCities;
