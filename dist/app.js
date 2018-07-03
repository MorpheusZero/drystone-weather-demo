"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const app = server_1.AppServer.initialize();
console.log(('App is listening on port %d'), server_1.AppServer.app.get('port'));
// AppServer.initialize();.then(() => {
//     console.log(("  App is running at http://localhost:%d in %s mode"), Server.app.get("port"), Server.app.get("env"));
// });
//# sourceMappingURL=app.js.map