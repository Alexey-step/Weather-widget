import React, { useState, useEffect } from "react";
import ReactDragListView from "react-drag-listview/lib/index.js";
import { CityWeatherAdapted } from "../../types";
import BurgerMenuIcon from "../UI/icons/burger-menu-icon/burger-menu-icon";
import TrashBucketIcon from "../UI/icons/trash-bucket-icon/trash-bucket-icon";

interface Props {
  citiesList: CityWeatherAdapted[];
}

const Demo: React.FC<Props> = ({ citiesList }) => {
  const [data, setData] = useState(citiesList);

  useEffect(() => {
    setData(citiesList);
  }, [citiesList]);

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const list = [...data];
      const item = list.splice(fromIndex, 1)[0];
      list.splice(toIndex, 0, item);
      setData(list);
    },
    nodeSelector: ".city-item",
    handleSelector: ".city-item__btn",
  };

  return (
    <div className="simple simple1">
      <h2>Dragging handle</h2>
      <div className="simple-inner">
        <ReactDragListView {...dragProps}>
          <ul className="widget-settings__list">
            {data.map((city, index) => (
              <li className="widget-settings__item city-item" key={city.id}>
                <button className="city-item__btn" type="button">
                  <BurgerMenuIcon />
                </button>
                <h3 className="city-item__title">{city.name}</h3>
                <button
                  // onClick={() => handleDelete(city.id)}
                  className="city-item__btn"
                  type="button"
                >
                  <TrashBucketIcon />
                </button>
              </li>
            ))}
          </ul>
        </ReactDragListView>
      </div>
    </div>
  );
};

export default Demo;
