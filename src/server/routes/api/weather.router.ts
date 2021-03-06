import * as express from 'express';
import { BaseRouter } from '../base.router';
import * as request from 'request';
import { WeatherRequestModel } from '../../../models/weather-request.model';

/**
 * An OPenWeatherMap API implementation of a few endpoints found here:
 * https://openweathermap.org/api
 */
export class WeatherRouter extends BaseRouter {

    /**
     * The OpenWeatherMap API Key that is required for all requests.
     */
    private apiKey?: string;

    /**
     * The base gateway URL for communicating with the OpenWeatherMap APIs.
     */
    private gatewayUrl?: string;

    /**
     * A mapping of which type of route we can hit for the OpenWeatherMap API.
     */
    private readonly routeMapping: any = Object.freeze({
        CURRENT_WEATHER: 'weather',
        FIVE_DAY_FORECAST: 'forecast'
    });

    /**
     * Default Constructor
     */
    constructor() {
        super();
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
    public async getCurrentWeather(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if(this.isRequestValid(req.query)) {
                const url: string = `${this.gatewayUrl}${this.routeMapping.CURRENT_WEATHER}${this.buildQueryParams(req.query)}&APPID=${this.apiKey}&units=imperial`;
                const response: any = await request.get(url);
                const resData: any = await (new Promise((resolve, reject) => {
                    request(url, (error, res, body) => {
                      if (!error && res.statusCode == 200) {
                        resolve(body);
                      } else {
                        reject(error);
                      }
                    });
                }));
                res.json(Object.freeze({
                    data: JSON.parse(resData)
                }));
            } else {
                res.status(400);
                res.json(Object.freeze({
                    error: 'You must provide the necessary query params! {zip, countryCode, cityName}'
                }));
                res.end();
            }
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
            if(this.isRequestValid(req.query)) {
                const url: string = `${this.gatewayUrl}${this.routeMapping.FIVE_DAY_FORECAST}${this.buildQueryParams(req.query)}&APPID=${this.apiKey}&units=imperial`;
                const response: any = await request.get(url);
                const resData: any = await (new Promise((resolve, reject) => {
                    request(url, (error, res, body) => {
                      if (!error && res.statusCode == 200) {
                        resolve(body);
                      } else {
                        reject(error);
                      }
                    });
                  }));
                res.json(Object.freeze({
                    data: JSON.parse(resData)
                }));
            } else {
                res.status(400);
                res.json(Object.freeze({
                    error: 'You must provide the necessary query params! {zip, countryCode, cityName}'
                }));
                res.end();
            }
            next();
        } catch (error) {
            next(error);
        }
    }

    /**
     * Determines if the request is valid by checking if required params were passed as a query param.
     * @param {any} query The query params associated with the request.
     */
    private isRequestValid(query: WeatherRequestModel): boolean {
        // We require at least ONE--zip or city name.
        if ((query.zip || query.cityName) && query.countryCode) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Based on which query params are passed in, builds the string we need.
     * @param {WeatherRequestModel} query The request query parameters.
     */
    private buildQueryParams(query: WeatherRequestModel): string {
        const urlFragment: string = '?' + (query.zip ? 'zip=' + query.zip + ',' + query.countryCode : '') + (query.cityName ? 'q=' + query.cityName + ',' + query.countryCode : '');
        return urlFragment;
    }

    /**
     * Binds the routes to the router and a path.
     */
    private buildRoutes() {
        this.router.get('/current', this.getCurrentWeather.bind(this));
        this.router.get('/fiveday', this.getFiveDayForecast.bind(this));
    }
}