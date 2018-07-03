import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Router } from './routes';

export class AppServer {

    public static app: express.Express;

    // TODO Make all of this async
    constructor() {}

    public static async initialize(): Promise<any> {
        try {
            // This is called first to parse the .env file at the project root and inject our environment variables.
            require('dotenv').config();

            // Initialize the express server.
            AppServer.app = express();

            // If our deployment has set a port--use that--otherwise, default to the .env port for local.
            AppServer.app.set('port', process.env.PORT || process.env.APP_PORT);

            // Used for parsing body messages in requests/responses.
            AppServer.app.use(bodyParser.urlencoded({ extended: true }));
            AppServer.app.use(bodyParser.json());

            // Initialize Routes that the application can use.
            Router.initializeRoutes(AppServer.app);

            // Returns the instance of the server that is listening on the specified port.
            return AppServer.app.listen(AppServer.app.get('port'));
        } catch(error) {
            console.log(error);
        }
        return null;
    }
}