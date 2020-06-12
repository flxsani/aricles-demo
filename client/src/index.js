import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Root from './containers/Root';
import * as serviceWorker from './serviceWorker';
import { PnkProvider } from './pnk-react/pnk-miniredux';
import { pnkstore } from "./stores/pnk-store";

ReactDOM.render(
  <PnkProvider store={pnkstore}>
    <Root />
  </PnkProvider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();




