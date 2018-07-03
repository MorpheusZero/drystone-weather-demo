# DrystoneWeatherDemo
An OpenWeatherMap API Implementation Demo Test

## Tech Stack

To build this demo application, we utilized the following base technologies in our stack (in no particular order):

   - [Node](https://nodejs.org/en/)
   - [Express](https://expressjs.com/)
   - [Typescript](https://www.typescriptlang.org/)
   - [React](https://reactjs.org/)
   - [TSLint](https://palantir.github.io/tslint/)
   - [Lodash](https://lodash.com/)
   - [Moment](https://momentjs.com/)
   - [Request](https://github.com/request/request)
   - [dotenv](https://github.com/motdotla/dotenv)

In addition to Typescript--[async/await](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html) patterns from ES6 were also used.

## WeatherAPI Implementation

   - [OpenWeatherMap API](https://openweathermap.org/api)

#### Get Current Weather
```javascript
By Zipcode
GET: ~/weather/current?zip=<NUMBER>,<COUNTRY_CODE>

By City Name
GET: ~/weather/current?q=<CITY_NAME>,<COUNTRY_CODE>
```

#### Get Five Day Forecast
```
By Zipcode
GET: ~/weather/fiveday?zip=<NUMBER>,<COUNTRY_CODE>

By City Name
GET: ~/weather/fiveday?q=<CITY_NAME>,<COUNTRY_CODE>
```

** Country Code can be obtained from the below implementation of the countries endpoint.

## RestCountriesAPI Implementation

   - [RestCountriesEU API](https://restcountries.eu/#api-endpoints-all)

#### Get All Countries
```
GET: ~/countries
```