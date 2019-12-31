import React from 'react';
import './styles.css';
import api from '../../services/api';

export default class CardBrowser extends React.Component{

    state = {
        searchInput: '',
        cards: []
    }

    componentDidMount(){
        this.loadCards();
    }

    loadCards= async () =>{
        try{
            const response = await api.get('/cards');
            this.setState({cards : response.data});
        }catch(err){
            console.log(err);
            alert('Unable to load cards');
        }
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

        let { cards, searchInput } = this.state;

        const search = searchInput.toLocaleLowerCase();

        const cardFilter = (card) => {
            const line = card.front.concat(card.back).concat(card.deck.name); 
            return line.indexOf(search) >= 0;
        } 

        return (
            cards.filter(cardFilter).map( (card, idxCard) => (
                <tr key={idxCard} onClick={ e => this.props.history.push(`/app/card/${card._id}`)}>
                    <td>{card.deck.name}</td>
                    <td>{card.front}</td>
                    <td>{card.back}</td>
                </tr>
            ))
        );
    }

}