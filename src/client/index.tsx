import * as React from 'react';
import { render } from 'react-dom';
import App from './App';

/**
 * For Bootstrap JQUERY
 */
require('bootstrap');

/**
 * Bootstrap the application
 */
render(React.createElement(App), document.getElementById('app'));
