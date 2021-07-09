import React, { useState, useCallback, useEffect, FC, useRef } from "react";
import { DndProvider, useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { XYCoord } from "dnd-core";
import BurgerMenuIcon from "../UI/icons/burger-menu-icon/burger-menu-icon";
import TrashBucketIcon from "../UI/icons/trash-bucket-icon/trash-bucket-icon";

import { CityWeatherAdapted } from "../../types";

export const ItemTypes = {
  CARD: "card",
};

export interface Props {
  citiesList: CityWeatherAdapted[];
}

export const Container: React.FC<Props> = ({ citiesList }) => {
  const [cards, setCards] = useState(citiesList);

  useEffect(() => {
    setCards(citiesList);
  }, [citiesList]);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [cards]
  );

  const renderCard = (card: CityWeatherAdapted, index: number) => {
    return (
      <Card
        card={card}
        key={card.id}
        index={index}
        id={card.id}
        moveCard={moveCard}
      />
    );
  };

  return (
    <>
      <ul className="widget-settings__list">
        {cards.map((card, i) => renderCard(card, i))}
      </ul>
    </>
  );
};

// const style = {
//   border: "1px dashed gray",
//   padding: "0.5rem 1rem",
//   marginBottom: ".5rem",
//   backgroundColor: "white",
//   cursor: "move",
// };

export interface CardProps {
  id: number;
  index: number;
  card: CityWeatherAdapted;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Card: FC<CardProps> = ({ id, index, moveCard, card }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <li className="widget-settings__item city-item">
        <button className="city-item__btn" type="button">
          <BurgerMenuIcon />
        </button>
        <h3 className="city-item__title">{card.name}</h3>
        <button
          // onClick={() => handleDelete(city.id)}
          className="city-item__btn"
          type="button"
        >
          <TrashBucketIcon />
        </button>
      </li>
    </div>
  );
};

// const ReactDND: React.FC = () => {
//   return (
//     <div className="App">
//       <DndProvider backend={HTML5Backend}>
//         <Container />
//       </DndProvider>
//     </div>
//   );
// }

export default Container;
