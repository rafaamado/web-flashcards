import React from 'react';
import './styles.css';
import Sidebar from '../../components/sidebar';


export default class MyDecks extends React.Component{

    state = {
        decks: [
            {
                name: 'Deck 1',
                descripttion: 'teste',
                cardsCount: 50
            },
            {
                name: 'Deck 1',
                descripttion: 'teste',
                cardsCount: 50
            }
        ]
    }

    render(){
        return(
            <div className="MyDecks">
                <Sidebar/>
                <header className="decks-header">
                    <span className="header-title">My Decks</span>
                </header>
                <div className="decks-list">
                    {this.renderDecks()}
                </div>
            </div>
        );
    }

    renderDecks(){
        const {decks} = this.state;

        return(
            decks.map( (deck, index) => (
                <article key={index}>
                    <strong>{deck.name}</strong>
                    <p>{deck.descripttion}</p>
                    <p>{deck.cardsCount}</p>
                </article>
            ))
        );
    }
}