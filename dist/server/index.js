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
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
class AppServer {
    // TODO Make all of this async
    constructor() { }
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
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
                routes_1.Router.initializeRoutes(AppServer.app);
                // Returns the instance of the server that is listening on the specified port.
                return AppServer.app.listen(AppServer.app.get('port'));
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
}
exports.AppServer = AppServer;
//# sourceMappingURL=index.js.map