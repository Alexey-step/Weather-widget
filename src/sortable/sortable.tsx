import React, { useState } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import arrayMove from "array-move";
import BurgerMenuIcon from "../components/UI/icons/burger-menu-icon/burger-menu-icon";
import TrashBucketIcon from "../components/UI/icons/trash-bucket-icon/trash-bucket-icon";
import AddForm from "../components/add-form/add-form";
import { CityWeatherAdapted } from "../types";

interface Props {
  citiesList: CityWeatherAdapted[];
}

const DragHandle = SortableHandle(() => (
  <button className="city-item__btn" type="button">
    <BurgerMenuIcon />
  </button>
));

const SortableItem = SortableElement(({ value }) => (
  <li className="widget-settings__item city-item">
    <DragHandle />
    <h3 className="city-item__title">{value.name}</h3>
    <button
      // onClick={() => handleDelete(value.id)}
      className="city-item__btn"
      type="button"
    >
      <TrashBucketIcon />
    </button>
  </li>
));

const SortContainer = SortableContainer(({ children }) => {
  return <ul className="widget-settings__list">{children}</ul>;
});

const Sett: React.FC<Props> = ({ citiesList }) => {
  const [list, setList] = useState(citiesList);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setList(arrayMove(list, oldIndex, newIndex));
  };

  return (
    <section className="widget-settings">
      <h2 className="widget-settings__title">Settings</h2>
      <SortContainer onSortEnd={onSortEnd} useDragHandle>
        {list.map((city, index) => (
          <SortableItem key={city.id} index={index} value={city} />
        ))}
      </SortContainer>
      <AddForm />
    </section>
  );
};

export default Sett;
