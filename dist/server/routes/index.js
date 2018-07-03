"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const weather_router_1 = require("./api/weather.router");
/**
 * Contains all logic necessary to define the routes that the server
 * will have access to and how they are built.
 */
class Router {
    /**
     * Initializes and defines all routes that the server will have access to--
     * includes both API and View UI routes that will be rendered server-side.
     * We build them separately just for simplicity and readability.
     * @param {express.Express} app Instance of the running application.
     */
    static initializeRoutes(app) {
        Router.initAPIRoutes(app);
        Router.initViewRoutes(app);
    }
    /**
     * The API routes define routes that we can call for HTTP requests.
     * @param {express.Express} app Instance of the running application.
     */
    static initAPIRoutes(app) {
        app.use('/weather', new weather_router_1.WeatherRouter().router);
    }
    /**
     * The View routes define routes that we can call to render HTML from server to client.
     * @param {express.Express} app Instance of the running application.
     */
    static initViewRoutes(app) {
        // app.use('/', new ClientRouter().router);
    }
}
exports.Router = Router;
//# sourceMappingURL=index.js.map