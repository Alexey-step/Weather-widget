import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CityWeatherAdapted } from "../types";
import { RootState } from "../store/reducer";

interface IWidget {
  handleButtonClick: () => void;
  setCitiesList: (cities: CityWeatherAdapted[]) => void;
  citiesList: CityWeatherAdapted[];
  open: boolean;
}

const useCities = (): IWidget => {
  const [open, setOpen] = useState(true);
  const { cities } = useSelector((state: RootState) => state);
  const [citiesList, setCitiesList] = useState<CityWeatherAdapted[]>(cities);

  useEffect(() => {
    setCitiesList(cities);
  }, [cities]);

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
