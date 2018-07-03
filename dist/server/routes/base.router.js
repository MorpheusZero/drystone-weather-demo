"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
/**
 * All of the routers will need a reference to the express
 * Router object and will extend this class.
 */
class BaseRouter {
    /**
     * Default Constructor
     */
    constructor() {
        this.router = express.Router();
    }
}
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=base.router.js.map