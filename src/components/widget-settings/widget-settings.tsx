import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import AddForm from "../add-form/add-form";
import WidgetSettingsList from "./widget-settings-list/widget-settings-list";
import { CityWeatherAdapted } from "../../types";
import withError from "../../hocs/with-error/with-error";
import { setCities } from "../../store/action-creators";

import "./widget-settings.scss";

interface Props {
  citiesList: CityWeatherAdapted[];
}

const WidgetSettings: React.FC<Props> = ({ citiesList }) => {
  const dispatch = useDispatch();

  const reorder = (
    list: CityWeatherAdapted[],
    startIndex: number,
    endIndex: number
  ): CityWeatherAdapted[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const list = reorder(
      citiesList,
      result.source.index,
      result.destination.index
    );

    dispatch(setCities(list));
  };

  return (
    <section className="widget-settings">
      <h2 className="widget-settings__title">Settings</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <WidgetSettingsList cities={citiesList} />
      </DragDropContext>
      <AddForm />
    </section>
  );
};

export default React.memo(withError(WidgetSettings));
