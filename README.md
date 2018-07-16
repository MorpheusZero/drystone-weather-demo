# DrystoneWeatherDemo
An OpenWeatherMap API Implementation Demo Test

TEST

## Tech Stack

To build this demo application, we utilized the following base technologies in our stack (in no particular order):

   - [Node](https://nodejs.org/en/)
   - [Express](https://expressjs.com/)
   - [Typescript](https://www.typescriptlang.org/)
   - [React](https://reactjs.org/)
   - [Lodash](https://lodash.com/)
   - [Moment](https://momentjs.com/)
   - [Request](https://github.com/request/request) - SERVER
   - [Axios](https://github.com/axios/axios) - CLIENT
   - [Webpack](https://webpack.js.org/)
   - [Bootstrap](https://getbootstrap.com/)
   - [Normalize.css](https://necolas.github.io/normalize.css/)
   - [Underscore.js](https://underscorejs.org/)

   

   

In addition to Typescript--[async/await](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html) patterns from ES6 were also used.

## WeatherAPI Implementation

   - [OpenWeatherMap API](https://openweathermap.org/api)

#### Get Current Weather
```javascript
By Zipcode
GET: ~/weather/current?zip=<NUMBER>&countryCode=<COUNTRY_CODE>

By City Name
GET: ~/weather/current?q=<CITY_NAME>&countryCode=<COUNTRY_CODE>
```

#### Get Five Day Forecast
```
By Zipcode
GET: ~/weather/fiveday?zip=<NUMBER>&countryCode=<COUNTRY_CODE>

By City Name
GET: ~/weather/fiveday?q=<CITY_NAME>&countryCode=<COUNTRY_CODE>
```

** Country Code can be obtained from the below implementation of the countries endpoint.

## RestCountriesAPI Implementation

   - [RestCountriesEU API](https://restcountries.eu/#api-endpoints-all)

#### Get All Countries
```
GET: ~/countries
```

## CircleCI Build & Deployment

This project makes use of the CircleCI automated build and deployment processes. To this end--we have two major branches that are checked on the github repo: STAGING, and MASTER.

This is just a short and small demo showcasing how this technologaly can be easily integrated into any project. You can make it much more robust with automated testing and reports with some minor tweaks.

#### Building

Everytime code is pushed to the STAGING branch of the Github repo--CircleCI performs a preset job that I have defined to attempt cpmiling the code to ensure that everything builds. This is especially important because I developed all of this in a Windows environment--however, the code gets built and deployed to a Linux environment.

#### Deployment

The deployment process is very similar--I open a Pull Request to the MASTER branch--and perform a merge. The same build process happens (as a test to make sure it works)--then a second step pushes the code to our Heroku instance and runs the start command to begin running the application.

## A little more in depth about the build

This project contains the client-side app (REACT) and the server-side API (Node/Express) all in one project. Although it is currently not set up for server-side-rendering of the client-app--it is capable of doing so with some minor tweaks because of this design decision.

Because of this structure--we use Webpack to build out two separate bundles (one for client and one for server). We do this because Webpack options for building ES6 for Node and for Web Browsers varies a bit--and also to keep it simple to distinguish where code is coming from. The output to the dist folder is an `app.server.js` and another `app.client.js`.

When we issue the node command to run the server--it uses the root route `/` to serve up a static HTML file that we have referenced the `app.client.js` inside of--and it gets served up as well. So technically, the server is the entry-point to the entire application--even though there are two separate files.

## About buildScript.sh

This file is currently used before the actual webpack builds for two things:
   - To copy some static files to the DIST directory--such as index.html and favicons.
   - Detect our environment variables and make adjustments to our configuration, depending on the deployment.

If you run the buildScript.sh with the prod flag: `buildScript.sh prod`--it will change the config file to point to the production environment variables instead of the local environment variables.
