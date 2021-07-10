import React from "react";
import WeatherCard from "../weather-card/weather-card";
import GearIcon from "../UI/icons/gear-icon/gear-icon";
import CloseIcon from "../UI/icons/close-icon/close-icon";
import WidgetSettings from "../widget-settings/widget-settings";
import useCities from "../../hooks/useCities";

const Widget: React.FC = () => {
  const { handleButtonClick, setCitiesList, citiesList, open } = useCities();

  return (
    <section className="widget">
      {citiesList.length < 1 && (
        <h1
          className={`widget__title ${
            citiesList.length > 0 && "visually-hidden"
          }`}
        >
          add the city in which you want to know the weather
        </h1>
      )}
      {open ? (
        citiesList.map((city) => <WeatherCard key={city.id} city={city} />)
      ) : (
        <WidgetSettings citiesList={citiesList} onCitiesList={setCitiesList} />
      )}
      <button
        onClick={handleButtonClick}
        className="widget__btn"
        type="button"
        aria-label="Gear"
      >
        {open ? <GearIcon /> : <CloseIcon />}
      </button>
    </section>
  );
};

export default Widget;
