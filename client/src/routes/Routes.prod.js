import React from 'react'
import PropTypes from 'prop-types'
import {PnkProvider} from '../pnk-react/pnk-miniredux/';
import {pnkstore} from "../stores/pnk-store";

import {Pnk_Error_Ctrl} from '../pnk-react/errors/error-ctrl'

import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import {HomePage} from '../containers/Home/HomePage'
import {LoginContainer} from '../containers/Home/login'
import {LeadsPage} from '../containers/Dashboard/Leads'

const Root = () => (
    <PnkProvider store={pnkstore}>
      <BrowserRouter basename="/">
        <div>
          <Pnk_Error_Ctrl/>
          <Switch>
          <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginContainer} />
            <Route exact path="/leads" component={LeadsPage} />
            {/******************** 404 Page Route *********************/}
            {/* <Route exact path="*" component={NotFound}/> */}
          </Switch>
          {/* <Route exact path="/purchase" component={BuyPage} /> */}
        </div>
      </BrowserRouter>
    </PnkProvider>
)
Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root