import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

/** Localization Imports **/
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import it from 'react-intl/locale-data/it';

addLocaleData(en);
addLocaleData(it);
/*****************************/

const app = (
    <Router basename="/reset-password">
        <App />
    </Router>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
