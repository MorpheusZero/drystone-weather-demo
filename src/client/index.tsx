import * as React from 'react';
import { render } from 'react-dom';
import App from './App';

/**
 * Import any global CSS
 */
// import 'normalize.css';
// require('normalize.css');

/**
 * Bootstrap the application
 */
render(React.createElement(App), document.getElementById('app'));
