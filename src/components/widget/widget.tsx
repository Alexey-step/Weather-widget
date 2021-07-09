import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RootState } from "../../store/reducer";
import WeatherCard from "../weather-card/weather-card";
import GearIcon from "../UI/icons/gear-icon/gear-icon";
import CloseIcon from "../UI/icons/close-icon/close-icon";
import WidgetSettings from "../widget-settings/widget-settings";
import { CityWeatherAdapted } from "../../types";
import Container from "../react-dnd/react-dnd";
import AddForm from "../add-form/add-form";

import "./widget.scss";

const Widget: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { cities } = useSelector((state: RootState) => state);
  const [citiesList, setCitiesList] = useState<CityWeatherAdapted[]>(cities);

  useEffect(() => {
    setCitiesList(cities);
  }, [cities]);

  useEffect(() => {
    setCitiesList(cities);
  }, [cities]);

  return (
    <section className="widget">
      {open ? (
        citiesList.map((city) => <WeatherCard key={city.id} city={city} />)
      ) : (
        <section className="widget-settings">
          <h2 className="widget-settings__title">Settings</h2>
          <DndProvider backend={HTML5Backend}>
            <Container citiesList={citiesList} />
          </DndProvider>
          <AddForm />
        </section>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="widget__btn"
        type="button"
      >
        {open ? <GearIcon /> : <CloseIcon />}
      </button>
    </section>
  );
};

export default Widget;
