import React from 'react';
import './styles.css';
import { MdKeyboard } from 'react-icons/md';
import { AiFillSound } from 'react-icons/ai';

export default class LearnCard extends React.Component{
    state={
        cardsList: [{
            front: 'a stupid or careless mistake\nerro, mancada',
            back: 'blunder\nto make a terrible blunder',
            hard: 2,
            good: 5,
            easy: 9,
        },
        {
            front: 'walk in a specific way',
            back: 'to tread, trod, trodden',
            hard: 2,
            good: 5,
            easy: 9,
        }],
        idxCurCard: 0,
        displayAnswer: 'none',
    }
    componentDidMount(){
        console.log(this.props.match.params.deckId);

        const randomCard = Math.floor(Math.random() * this.state.cardsList.length);
        this.setState({idxCurCard: randomCard});
    }

    handleShowAnswer= () => {
        this.setState({displayAnswer: 'block'});
    }


    handleWrong = () => {
        this.nextCard(false);
    }
    handleHard = () => {
        this.nextCard();
    }
    handleGood= () =>{
        this.nextCard();
    }
    handleEasy= () => {
        this.nextCard();
    }

    nextCard= (removefromList=true) => {
        const {cardsList, idxCurCard} = this.state;
        if (removefromList) 
            cardsList.splice(idxCurCard, 1);
        const randomCard = Math.floor(Math.random() * cardsList.length);
        this.setState({displayAnswer: 'none', idxCurCard: randomCard, cardsList});
    }


    render(){
        const {cardsList, idxCurCard} = this.state;
        var card;
        if (cardsList.length > 0) card = cardsList[idxCurCard];

        return (
        <div className='LearnCard'>
            { cardsList.length > 0 ? this.renderCard(card) : this.renderFininished()}
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
                <MdKeyboard size={40}/> 
            </div>
            <div className='back-card' style={{display: displayAnswer}}>
                <hr/>
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
                    <p className='nxt-review'>({card.hard} days)</p> 
                </span>
                <span className='good' onClick={this.handleGood}>
                    <p className='answer'>Good</p>
                    <p className='nxt-review'>({card.good} days)</p> 
                </span>
                <span className='easy' onClick={this.handleEasy}>
                    <p className='answer'>Easy</p>
                    <p className='nxt-review'>({card.easy} days)</p> 
                </span>
            </div>
        </div>
        ); 
    }

    renderFininished(){
        return (
            <h1>You finished this deck! Come back in 3 days</h1> 
        );
    }
}