import { useDispatch } from "react-redux";
import {
  useDrag,
  useDrop,
  ConnectDropTarget,
  ConnectDragPreview,
  ConnectDragSource,
} from "react-dnd";
import { deleteCityWeather } from "../store/action-creators";
import { ItemTypes } from "../const";

interface Props {
  id: number;
  moveCity: (id: number, to: number) => void;
  findCity: (id: number) => { index: number };
}

interface IDrag {
  preview: ConnectDragPreview;
  drag: ConnectDragSource;
  handleDelete: (id: number) => void;
  drop: ConnectDropTarget;
}

interface Item {
  id: number;
  originalIndex: number;
}

const useDraggable = ({ id, moveCity, findCity }: Props): IDrag => {
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

  return {
    preview,
    drag,
    drop,
    handleDelete,
  };
};

export default useDraggable;
