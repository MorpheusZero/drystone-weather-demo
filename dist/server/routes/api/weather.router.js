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
class WeatherRouter extends base_router_1.BaseRouter {
    /**
     * Default Constructor
     */
    constructor() {
        super();
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
                res.json(Object.freeze({
                    message: 'GET_CURRENT_TEST'
                }));
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
     * Binds the routes to the router and a path.
     */
    buildRoutes() {
        this.router.get('/current', this.getCurrentWeather.bind(this));
        this.router.get('/fiveday', this.getFiveDayForecast.bind(this));
    }
}
exports.WeatherRouter = WeatherRouter;
//# sourceMappingURL=weather.router.js.map