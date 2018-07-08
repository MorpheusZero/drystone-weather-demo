'use strict';

const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appDist = resolveApp('dist');
const appDistStatic = resolveApp('dist/static');
const appServerEntry = resolveApp('src/app.ts');
const appClientEntry = resolveApp('src/client/index.tsx');
const appClientStyles = resolveApp('src/client/styles.scss');

module.exports = {
  appDist: appDist,
  appDistStatic: appDistStatic,

  // Returns the entry files depending on which platform we are building for.
  getAppEntryFiles: (platform) => {
    if (platform === 'server') {
      return [appServerEntry];
    } else if (platform === 'client') {
      return [appClientEntry, appClientStyles];
    }
  }
}