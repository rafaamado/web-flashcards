import React from 'react';
import './styles.css';

export default class CardBrowser extends React.Component{

    state = {
        searchInput: '',
        decks: [
            {
                id: 1,
                name: 'Deck1',
                cards:[
                    {
                        front: 'a stupid or careless mistake\nerro, mancada',
                        back: 'blunder\nto make a terrible blunder',
                    },
                    {
                        front: 'walk in a specific way',
                        back: 'to tread, trod, trodden',

                    }]
            },
            {
                id: 2,
                name: 'Deck2',
                cards:[
                    {
                        front: 'palavra 1',
                        back: 'palavra 2',
                    },
                    {
                        front: 'palavra 2',
                        back: 'palavra 2',
                    }]
            }
        ]
    }

    handleSearch = (event) => {
        this.setState({searchInput: event.target.value})
    }

    render(){
        this.renderCards();

        return(
            <div className="CardBrowser">
                <h2>My Cards</h2>

                <input type="text" id="myInput" onKeyUp={this.handleSearch} placeholder="Search for cards..." title="Type in something"/>

                <table id="cardsTable">
                    <tbody>
                        <tr className="header">
                            <th style={{width: '10%'}}>Deck</th>
                            <th style={{width: '45%'}}>Name</th>
                            <th style={{width: '45%'}}>Country</th>
                        </tr>

                        {this.renderCards()}
                    </tbody>
                </table>
            </div>
        );
    }

    renderCards(){

        let { decks, searchInput } = this.state;

        const search = searchInput.toLocaleLowerCase();

        const cardFilter = (card) => {
            const line = card.front.concat(card.back) 
            return line.indexOf(search) >= 0;
        } 

        return (
            decks.map((deck, idxDeck) => (
                    deck.cards.filter(cardFilter).map((card, idxCard) => (
                        <tr key={idxCard}>
                            <td>{deck.name}</td>
                            <td>{card.front}</td>
                            <td>{card.back}</td>
                        </tr>
                    ))
                ))
        );
    }

}