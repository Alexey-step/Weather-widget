import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AddForm from "../add-form/add-form";
import WidgetSettingsList from "./widget-settings-list/widget-settings-list";
import { CityWeatherAdapted } from "../../types";
import withError from "../../hocs/with-error/with-error";

interface Props {
  citiesList: CityWeatherAdapted[];
}

const WidgetSettings: React.FC<Props> = ({ citiesList }) => {
  return (
    <section className="widget-settings">
      <h2 className="widget-settings__title">Settings</h2>
      <DndProvider backend={HTML5Backend}>
        <WidgetSettingsList cities={citiesList} />
      </DndProvider>
      <AddForm />
    </section>
  );
};

export default React.memo(withError(WidgetSettings));
