import React from "react";
import { CityWeatherAdapted } from "../../../types";
import WidgetSettingsItem from "../widget-settings-item/widget-settings-item";
import withSpinner from "../../../hocs/with-spinner/with-spinner";
import useDroppable from "../../../hooks/useDroppable";

interface Props {
  cities: CityWeatherAdapted[];
  onCitiesList: (cities: CityWeatherAdapted[]) => void;
}

const WidgetSettingsList: React.FC<Props> = ({ cities, onCitiesList }) => {
  const { findCity, moveCity, drop } = useDroppable({ cities, onCitiesList });

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
