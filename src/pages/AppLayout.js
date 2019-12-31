import React from 'react';
import {Switch, Route} from 'react-router-dom';

import MyDecks from './MyDecks';
import CardBrowser from './CardBrowser';
import Sidebar from '../components/sidebar';
import NewCard from './NewCard';
import EditCard from './EditCard';
import LearnCard from './LearnCard';

const AppLayout = () => {
    return (
        <>
            <Sidebar/>
            {/* MarginLeft: Same as the width of the sidenav */}
            <div className="main-content" style={{marginLeft: '200px', marginTop:0, height: '100%'}}>
                <Switch>
                    <Route exact path='/app' component={MyDecks} />
                    <Route exact path='/app/decks' component={MyDecks} />
                    <Route exact path='/app/cards' component={CardBrowser} />
                    <Route path='/app/decks/:deckId/newCard' component={NewCard} />
                    <Route path='/app/card/:cardId' component={EditCard} />
                    <Route path='/app/decks/:deckId/learn' component={LearnCard} />
                </Switch>
            </div>
        </>
    );
};

export default AppLayout;