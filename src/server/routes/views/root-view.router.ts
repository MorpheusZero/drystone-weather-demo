import * as express from 'express';
import { BaseRouter } from '../base.router';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import HomePage from '../../../client/HomePage';
import html from '../../../client/html';

/**
 * Returns the HTML string to render on the client side for the main root view.
 */
export class RootViewRouter extends BaseRouter {

    /**
     * Default Constructor
     */
    constructor() {
        super();
        this.buildRoutes();
    }

    /**
     * Returns the root view page.
     * @param {express.Request} req The request from the client to the server.
     * @param {express.Response} res The response from the server to the client.
     * @param {express.NextFunction} next Execute the next middleware.
     */
    public async getRootView(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const body = renderToString(React.createElement(HomePage));
            const title = 'DrystoneWeatherDemo - Home';
          
            res.send(
              html({
                body,
                title
              })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Binds the routes to the router and a path.
     */
    private buildRoutes() {
        this.router.get('/', this.getRootView.bind(this));
    }
}