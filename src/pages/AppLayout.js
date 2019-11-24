import React from 'react';
import {Switch, Route} from 'react-router-dom';

import MyDecks from './MyDecks';
import CardBrowser from './CardBrowser';
import Sidebar from '../components/sidebar';
import NewCard from './NewCard';

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
                    <Route path='/app/decks/:deckId/newCard' component={NewCard} />
                </Switch>
            </div>
        </>
    );
};

export default AppLayout;