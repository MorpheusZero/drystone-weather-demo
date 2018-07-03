import * as express from 'express';
import { BaseRouter } from '../base.router';

export class WeatherRouter extends BaseRouter {

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
    public async getCurrentWeather(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            res.json(Object.freeze({
                message: 'GET_CURRENT_TEST'
            }));
            next();
        } catch (error) {
            next(error);
        }
    }

    /**
     * Retrieves the five day forecast for the specified criteria.
     * @param {express.Request} req The request from the client to the server.
     * @param {express.Response} res The response from the server to the client.
     * @param {express.NextFunction} next Execute the next middleware.
     */
    public async getFiveDayForecast(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            res.json(Object.freeze({
                message: 'GET_FIVE_DAY_FORECAST_TEST'
            }));
            next();
        } catch (error) {
            next(error);
        }
    }

    /**
     * Binds the routes to the router and a path.
     */
    private buildRoutes() {
        this.router.get('/current', this.getCurrentWeather.bind(this));
        this.router.get('/fiveday', this.getFiveDayForecast.bind(this));
    }
}