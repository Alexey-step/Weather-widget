import React, { useState, useCallback } from "react";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import { CityWeatherAdapted } from "../../../types";
import WidgetSettingsItem from "../widget-settings-item/widget-settings-item";
import withSpinner from "../../../hocs/with-spinner/with-spinner";
import { ItemTypes } from "../../../const";

interface Props {
  cities: CityWeatherAdapted[];
}

const WidgetSettingsList: React.FC<Props> = ({ cities }) => {
  const [list, setList] = useState(cities);

  const findCity = useCallback(
    (id: number) => {
      const city = list.filter((item) => item.id === id)[0];
      return {
        city,
        index: list.indexOf(city),
      };
    },
    [list]
  );

  const moveCity = useCallback(
    (id: number, atIndex: number) => {
      const { city, index } = findCity(id);
      setList(
        update(list, {
          $splice: [
            [index, 1],
            [atIndex, 0, city],
          ],
        })
      );
    },
    [findCity, list, setList]
  );

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CITY }));

  return (
    <ul ref={drop} className="widget-settings__list">
      {list.map((city) => (
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
