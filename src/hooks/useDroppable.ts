import { useCallback } from "react";
import { useDrop, ConnectDropTarget } from "react-dnd";
import { CityWeatherAdapted } from "../types";
import { ItemTypes } from "../const";

interface Props {
  cities: CityWeatherAdapted[];
  onCitiesList: (cities: CityWeatherAdapted[]) => void;
}

interface IDrop {
  moveCity: (id: number, to: number) => void;
  findCity: (id: number) => { index: number };
  drop: ConnectDropTarget;
}

const useDroppable = ({ cities, onCitiesList }: Props): IDrop => {
  const findCity = useCallback(
    (id: number) => {
      const city = cities.filter((item) => item.id === id)[0];
      return {
        city,
        index: cities.indexOf(city),
      };
    },
    [cities]
  );

  const moveCity = useCallback(
    (id: number, atIndex: number) => {
      const { city, index } = findCity(id);
      const newCityList = [...cities];
      newCityList.splice(index, 1);
      newCityList.splice(atIndex, 0, city);
      onCitiesList(newCityList);
    },
    [findCity, cities, onCitiesList]
  );

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CITY }));

  return {
    findCity,
    moveCity,
    drop,
  };
};

export default useDroppable;
