import React from "react";
import { CityWeatherAdapted } from "../../../types";
import BurgerMenuIcon from "../../UI/icons/burger-menu-icon/burger-menu-icon";
import TrashBucketIcon from "../../UI/icons/trash-bucket-icon/trash-bucket-icon";
import useDraggable from "../../../hooks/useDraggable";

interface Props {
  city: CityWeatherAdapted;
  id: number;
  moveCity: (id: number, to: number) => void;
  findCity: (id: number) => { index: number };
}

const WidgetSettingsItem: React.FC<Props> = ({
  city,
  id,
  moveCity,
  findCity,
}) => {
  const { preview, drag, drop, handleDelete } = useDraggable({
    id,
    moveCity,
    findCity,
  });

  return (
    <li ref={preview} className="widget-settings__item city-item">
      <button
        ref={(node) => drag(drop(node))}
        className="city-item__btn"
        type="button"
      >
        <BurgerMenuIcon />
      </button>
      <h3 className="city-item__title">{city.name}</h3>
      <button
        onClick={() => handleDelete(city.id)}
        className="city-item__btn"
        type="button"
      >
        <TrashBucketIcon />
      </button>
    </li>
  );
};

export default React.memo(WidgetSettingsItem);
