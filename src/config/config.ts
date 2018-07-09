/**
 * Config is modified during the build process to pull in the correct environment config.
 */
const json = require('./env.json');

// This is for local testing only--when ran with --prod flag--the buildScript will .replace('json.local', 'json.prod');
export default json.local;