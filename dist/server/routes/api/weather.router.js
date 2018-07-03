"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_router_1 = require("../base.router");
const request = require("request");
/**
 * An OPenWeatherMap API implementation of a few endpoints found here:
 * https://openweathermap.org/api
 */
class WeatherRouter extends base_router_1.BaseRouter {
    /**
     * Default Constructor
     */
    constructor() {
        super();
        /**
         * A mapping of which type of route we can hit for the OpenWeatherMap API.
         */
        this.routeMapping = Object.freeze({
            CURRENT_WEATHER: 'weather',
            FIVE_DAY_FORECAST: 'forecast'
        });
        this.apiKey = process.env.OPEN_WEATHER_MAP_API_KEY ? process.env.OPEN_WEATHER_MAP_API_KEY : '';
        this.gatewayUrl = process.env.OPEN_WEATHER_MAP_GATEWAY ? process.env.OPEN_WEATHER_MAP_GATEWAY : '';
        this.buildRoutes();
    }
    /**
     * Retrieves the current weather information for the specified criteria.
     * @param {express.Request} req The request from the client to the server.
     * @param {express.Response} res The response from the server to the client.
     * @param {express.NextFunction} next Execute the next middleware.
     */
    getCurrentWeather(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.isRequestValid(req.query)) {
                    const url = `${this.gatewayUrl}${this.routeMapping.CURRENT_WEATHER}?zip=${req.query.zip},us&APPID=${this.apiKey}`;
                    const response = yield request.get(url);
                    const resData = yield (new Promise((resolve, reject) => {
                        request(url, (error, res, body) => {
                            if (!error && res.statusCode == 200) {
                                resolve(body);
                            }
                            else {
                                reject(error);
                            }
                        });
                    }));
                    res.json(Object.freeze({
                        data: JSON.parse(resData)
                    }));
                }
                else {
                    res.status(400);
                    res.json(Object.freeze({
                        error: '?zip=xxxxx is a required query param!'
                    }));
                    res.end();
                }
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Retrieves the five day forecast for the specified criteria.
     * @param {express.Request} req The request from the client to the server.
     * @param {express.Response} res The response from the server to the client.
     * @param {express.NextFunction} next Execute the next middleware.
     */
    getFiveDayForecast(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(Object.freeze({
                    message: 'GET_FIVE_DAY_FORECAST_TEST'
                }));
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * Determines if the request is valid by checking if ZIP was passed as a query param.
     * @param {any} query The query params associated with the request. We require that zip always be passed.
     */
    isRequestValid(query) {
        return !!query.zip;
    }
    /**
     * Binds the routes to the router and a path.
     */
    buildRoutes() {
        this.router.get('/current', this.getCurrentWeather.bind(this));
        this.router.get('/fiveday', this.getFiveDayForecast.bind(this));
    }
}
exports.WeatherRouter = WeatherRouter;
//# sourceMappingURL=weather.router.js.map