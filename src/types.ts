export interface CityWeatherAdapted {
  base: string;
  visibility: number;
  dt: number;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  main: {
    temp: number;
    feelsLike: number;
    tempMin: number;
    tempMax: number;
    pressure: number;
    humidity: number;
  };
  weather: Weather[];
  coord: {
    lon: number;
    lat: number;
  };
}

export interface CityWeather {
  base: string;
  visibility: number;
  dt: number;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Weather[];
  coord: {
    lon: number;
    lat: number;
  };
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Item {
  id: number;
  originalIndex: number;
}
