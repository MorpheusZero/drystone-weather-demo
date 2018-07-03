import { AppServer } from './server';

const app: any = AppServer.initialize();
console.log(('App is listening on port %d'), AppServer.app.get('port'));


// AppServer.initialize();.then(() => {
//     console.log(("  App is running at http://localhost:%d in %s mode"), Server.app.get("port"), Server.app.get("env"));
// });