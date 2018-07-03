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
const lodash_1 = require("lodash");
const request = require("request");
/**
 * A RestCountriesEU API implementation of a few endpoints found here:
 * https://restcountries.eu/#api-endpoints-all
 */
class CountryRouter extends base_router_1.BaseRouter {
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
    getAllCountries(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `${this.gatewayUrl}all`;
                const response = yield request.get(url);
                const resData = yield (new Promise((resolve, reject) => {
                    request(url, (error, res, body) => {
                        if (!error && res.statusCode == 200) {
                            resolve(body);
                        }
                        else {
                            reject(error);
                        }
                    });
                }));
                // If there is data--we need to map it out to only return the properties we care about.
                if (!lodash_1.isEmpty(resData)) {
                    const countries = lodash_1.map(JSON.parse(resData), (item) => {
                        return {
                            countryName: item.name,
                            countryCode: item.alpha2Code.toLowerCase()
                        };
                    });
                    res.json(Object.freeze({
                        data: countries
                    }));
                }
                else {
                    res.status(500);
                    res.json(Object.freeze({
                        error: 'An error occured when attempting to communicate with the RestCountriesEU Server.'
                    }));
                }
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
        this.router.get('/', this.getAllCountries.bind(this));
    }
}
exports.CountryRouter = CountryRouter;
//# sourceMappingURL=country.router.js.map