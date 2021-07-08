import React from "react";
import { CityWeatherAdapted } from "../../../types";
import WidgetSettingsItem from "../widget-settings-item/widget-settings-item";
import withSpinner from "../../../hocs/with-spinner/with-spinner";

import "./wisget-settings-list.scss";

interface Props {
  cities: CityWeatherAdapted[];
}

const WidgetSettingsList: React.FC<Props> = ({ cities }) => {
  return (
    <ul className="widget-settings__list">
      {cities.map((city, index) => (
        <WidgetSettingsItem index={index} key={String(city.id)} city={city} />
      ))}
    </ul>
  );
};

export default withSpinner(WidgetSettingsList);
