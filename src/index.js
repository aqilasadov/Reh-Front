import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import {MuiThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from "@material-ui/core";
import "../src/assets/scss/material-dashboard-pro-react.css?v=1.4.0";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import MomentUtils from '@date-io/moment';
import "../src/i18n";
import './assets/jss/GridStils.css';
const store = configureStore();
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <App/>
            </MuiPickersUtilsProvider>
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
// serviceWorker.unregister();
