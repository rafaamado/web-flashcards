import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import AppLayout from './pages/AppLayout';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/app" component={AppLayout} />
        </Switch>
    </BrowserRouter>
);

export default Routes;