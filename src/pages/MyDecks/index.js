import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Sidebar from '../../components/sidebar';
import { IoIosAddCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import api from "../../services/api";

export default class MyDecks extends React.Component{

    state = {
        modalDisplay: 'none',
        inputDeckName: '',
        inputDeckDescription: '',
        decks: []
    }

    componentDidMount(){
        this.loadDecks();
    }
    loadDecks= async () =>{
        try{
            const response = await api.get('/deck/mydecks');
            this.setState({decks : response.data});
        }catch(err){
            console.log('Failed to retrieve user decks: ',err);
        }
    }
    
    handleAddBtn = () => {
        this.setState({modalDisplay: 'block'});
    }

    handleCloseModal = () => {
        this.setState({modalDisplay: 'none'});
    }

    handleCreateDeck = async () => {
        // testing other way of get values from inputs
        const inDeckName = document.getElementById('inDeckName');
        const inDeckDesc = document.getElementById('inDeckDesc');
        let deck = {
            name: inDeckName.value,
            description: inDeckDesc.value
        };

        try{
            const response = await api.post('/deck', deck);

            const {decks} = this.state;
            response.data.totalCards = 0;        
            response.data.cardsToStudy = 0;
            
            decks.push(response.data);
            this.setState({decks: decks});

            inDeckName.value='';
            inDeckDesc.value='';
            this.handleCloseModal();
        }catch(err){
            console.log(err);
            alert('Failed to create deck');
        }
    }

    handleDeleteDeck = async (deck) => {
        const {decks} = this.state;
        try{
            const confir = window.confirm("Are you sure you want to delete this deck? All the cards from this decks are gonna be deleted!");
            if (confir === true){
                await api.delete(`/deck/${deck._id}`);
                decks.splice( decks.indexOf(deck) ,1);
                this.setState({decks});
            }
        }catch(err){
            console.log(err);
            alert('Failed to delete deck.');
        }

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
                <article key={deck._id}>
                    <div className='deck-count vertical-center'>
                        <p>{deck.cardsToStudy}</p>
                    </div>
                    <div className='deck-info vertical-center'>
                        <strong>{deck.name}</strong>
                        <p className='deck-desc'>{deck.totalCards} cards</p>
                    </div>
                    <Link className='study' to={`/app/decks/${deck._id}/learn`}>Study</Link>
                    <Link className='add' to={`/app/decks/${deck._id}/newCard`}>
                        <IoIosAddCircle className="btnAddCard" size={50} color="#246fc5" />
                    </Link>
                    <Link to={'#'} className='delete' onClick={() => this.handleDeleteDeck(deck)}>
                        <MdDelete size={50} color="#dd0000" />
                    </Link>
                </article>
            ))
        );
    }
}