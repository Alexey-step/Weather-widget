import React, { useCallback } from "react";
import { useDrop } from "react-dnd";
import { CityWeatherAdapted } from "../../../types";
import WidgetSettingsItem from "../widget-settings-item/widget-settings-item";
import withSpinner from "../../../hocs/with-spinner/with-spinner";
import { ItemTypes } from "../../../const";

interface Props {
  cities: CityWeatherAdapted[];
  onCitiesList: (cities: CityWeatherAdapted[]) => void;
}

const WidgetSettingsList: React.FC<Props> = ({ cities, onCitiesList }) => {
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

  return (
    <ul ref={drop} className="widget-settings__list">
      {cities.map((city) => (
        <WidgetSettingsItem
          city={city}
          id={city.id}
          key={city.id}
          moveCity={moveCity}
          findCity={findCity}
        />
      ))}
    </ul>
  );
};

export default React.memo(withSpinner(WidgetSettingsList));
