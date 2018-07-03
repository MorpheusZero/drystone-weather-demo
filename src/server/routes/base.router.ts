import * as express from 'express';

/**
 * All of the routers will need a reference to the express
 * Router object and will extend this class.
 */
export class BaseRouter {

    /**
     * Reference to the express Router.
     */
    public router: express.Router;

    /**
     * Default Constructor
     */
    constructor() {
        this.router = express.Router();
    }
}