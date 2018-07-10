import * as React from 'react';
import { render } from 'react-dom';
import HomePage from './HomePage';

/**
 * For Bootstrap JQUERY
 */
require('bootstrap');

/**
 * Bootstrap the application
 */
render(React.createElement(HomePage), document.getElementById('app'));
