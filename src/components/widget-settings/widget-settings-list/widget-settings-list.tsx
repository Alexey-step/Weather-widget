import React from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { CityWeatherAdapted } from "../../../types";
import WidgetSettingsItem from "../widget-settings-item/widget-settings-item";
import withSpinner from "../../../hocs/with-spinner/with-spinner";

import "./wisget-settings-list.scss";

interface Props {
  cities: CityWeatherAdapted[];
}

const WidgetSettingsList: React.FC<Props> = ({ cities }) => {
  return (
    <Droppable droppableId="droppable">
      {(provided: DroppableProvided) => (
        <ul
          className="widget-settings__list"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {cities.map((city, index) => (
            <WidgetSettingsItem
              index={index}
              key={String(city.id)}
              city={city}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default withSpinner(WidgetSettingsList);
