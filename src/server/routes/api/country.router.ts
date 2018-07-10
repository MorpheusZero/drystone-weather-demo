import * as express from 'express';
import { BaseRouter } from '../base.router';
import {
    map,
    isEmpty
} from 'lodash';
import * as request from 'request';
import { CountryCodeModel } from '../../../models/country-code.model';

/**
 * A RestCountriesEU API implementation of a few endpoints found here:
 * https://restcountries.eu/#api-endpoints-all
 */
export class CountryRouter extends BaseRouter {

    /**
     * The base gateway URL for communicating with the RestCountriesEU APIs.
     */
    private gatewayUrl: string;

    /**
     * Default Constructor
     */
    constructor() {
        super();
        this.gatewayUrl = 'https://restcountries.eu/rest/v2/';
        this.buildRoutes();
    }

    /**
     * Returns a list of all country names and their codes.
     * @param {express.Request} req The request from the client to the server.
     * @param {express.Response} res The response from the server to the client.
     * @param {express.NextFunction} next Execute the next middleware.
     */
    public async getAllCountries(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const url: string = `${this.gatewayUrl}all`;
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
            // If there is data--we need to map it out to only return the properties we care about.
            if(!isEmpty(resData)) {
                const countries: Array<CountryCodeModel> = map(JSON.parse(resData), (item: any) => {
                    return {
                        countryName: item.name,
                        countryCode: item.alpha2Code.toLowerCase()
                    };
                });
                res.json(Object.freeze({
                    data: countries
                }));
            } else {
                res.status(500);
                res.json(Object.freeze({
                    error: 'An error occured when attempting to communicate with the RestCountriesEU Server.'
                }));
            }
            next();
        } catch (error) {
            next(error);
        }
    }

    /**
     * Binds the routes to the router and a path.
     */
    private buildRoutes() {
        this.router.get('/', this.getAllCountries.bind(this));
    }
}