import React from 'react';
import {Switch, Route, useParams, useRouteMatch} from 'react-router-dom';

import MyDecks from './MyDecks';
import CardBrowser from './CardBrowser';
import Sidebar from '../components/sidebar';

const AppLayout = () => {
    return (
        <>
            <Sidebar/>
            {/* MarginLeft: Same as the width of the sidenav */}
            <div className="main-content" style={{marginLeft: '200px'}}>
                <Switch>
                    <Route exact path='/app' component={MyDecks} />
                    <Route exact path='/app/decks' component={MyDecks} />
                    <Route exact path='/app/cards' component={CardBrowser} />
                </Switch>
            </div>
        </>
    );
};

export default AppLayout;