import React from "react";
import { useDispatch } from "react-redux";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { CityWeatherAdapted } from "../../../types";
import BurgerMenuIcon from "../../UI/icons/burger-menu-icon/burger-menu-icon";
import TrashBucketIcon from "../../UI/icons/trash-bucket-icon/trash-bucket-icon";
import { deleteCityWeather } from "../../../store/action-creators";

import "./widget-settings-item.scss";

interface Props {
  city: CityWeatherAdapted;
  index: number;
}

const WidgetSettingsItem: React.FC<Props> = ({ city, index }) => {
  const { name } = city;
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteCityWeather(id));
  };

  return (
    <Draggable draggableId={String(city.id)} index={index}>
      {(provided: DraggableProvided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="widget-settings__item city-item"
        >
          <button
            {...provided.dragHandleProps}
            className="city-item__btn"
            type="button"
          >
            <BurgerMenuIcon />
          </button>
          <h3 className="city-item__title">{name}</h3>
          <button
            onClick={() => handleDelete(city.id)}
            className="city-item__btn"
            type="button"
          >
            <TrashBucketIcon />
          </button>
        </li>
      )}
    </Draggable>
  );
};

export default WidgetSettingsItem;
