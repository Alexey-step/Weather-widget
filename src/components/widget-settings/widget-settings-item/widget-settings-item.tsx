import React from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { CityWeatherAdapted } from "../../../types";
import BurgerMenuIcon from "../../UI/icons/burger-menu-icon/burger-menu-icon";
import TrashBucketIcon from "../../UI/icons/trash-bucket-icon/trash-bucket-icon";
import { deleteCityWeather } from "../../../store/action-creators";
import { ItemTypes } from "../../../const";

import "./widget-settings-item.scss";

interface Props {
  city: CityWeatherAdapted;
  id: number;
  moveCity: (id: number, to: number) => void;
  findCity: (id: number) => { index: number };
}

interface Item {
  id: number;
  originalIndex: number;
}

const WidgetSettingsItem: React.FC<Props> = ({
  city,
  id,
  moveCity,
  findCity,
}) => {
  const dispatch = useDispatch();
  const originalIndex = findCity(id).index;
  const [, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.CITY,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCity(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCity]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CITY,
      canDrop: () => false,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findCity(id);
          moveCity(draggedId, overIndex);
        }
      },
    }),
    [findCity, moveCity]
  );

  const handleDelete = (id: number) => {
    dispatch(deleteCityWeather(id));
  };

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
