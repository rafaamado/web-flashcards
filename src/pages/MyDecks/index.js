import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Sidebar from '../../components/sidebar';
import { IoIosAddCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

export default class MyDecks extends React.Component{

    state = {
        modalDisplay: 'none',
        inputDeckName: '',
        inputDeckDescription: '',
        decks: [
            {   
                id: 1,
                name: 'Deck1',
                description: 'teste',
                cardsCount: 50,
                cardsToStudy: 10,
            },
            {
                id: 2,
                name: 'Deck2',
                description: 'teste',
                cardsCount: 30,
                cardsToStudy: 5,
            }
        ]
    }
    handleAddBtn = () => {
        this.setState({modalDisplay: 'block'});
    }

    handleCloseModal = () => {
        this.setState({modalDisplay: 'none'});
    }

    handleCreateDeck = () => {
        const inDeckName = document.getElementById('inDeckName');
        const inDeckDesc = document.getElementById('inDeckDesc');
        const deck = {name: inDeckName.value,  description: inDeckDesc.value, cardsCount: 0};

        const {decks} = this.state;
        decks.push(deck);
        this.setState({decks: decks})

        inDeckName.value='';
        inDeckDesc.value='';
        this.handleCloseModal();
    }

    handleDeleteDeck = (deck) => {
        const {decks} = this.state;
        decks.splice( decks.indexOf(deck) ,1);
        this.setState({decks});
    }

    render(){
        const addBtnStyle = {
            position: 'fixed',
            right: 30,
            bottom: 30,
        };

        return(
            <div className="MyDecks">
                <Sidebar/>
                <header className="decks-header">
                    <span className="header-title">My Decks</span>
                </header>
                <div className="decks-list">
                    {this.renderDecks()}
                </div>

                <div id="myModal" className="modal" style={{display: this.state.modalDisplay}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="close" onClick={this.handleCloseModal}>&times;</span>
                            <h2>New Deck</h2>
                        </div>
                        <div className="modal-body">
                            <label>Deck Name </label>
                            <input id="inDeckName" type="text" placeholder="Ex: English Vocabulary" name="deckName" required/>
                            <label>Deck Description</label>
                            <input id="inDeckDesc" type="text" placeholder="New words learned in English class" name="description"/>
                            
                            <div>
                                <button className="cancel-btn" onClick={this.handleCloseModal}>Cancel</button>
                                <button className="create-btn" onClick={this.handleCreateDeck}>Create</button>
                            </div>                               
                        </div>
                    </div>
                </div>
                <IoIosAddCircle size={75} color="#246fc5" style={addBtnStyle} onClick={this.handleAddBtn}/>
            </div>
        );
    }

    renderDecks(){
        const {decks} = this.state;

        return(
            decks.map( (deck) => (
                <article key={deck.id}>
                    <div className='deck-count vertical-center'>
                        <p>{deck.cardsToStudy}</p>
                    </div>
                    <div className='deck-info vertical-center'>
                        <strong>{deck.name}</strong>
                        <p className='deck-desc'>{deck.cardsCount} cards</p>
                    </div>
                    <Link className='study' to={`/app/decks/${deck.id}/learn`}>Study</Link>
                    <Link className='add' to={`/app/decks/${deck.id}/newCard`}>
                        <IoIosAddCircle className="btnAddCard" size={50} color="#246fc5" />
                    </Link>
                    <Link className='delete' onClick={() => this.handleDeleteDeck(deck)}>
                        <MdDelete size={50} color="#dd0000" />
                    </Link>
                </article>
            ))
        );
    }
}