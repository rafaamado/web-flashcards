import React from 'react';
import './styles.css';
import { MdKeyboard } from 'react-icons/md';
import { AiFillSound } from 'react-icons/ai';
import api from '../../services/api';

export default class LearnCard extends React.Component{
    state={
        cards: [],
        idxCurCard: 0,
        displayAnswer: 'none',
        userAnswer: ''
    }
    componentDidMount(){
        this.loadCards();

        const randomCard = Math.floor(Math.random() * this.state.cards.length);
        this.setState({idxCurCard: randomCard});
    }

    loadCards = async () => {
        try{
            const deckId = this.props.match.params.deckId;
            const response = await api.get(`/deck/${deckId}/learn`);

            this.setState({cards : response.data});
        }catch(err){
            console.log(err);
            //alert('Failed to load cards from deck!');
        }
    }

    handleShowAnswer= () => {
        this.setState({displayAnswer: 'block'});
    }

    saveCardProgress= async (answer) => {
        try{
            const deckId = this.props.match.params.deckId;
            const {cards, idxCurCard} = this.state;
            const card = cards[idxCurCard];

            //console.log(JSON.stringify({answer, card}));
            const response = await api.put(`/deck/${deckId}/card/${card._id}/learn`, {answer, card});
            console.log(response.data);

            cards[idxCurCard] = response.data;
            this.setState({cards: cards});

        }
        catch(err){
            console.log(err);
        }
    }
    
    handleWrong = async () => {
        await this.saveCardProgress('WRONG');
        this.nextCard(false);
    }
    handleHard = async () => {
        await this.saveCardProgress('HARD');
        this.nextCard();
    }
    handleGood = async() =>{
        await this.saveCardProgress('GOOD');
        this.nextCard();
    }
    handleEasy = async () => {
        await this.saveCardProgress('EASY');
        this.nextCard();
    }

    nextCard= (remove = true) => {
        const {cards, idxCurCard} = this.state;
        if (remove) 
            cards.splice(idxCurCard, 1);

        const randomCard = Math.floor(Math.random() * cards.length);
        this.setState({displayAnswer: 'none', idxCurCard: randomCard, cards, userAnswer: ''});
    }

    handleUserInput = () => {
        const userTxt =  prompt("Type your answer:");
        if (userTxt === null) 
            return;

        this.setState({displayAnswer: 'block', userAnswer: userTxt});
    }


    render(){
        const {cards, idxCurCard} = this.state;
        let card;
        if (cards.length > 0) card = cards[idxCurCard];

        return (
        <div className='LearnCard'>
            { cards.length > 0 ? this.renderCard(card) : this.renderFininished()}
        </div>
        );
    }

    renderCard(card){
        const frontCard = card.front.split('\n');
        const backCard = card.back.split('\n');
        const {displayAnswer} = this.state;

        return (
        <div className='card'>
            <div className='front-card'>
                <p><AiFillSound className='sound-icon'/><strong>{frontCard[0]} </strong></p>
                {frontCard.map( (detail, index) => (
                    index === 0 ? null : <p key={index}><AiFillSound className='sound-icon'/>{detail}</p>
                ))}
                <MdKeyboard size={40} onClick={this.handleUserInput} /> 
            </div>
            <div className='back-card' style={{display: displayAnswer}}>
                <hr/>
                {this.renderUserAnswer(card)}
                <p><strong><AiFillSound className='sound-icon'/>{backCard[0]}</strong></p>
                {backCard.map( (detail, index) => (
                    index === 0 ? null : <p key={index}><AiFillSound className='sound-icon'/>{detail}</p>
                ))} 
            </div>
            <button className='btn-show' onClick={this.handleShowAnswer} 
                style={{display: displayAnswer === 'none' ? 'block' : 'none' }}>SHOW ANSWER
            </button>
            <div className='btns-ans' style={{display: displayAnswer}}>
                <span className='wrong' onClick={this.handleWrong}>
                    <p className='answer'>Wrong</p>
                    <p className='nxt-review'>(Today)</p> 
                </span>
                <span className='hard' onClick={this.handleHard}>
                    <p className='answer'>Hard</p>
                    <p className='nxt-review'>({card.progress.HARD} days)</p> 
                </span>
                <span className='good' onClick={this.handleGood}>
                    <p className='answer'>Good</p>
                    <p className='nxt-review'>({card.progress.GOOD} days)</p> 
                </span>
                <span className='easy' onClick={this.handleEasy}>
                    <p className='answer'>Easy</p>
                    <p className='nxt-review'>({card.progress.EASY} days)</p> 
                </span>
            </div>

        </div>
        ); 
    }

    renderUserAnswer(card){
        const {userAnswer} = this.state;
        if(userAnswer === "") 
            return <></>;
    
        let usrAnwArray = [];
        //for each letter in card answer
        for (let i=0; i< userAnswer.length; i++){

            if (userAnswer.charAt(i) === card.back.charAt(i)){
                usrAnwArray.push(<span style={{color: 'green'}}>{userAnswer.charAt(i)}</span> )
            } else{
                usrAnwArray.push(<span style={{color: 'red'}}>{userAnswer.charAt(i)}</span> )
            }
        }
        return  <p><strong>{usrAnwArray.map( (letter) => letter )}</strong></p>;
    }

    renderFininished(){
        return (
            <h1>You finished this deck! Come back in 3 days</h1> 
        );
    }
}