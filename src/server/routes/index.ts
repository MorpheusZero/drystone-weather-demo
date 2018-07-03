import * as express from 'express';
import { WeatherRouter } from './api/weather.router';
import { CountryRouter } from './api/country.router';

/**
 * Contains all logic necessary to define the routes that the server 
 * will have access to and how they are built.
 */
export class Router {

    /**
     * Initializes and defines all routes that the server will have access to--
     * includes both API and View UI routes that will be rendered server-side.
     * We build them separately just for simplicity and readability.
     * @param {express.Express} app Instance of the running application.
     */
    public static initializeRoutes(app: express.Express): void {
        Router.initAPIRoutes(app);
        Router.initViewRoutes(app);
    }

    /**
     * The API routes define routes that we can call for HTTP requests.
     * @param {express.Express} app Instance of the running application.
     */
    private static initAPIRoutes(app: express.Express): void {
        app.use('/weather', new WeatherRouter().router);
        app.use('/countries', new CountryRouter().router);
    }

    /**
     * The View routes define routes that we can call to render HTML from server to client.
     * @param {express.Express} app Instance of the running application.
     */
    private static initViewRoutes(app: express.Express): void {
        // app.use('/', new ClientRouter().router);
    }
}