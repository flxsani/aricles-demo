import React from 'react'
import PropTypes from 'prop-types'
import { PnkProvider } from '../pnk-react/pnk-miniredux';
import { pnkstore } from "../stores/pnk-store";

import { Pnk_Error_Ctrl } from '../pnk-react/errors/error-ctrl'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SinglePageLayout from '../layouts/singlepagelayout';
import AdminLayout from '../layouts/adminlayout';
import { HeaderCtrl as Header } from '../common/header';
import { FooterCtrl as Footer } from '../common/footer';
import { Home } from '../components/home';
import About from '../components/about';
import { LoginCtrl } from '../components/login';
import { RegisterCtrl } from '../components/register';
import { ForgetPasswordCtrl } from '../components/forgetpassword';
import { ArticleMasterList } from '../components/admin-components/articlemasterlist';
import { ArticleList } from '../components/articlelist';

const Root = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path="/" render={props => (<LoginCtrl {...props} />)} />
                <Route exact path="/register" render={props => (<RegisterCtrl {...props} />)} />
                <Route exact path="/forgetpassword" render={props => (<ForgetPasswordCtrl {...props} />)} />
                <Route path="/admin" render={props => (<ArticleMasterList {...props} />)} />
                <Route path="/articles" render={props => (<ArticleList {...props} />)} />
            </Switch>
        </BrowserRouter>
    )
}
Root.propTypes = {
    store: PropTypes.object.isRequired,
}
export default Root